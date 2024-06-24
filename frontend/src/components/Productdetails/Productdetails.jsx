import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from "axios";


export default function Productdetails() {
  let params=useParams();
  
  const [productItem, setProductItem] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  // to get all products from API
  let getProduct = async () => {
    // let { data } = await axios.get(`https://fakestoreapi.com/products/${params.id}`);
    let { data } = await axios.get(`http://localhost:5000/api/v1/product/${params.id}`);

    setProductItem(data); //put data in holder function
    // console.log(data);
  };
  console.log(productItem);
  
  return (
    <>
    <div className="container p-5">
      <div className='row g-4 m-5'>
        <div className="col-md-4 shadow rounded-2">
          <img src={productItem.img_url} className='w-100' alt='' />
        </div>
        <div className="col-md-8 px-5">
          <p>
             Lorem, ipsum dolor sit amet consectetur adipisicing elit.
             Quisquam ea autem voluptas praesentium, voluptate optio quasi 
             blanditiis sapiente incidunt atque. 
             Ab doloremque nesciunt quae et consectetur ex modi culpa maiores?

             {productItem.description}
          </p>
        </div>
      </div>
    </div>

    </>
  )
}
