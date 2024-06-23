#!/usr/bin/python3
""" handling all default RestFul API actions for /products and /product/{id}"""
from models import storage
from api.v1.views import app_views
from flask import jsonify, request, abort
from flasgger.utils import swag_from
from models.product import Product


@app_views.route('/products', methods=['GET'], strict_slashes=False)
@swag_from('documentation/product/all_products.yml')
def get_products():
    """
    show the products
    """
    products = storage.all("Product").values()

    # Return success response with the products
    return jsonify({"products":  [product.to_dict() for product in products]}), 200


@app_views.route('/product/<id>', methods=['GET'], strict_slashes=False)
@swag_from('documentation/product/get_product.yml')
def get_product(id):
    """
    show a specefic product by id
    """
    product = storage.get_one(Product, "id", id)

    if not product:
        abort(404, description="Product not found")

    # Return success response with the product required
    return jsonify({"the_product": product.to_dict()}), 200


@app_views.route('/products', methods=['POST'], strict_slashes=False)
@swag_from('documentation/product/post_product.yml')
def create_product():
    """
    Create a new product
    """
    try:
        data = request.get_json()
    except:
        abort(400, description="Not a JSON")

    required_fields = ['name', 'description', 'owner', 'price', 'img_url', 'stock']
    for field in required_fields:
        if field not in data:
            abort(400, description=f"{field} is required")

    # Create a new Product instance
    new_product = Product(
        name=data['name'],
        description=data['description'],
        owner=data['owner'],
        price=data['price'],
        img_url=data['img_url'],
        stock=data['stock']
    )

    # Add the new product to the database
    storage.new(new_product)
    storage.save()

    # Return success response with the new product data
    return jsonify(new_product.to_dict()), 201

@app_views.route('/products/<id>', methods=['PUT'], strict_slashes=False)
@swag_from('documentation/product/put_product.yml')
def update_product(id):
    """
    updata a product
    """
    product = storage.get_one(Product, "id", id)
    if not product:
        abort(404, description="Product not found")

    try:
        data = request.get_json()
    except:
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at']

    for k, v in data.items():
        if k not in ignore:
            setattr(product, k, v)
    storage.save()
    return jsonify(product.to_dict()), 200

@app_views.route('/products/<id>', methods=['DELETE'], strict_slashes=False)
@swag_from('documentation/product/delete_product.yml')
def del_product(id):
    """
    delete a product
    """
    product = storage.get_one(Product, "id", id)
    if not product:
        abort(404, description="Product not found")

    storage.delete(product)
    storage.save()

    return jsonify({}), 200
