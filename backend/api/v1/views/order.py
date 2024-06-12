#!/usr/bin/python3
""" handling all default RestFul API actions for /orders and /order/{id}"""
from models import storage
from api import app
from flask import jsonify, request, abort
from flasgger.utils import swag_from
from models.order import Order


@app.route('/orders', methods=['GET'], strict_slashes=False)
@swag_from('documentation/orders.yml')
def get_orders():
    """
    show the orders
    """
    orders = storage.all("Order").values()

    # Return success response with the orders
    return jsonify({"orders": orders}), 200


@app.route('/orders/<id>', methods=['GET'], strict_slashes=False)
###############3@swag_from('documentation/orders.yml')
def get_an_order(id):
    """
    show a specefic order by id
    """
    order = storage.get_one(Order, id)
    if not order:
        abort(404)

    return jsonify(order.to_dict()), 200


@app.route('/orders', methods=['POST'], strict_slashes=False)
###############3@swag_from('documentation/orders.yml')
def get_order(id):
    """
    making a new order
    """

    try:
        data = request.get_json()
        if data is None:
            abort(400, description="Order data required")
    except:
        abort(400, description="Not a JSON")
    

    required_fields = ['user_id', 'product_id', 'quantity', 'address', 'phone']

    for field in required_fields:
        if field not in data:
            abort(400, description=f"Missing {field}")
    
    # Fetch product price from storage
    product = storage.get_one('Product', data['product_id'])
    if not product:
        abort(400, description="Invalid product_id")
    
    # Calculate the total price
    total_price = product.price * data['quantity']

    # Set default order status
    order_status = 'Pending'
        
    order_data = {field : data[field] for field in required_fields}
    order_data['total_price'] = total_price
    order_data['order_status'] = order_status
    
    order = Order(**order_data)
    storage.new(order)
    storage.save()
    return jsonify(order.to_dict()), 201


@app.route('/orders/<id>', methods=['PUT'], strict_slashes=False)
###############3@swag_from('documentation/orders.yml')
def update_order(id):
    """
    updata an order
    """
    order = storage.get_one(Order, id)
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

@app.route('/orders/<id>', methods=['DELETE'], strict_slashes=False)
###############3@swag_from('documentation/orders.yml')
def del_order(id):
    """
    delete an order
    """
    order = storage.get(Order, id)
    if not order:
        abort(404)

    storage.delete(order)
    storage.save()

    return jsonify({}), 200
