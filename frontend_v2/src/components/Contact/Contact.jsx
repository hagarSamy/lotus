import React from 'react'
import styles from './Contact.module.scss'

export default function Contact({ currentColor }) {
  return (
    <>
<div className="container">
<div className={`${styles.contact} py-5`} id="cont-id">
    <div className={`${styles.constTitle} text-center mb-5`}>
        <h3 className="mb-2" style={{ color: currentColor }}>Contact Us.</h3>
    </div>
    <div className="container">
        <div className="row g-4 mx-5">
            <div className="col-lg-4">
                <div className={`${styles.countItem} text-center py-3`}>
                    <div className={`${styles.contIcons} rounded-circle mx-auto mt-2`}>
                        <i className="fa fa-location-arrow"></i>
                    </div>                   
                     <h3 className="py-2" style={{ color: currentColor }}>Address</h3>
                    <p className="text-muted fw-bolder">340 Dokki - cairo</p>
                </div>
            </div>

            <div className="col-lg-4">
                <div className={`${styles.countItem} text-center py-3`}>
                    <div className={`${styles.contIcons} rounded-circle mx-auto mt-2`}>
                        <i className="fa fa-envelope"></i>
                    </div>
                   <h3 className="py-2" style={{ color: currentColor }}>Email</h3>
                    <p className="text-muted fw-bolder">Support@website.com</p>
                </div>
            </div>

            <div className="col-lg-4">
                <div className={`${styles.countItem} text-center py-3`}>
                    <div className={`${styles.contIcons} rounded-circle mx-auto mt-2`}>
                        <i className="fa fa-phone"></i>
                    </div>                    
                    <h3 className="py-2" style={{ color: currentColor }}>Phone</h3>
                    <p className="text-muted fw-bolder">+20 010 2517 8918</p>
                </div>
            </div>

            </div>
        </div>
    </div>
</div>
    </>
  )
}
