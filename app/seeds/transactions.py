from app.models import db, Transaction, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_transactions():
    demo = Transaction(
        sender_id=1, recipient_id=2, payment_method_id=1, payment_amount=10, payment_message='payment_message')
    marnie = Transaction(
        sender_id=2, recipient_id=1, payment_method_id=1, payment_amount=20, payment_message='payment_message')
    bobbie = Transaction(
        sender_id=1, recipient_id=2, payment_method_id=1, payment_amount=30, payment_message='payment_message')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
