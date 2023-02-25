from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateField
from wtforms.validators import DataRequired, Length


class PaymentMethodForm(FlaskForm):
  card_number = StringField('card number', validators=[DataRequired(), Length(min=16, max=16)])
  expiration_date = DateField('expiration date',  format='%Y-%m-%d', validators=[DataRequired()])
  cvv = StringField('cvv', validators=[DataRequired(), Length(min=3, max=3)])
  user_id = IntegerField('user id', validators=[DataRequired()])
