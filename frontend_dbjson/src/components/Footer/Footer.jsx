import React from 'react'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <>
    <div className={`${styles.footerItem} d-flex justify-content-center align-content-center navbar-light`}>
      <p className='py-3'>
      Copy Right 2024 © By <strong >Lotus</strong> All Rights Reserved
      </p>
    </div>
    </>
  )
}
