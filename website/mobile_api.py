from flask import Blueprint, request, jsonify
from .app import User, db # This correctly imports the User model and db from your main app.py

# This Blueprint will hold all the routes for your mobile app's backend
mobile_api_bp = Blueprint('mobile_api_bp', __name__, url_prefix='/api')

@mobile_api_bp.route('/signup', methods=['POST'])
def api_signup():
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No input data provided'}), 400

    name = data.get('name')
    email = data.get('email', '').lower()
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({'message': 'Missing required fields'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 409

    new_user = User(name=name, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

@mobile_api_bp.route('/login', methods=['POST'])
def api_login():
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No input data provided'}), 400
        
    email = data.get('email', '').lower()
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        user_data = {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'belt_rank': user.belt_rank,
            'team': user.team
        }
        return jsonify({'message': 'Login successful', 'user': user_data}), 200
    
    return jsonify({'message': 'Invalid credentials'}), 401