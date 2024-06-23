#!/usr/bin/python3
""" handling all default RestFul API actions for /register """
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, request, url_for, current_app
from flasgger.utils import swag_from
from models.user import User
import re
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from flask_mail import Mail, Message
import jwt
import datetime


# Serializer for generating email tokens
s = URLSafeTimedSerializer('Thisisasecret!')
# mail = Mail()
# mail = Mail(current_app)

@app_views.route('/register', methods=['POST'], strict_slashes=False)
@swag_from('documentation/register.yml')
def register():
    """
    Process the registration form data.
    """
    try:
        data = request.get_json()
    except:
        abort(400, description="Not a JSON")

    required_data = ['username', 'email', 'password']
    for field in required_data:
        if field not in data:
            abort(400, description=f"{field} is required")

    name = data['username']
    email = data['email']
    password = data['password']

    # Validate name
    # checking if the regex matches the beginning of the string.
    if not re.match(r"^[a-zA-Z ]{4,}$", name):
        abort(400, description="Invalid name")

    # Validate email
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        abort(400, description="Invalid email")

    # Validate password (example: at least 6 characters, at least one number)
    if len(password) < 6 or not re.search(r"\d", password):
        abort(400, description="Password must be at least 6 characters long and contain at least one number")

    # Check if the user already exists
    user = storage.get_one(User, 'email', email)
    if user:
        return jsonify({'message': 'User already exists'}), 200

    # Create a new user (assuming User model has a method to hash passwords)
    new_user = User(username=name, email=email, is_active=False)

    # hashing the password:
    new_user.self_password(password)

    # check if user is an admin
    admin_users = ["hagarsami63@gmail.com", "sabah.abdelbaset@gmail.com",
                   "lotushandicraftyc@gmail.com", "aya786930@gmail.com"]
    if email in admin_users:
        new_user.is_admin = True
    new_user.save()

    # Generate a token for email confirmation
    # serializing the email into a token that can be safely included in a URL.
    token = s.dumps(email, salt='email-confirm')

    # Send a confirmation email with activation link
    # url_for is used to ensure that the link will contain this endpoint
    confirm_url = url_for('app_views.activate_user', token=token, _external=True)
    msg = Message('Confirm Your Account', sender='lotushandicraftyc@gmail.com', recipients=[email])
    msg.body = f"""
    Hi {name},

    Thank you for signing up for Lotus! Please click the link to confirm your registration: {confirm_url}'
    
    If you did not sign up for a Lotus account, please ignore this email.

    Best regards,
    The Lotus Team
    """
    mail = Mail(current_app)
    mail.send(msg)

    # Return success response
    return jsonify({'message': 'Registered successfully. Please check your email to confirm your registration.', 'token': token}), 201

@app_views.route('/activate/<token>', methods=['GET'], strict_slashes=False)
def activate_user(token):
    """
    Handle the activation of the user account.
    """
    try:
        email = s.loads(token, salt='email-confirm', max_age=10800)  # Token valid for 3 hour
    except SignatureExpired:
        return jsonify({'message': 'The confirmation link has expired. Please request a new confirmation email.'}), 400
    except BadSignature:
        abort(400, description="Invalid token.")

    # Retrieve user and activate
    user = storage.get_one(User, 'email', email)
        
    if user is None:
        abort(404, description="User not found.")

    user.is_active = True
    user.save()

    # Generate a JWT for the user
    payload = {
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)  # Token valid for 24 hours
    }
    jwt_token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256').decode('utf-8')

    return jsonify({'message': 'User activated successfully', 'token': jwt_token}), 200



@app_views.route('/resend-confirmation', methods=['POST'], strict_slashes=False)
def resend_confirmation():
    """
    Resend the confirmation email.
    """

    try:
        data = request.get_json()
        if data is None:
            raise ValueError("JSON data required")
    except ValueError as e:
        abort(400, description=str(e))
    except Exception as e:
        abort(400, description="Invalid JSON data")

    email = data.get('email')
    if not email:
        abort(400, description="Email is required")

    # Retrieve user
    user = storage.get_one(User, 'email', email)
    if user is None:
        return jsonify({'message': 'User not found.'}), 404

    if user.is_active:
        return jsonify({'message': 'Account already activated. Please log in.'}), 400

    # Generate a new token for email confirmation
    token = s.dumps(email, salt='email-confirm')

    # Send a confirmation email with activation link
    confirm_url = url_for('app_views.activate_user', token=token, _external=True)
    msg = Message('Confirm Your Account', sender='lotushandicraftyc@gmail.com', recipients=[email])
    msg.body = f"""
    Hi {user.name},

    It looks like you need a new confirmation link. To complete your registration, please click the link to confirm your registration: {confirm_url}

    If you did not sign up for a Lotus account, please ignore this email.

    Best regards,
    The Lotus Team
    """
    mail = Mail(current_app)
    mail.send(msg)

    return jsonify({'message': 'A new confirmation email has been sent. Please check your email.'}), 200
