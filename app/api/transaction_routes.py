from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, db, Transaction

transaction_routes = Blueprint('transactions', __name__)

@transaction_routes.route('/all')
@login_required
def get_all_transactions():
    """
    Retrieve all of a user's transaction
    """


    print("You hit the route!!!!!")
    my_id = current_user.id
    print('AAAAA', my_id)

    all_transactions = Transaction.query.filter(my_id == Transaction.sender_id or Transaction.recipient_id).all()
    transactions_out = Transaction.query.filter(Transaction.sender_id == my_id).all()
    transactions_in = Transaction.query.filter(Transaction.recipient_id == my_id).all()

    all_transactions_arr = [all_t for all_t in all_transactions]
    transactions_out_arr = [t_out for t_out in transactions_out]
    transactions_in_arr = [t_in for t_in in transactions_in]

    all_transactions_obj = {}
    for i in all_transactions_arr:
        print('THIS IS THE I!!!!!!!!!!',i)
        all_transactions_obj[i.id] = i.to_dict()

    transactions_out_obj = {}
    for i in transactions_out_arr:
        print('THIS IS THE I OUT!!!!!!!!!!',i)
        transactions_out_obj[i.id] = i.to_dict()

    transactions_in_obj = {}
    for i in transactions_in_arr:
        print('THIS IS THE I IN!!!!!!!!!!',i)
        transactions_in_obj[i.id] = i.to_dict()

    return {'all_transactions': all_transactions_obj, 'transactions_out': transactions_out_obj, 'transactions_in': transactions_in_obj,}
