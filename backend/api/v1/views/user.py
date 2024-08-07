#!/usr/bin/python3
""" handling all default RestFul API actions for /users and /user/{id} """
from models import storage
from api.v1.views import app_views
from flask import jsonify, request, abort
from flasgger.utils import swag_from
from models.user import User


@app_views.route('/users', methods=['GET'], strict_slashes=False)
@swag_from('documentation/user/all_users.yml')
def get_users():
    """
    show the users
    """
    all_users = storage.all(User).values()
    list_users = []
    for user in all_users:
        list_users.append(user.to_dict())
    return jsonify(list_users), 200



@app_views.route('/users/<id>', methods=['GET'], strict_slashes=False)
@swag_from('documentation/user/get_user.yml')
def get_a_user(id):
    """
    show a specefic user by id
    """
    user = storage.get_one(User, "id", id)
    if not user:
        abort(404)

    return jsonify(user.to_dict()), 200


@app_views.route('/users/<id>', methods=['DELETE'], strict_slashes=False)
@swag_from('documentation/user/delete_user.yml')
def remove_a_user(id):
    """
    delete a specefic user by id
    """
    user = storage.get_one(User, "id", id)
    if not user:
        abort(404)

    storage.delete(user)
    storage.save()

    return jsonify({}), 200

@app_views.route('/users/<id>', methods=['PUT'], strict_slashes=False)
@swag_from('documentation/user/put_user.yml')
def update_user(id):
    """
    updata a user
    """
    user = storage.get_one(User, "id", id)
    if not user:
        abort(404)

    try:
        data = request.get_json()
    except:
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at', '__class__']

    for k, v in data.items():
        if k not in ignore:
            setattr(user, k, v)
    storage.save()
    return jsonify(user.to_dict()), 200
