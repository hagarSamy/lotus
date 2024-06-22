import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import styles from './Cart.module.scss'
import { CartContext } from "../Context/Context";

export default function Cart() {

    const { cartItems } = useContext(CartContext);
    const { removeFromCart } = useContext(CartContext);
    console.log('Adding item from cart:', cartItems);
  return (
    <>
     <div className="container p-5">
     <div className="row d-flex justify-content-center align-items-center h-100">
  <div className="col">
    <p><span className="h2">Lotus Cart</span></p>

    {cartItems.length > 0? cartItems.map((item, index) => (
      <div key={index} className="card mb-4">
        <div className="card-body p-4">
          <div className="row align-items-center">
            <div className="col-md-4">
              <img src={item.image} className="img-fluid w-25" alt={item.title} />
            </div>
            <div className="col-md-2 d-flex justify-content-center">
              <div>
                <p className="small text-muted mb-4 pb-2">Name</p>
                <p className="lead fw-normal mb-0">{item.title}</p>
              </div>
            </div>
            <div className="col-md-2 d-flex justify-content-center">
              <div>
                <p className="small text-muted mb-4 pb-2">Quantity</p>
                <input type="number" id={`quantity-${index}`} name="quantity" defaultValue={item.quantity} readOnly className="form-control border-0" />
              </div>
            </div>
            <div className="col-md-2 d-flex justify-content-center">
              <div>
                <p className="small text-muted mb-4 pb-2">Price</p>
                <p className="lead fw-normal mb-0">$ {item.price}</p>
              </div>
            </div>
            <div className="col-md-2 d-flex justify-content-center">
              <div>
                <p className="small text-muted mb-4 pb-2">Delete</p>
                <button onClick={() => removeFromCart(item.id)} className="btn btn-outline-danger">
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )) : (
      <p>No items in the cart.</p>
    )}

    <div className="card mb-5">
      <div className="card-body p-4">
        <div className="float-end">
          <p className="mb-0 me-5 d-flex align-items-center">
            <span className="small text-muted me-2">Order total:</span> <span className="lead fw-normal">$ {(cartItems.reduce((total, item) => total + item.price * item.quantity, 0)).toFixed(2)}</span>
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


{/* <section className={` ${styles.cart}`}>
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      <ul className="list-none">
        {cartItems?.map((item, index) => (
          <li key={index} className="flex flex-wrap justify-between items-start p-4 border-b border-gray-200 last:border-b-0">
            <div className="flex-shrink-0">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-600">Quantity: <span className="font-semibold">{item.quantity}</span></p>
            </div>
            <div className="ml-4">
              <span className="text-lg font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <strong>Total:</strong> ${(cartItems.reduce((total, item) => total + item.price * item.quantity, 0)).toFixed(2)}
      </div>
    </section> */}
    </div>
    </>
  )
}
