import React, { useContext } from "react";
import "../About/About";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/Context";

export default function Navbar({ userData, logoutUser }) {
  let x = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-md bg-light fixed-top py-3">
      <div className="container">
        <Link className={`navbar-brand  ${styles.logo}`} to="">
          Lotus
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* ///////////////////////////////// */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className={`${styles.item} nav-item`}>
              <Link
                className={`${styles.nLink} nav-link px-3`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>

            <li className={`${styles.item} nav-item px-3`}>
              <Link className={`${styles.nLink} nav-link`} to="products">
                Products
              </Link>
            </li>
          </ul>

          {/* /////////////////////////////////////// */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* /////////// */}
            {userData ? (
              <>
                <div className={`${styles.item} px-1`}>
                  <Link to="profile">Hello, {userData.username}</Link>
                </div>
                <li className={`${styles.item} nav-item px-1`}>
                  <Link
                    className={`${styles.dLink} nav-link position-relative border-0 mx-3`}
                    to="cart"
                  >
                    Cart
                    <i className="text-danger fa fa-shopping-cart fa-1x"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-5 text-muted bg-success">
                      {x.cartCount}
                    </span>
                  </Link>
                </li>
                <li className={`${styles.item} nav-item px-1`}>
                  <Link
                    className={`${styles.dLink} nav-link `}
                    onClick={logoutUser}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className={`${styles.item} nav-item px-1`}>
                  <Link className={`${styles.dLink} nav-link`} to="login">
                    Login
                  </Link>
                </li>
                <li className={`${styles.item} nav-item px-1`}>
                  <Link className={`${styles.dLink} nav-link`} to="register">
                    Register
                  </Link>
                </li>
              </>
            )}

            {userData?.is_admin ? (
              <>
                <li className={`${styles.item} nav-item px-1`}>
                  <Link
                    className={`${styles.dLink} nav-link`}
                    to="dashboardtest"
                  >
                    DashBoard
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
