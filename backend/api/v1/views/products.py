#!/usr/bin/python3
""" handling all default RestFul API actions for /products and /product/{id}"""
from models import storage
from api.v1.views import app_views
from flask import jsonify, request, abort
from flasgger.utils import swag_from
from models.product import Product


@app_views.route('/products', methods=['GET'], strict_slashes=False)
#############@swag_from('documentation/products.yml')
def get_products():
    """
    show the products
    """
    products = storage.all("Product").values()

    # Return success response with the products
    return jsonify({"products": products}), 200


@app_views.route('/product/<id>', methods=['GET'], strict_slashes=False)
@swag_from('documentation/.yml')
def get_product(id):
    """
    show a specefic product by id
    """
    product = storage.get_one(Product, id)

    # Return success response with the product required
    return jsonify({"the product": product}), 200


@app_views.route('/products/<id>', methods=['PUT'], strict_slashes=False)
###############3@swag_from('documentation/.yml')
def update_product(id):
    """
    updata a product
    """
    product = storage.get_one(Product, id)
    if not product:
        abort(404)

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
###############3@swag_from('documentation/.yml')
def del_product(id):
    """
    delete a product
    """
    product = storage.get(Product, id)
    if not product:
        abort(404)

    storage.delete(product)
    storage.save()

    return jsonify({}), 200
