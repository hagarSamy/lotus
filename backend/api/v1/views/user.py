#!/usr/bin/python3
""" handling all default RestFul API actions for /users and /user/{id} """
from models import storage
from api import app
from flask import jsonify, request, abort
from flasgger.utils import swag_from
from models.user import User


@app.route('/users', methods=['GET'], strict_slashes=False)
################@swag_from('documentation/users.yml')
def get_users():
    """
    show the users
    """
    users = storage.all("User").value()
    
    # Return success response with the users
    return jsonify({"users": users}), 200


@app.route('/user/<id>', methods=['GET'], strict_slashes=False)
###################@swag_from('documentation/users.yml')
def get_a_user(id):
    """
    show a specefic user by id
    """
    user = storage.get(User, id)
    if not user:
        abort(404)

    return jsonify(user.to_dict()), 200


@app.route('/user/<id>', methods=['DELETE'], strict_slashes=False)
#############@swag_from('documentation/users.yml')
def remove_a_user(id):
    """
    delete a specefic user by id
    """
    user = storage.get(User, id)
    if not user:
        abort(404)

    storage.delete(user)
    storage.save()

    return jsonify({}), 200

@app.route('/users/<id>', methods=['PUT'], strict_slashes=False)
###############3@swag_from('documentation/.yml')
def update_user(id):
    """
    updata a user
    """
    user = storage.get_one(User, id)
    if not user:
        abort(404)

    try:
        data = request.get_json()
    except:
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at']

    for k, v in data.items():
        if k not in ignore:
            setattr(user, k, v)
    storage.save()
    return jsonify(user.to_dict()), 200

@app.route('/users/<id>', methods=['DELETE'], strict_slashes=False)
###############3@swag_from('documentation/.yml')
def del_user(id):
    """
    delete a user
    """
    user = storage.get(User, id)
    if not user:
        abort(404)

    storage.delete(user)
    storage.save()

    return jsonify({}), 200
