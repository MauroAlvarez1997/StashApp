from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class UserForm(FlaskForm):
  username = StringField('Username', validators=[DataRequired()])
  email = StringField('Email', validators=[DataRequired()])
  firstname = StringField('First Name', validators=[DataRequired()])
  lastname  = StringField('Last Name', validators=[DataRequired()] )
  phone_number = StringField('Phone Number', validators=[DataRequired()] )
  profile_photo = StringField('Profile Photo')
