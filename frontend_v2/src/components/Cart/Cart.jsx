import React, { useContext, useState } from "react";
// import {  useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Joi from "joi";
// import styles from "./Cart.module.scss";
import { CartContext } from "../Context/Context";
import Confetti from 'react-confetti';
import { toast } from 'react-toastify';

export default function Cart({ userData }) {
  const notify = () => toast.success('🦄 WOW order packaged, contact to you soon', {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });

  const [showConferri, setShowConfetti] = useState(false);
  
  const [user, setUser] = useState({
    email: "",
    phone: "",
    address: ""
  });

    // /////////////////// navigation ///////////////////////
    // let navigate = useNavigate();
    // let goToproduct = () => {
    //   navigate("/products");
    // };
  /////////////  validation //////////////////
  const [errorDetails, setErrors] = useState([]);

  function validateUserData() {
    let rules = Joi.object({
      address: Joi.string().min(5).max(50).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com"] },
      }),
      phone: Joi.string().pattern(/^[0-9]{11}$/).required(),
    });
    let validationResult = rules.validate(user, { abortEarly: false });
    console.log(validationResult);
    if (validationResult.error !== undefined) {
      setErrors(validationResult.error.details);
      return false;
    } else {
      setErrors('');
      return true;
    }
  }
  function showAlert(inputName) {
    let x = errorDetails.filter((e) => {
      return e.message.includes(inputName);
    });
    if (x.length > 0 && x[0].message.includes("pattern")) {
      return <p style={{color:'red'}}>Phone must be number and have 11 digits</p>;
    }
    return <p style={{color:'red'}}>{x[0]?.message}</p>;
  }
  //////////////////// what happen when press register ///////////////////////
  let submitForm = async (e) => {
    e.preventDefault(); // prevent default reload of the form
    if (validateUserData()) {
      notify();
      setShowConfetti(true);
      setTimeout(()=>setShowConfetti(false),7000);

      const payload = {
        cartItems: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        user: user
      };
      console.log(payload)

      
      let { data } = await axios.post(`http://localhost:5000/api/v1/cart/checkout/${userData.user_id}`, user);
      if (data.message === "Order confirmed.") {
       localStorage.removeItem('cartItems');
        localStorage.removeItem('cartCount');
       cartItems = [];
        // goToproduct();
      } else {
        alert('Fail to contact you on mail, please try again !!!!');
      }

    }
  };

  /////////// get Input values from form //////////////
  let getInputValue = (e) => {
    // deep copy from user object
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    console.log(myUser);
  };

  let { cartItems } = useContext(CartContext);
  const { removeFromCart } = useContext(CartContext);
  console.log(userData)
  console.log("Adding items from cart:", cartItems);

  return (
    <>
      <div className="container p-5">

        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <p>
              <span className="h2">Lotus Cart</span>
            </p>

            {cartItems?.length > 0 ? (
              cartItems?.map((item, index) => (
                <div className="row align-items-center justify-content-between">
                <div key={index} className="card mb-4">
                  <div className="card-body p-4">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <img
                          src={item.img_url}
                          className=" w-50 h-25"
                          alt={item.name}
                        />
                      </div>
                      <div className="col-md-2 d-flex justify-content-center">
                        <div>
                          <p className="small text-muted mb-4 pb-2">Name</p>
                          <p className="lead fw-normal mb-0">{item.name}</p>
                        </div>
                      </div>
                      <div className="col-md-2 d-flex justify-content-center">
                        <div>
                          <p className="small text-muted mb-4 pb-2">Quantity</p>
                          <input
                            type="number"
                            id={`quantity-${index}`}
                            name="quantity"
                            defaultValue={item.quantity}
                            readOnly
                            className="form-control border-0"
                          />
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
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="btn btn-outline-danger"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              ))
            ) : (
              <p>No items in the cart.</p>
            )}

<div className="mt-5">
<div className="card mb-5">
              <div className="card-body p-4">
                <div className="float-end">
                  <p className="mb-0 me-5 d-flex align-items-center">
                    <span className="small text-muted me-2">Order total:</span>{" "}
                    <span className="lead fw-normal">
                      ${" "}
                      {cartItems
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
</div>

{cartItems.length>0? <>
              <div className=" mb-5">
  <div className="bg-secondary border border-1 rounded-2 d-flex flex-column  justify-content-center">

<form onSubmit={submitForm} className="text-center m-auto w-75 mt-4 mb-4">

            <div className="input-data my-2">
              <input
              placeholder="Email"
                onChange={getInputValue}
                type="email"
                className="form-control my-2"
                name="email"
              />
              {errorDetails.length > 0 ? showAlert("email") : ""}
            </div>

            <div className="input-data my-2">
              <input
              placeholder="phone"
                onChange={getInputValue}
                type="phone"
                className="form-control my-2"
                name="phone"
              />
              {errorDetails.length > 0 ? showAlert("phone") : ""}
            </div>

            <div className="input-data my-2">
              <input
              placeholder="address"
                onChange={getInputValue}
                type="address"
                className="form-control my-2"
                name="address"
              />
              {errorDetails.length > 0 ? showAlert("address") : ""}
            </div>
            {showConferri && <Confetti />}
            <button className="w-100 btn btn-primary my-3 px-5">
              checkout
            </button>

                      </form>



                </div>

  </div>
            </> : ""}
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-light btn-lg me-2">
                <Link className="nav-link" to="/products">
                  Continue shopping
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
