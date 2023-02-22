from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class TransactionForm(FlaskForm):
  sender_id = IntegerField('recipient',validators=[DataRequired()])
  recipient_id = IntegerField('recipient',validators=[DataRequired()])
  payment_method_id = IntegerField('payment method', validators=[DataRequired()])
  payment_amount = IntegerField('payment mount', validators=[DataRequired()])
  payment_message = StringField('message', validators=[DataRequired()])
