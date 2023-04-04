from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import User, db
from app.forms.user_form import UserForm
# from app.aws_upload_functionality import (
#     upload_file_to_s3, allowed_file, get_unique_filename)

user_routes = Blueprint('users', __name__)


@user_routes.route('/all')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return [user.to_dict() for user in users]


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/update_profile_photo', methods = ['PUT'])
@login_required
def update_profile_photo():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    form = UserForm()

    my_id = current_user.id

    currentuser = User.query.get(my_id)

    if not currentuser:
        return {'errors': 'User not found'}, 404


    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        currentuser.username = form.data['username']
        currentuser.email = form.data['email']
        currentuser.firstname = form.data['firstname']
        currentuser.lastname = form.data['lastname']
        currentuser.phone_number = form.data['phone_number']
        currentuser.profile_photo = form.data['profile_photo']

        db.session.commit()

        return currentuser.to_dict()
