import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DashboardTest() {
 
  return (
    <div className="container p-5">
    {/* <nav className="navbar navbar-expand-md bg-light py-3 flex-row-reverse">
<div className="container">
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">

    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className={` nav-item`}>
        <Link className={` nav-link px-3`}  to="/manageuser">Users</Link>
      </li>

      <li className={` nav-item px-3`}>
        <Link className={` nav-link`} to="/manageproduct">Products</Link>
      </li>
    </ul>

  </div>
</div>
</nav> */}

<div className="text-center mt-5 ">
                    <h1>Welcome to admin dashboard</h1>
                    <h1>Have a nice time!</h1>
                    <div className="d-flex justify-content-center">                    
                      <hr className="w-50" />
                    </div>
                  </div>
<div className="d-flex justify-content-around m-5">
<Link className={` nav-link px-3`}  to="/manageuser"><i className="fas fa-user text-danger">Users</i></Link>
<Link className={` nav-link`} to="/manageproduct"><i className="fas fa-tag text-danger">Products</i></Link>

</div>
    </div>
  );
}
