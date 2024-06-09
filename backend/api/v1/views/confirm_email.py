#!/usr/bin/python3
""" objects that handle all default RestFul API actions for /confirm-email """
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, request, Flask
from flasgger.utils import swag_from
from itsdangerous import URLSafeTimedSerializer
from flask_mail import Mail, Message
import jwt
import datetime
import os


app = Flask(__name__)

# Configuration for Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('GMAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('GMAIL_PASSWORD')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'mysecret')  # Add a secret key for JWT
# app.config['MAIL_DEFAULT_SENDER'] = 'your-gmail@example.com'

mail = Mail(app)

def generate_jwt(email):
    payload = {
        'email': email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)  # Token expires in 24 hours
    }
    token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
    return token

@app_views.route('/confirm-email', methods=['POST'], strict_slashes=False)
##################@swag_from('documentation/confirm-email.yml')
def confirm_email():
    try:
        data = request.get_json()
    except:
        abort(400, description="Not a JSON")
    email = data.get('email')
    usrname = data.get('name')
    if not email:
        return jsonify({'error': 'Email is required'}), 400

    token = generate_jwt(email)
    # neeeed to save the token ---- borrow a function from Aya
    #########################################################
    msg = Message('Confirm Your Email', recipients=[email])
    msg.body = f"""
    Hi {usrname},

    Thank you for signing up for Lotus! To complete your registration, please use the following token to confirm your email address:

    Confirmation Token: {token}

    Please do not share this token with anyone. If you did not sign up for a Lotus account, please ignore this email.

    Best regards,
    The Lotus Team
    """
    mail.send(msg)

    return jsonify({'message': 'Confirmation email sent!'}), 200

@app_views.route('/validate-token', methods=['POST'], strict_slashes=False)
###########################################
def validate_token():
    try:
        data = request.get_json()
    except:
        abort(400, description="Not a JSON")
    token = data.get('token')
    if not token:
        return jsonify({'error': 'Token is required'}), 400

    try:
        decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        email = decoded.get('email')
    
        return jsonify({'message': 'Token is valid', 'email': email}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired'}), 400
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 400
