import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import Layout from '../Layout/Layout';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Cart from '../Cart/Cart';
import Dashboard from '../Dashboard/Dashboard';
import Profile from '../Profile/Profile';
import Products from '../Products/Products';
import Productdetails from '../Productdetails/Productdetails';
import Notfound from '../Notfound/Notfound';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {Online, Offline} from 'react-detect-offline';


function App() {
const [userData, setUserData] = useState(null);

// decode token to get user Data
  let saveUserData= ()=>{
    let encodedToken = localStorage.getItem('token');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  };

// prevent refresh behaviour set null to userData but the user has data in localstorage
useEffect(()=>{
  if(localStorage.getItem('token'))
  {
    saveUserData();
  }
}, []);

// in logout remove data from localstorage, got to home page
let logoutUser = ()=>{
  localStorage.removeItem('token');
  setUserData(null);
  return <Navigate to='/' />

};
//  routes
  let routes = createBrowserRouter([
    {path:'/', element:<Layout userData={userData} logoutUser={logoutUser}/>, errorElement:<Notfound />, children:[
      {index:true, element:<Home />},
      {path:'login', element:<Login saveUserData={saveUserData}/>},
      {path:'register', element:<Register />},
      {path:'products', element:<Products />},
      {path:'productdetails/:id', element:<Productdetails />},
      {path:'cart', element:<Cart />},
      {path:'profile', element:<ProtectedRoute userData={userData}><Profile userData={userData}/></ProtectedRoute>},
      {path:'dashboard', element:<ProtectedRoute userData={userData}><Dashboard userData={userData}/></ProtectedRoute>}
    ]}
  ])
  return (
    <>
    <div>
      <Online>
        <RouterProvider router={routes} />
      </Online>
      <Offline>you are offline</Offline>
    </div>
    </>
  );
}

export default App;
