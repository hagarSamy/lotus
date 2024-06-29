import React from "react";
import { Link } from "react-router-dom";

export default function DashboardTest() {
 
  return (
    <div className="container p-5">

<div className="text-center mt-5 ">
                    <h1>Welcome, to admin dashboard</h1>
                    <h1>Have a nice time</h1>
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
