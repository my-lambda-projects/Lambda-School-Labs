from models import *
from server import *

with app.app_context():
    db.create_all()
