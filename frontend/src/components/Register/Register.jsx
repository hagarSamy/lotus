import React, { useState } from "react";
import axios from "axios";
import styles from "./Register.module.scss";
import Joi from "joi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Register() {
  const notify = (msg) => toast.success(`🦄 ${msg}`, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  /////////////  validation //////////////////
  const [errorDetails, setErrors] = useState([]);

  function validateUserData() {
    let rules = Joi.object({
      username: Joi.string().alphanum().min(4).max(15).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com"] },
      }),
      password: Joi.string()
        .pattern(/^[A-Z]/)
        .required(),
      confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref("password"))
        .messages({ "any.only": "password not match confirm password" }),
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
  function showAlert(inputName) {
    let x = errorDetails.filter((e) => {
      return e.message.includes(inputName);
    });
    if (x?.length > 0 && x[0].message.includes("pattern")) {
      return (
        <p style={{ color: "red" }}>
          password should start with capital letter
        </p>
      );
    }
    return <p style={{ color: "red" }}>{x[0]?.message}</p>;
  }
  // /////////////////// navigation ///////////////////////
  let navigate = useNavigate();
  let goToLogin = () => {
    navigate("/login");
  };
  //////////////////// what happen when press register ///////////////////////
  const [errorMsg, setErrorMsg] = useState("");

  let submitForm = async (e) => {
    e.preventDefault(); // prevent default reload of the form
    if (validateUserData()) {
        let response = await axios.post(
          "http://localhost:5000/api/v1/register",
          user
        );
    console.log(response);
      if (
        response?.data?.message ===
        "Registered successfully."
      ) {
        notify("Registered successfully. Please check your email to confirm your registration.");
        goToLogin();
      } else {
        setErrorMsg(response.data); // set by error message from backend
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
        <div className="m-auto my-5 w-75">
          <div className=" d-flex justify-content-center align-items-center">
            <h2 className="text-center border-bottom w-25 my-5">
              Registration Form
            </h2>
          </div>
          {errorMsg ? <div className="alert alert-danger p-2">{{ errorMsg }}</div> : ""}

          <form onSubmit={submitForm}>
            <div className="input-data my-2">
              <input
              placeholder="Name"
                onChange={getInputValue}
                type="text"
                className="form-control my-2"
                name="username"
              />
              {errorDetails?.length > 0 ? showAlert("username") : ""}
            </div>

            <div className="input-data my-2">
              <input
              placeholder="E-mail"
                onChange={getInputValue}
                type="email"
                className="form-control my-2"
                name="email"
              />
              {errorDetails?.length > 0 ? showAlert("email") : ""}
            </div>

            <div className="input-data my-2">
              <input
              placeholder="Password"
                onChange={getInputValue}
                type="password"
                className="form-control my-2"
                name="password"
              />
              {errorDetails?.length > 0 ? showAlert("password") : ""}
            </div>

            <div className="input-data my-2">
              <input
              placeholder="confirm Password"
                onChange={getInputValue}
                type="password"
                className="form-control my-2"
                name="confirmPassword"
              />
              {errorDetails?.length > 0 ? showAlert("confirmPassword") : ""}
            </div>

            <button className="w-100 btn btn-outline-danger my-3 px-5">
              Register
            </button>
            <div className=" my-5 text-center">
              <Link className={`${styles.nLink}`} to="/">
                back to home
              </Link>
              <br />
              <Link
                className={`${styles.nLink}`}
                to="/login"
              >
                {" "}
                already have account, Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
