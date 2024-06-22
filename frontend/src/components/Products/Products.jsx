import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Products.module.scss";
import { Link } from "react-router-dom";

export default function Products() {
  // prepare variable to hold the data
  // to display this data in home component
  const [productItems, setProductItems] = useState([]);

  // to display image when press on it
  const [imageItem, setImageItems] = useState("");

  // call getAllProducts when home page load
  useEffect(() => {
    getAllProducts();
  }, []);

  // to get all products from API
  let getAllProducts = async () => {
    let { data } = await axios.get("https://fakestoreapi.com/products");
    setProductItems(data); //put data in holder function
    // console.log(data);
  };
  console.log(productItems);

  //function to get all images
  function getImage(e) {
    console.log(e);

    setImageItems(e.target.src);
  }
  console.log(imageItem);

  return (
    <>
      <div className="container p-5">
        <div className={`text-center ${styles.title}`}>
          <h1>Welcome, to your home ...</h1>
        </div>
        <div className="row g-4 py-5">
          {productItems.map((item, index) => (
            <div key={index} className=" col-lg-4 col-md-6">
              <div className="servItem  bg-white shadow-lg rounded-2 p-4 ">
                <img
                  className="w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={(ele) => getImage(ele)}
                  style={{ width: "200px", height: "300px" }}
                  src={item.image}
                  alt=""
                />
                <hr />
                <div className="">
                  <p maxlength="10" className="text-center text-muted">
                    {item.title} ...
                  </p>
                  <h5>owner: {item.owner}</h5>
                  <h5>price: {item.price}</h5>
                  <div className="d-flex justify-content-between ">
                    <Link
                      className="text-danger"
                      to={`/productdetails/${item.id}`}
                    >
                      Show More...
                    </Link>
                    <Link to='/cart'>
                      <i className="text-danger fa fa-shopping-cart"></i>{" "}
                    </Link>
                  </div>
                </div>

                {/* ////////////////////////////////// */}

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1>lotus Item</h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <img className="w-75" src={imageItem} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* ////////////////////////////////// */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
