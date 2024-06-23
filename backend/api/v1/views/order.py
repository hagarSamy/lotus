#!/usr/bin/python3
""" handling all default RestFul API actions for /orders and /order/{id}"""
from models import storage
from api.v1.views import app_views
from flask import jsonify, request, abort
from flasgger.utils import swag_from
from models.order import *
from models.product import *


@app_views.route('/orders', methods=['GET'], strict_slashes=False)
@swag_from('documentation/order/all_orders.yml')
def get_orders():
    """
    show the orders
    """
    orders = storage.all("Order").values()

    # Return success response with the orders
    return jsonify({"orders": [order.to_dict() for order in orders]}), 200


@app_views.route('/orders/<id>', methods=['GET'], strict_slashes=False)
@swag_from('documentation/order/get_order.yml')
def get_an_order(id):
    """
    show a specefic order by id
    """
    order = storage.get_one(Order, "id", id)
    if not order:
        abort(404)

    return jsonify(order.to_dict()), 200


@app_views.route('/orders', methods=['POST'], strict_slashes=False)
@swag_from('documentation/order/post_order.yml')
def create_order():
    """
    making a new order
    """

    try:
        data = request.get_json()
        if data is None:
            abort(400, description="Order data required")
    except:
        abort(400, description="Not a JSON")
    

    required_fields = ['user_id', 'products', 'address', 'phone']

    for field in required_fields:
        if field not in data:
            abort(400, description=f"Missing {field}")

    # Validate products
    if not isinstance(data['products'], list) or len(data['products']) == 0:
        abort(400, description="Products must be a non-empty list")

    total_price = 0
    order_items = []
    
    # Fetch product price from storage
    for item in data['products']:
        if 'product_id' not in item or 'quantity' not in item:
            abort(400, description="Each product must include product_id and quantity")

        prod_id = item['product_id']
        product = storage.get_one(Product, "id", prod_id)
        if not product:
            abort(400, description="Invalid product_id")

        # Check if requested quantity is available
        if product.stock < item['quantity']:
            abort(400, description="Insufficient stock")

        # calculating total price
        item_price = product.price * item['quantity']
        total_price += item_price

        order_item = OrderItem(
            product_id=prod_id,
            quantity=item['quantity'],
            price=item_price # Store the total price for this item
        )
        order_items.append(order_item)

        # Update product stock
        product.stock -= item['quantity']

        order_data = {
        'user_id': data['user_id'],
        'address': data['address'],
        'phone': data['phone'],
        'total_price': total_price,
        'order_status': 'Pending'
        }
    
    order = Order(**order_data)
    storage.new(order)
    storage.save()

    for order_item in order_items:
        order_item.order_id = order.id
        storage.new(order_item)
    storage.save()
    return jsonify(order.to_dict()), 201


@app_views.route('/orders/<id>', methods=['PUT'], strict_slashes=False)
@swag_from('documentation/order/put_order.yml')
def update_order(id):
    """
    updata an order
    """
    order = storage.get_one(Order, "id", id)
    if not order:
        abort(404)

    try:
        data = request.get_json()
    except:
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at']

    for k, v in data.items():
        if k not in ignore:
            setattr(order, k, v)
    storage.save()
    return jsonify(order.to_dict()), 200

@app_views.route('/orders/<id>', methods=['DELETE'], strict_slashes=False)
@swag_from('documentation/order/delete_order.yml')
def del_order(id):
    """
    delete an order
    """
    order = storage.get_one(Order, "id", id)
    if not order:
        abort(404)

    storage.delete(order)
    storage.save()

    return jsonify({}), 200
