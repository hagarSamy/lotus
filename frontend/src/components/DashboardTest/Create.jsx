import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react";
import axios from "axios";


export default function Create() {
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
      });

    const navigate = useNavigate();
      
        const handleSubmit = async (e) => {
            e.preventDefault();
          try {
            await axios.post("http://localhost:5000/api/v1/users", newUser);
            navigate('/manageuser')
          } catch (error) {
            console.error("Error adding new user:", error);
          }
        };
  return (
   <div className="container p-5">
     <div className='w-50 border bg-white shadow px-5 mt-4 mb-4 rounded'>
        <h2>Create new User</h2>
    </div>
    <form onSubmit={handleSubmit}>
        <div className="mb-2">
            <label htmlFor='name'>Name:</label>
            <input type='text' name='name' className='form-control' placeholder='user name' 
            onChange={e=>setNewUser({...newUser, username:e.target.value})}/>
        </div>
        <div className="mb-2">
            <label htmlFor='email'>Email:</label>
            <input type='email' name='email' className='form-control' placeholder='user email' 
            onChange={e=>setNewUser({...newUser, email:e.target.value})}/>

        </div>
        <button className='btn btn-outline-success me-2'>Add User</button>
        <Link to="/manageuser" className='btn btn-outline-primary'>Back</Link>
    </form>

   </div>

  )
}
