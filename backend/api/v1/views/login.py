#!/usr/bin/python3
""" handling all default RestFul API actions for /login """
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from
from models.user import User


@app_views.route('/login', methods=['POST'], strict_slashes=False)
# to automatically generate Swagger documentation
###################@swag_from('documentation/register.yml')
def register():
    """
    Process the login
    """

    try:
        data = request.get_json()
        if data is None:
            raise ValueError("JSON data required")
    except ValueError as e:
        abort(400, description=str(e))
    except Exception as e:
        abort(400, description="Invalid JSON data")

    user = storage.get_one(User, 'email', data['email'])
    if not user or not user.check_password(data['password']):
        abort(401, description="Invalid email or password")

    # If login successful
    return jsonify({'message': 'Login successful'}), 200
