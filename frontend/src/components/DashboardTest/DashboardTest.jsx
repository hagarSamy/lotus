import React from 'react'

export default function DashboardTest() {

  return (
    <>
    <div className="container">

    <div className="w-75 m-auto bg-info p-5">
        <h2 className="text-center">CRUD SYSTEM</h2>

        <label for="productName">Product Name : </label>
        <input type="text" id="productName" className="form-control mb-3">
        <div className="alert alert-danger my-3 p-2 d-none" id="nameAlert"> product name must start with at least 8 character </div>

        <label for="productPrice">Product Price : </label>
        <input type="number" id="productPrice" className="form-control mb-3">
        <div className="alert alert-danger my-3 p-2 d-none" id="priceAlert"> product price must be a number and less than 8 digits</div>

        <label for="productCategory">Product Category : </label>
        <input type="text" id="productCategory" className="form-control mb-3">
        <div className="alert alert-danger my-3 p-2 d-none" id="cateAlert"> product category must start with at least 8 character </div>

        <label for="productDisc">Product description : </label>
        <textarea id="productDisc" className="form-control mb-3"></textarea>

        <button className="btn btn-primary float-end" id="addBtn" disabled>add product</button>

    </div>

    <div className="w-75 m-auto py-4 ">
        <input type="text" className="form-control mb-3 " placeholder="search ..." oninput="searchProduct(this.value)"> 
    </div>

    <div className="w-75 m-auto py-4 bg-info">
        <table className="table text-center">
            <thead>
                <th>Index</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Discription</th>
                <th>Delete</th>
                <th>update</th>

            </thead>
            <tbody id="tableBody">
            </tbody>
        </table>
    </div>
    </div>
    </>
  )
}
