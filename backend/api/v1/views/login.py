#!/usr/bin/python3
""" handling all default RestFul API actions for /login """
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, request, current_app
from flasgger.utils import swag_from
from models.user import User
from datetime import datetime
import jwt


@app_views.route('/login', methods=['POST'], strict_slashes=False)
# to automatically generate Swagger documentation
@swag_from('documentation/register.yml')
def login():
    """
    Process the login
    """

    try:
        data = request.get_json()
    except:
        abort(400, description="Invalid JSON data")

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        abort(400, description="Email and password are required")

    user = storage.get_one(User, 'email', email)
    if not user or not user.check_password(password):
        abort(401, description="Invalid email or password")

    # check if user is activated
    if not user.is_active:
        abort(403, description="Account not activated. Please check your email to activate your account or ask for new email.")

    # Generate a JWT for the user
    payload = {
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    # current_app: a proxy to handle current request
    jwt_token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')

    # If login successful
    return jsonify({'message': 'Login successful', 'token': jwt_token}), 200
