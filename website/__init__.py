from flask import Flask
from flask_cors import CORS
import os

from .extensions import db, mail
from .routes import main_bp
from .api import api_bp
from .models import User

def create_app():
    app = Flask(__name__)
    CORS(app)

    # --- All your app.config settings go here ---
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
    # ... etc.

    db.init_app(app)
    mail.init_app(app)

    app.register_blueprint(main_bp)
    app.register_blueprint(api_bp)

    with app.app_context():
        db.create_all()

    return app