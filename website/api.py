from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

# These relative imports connect this file to your main app's database and models
from .extensions import db
from .models import User

# This creates a 'Blueprint', which is a way to organize a group of related routes.
# All routes in this file will be prefixed with '/api' (e.g., /api/signup)
api_bp = Blueprint('api_bp', __name__, url_prefix='/api')

@api_bp.route('/signup', methods=['POST'])
def api_signup():
    """Handles new user registration from the mobile app."""
    data = request.get_json()
    if not data:
        return jsonify({'message': 'Error: No input data provided'}), 400

    name = data.get('name')
    email = data.get('email', '').lower()
    password = data.get('password')

    if not all([name, email, password]):
        return jsonify({'message': 'Error: Missing required fields'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Error: An account with this email already exists'}), 409

    # Create a new user instance and hash the password
    new_user = User(name=name, email=email)
    new_user.set_password(password)
    
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: Database error - {str(e)}'}), 500

@api_bp.route('/login', methods=['POST'])
def api_login():
    """Handles user login from the mobile app."""
    data = request.get_json()
    if not data:
        return jsonify({'message': 'Error: No input data provided'}), 400
        
    email = data.get('email', '').lower()
    password = data.get('password')

    if not all([email, password]):
        return jsonify({'message': 'Error: Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        # On successful login, return the user's data
        user_data = {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'belt_rank': user.belt_rank,
            'team': user.team,
            'profile_picture': user.profile_picture
        }
        return jsonify({'message': 'Login successful', 'user': user_data}), 200
    
    # If login fails, return a generic error message
    return jsonify({'message': 'Error: Invalid credentials'}), 401