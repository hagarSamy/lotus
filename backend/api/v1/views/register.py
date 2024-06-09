#!/usr/bin/python3
""" handling all default RestFul API actions for /register """
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from
from models.user import User


@app_views.route('/register', methods=['GET'], strict_slashes=False)
# to automatically generate Swagger documentation
###################@swag_from('documentation/register.yml')
def register():
    """
    Process the registration form data.
    """

    try:
        data = request.get_json()
    except:
        abort(400, description="Not a JSON")


    required_data = ['name', 'email', 'password', 'token']
    for field in required_data:
        if field not in data:
            abort(400, description=f"{field} is required")

    users = storage.all('User')
    for user in users.vslues():
        if user.token == data['token']:
            return jsonify({'message': 'User ralready exists'}), 200
    # retreiving keys and values from the response data
    user_data = {field: data[field] for field in required_data}
    new_user= User(**user_data)
    new_user.save()

    # Return success response
    # 201: arequest has successfully created a new resource
    return jsonify({'message': 'User registered successfully'}), 201
