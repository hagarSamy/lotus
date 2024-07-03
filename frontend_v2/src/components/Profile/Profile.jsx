import React from 'react'

export default function Profile({userData}) {
  return (
    <>
    <div className="container p-5">
        <h1>Name: {userData?.username}</h1>
        <br />
        <p className='bg-danger'> future feature isa, user can update profile...</p>
    </div>
    </>
  )
}
