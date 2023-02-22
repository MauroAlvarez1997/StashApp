from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(1000), nullable=False)
    firstname = db.Column(db.String(100), nullable=False)
    lastname = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(10), nullable=False)

    # relationships
    payment_methods = db.relationship('PaymentMethod', back_populates='users', cascade='all, delete')
    # transactions = db.relationship('Transaction', backref='users')
    transaction_out = db.relationship(
        "Transaction",
        primaryjoin="and_(User.id==Transaction.sender_id)", backref="user_out"
    )
    transaction_in = db.relationship(
        "Transaction",
        primaryjoin="and_(User.id==Transaction.recipient_id)", backref="user_in"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'email': self.email,
            'phone_number': self.phone_number,
            # 'sender': self.sender,
            'transactions_in': [transaction.to_dict() for transaction in self.transaction_in],
            'transactions_out': [transaction.to_dict() for transaction in self.transaction_out],
            'payment_methods': [method.to_dict() for method in self.payment_methods]
        }

    def to_dict_transactions(self):
        return {
            'id': self.id,
            'username': self.username,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'email': self.email,
            'phone_number': self.phone_number,
            # 'payment_methods': [method.to_dict() for method in self.payment_method],
            # 'transactions': [transaction.to_dict() for transaction in self.transactions],
            # 'transactions_out': [transaction.to_dict() for transaction in self.transactions if transaction.sender_id == self.id],
            # 'transactions_in': [transaction.to_dict() for transaction in self.transactions if transaction.recipient_id == self.id],
        }
