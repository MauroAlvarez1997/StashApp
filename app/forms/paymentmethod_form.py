from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import PaymentMethod

def card_exists(form, field):
    # Checking if user exists
    card_number = field.data
    user = PaymentMethod.query.filter(PaymentMethod.card_number == card_number).first()
    if user:
        raise ValidationError('A payment method with these credentils is already in use.')

class PaymentMethodForm(FlaskForm):
  card_number = StringField('card number', validators=[DataRequired(), Length(min=16, max=16)])
  expiration_date = DateField('expiration date',  format='%Y-%m-%d', validators=[DataRequired()])
  cvv = StringField('cvv', validators=[DataRequired(), Length(min=3, max=3)])
  user_id = IntegerField('user id', validators=[DataRequired()])
