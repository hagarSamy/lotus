import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Productdetails() {
  let params=useParams();
  
  const [productItem, setProductItem] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  // to get all products from API
  let getProduct = async () => {
    let { data } = await axios.get(`http://localhost:5000/api/v1/product/${params.id}`);
if(data){
  setProductItem(data); //put data in holder function
}else {
  console.log("error loading data", data);
}
  };
  console.log(productItem);
  
  return (
    <>
    <div className="container p-5">
      <div className='row g-4 m-5'>
        <div className="col-md-4 shadow rounded-2">
          <img src={productItem?.img_url} className='w-100' alt='' />
        </div>
        <div className="col-md-8 px-5">
          <h2 className='text-success'> {productItem?.name}</h2>
          <p>
           {productItem?.description}
          </p>
          <p>
          <span className='text-success'> Owner :</span>  {productItem?.owner}
          </p>
          <p>
            <span className='text-success'> price :</span> {productItem?.price}
          </p>
          <p>
          <span className='text-success'> stock :</span>  {productItem?.stock}
          </p>
          <div className='d-flex justify-content-end'>
          <Link
                        className="text-danger"
                        to={`/products`}
                      >
                        Back
                      </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  ) 
}
