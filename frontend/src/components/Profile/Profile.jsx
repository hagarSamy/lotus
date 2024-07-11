import React from 'react'

export default function Profile({userData}) {
  return (
    <>
    <div className="container p-5">
        <h1>Name: {userData?.username}</h1>
        <br />
        <p className='bg-danger'> A future feature ISA, users can update their profiles...</p>
    </div>
    </>
  )
}
