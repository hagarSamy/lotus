import React from 'react'
import styles from "./Notfound.module.scss";
import { Link } from "react-router-dom";


export default function Notfound() {
  return (
    <>
    <div className={`container-fluid ${styles.backSec}`}>
      <div className="row justify-content-center align-items-center">
      <h1 className="error-message">Oops Page Not Found</h1>
        <p>We couldn't find the page you were looking for.</p>
        <p>Are you lost your way !!!</p>
        <Link to="/" className="text-primary">Back to Home</Link>
        {/* <a href="/contact" className="nav-link">Need Help?</a> */}
      </div>
    </div>
    </>
  )
}
