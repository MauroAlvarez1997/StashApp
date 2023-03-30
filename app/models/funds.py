from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class Funds(db.Model, UserMixin):
  __tablename__ = 'funds'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  funds = db.Column(db.Integer, nullable=False, default=0)
  user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

  users = db.relationship('User', back_populates='funds')

  def to_dict(self):
    return{
      'funds': self.funds
    }
