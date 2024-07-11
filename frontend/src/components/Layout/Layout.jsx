import React from 'react'
import Navbar from '../Navbar/Navbar'
import {Outlet} from 'react-router-dom'
import CartContextProvider from '../Context/Context'

export default function Layout({userData, logoutUser}) {

  return (
    <>
    <CartContextProvider>
        <Navbar userData={userData} logoutUser={logoutUser}/>
        <Outlet />
    </CartContextProvider>
    </>
  )
}
