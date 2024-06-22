import React from 'react'
import { Link } from 'react-router-dom';

export default function Cart() {
  return (
    <>
     <div className="container p-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
                <p><span className="h2">Lotus Cart </span></p>

                <div className="card mb-4">
                    <div className="card-body p-4">
                        <div className="row align-items-center">
                            <div className="col-md-4">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/1.webp" className="img-fluid" alt="Product Image" />
                            </div>
                            <div className="col-md-2 d-flex justify-content-center">
                                <div>
                                    <p className="small text-muted mb-4 pb-2">Name</p>
                                    <p className="lead fw-normal mb-0">Product Name</p>
                                </div>
                            </div>
                
                            <div className="col-md-2 d-flex justify-content-center">
                                <div>
                                    <p className="small text-muted mb-4 pb-2">Quantity</p>
                                    <input type="number" id="quantity" name="quantity" min="1" max="5" class="form-control" />
                                </div>
                            </div>
                            <div className="col-md-2 d-flex justify-content-center">
                                <div>
                                    <p className="small text-muted mb-4 pb-2">Price</p>
                                    <p className="lead fw-normal mb-0">$99.99</p>
                                </div>
                            </div>
                            <div className="col-md-2 d-flex justify-content-center">
                                <div>
                                    <p className="small text-muted mb-4 pb-2"> Delete</p>
                                    <p className="lead fw-normal mb-0">
                                    <i class="fas fa-trash-alt"></i>
</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mb-5">
                    <div className="card-body p-4">
                        <div className="float-end">
                            <p className="mb-0 me-5 d-flex align-items-center">
                                <span className="small text-muted me-2">Order total:</span> <span className="lead fw-normal">$99.99</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-light btn-lg me-2"><Link className='nav-link' to="/products">Continue shopping</Link></button>
                    <button type="button" className="btn btn-primary btn-lg">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
