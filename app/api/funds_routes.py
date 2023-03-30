from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, db, PaymentMethod, Funds
from sqlalchemy import or_
from app.forms.funds_form import FundsForm

funds_routes = Blueprint('funds', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@funds_routes.route('/update', methods=['PUT'])
@login_required
def update_funds():
    form = FundsForm()
    my_id = current_user.id
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        funds_to_update = Funds.query.filter(Funds.user_id == my_id).one()

        funds_to_update.funds = form.data['funds']
        funds_to_update.user_id = my_id

        db.session.commit()
        return funds_to_update.to_dict()
    return {}
