#!/usr/bin/python3
""" handling all default RestFul API actions cart"""
from models import storage
from api.v1.views import app_views
from flask import jsonify, request, abort
from flasgger.utils import swag_from
from models.cart import CartItem
from models.product import Product
from models.order import Order

@app_views.route('/cart/<user_id>', methods=['GET'], strict_slashes=False)
@swag_from('documentation/cart/get_cart.yml')
def get_cart(user_id):
    """
    Retrieve user's cart items
    """
    cart_items = storage.all(CartItem).values()
    user_cart_items = [item for item in cart_items if item.user_id == user_id]
    return jsonify([item.to_dict() for item in user_cart_items]), 200


# @app_views.route('/cart/<int:cart_item_id>', methods=['GET'], strict_slashes=False)
# def get_cart_item(cart_item_id):


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
    cart_item = CartItem(
        user_id=user_id,
        product_id=product_id,
        quantity=quantity
    )

    # Add cart item to storage
    storage.new(cart_item)
    storage.save()

    return jsonify(cart_item.to_dict()), 201

@app_views.route('/cart/<id>', methods=['DELETE'], strict_slashes=False)
@swag_from('documentation/cart/delete_cart.yml')
def remove_from_cart(id):
    """
    Remove a product from the cart
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
