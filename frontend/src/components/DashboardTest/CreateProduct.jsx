import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react";
import axios from "axios";
// import {Image} from 'cloudinary-react'; 

export default function CreateProduct() {
  const [imgSelected, setImgSelected] = useState();

const uploadImage = async ()=>{
  const formData = new FormData()
    formData.append("file", imgSelected)
    formData.append("upload_preset", "eabn3dkm")

    try {
      const {data} = await axios.post("https://api.cloudinary.com/v1_1/dps8pco1z/image/upload", formData);
      console.log(data);
      if (data) {
        return data.secure_url;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
};

  const [newProduct, setnewProduct] = useState({
    id: "",
    img_url: "",
    name: "",
    description: "",
    owner: "",
    price: 0,
    stock: 0,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadImage();
      console.log(imageUrl)
      newProduct.img_url = imageUrl;
      console.log(newProduct);
      await axios.post("http://localhost:5000/api/v1/products", newProduct);
      navigate("/manageproduct");
    } catch (error) {
      console.error("Error adding new product:", error);
    }
  };
  return (
    <div className="container p-5">
      <div className="w-50 border bg-white shadow px-5 mt-4 mb-4 rounded">
        <h2>Create new product</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="image">Image URL:</label>
          <input
            type="file"
            name="image"
            className="form-control"
            placeholder="Image URL"
            onChange={(e) =>{
              setImgSelected(e.target.files[0]);
            }
            }
          />
        </div>
        <div className="mb-2">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Product Name"
            onChange={(e) =>
                setnewProduct({ ...newProduct, name: e.target.value })
            }
          />
        </div>
        <div className="mb-2">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            className="form-control"
            placeholder="Product Description"
            onChange={(e) =>
                setnewProduct({ ...newProduct, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="mb-2">
          <label htmlFor="owner">Owner:</label>
          <input
            type="text"
            name="owner"
            className="form-control"
            placeholder="Owner Name"
            onChange={(e) =>
                setnewProduct({ ...newProduct, owner: e.target.value })
            }
          />
        </div>
        <div className="mb-2">
          <label htmlFor="price">Total Price:</label>
          <input
            type="number"
            name="price"
            className="form-control"
            placeholder="Total Price"
            onChange={(e) =>
                setnewProduct({ ...newProduct, price: parseFloat(e.target.value) })
            }
          />
        </div>
        <div className="mb-2">
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            name="stock"
            className="form-control"
            placeholder="Stock Quantity"
            onChange={(e) =>
                setnewProduct({
                ...newProduct,
                stock: parseInt(e.target.value),
              })
            }
          />
        </div>
        <button className="btn btn-outline-success me-2" type="submit">
          Add Product
        </button>
        <Link to="/manageproduct" className="btn btn-outline-primary">
          Back
        </Link>
      </form>
    </div>
  );
}
