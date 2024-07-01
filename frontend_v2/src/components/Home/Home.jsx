import React from "react";
import styles from "./Home.module.scss";
import Contact from "../Contact/Contact";
import About from "../About/About";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import Typed from "typed.js";

export default function Home({ userData }) {
  /////////////////////////////

  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "with care, treasures with love.",
        " with care, treasures with love.",
      ],
      smartBackspace: true,
      loop: true,
      loopCount: Infinity,
      typeSpeed: 40,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <>
      <div className={`${styles.startSection}`}></div>
      <div className={`${styles.colorBox}`}>
        <div className={`${styles.colorOption}`}>
          <ul className="list-unstyled">
            <li className={`${styles.item} ${styles.item1}`}></li>
            <li className={`${styles.item} ${styles.item2}`}></li>
            <li className={`${styles.item} ${styles.item3}`}></li>
          </ul>
        </div>
        <i className="fa fa-cog fa-spin"></i>
      </div>
      {/* ///////////////Header section /////////////// */}
      <div className={`${styles.homeSec}`}>
        <div>
          <h1 className={`${styles.headFont} my-5`}>Lotus</h1>
          <h2>
            Crafted <span ref={el} />
          </h2>
          {userData ? "" : (
            <div>
              <button className={`btn ${styles.btn1} m-2 px-4 mt-5`}>
                <Link className="text-decoration-none" to="login">
                  Log in
                </Link>
              </button>
              <button className={`btn ${styles.btn2} m-2 px-3 mt-5`}>
                <Link className="text-decoration-none" to="register">
                  Register for free
                </Link>
              </button>
            </div>
          ) }
        </div>
      </div>

      <About userData={userData} />

      <div className={`${styles.statistic}`}>
        <div className={`${styles.constTitle} text-center mb-5`}>
          <h3 className="mb-2 pt-5">Our statistics...</h3>
        </div>
        <div className="count py-5">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-3 col-md-6">
                <div className={`${styles.countItem} text-center py-3`}>
                  <i className="fa fa-users"></i>
                  <h3 className="py-2">120</h3>
                  <p className="text-muted fw-bolder">Happy Customers</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className={`${styles.countItem} text-center py-3`}>
                  <i className="fa fa-thumbs-up"></i>
                  <h3 className="py-2">850</h3>
                  <p className="text-muted fw-bolder">Complete Orders</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className={`${styles.countItem} text-center py-3`}>
                  <i className="fa fa-bullhorn"></i>
                  <h3 className="py-2">9450</h3>
                  <p className="text-muted fw-bolder">Advertising</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className={`${styles.countItem} text-center py-3`}>
                  <i className="fa fa-cloud-download"></i>
                  <h3 className="py-2">780</h3>
                  <p className="text-muted fw-bolder">photos Downloaded</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

{/* //// developer /// */}
<div className={`${styles.developer}`}>
        <div className={`${styles.constTitle} text-center mb-2`}>
          <h3 className="mb-2 pt-5">Our Developer..</h3>
        </div>

<div className="count py-5">
  <div className="container m-auto">
    <div className={` flex-wrap d-flex justify-content-center align-items-center`}>
{/* ////dev1 */}
    <div className={`${styles.flipcard} `}>
      <div className={`${styles.flipcardfront}`}>
        <div className={`${styles.inner}`}>
          <h3>Hajar</h3>
        </div>
      </div>
      <div className={`${styles.flipcardback}`}>
        <div className={`${styles.inner}`}>
          {/* <h3>Hajar samy</h3> */}
          <p>
            Backend developer
            <br />
            ALX student @ holberton school
            <br />
            <i class="fab fa-github text-white m-2"></i>
            <i class="fab fa-twitter text-white m-2"></i>
          </p>
        </div>
      </div>
    </div>
{/* //// dev2 */}
    <div className={`${styles.flipcard}`}>
      <div className={`${styles.flipcardfront}`}>
        <div className={`${styles.inner}`}>
          <h3>Aya</h3>
        </div>
      </div>
      <div className={`${styles.flipcardback}`}>
        <div className={`${styles.inner}`}>
          {/* <h3>Aya Anwar</h3> */}
          <p>
            Backend developer
            <br />
            ALX student @ holberton school
            <br />
            <i class="fab fa-github text-white m-2"></i>
            <i class="fab fa-twitter text-white m-2"></i>
          </p>
        </div>
      </div>
    </div>

{/* //// dev3  */}
    <div className={`${styles.flipcard} `}>
      <div className={`${styles.flipcardfront}`}>
        <div className={`${styles.inner}`}>
          <h3>Sabah</h3>
        </div>
      </div>
      <div className={`${styles.flipcardback}`}>
        <div className={`${styles.inner}`}>
          {/* <h3>Sabah Ahmed</h3> */}
          <p>
            Frontend developer
            <br />
            ALX student @ holberton school
            <br />
            <i class="fab fa-github text-white m-2"></i>
            <i class="fab fa-twitter text-white m-2"></i>

          </p>
        </div>
      </div>
    </div>

    </div>
  </div>
</div>


  </div>

      <Contact />
      <Footer />
    </>
  );
}
