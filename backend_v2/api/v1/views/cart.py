#!/usr/bin/python3
""" handling all default RestFul API actions cart"""
from models import storage
from api.v1.views import app_views
from flask import jsonify, request, abort
from flasgger.utils import swag_from
from models.cart_item import CartItem
from models.product import *
from models.order import Order

@app_views.route('/cart/<user_id>', methods=['GET'], strict_slashes=False)
@swag_from('documentation/cart/get_cart.yml')
def get_cart(user_id):
    """
    Retrieve user's cart items
    """
    # cart_items = storage.all(CartItem, filter={'user_id': user_id})
    cart_items = storage.all(CartItem).values()
    user_cart_items = [item for item in cart_items if item.user_id == user_id]
    return jsonify([item.to_dict() for item in user_cart_items]), 200


@app_views.route('/cart/<cart_item_id>', methods=['GET'], strict_slashes=False)
def get_cart_item(cart_item_id):
    '''
    Retrieve one item from the cart items
    '''
    cart_item = storage.get_one(CartItem, "id", cart_item_id)
    if not cart_item:
        return jsonify({'message': 'Cart item not found'}), 404
    return jsonify(cart_item.to_dict()), 200


@app_views.route('/cart', methods=['POST'], strict_slashes=False)
@swag_from('documentation/cart/post_cart.yml')
def add_to_cart():
    """
    Add a product to the cart
    """
    try:
        data = request.get_json()
        if data is None:
            abort(400, description="JSON data required")
    except:
        abort(400, description="Invalid JSON data")

    required_fields = ['user_id', 'product_id', 'quantity']
    for field in required_fields:
        if field not in data:
            abort(400, description=f"{field} is required")

    user_id = data['user_id']
    product_id = data['product_id']
    quantity = data['quantity']

    # Validate product existence
    product = storage.get_one(Product, "id", product_id)
    if not product:
        abort(400, description="Invalid product_id")

    # Check if requested quantity is available
    if product.stock < quantity:
        abort(400, description="Insufficient stock")

    # Create a new CartItem instance
    itemdata = {
        "user_id": user_id,
        "product_id": product_id,
        "quantity": quantity,
    }
    cart_item = CartItem(**itemdata)

    # Add cart item to storage
    storage.new(cart_item)
    storage.save()

    return jsonify(cart_item.to_dict()), 201

@app_views.route('/cart/<cart_item_id>', methods=['PUT'], strict_slashes=False)
@swag_from('documentation/cart/post_item_quantity.yml')
def update_cart_item(cart_item_id):
    """
    Update the quantity of a cart item
    """
    try:
        data = request.get_json()
        if data is None:
            abort(400, description="JSON data required")

        # Validate presence of required field (quantity)
        if 'quantity' not in data:
            abort(400, description="quantity is required")

        new_quantity = data['quantity']

        # Retrieve the cart item
        cart_item = storage.get_one(CartItem, "id", cart_item_id)
        if not cart_item:
            abort(404, description="Cart item not found")

        # Validate new quantity
        product = storage.get_one(Product, "id", cart_item.product_id)
        if not product:
            abort(400, description="Invalid product_id")
        if new_quantity < 1:
            abort(400, description="Quantity must be greater than or equal to 1")
        if new_quantity > product.stock:
            abort(400, description="Insufficient stock")

        # Update cart item quantity
        cart_item.quantity = new_quantity
        storage.save()

        return jsonify(cart_item.to_dict()), 200

    except:
        abort(400, description="Invalid JSON data")

@app_views.route('/cart/<id>', methods=['DELETE'], strict_slashes=False)
@swag_from('documentation/cart/delete_cart.yml')
def remove_from_cart(id):
    """
    Remove an item from the cart
    """
    cart_item = storage.get_one(CartItem, "id", id)
    if not cart_item:
        abort(404, description="Cart item not found")

    storage.delete(cart_item)
    storage.save()

    return jsonify({}), 200


# @app_views.route('/cart/checkout/<user_id>', methods=['POST'], strict_slashes=False)
# def checkout(user_id):
#     """
#     Checkout: Create an order from cart items.
#     """
