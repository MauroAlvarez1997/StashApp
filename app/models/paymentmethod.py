from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class PaymentMethod(db.Model, UserMixin):
  __tablename__ = 'paymentmethods'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  card_number = db.Column(db.String(16), nullable=False, unique=True)
  expiration_date = db.Column(db.DateTime, nullable=False)
  cvv = db.Column(db.String(3), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

  # relationships
  # transaction = db.relationship('Transaction', back_populates='paymentmethods')
  users = db.relationship('User', back_populates='payment_methods')

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'card_number': self.card_number,
      'expiration_date': self.expiration_date,
      'cvv': self.cvv,
      # 'users': [user.to_dict() for user in self.users],
    }
