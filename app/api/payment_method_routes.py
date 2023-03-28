from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, db, PaymentMethod
from sqlalchemy import or_
from app.forms.paymentmethod_form import PaymentMethodForm

paymentmethod_routes = Blueprint('paymentmethods', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@paymentmethod_routes.route('/all')
@login_required
def get_all_paymentmethods():
    """
    Retrieve all of a user's transaction
    """
    my_id = current_user.id

    all_paymentmethods = PaymentMethod.query.filter(PaymentMethod.user_id == my_id).all()

    all_paymentmethods_arr = [all_pm for all_pm in all_paymentmethods]

    all_paymentmethods_obj = {}
    for i in all_paymentmethods_arr:

        all_paymentmethods_obj[i.id] = i.to_dict()


    return {'all_payment_methods': all_paymentmethods_obj}


@paymentmethod_routes.route('/update/<int:paymentmethod_id>', methods=['PUT'])
@login_required
def update_transaction(paymentmethod_id):
    form = PaymentMethodForm()
    my_id = current_user.id

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        payment_method_to_update = PaymentMethod.query.filter(PaymentMethod.id == paymentmethod_id).one()

        payment_method_to_update.card_number = form.data['card_number']
        payment_method_to_update.expiration_date = form.data['expiration_date']
        payment_method_to_update.cvv = form.data['cvv']
        payment_method_to_update.user_id = my_id

        db.session.commit()
        return payment_method_to_update.to_dict()
    return {}

@paymentmethod_routes.route('/create_card', methods=['POST'])
@login_required
def create_transaction():
    form = PaymentMethodForm()
    my_id = current_user.id
    
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
      newPaymentMethod = PaymentMethod(
        card_number=form.data['card_number'],
        expiration_date=form.data['expiration_date'],
        cvv=form.data['cvv'],
        user_id=my_id,
      )
      db.session.add(newPaymentMethod)
      db.session.commit()
      return newPaymentMethod.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@paymentmethod_routes.route('/delete/<int:id>', methods=["DELETE"])
@login_required
def delete_like(id):
    to_delete = PaymentMethod.query.get(id)
    deleted = to_delete.to_dict()
    db.session.delete(to_delete)
    db.session.commit()

    to_delete_again = PaymentMethod.query.get(id)
    if not to_delete_again:
        # return {'message': 'user deleted'}, 200
        return deleted
    return {'message': 'unable to delete user'}
