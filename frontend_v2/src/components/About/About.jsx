import React from "react";
import styles from "./About.module.scss";
import { Link } from "react-router-dom";


export default function About({ userData, currentColor }) {

  return (
    <>
      <div className="container" id="#aboutSec">
        <div className={`${styles.contact} py-5`} id="cont-id">
          <div className={`${styles.constTitle} text-center mb-5`}>
            <h3 className="mb-2" style={{ color: currentColor }}>About Us...</h3>
          </div>
          <div className="container">
            <div className="row mb-5">
              <div className="col-md-6">
                {/* /////////////////// */}

                <div className="bg-white shadow-lg rounded-2">
                  <div
                    id="carouselExampleInterval"
                    className="carousel slide "
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div
                        className="carousel-item active"
                        data-bs-interval="1500"
                      >
                        <img
                          src={require("./3.jpg")}
                          className="d-block w-100 rounded-2"
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item" data-bs-interval="1500">
                        <img
                          src={require("./pexels-ahmedelbetar-4898083.jpg")}
                          className="d-block w-100 rounded-2"
                          alt="..."
                        />
                      </div>
                 
                      <div className="carousel-item" data-bs-interval="1500">
                        <img
                          src={require("./6.jpg")}
                          className="d-block w-100 rounded-2"
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item" data-bs-interval="1500">
                        <img
                          src={require("./pexels-ahmedelbetar-4898084.jpg")}
                          className="d-block w-100 rounded-2"
                          alt="..."
                        />
                      </div>
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleInterval"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleInterval"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>

                {/* /////////////////// */}
              </div>

              <div className="col-md-6">
                <div className="">
                  <h3>
                    Handmade treasures are more than just objects; they are
                    expressions of creativity and dedication, reflecting the
                    artisan's journey and the values they uphold.
                  </h3>
                  <h2 className="text-center" style={{ color: currentColor }}>
                    We are the gate to your market ...
                  </h2>
                  <h3 >
                    if you an artisian and didn't know how to sell your products
                  </h3>
                  <h3>hurry up and join us.</h3>
                </div>
                {userData ? "" : (
                  <div className="d-flex justify-content-end mt-2" >
                    <Link to="/register">
                      <button className="btn btn-danger px-5 py-2"  style={{ background: currentColor }}>
                        Join Us
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="row mt-3">

              
            <div className={`col-md-6`}>
                <div className="">
                  <h2 className="text-center">
                  what we offer to you ?
                  </h2>
                  <h3>
                  We believe in empowering creators to share their passion without financial barriers.
                   That's why we charge no upfront fees for listing your products on our platform.
                    Whether you're a seasoned artisan or just starting out,
                     you can list your items and begin reaching customers without any initial investment.                  </h3>
                </div>
              </div>
              {/* ///////////////////////////// */}
              <div className= {`col-md-6  rounded-2 bg-transparent ${styles.visible}`}>
                {/* /////////////////// */}

                <div className="bg-transparent shadow rounded-2">
                <img
                          src={require("./IMG-20240615-WA0029.jpg")}
                          className=" w-100 rounded-2"
                          alt="..."
                        />
                </div>

                {/* /////////////////// */}
              </div>

            </div>
         
         
            <div className="row mb-3 mt-5">
            <div className= {`col-md-6  rounded-2 bg-transparent ${styles.visible}`}>
                {/* /////////////////// */}

                <div className="bg-transparent shadow rounded-2">
                <img
                          src={require("./IMG-20240528-WA0028.jpg")}
                          className=" w-100 rounded-2"
                          alt="..."
                        />
                </div>

                {/* /////////////////// */}
              </div>

              <div className="col-md-6">
                <div className="">
                  <h3>
                  Our items are not merely physical possessions;
                  they embody the essence of creativity and commitment,
                   mirroring the artist's path and the principles they champion.
                  </h3>
                  <h2 className="text-center" style={{ color: currentColor }}>
                    We are the gate to special items ...
                  </h2>
                  <h3>
                    if you an customer and looking for a unique items, you are in the right place.
                  </h3>
                  <h3>hurry up and join us.</h3>
                </div>
                {userData ? "" : (
                  <div className="d-flex justify-content-end mt-2">
                    <Link to="/register">
                      <button className="btn btn-danger px-5 py-2" style={{ background: currentColor }}>
                        Join Us
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ////////// service section ///////// */}

<section className="services pb-5 pt-3" id="serv-id">
    <div className={`${styles.constTitle} text-center mb-5`} >
        <h3 className="mb-2" style={{ color: currentColor }}>services...</h3>
    </div>
    <div className="container">
        <div className="row g-4 py-5">

            <div className="col-lg-4 col-md-6">
                <div className={`${styles.servitem} text-center bg-white shadow-lg rounded-2 p-4`}>
                    <div className={`${styles.servicons} rounded-circle mx-auto mt-2`}>
                        <i className="fa fa-laptop"></i>
                    </div>
                    <h6 className="fw-bolder fs-5 py-1" style={{ color: currentColor }}>Unique Items</h6>
                    <p className="text-muted"> A wide range of unique items and all of louts items is handmade with love</p>
                </div>
            </div>

            <div className="col-lg-4 col-md-6">
            <div className={`${styles.servitem} text-center bg-white shadow-lg rounded-2 p-4`}>
            <div className={`${styles.servicons} rounded-circle mx-auto mt-2`}>
            <i className="fa fa-bullhorn"></i>
                    </div>
                    <h6 className="fw-bolder fs-5 py-1" style={{ color: currentColor }}>Friendly Handicrafts</h6>
                    <p className="text-muted">creating environmentally conscious items, recycled materials and organic fabrics</p>
                </div>
            </div>

            <div className="col-lg-4 col-md-6">
            <div className={`${styles.servitem} text-center bg-white shadow-lg rounded-2 p-4`}>
                <div className={`${styles.servicons} rounded-circle mx-auto mt-2`}>
                <i className="fa fa-umbrella"></i>
                    </div>
                    <h6 className="fw-bolder fs-5 py-1" style={{ color: currentColor }}>Quality of Work</h6>
                    <p className="text-muted">Look for consistency in the quality of their products. High-quality materials, attention to detail</p>
                </div>
            </div>

            <div className="col-lg-4 col-md-6">
            <div className={`${styles.servitem} text-center bg-white shadow-lg rounded-2 p-4`}>
                <div className={`${styles.servicons} rounded-circle mx-auto mt-2`}>
                <i className="fa fa-diamond"></i>
                    </div>
                    <h6 className="fw-bolder fs-5 py-1" style={{ color: currentColor }}>Professionalism</h6>
                    <p className="text-muted">Trusted artisans communicate professionally. They also offer warranties or guarantees for their products</p>
                </div>
            </div>

            <div className="col-lg-4 col-md-6">
            <div className={`${styles.servitem} text-center bg-white shadow-lg rounded-2 p-4`}>
                <div className={`${styles.servicons} rounded-circle mx-auto mt-2`}>
                <i className="fa fa-television"></i>
                    </div>
                    <h6 className="fw-bolder fs-5 py-1" style={{ color: currentColor }}>Offers</h6>
                    <p className="text-muted">limited-time offers and flash sales. These exclusive promotions give you opportunity to save more on your favorite items.  </p>
                </div>
            </div>

            <div className="col-lg-4 col-md-6">
            <div className={`${styles.servitem} text-center bg-white shadow-lg rounded-2 p-4`}>
                <div className={`${styles.servicons} rounded-circle mx-auto mt-2`}>
                <i className="fa fa-camera"></i>
                    </div>
                    <h6 className="fw-bolder fs-5 py-1" style={{ color: currentColor }}>Shopping Assistance</h6>
                    <p className="text-muted">looking for a specific item or need help. Let us help you find the perfect piece that fits your style and budget.</p>
                </div>
            </div>

        </div>
    </div>
</section>




    </>
  );
}
