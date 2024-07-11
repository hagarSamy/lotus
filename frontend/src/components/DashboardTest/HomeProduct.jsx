import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function HomeProduct() {
    useEffect(() => {
        getAllproducts();
      }, []);

      // /// product
      //  get all products
      const [products, setproducts] = useState([]);
    
      const getAllproducts = async () => {
      //   try {
          const { data } = await axios.get("http://localhost:5000/api/v1/products");
          setproducts(data);
          console.log(data);
      //   } catch (error) {
      //     console.error("Error getting products from DB:", error);
      //   }
      };
      //  delete Product
      const handleDeleteProduct = async (id) => {
        const confirm = window.confirm(
          "Are you realy need to delete this record ? "
        );
        if (confirm) {
          await axios.delete(`http://localhost:5000/api/v1/products/${id}`);
          window.location.reload();
        }
      };
    
      return (
        <div className="container p-5">
          <div className={`container p-5 bg-white shadow-lg rounded-2 `}>
            <div>

                {/* /////////////////// product section //////////////////// */}
                  <div className="container">
                    <div className="p-5 d-flex flex-column justify-content-center align-items-center bg-light">
                      <h1>List of products</h1>
                      <div className="w-100 rounded bg-white border shadow p-4">
                        <div className="d-flex justify-content-between mb-5">
                        <Link to="/dashboardtest" className="btn btn-outline-success">
                           Back
                          </Link>
                          <Link to="/createproduct" className="btn btn-outline-success">
                            Add Product +
                          </Link>
                        
                        </div>
                        <table className="bg-light text-center table table-striped">
                          <thead>
                            <tr>
                              <th className="px-2">ID</th>
                              <th className="px-2">Image</th>
                              <th className="px-2">Name</th>
                              <th className="px-2">Description</th>
                              <th className="px-2">Owner</th>
                              <th className="px-2">Price</th>
                              <th className="px-2">stock</th>
                              <th className="px-2">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {products?.map((product) => (
                              <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>
                                  <img className="w-100" src={product.img_url} alt="" />
                                </td>
                                <td>{product?.name}</td>
                                <td>{product?.description}</td>
                                <td>{product?.owner}</td>
                                <td>{product?.price}</td>
                                <td>{product?.stock}</td>
    
                                <td>
<div className="d-flex justify-content-between align-items-center">
<button
                                    onClick={(e) => handleDeleteProduct(product?.id)}
                                    className="btn btn-danger"
                                  >
                                    <i className="far fa-trash-alt"></i>
                                  </button>
                                  <Link
                                    to={`/updateproduct/${product?.id}`}
                                    className="btn btn-warning mx-2"
                                  >
                                    <i className="far fa-edit"></i>
                                  </Link>
</div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      );
    
}
