from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, db, Transaction
from sqlalchemy import or_
from app.forms.transaction_form import TransactionForm

transaction_routes = Blueprint('transactions', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@transaction_routes.route('/all')
@login_required
def get_all_transactions():
    """
    Retrieve all of a user's transaction+
    """
    # use flask_login import to get the current users ID
    my_id = current_user.id

    # get all of the current users transactions using id
    all_transactions = Transaction.query.filter(or_(Transaction.sender_id == my_id, Transaction.recipient_id == my_id)).all()

    # divide those transactions bewteen outgoing funds and incoming funds
    transactions_out = Transaction.query.filter(Transaction.sender_id == my_id).all()
    transactions_in = Transaction.query.filter(Transaction.recipient_id == my_id).all()

    # convert queries into arrays
    all_transactions_arr = [all_t for all_t in all_transactions]
    transactions_out_arr = [t_out for t_out in transactions_out]
    transactions_in_arr = [t_in for t_in in transactions_in]

    # iterate through them and run to dict on each transaction
    all_transactions_obj = {}
    for i in all_transactions_arr:

        all_transactions_obj[i.id] = i.to_dict()

    transactions_out_obj = {}
    for i in transactions_out_arr:

        transactions_out_obj[i.id] = i.to_dict()

    transactions_in_obj = {}
    for i in transactions_in_arr:

        transactions_in_obj[i.id] = i.to_dict()

    # return the new state
    return {'all_transactions': all_transactions_obj, 'transactions_out': transactions_out_obj, 'transactions_in': transactions_in_obj,}


@transaction_routes.route('/update/<int:transaction_id>', methods=['PUT'])
@login_required
def update_transaction(transaction_id):
    form = TransactionForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        transaction_to_update = Transaction.query.filter(Transaction.id == transaction_id).one()
        # dicted = transaction_to_update.to_dict()

        transaction_to_update.sender_id = form.data['sender_id']
        transaction_to_update.recipient_id = form.data['recipient_id']
        transaction_to_update.payment_method_id = form.data['payment_method_id']
        transaction_to_update.payment_amount = form.data['payment_amount']
        transaction_to_update.payment_message = form.data['payment_message']
        # transaction_to_update.created_at = form.data['created_at']
        db.session.commit()
        return transaction_to_update.to_dict()
    return {}

@transaction_routes.route('/create', methods=['POST'])
@login_required
def create_transaction():
    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newTransaction = Transaction(
            sender_id=form.data['sender_id'],
            recipient_id=form.data['recipient_id'],
            payment_method_id=form.data['payment_method_id'],
            payment_amount=form.data['payment_amount'],
            payment_message=form.data['payment_message'],
        )
        db.session.add(newTransaction)
        db.session.commit()
        return newTransaction.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@transaction_routes.route('/delete/<int:id>', methods=["DELETE"])
@login_required
def delete_like(id):
    to_delete = Transaction.query.get(id)
    deleted = to_delete.to_dict()
    db.session.delete(to_delete)
    db.session.commit()

    to_delete_again = Transaction.query.get(id)
    if not to_delete_again:
        # return {'message': 'user deleted'}, 200
        return deleted
    return {'message': 'unable to delete user'}
