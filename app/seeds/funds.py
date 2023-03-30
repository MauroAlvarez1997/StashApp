from app.models import db, Funds, environment, SCHEMA
from datetime import date

# Adds a demo user, you can add other users here if you want
def seed_funds():
    funds1 = Funds(funds=0, user_id=1)
    funds2 = Funds(funds=0, user_id=2)
    funds3 = Funds(funds=0, user_id=3)

    db.session.add(funds1)
    db.session.add(funds2)
    db.session.add(funds3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_funds():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.funds RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM funds")

    db.session.commit()
