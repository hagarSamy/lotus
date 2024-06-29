import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from "axios";

export default function Update() {
    const navigate = useNavigate();
    const [updateUser, setUpdateUser] = useState({
        username: "",
        email: "",
      });
    // const [userData, setUserData] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        getUser();
      }, []);
        

      const handleUpdate = async (e) => {
        e.preventDefault();
      try {
        await axios.put(`http://localhost:5000/api/v1/users/${id}`, updateUser);
        navigate('/manageuser')
      } catch (error) {
        console.error("Error update user:", error);
      }
    };


      const getUser = async () => {
        try {
          const {data} = await axios.get(`http://localhost:5000/api/v1/users/${id}`);
          console.log(data);
          setUpdateUser(data);
        } catch (error) {
          console.error("Error getting user from DB:", error);
        }
      };
  return (
    <div className="container p-5">
    <div className='w-50 border bg-white shadow px-5 mt-4 mb-4 rounded w-100'>
       <h2 >update User Data</h2>
   </div>
   <form onSubmit={handleUpdate}>
       <div className="mb-2">
           <label htmlFor='name'>Name:</label>
           <input type='text' name='name' className='form-control' placeholder='user name'
           value={updateUser.username}
           onChange={e=>setUpdateUser({...updateUser, username:e.target.value})}
           />
       </div>
       <div className="mb-2">
           <label htmlFor='email'>Email:</label>
           <input type='email' name='email' className='form-control' placeholder='user email'
            value={updateUser.email}
            onChange={e=>setUpdateUser({...updateUser, email:e.target.value})}
           />

       </div>
       <button className='btn btn-outline-success me-2'>update User</button>
       <Link to="/manageuser" className='btn btn-outline-primary'>Back</Link>
   </form>

  </div>  )
}
