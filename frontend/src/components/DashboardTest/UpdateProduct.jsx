import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from "axios";

export default function UpdateProduct() {
const [imgSelected, setImgSelected] = useState();

const uploadImage = async ()=>{
  const formData = new FormData()
    formData.append("file", imgSelected)
    formData.append("upload_preset", "eabn3dkm")

    try {
      const {data} = await axios.post("https://api.cloudinary.com/v1_1/dps8pco1z/image/upload", formData);
      console.log(data);
      if (data) {
        // setupdateProduct({...updateProduct, img_url: response.data.secure_url});
        return data.secure_url;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
};

    const navigate = useNavigate();
    const [updateProduct, setupdateProduct] = useState({
        id: "",
        img_url: "",
        name: "",
        description: "",
        owner: "",
        price: 0,
        stock: 0,
      });
    // const [userData, setUserData] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        getProduct();
      }, []);
        

      const handleUpdate = async (e) => {
        e.preventDefault();
      try {
        const imageUrl = await uploadImage();
        console.log(imageUrl)
        updateProduct.img_url = imageUrl;

        await axios.put(`http://localhost:5000/api/v1/products/${id}`, updateProduct);
        navigate('/manageproduct')
      } catch (error) {
        console.error("Error update user:", error);
      }
    };


      const getProduct = async () => {
        try {
          const {data} = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
          console.log(data);
          setupdateProduct(data);
        } catch (error) {
          console.error("Error getting product from DB:", error);
        }
      };
  return (
    <div className="container p-5">
    <div className='w-50 border bg-white shadow px-5 mt-4 mb-4 rounded w-100'>
       <h2 >update product Data</h2>
   </div>
   <form onSubmit={handleUpdate}>
       <div className="mb-2">
          <label htmlFor="image">Image URL:</label>
          <input
            type="file"
            name="img_url"
            className="form-control"
            placeholder="Image URL"
            // value={updateProduct.img_url}
           onChange={e=> setImgSelected(e.target.files[0])}
           />
       </div>

       <div className="mb-2">
           <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Product Name"
            value={updateProduct.name}
            onChange={e=>setupdateProduct({...updateProduct, name:e.target.value})}
           />

       </div>

       <div className="mb-2">
          <label htmlFor="description">description:</label>
          <input
            type="text"
            name="description"
            className="form-control"
            placeholder="description"
           value={updateProduct.description}
           onChange={e=>setupdateProduct({...updateProduct, description:e.target.value})}
           />
       </div>

       <div className="mb-2">
          <label htmlFor="owner">Owner:</label>
          <input
            type="text"
            name="img_url"
            className="form-control"
            placeholder="owner"
           value={updateProduct.owner}
           onChange={e=>setupdateProduct({...updateProduct, owner:e.target.value})}
           />
       </div>

       <div className="mb-2">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            name="price"
            className="form-control"
            placeholder="price"
           value={updateProduct.price}
           onChange={e=>setupdateProduct({...updateProduct, price:e.target.value})}
           />
       </div>

       <div className="mb-2">
          <label htmlFor="stock">Stock:</label>
          <input
            type="text"
            name="stock"
            className="form-control"
            placeholder="stock"
           value={updateProduct.stock}
           onChange={e=>setupdateProduct({...updateProduct, stock:e.target.value})}
           />
       </div>

       <button className='btn btn-outline-success me-2'>update Product</button>
       <Link to="/manageproduct" className='btn btn-outline-primary'>Back</Link>
   </form>

  </div>  )

}
