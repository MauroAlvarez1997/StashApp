from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .user import User

class Transaction(db.Model, UserMixin):
  __tablename__ = 'transactions'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  sender_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
  recipient_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
  payment_method_id = db.Column(db.Integer, nullable=False)
  payment_amount = db.Column(db.Integer, nullable=False)
  payment_message = db.Column(db.String(255), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)


  # relationships
  # paymentmethods = db.relationship('PaymentMethod', back_populates='transactions')
  # users = db.relationship('User', back_populates='transactions')
  recipient = db.relationship('User', foreign_keys=[recipient_id])
  # User.recipient = db.relationship('Transaction', foreign_keys=[recipient_id])
  sender = db.relationship('User', foreign_keys=[sender_id])
  # User.sender = db.relationship('Transaction', foreign_keys=[sender_id])
  # User.transactions = db.relationship('Transaction', backref='users')


  def to_dict(self):
    return {
      'id': self.id,
      'sender_id': self.sender_id,
      'recipient_id': self.recipient_id,
      'payment_method_id': self.payment_method_id,
      'payment_amount': self.payment_amount,
      'payment_message': self.payment_message,
      'created_at': self.created_at,
    }


  def to_dict_all(self):
    return {
      'id': self.id,
      'sender_id': self.sender_id,
      'recipient_id': self.recipient_id,
      'payment_method_id': self.payment_method_id,
      'payment_amount': self.payment_amount,
      'payment_message': self.payment_message,
      'created_at': self.created_at,
      # 'users': [user.to_dict() for user in self.users],
      # 'paymentmethods': [method.to_dict() for method in self.paymentmethods]
    }
