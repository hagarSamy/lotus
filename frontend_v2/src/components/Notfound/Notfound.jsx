import React from 'react'

export default function Notfound() {
  return (
    <>
    <div className="container">
        <h1 className="error-message">Oops Page Not Found</h1>
        <p>We couldn't find the page you were looking for. Please try searching again.</p>
        <a href="/" className="nav-link">Return Home</a>
        <a href="/contact" className="nav-link">Need Help?</a>
    </div>
    </>
  )
}
