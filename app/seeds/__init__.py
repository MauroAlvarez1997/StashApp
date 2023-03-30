from flask.cli import AppGroup
from .users import seed_users, undo_users
from .paymentmethod import seed_paymentmethods, undo_paymentmethods
from .transactions import seed_transactions, undo_transactions
from .funds import seed_funds, undo_funds

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_transactions()
        undo_paymentmethods()
        undo_funds()
        undo_users()
    seed_users()
    seed_funds()
    seed_paymentmethods()
    seed_transactions()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_transactions()
    undo_paymentmethods()
    undo_funds()
    undo_users()
    # Add other undo functions here



# npm install --prefix react-app && npm run build --prefix react-app && pip install -r requirements.txt && pip install psycopg2 && flask db downgrade && flask db migrate && flask db upgrade  && flask seed all
