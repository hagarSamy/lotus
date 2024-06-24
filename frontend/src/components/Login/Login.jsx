import React, { useState } from "react";
import axios from "axios";
import styles from './Login.module.scss'
import Joi from "joi";
import { Link, useNavigate } from "react-router-dom";
export default function Login({saveUserData}) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  /////////////  validation //////////////////
  const [errorDetails, setErrors] = useState([]);

  function validateUserData() {
    let rules = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com"] },
      }),
      password: Joi.string()
        // .pattern(/^[A-Z]/)
        .required(),
    });
    let validationResult = rules.validate(user, { abortEarly: false });
    console.log(validationResult);
    if (validationResult.error !== undefined) {
      setErrors(validationResult.error.details);
      return false;
    } else {
      return true;
    }
  }
  // function showAlert(inputName) {
  //   let x = errorDetails.filter((e) => {
  //     return e.message.includes(inputName);
  //   });
  //   if (x.length > 0 && x[0].message.includes("pattern")) {
  //     return <p className="py-2">wrong email or password</p>;
  //   }
  //   return <p className="py-2">{x[0]?.message}</p>;
  // }
  // /////////////////// navigation ///////////////////////
  let navigate = useNavigate();
  let goToHome = () => {
    navigate("/");
  };
  //////////////////// what happen when press Login ///////////////////////
  const [errorMsg, setErrorMsg] = useState("");

  let submitForm = async (e) => {
    e.preventDefault(); // prevent default reload of the form
    if (validateUserData()) {
        let { data } = await axios.post(
        "http://localhost:5000/api/v1/login",
        user
      );
      console.log(data)
      if (data.message === "Login successful") {
        localStorage.setItem('token', data.token);
        saveUserData();
        goToHome();
      } else {
        setErrorMsg(data.message); // set by error message from backend
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
  return (
    <>
      <div className="container">
        <div className="m-auto my-5 w-75 ">
          <div className=" d-flex justify-content-center align-items-center">
            <h2 className="text-center border-bottom w-25 my-5">Login Form</h2>
          </div>
          {errorMsg ? <div className="alert alert-danger p-2"></div> : ""}

          <form onSubmit={submitForm}>
            <div className="input-data my-2">
              <label htmlFor="email">E-mail</label>
              <input
                onChange={getInputValue}
                type="email"
                className="form-control my-2"
                name="email"
              />
              {/* {errorDetails.length > 0 ? showAlert("email") : ""} */}
            </div>

            <div className="input-data my-2">
              <label htmlFor="password">Password</label>
              <input
                onChange={getInputValue}
                type="password"
                className="form-control my-2"
                name="password"
              />
              {/* {errorDetails.length > 0 ? showAlert("password") : ""} */}
            </div>
            {errorDetails.length > 0 ?  <p style={{color:'red'}} className="py-2 text-center">wrong email or password</p> : ""}
            <button className="btn btn-outline-danger my-3 px-5 w-100">
              Login
            </button>
            
            <div className=" my-5 text-center">
              <Link  className={`${styles.nLink} text-decoration-none`} to="/" >home</Link>
              <br />
              <Link  className={`${styles.nLink} text-decoration-none`} to="/register" >create account</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
