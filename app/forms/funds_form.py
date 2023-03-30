from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, NumberRange


class FundsForm(FlaskForm):
  funds = IntegerField('funds', validators=[NumberRange(min=0, max=None, message='can not be negative')])
