import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    setIsEditing(false);
  }, []);

   // get all products   ///////////////////////////////////
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      // const { data } = await axios.get("http://localhost:5000/api/v1/products");
      const { data } = await axios.get("http://localhost:5000/products");
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
// /////////////////////////  add new produt  //////////////////////////////
const [newProduct, setNewProduct] = useState({
  id: "",
  name: "",
  description: "",
  owner: "",
  price: 0,
  img_url: "",
  stock:0
});

  const addProduct = async () => {
    try {
      // const { data } = await axios.post("http://localhost:5000/api/v1/products", newProduct);
      const { data } = await axios.post("http://localhost:5000/products", newProduct);
      setProducts([...products, data]);
      resetNewProduct();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
// ///////////////////////// delete product ///////////////////////////////////
  const deleteProduct = async (id) => {
    try {
      // await axios.delete(`http://localhost:5000/api/v1/products/${id}`);
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts(products.filter((product) => product.id!== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  // /////////////////////////  update product ////////////////////////////////
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    id: "",
    name: "product",
    description: "product klklk klkl ",
    owner: "sabah",
    price: 30,
    img_url: "",
    stock:10
  });
  const updateProduct = async (id) => {
    try {
      // const handleProductInputChange = (e) => {
      //   const { name, value } = e.target;
      //   isEditing? setSelectedProduct({...selectedProduct, [name]: value }) :
      //   setNewProduct({...newProduct, [name]: value });
      // };
      const {data} = await axios.put(
        `http://localhost:5000/products/${id}`,
        selectedProduct
      );
      setProducts(
        products.map((product) =>
          product.id === id? data : product
        )
      );
      console.log(isEditing);
      console.log(data);

    } catch (error) {
      console.error("Error fetching product by ID:", error);
    }
  };

// //////////////////////////  get all users //////////////////////////////////
const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const {data} = await axios.get("http://localhost:5000/users");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
// /////////////////////////////////add new user ////////////////////////////////////////
const [newUser, setNewUser] = useState({
  id: "",
  username: "",
  email: "",
});

  const addUser = async () => {
    try {
      const {data} = await axios.post("http://localhost:5000/users", newUser);
      setUsers([...users, data]);
      resetNewUser();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
// //////////////////////// delete user ////////////////////////////////////
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUsers(users.filter((user) => user.id!== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
// ///////////////////////////////// get inputs from form///////////////////////////////////////////
  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({...newProduct, [name]: value });
  };

  const handleProductUpdateChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({...selectedProduct, [name]: value })
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({...newUser, [name]: value });
  };
// ///////////////////////////////// clear forms /////////////////////////////////////////
  const resetNewProduct = () => {
    setNewProduct({
      id: "",
      img_url:"",
      name: "",
      description: "",
      owner: "",
      price: 0,
      stock:0,
    });
    setSelectedFile(null);
  };

  const resetNewUser = () => {
    setNewUser({
      id: "",
      username: "",
      email: "",
    });
  };
// ///////////////////////////////////////////

  return (
    <>
      <div className={`container p-5 bg-white shadow-lg rounded-2 ${styles.ground}`}>

        <div >
          {/* //////////////// buttons///////////////// */}
          <ul
            className="nav nav-pills my-5 justify-content-center nav-tabs px-5"
            id="pills-tab"
            role="tablist"
          >
            <li
              className={`nav-item mx-5 px-3 ${styles.adminBoard}`}
              role="presentation"
            >
              <button
                className={`nav-link bg-transparent ${styles.adminBoard}`}
                id="pills-all-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-all"
                type="button"
                role="tab"
                aria-controls="pills-all"
                aria-selected="true"
              >
                Home
              </button>
            </li>
            <li
              className={`nav-item mx-5 px-3  ${styles.adminBoard}`}
              role="presentation"
            >
              <button
                className={`nav-link bg-transparent ${styles.adminBoard}`}
                id="pills-Brand-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-Brand"
                type="button"
                role="tab"
                aria-controls="pills-Brand"
                aria-selected="false"
              >
                Users
              </button>
            </li>
            <li
              className={`nav-item mx-5 px-3  ${styles.adminBoard}`}
              role="presentation"
            >
              <button
                className={`nav-link bg-transparent ${styles.adminBoard}`}
                id="pills-Design-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-Design"
                type="button"
                role="tab"
                aria-controls="pills-Design"
                aria-selected="false"
              >
                Products
              </button>
            </li>
          </ul>
          {/* /////////////////// user section ////////////////// */}
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-all"
              role="tabpanel"
              aria-labelledby="pills-all-tab"
              tabindex="0"
            >
              <div className="container text-center">
                <div className="mt-5">
                  <div className="">
                    <h1>Welcome, to admin dashboard</h1>
                    <h1>Have a nice time</h1>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="pills-Brand"
              role="tabpanel"
              aria-labelledby="pills-Brand-tab"
              tabindex="0"
            >
              <div className="container">
                <div className="text-center">
                  <h2> welcome to User panel</h2>
                </div>

                <input
                  type="text"
                  name="username"
                  placeholder="User Name"
                  value={newUser.username}
                  onChange={handleUserInputChange}
                  style={{
                    padding: "10px",
                    margin: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    outline: "none",
                    width: "100%",
                  }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="User Email"
                  value={newUser.email}
                  onChange={handleUserInputChange}
                  style={{
                    padding: "10px",
                    margin: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    outline: "none",
                    width: "100%",
                  }}
                />
                <button
                  onClick={addUser}
                  style={{
                    backgroundColor: "#e65f78",
                    padding: "10px",
                    margin: "5px",
                    color: "white",
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  Add User
                </button>

                <table
                  className="bg-light mt-5 text-center"
                  style={{
                    borderCollapse: "collapse",
                    width: "100%",
                    border: "1px solid black",
                  }}
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                          <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>
                            Delete
                          </button>
                          <button className="btn btn-warning mx-2" onClick={() => alert("update")}>Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
              {/* /////////////////// product section //////////////////// */}
            <div
              className="tab-pane fade"
              id="pills-Design"
              role="tabpanel"
              aria-labelledby="pills-Design-tab"
              tabindex="0"
            >
              <div className="container">
                <div className="text-center">
                  <h2> welcome to product panel</h2>
                </div>
                <div className={`${styles.productForm}`}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={handleProductInputChange}
                  />
                  <input
                    type="text"
                    name="description"
                    placeholder="Product Description"
                    value={newProduct.description}

                    onChange={handleProductInputChange}
                  />
                  <input
                    type="text"
                    name="owner"
                    placeholder="Owner"
                    value={newProduct.owner}

                    onChange={handleProductInputChange}
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Total Price"
                    value={ newProduct.price}

                    onChange={handleProductInputChange}
                  />
                  <input
                    type="number"
                    name="stock"
                    placeholder="stock"
                    value={ newProduct.stock}

                    onChange={handleProductInputChange}
                  />
                  {/* <input
                    type="text"
                    name="img_url"
                    placeholder="Image URL"
                    value={newProduct.img_url}
                    onChange={handleProductInputChange}
                  /> */}

      <input type="file" accept="image/*" onChange={handleFileChange} placeholder="Image URL" name="img_url"
      />
      {selectedFile && (
        <img src={selectedFile} alt="Selected" style={{ maxWidth: '50px'}} />
      )}
                   <button onClick={addProduct}>Add Product</button>
                </div>

                <ul>
                  <table
                    className="bg-light  text-center"
                    style={{
                      borderCollapse: "collapse",
                      width: "100%",
                      border: "1px solid black",
                    }}
                  >
                    <thead>
                      <tr>
                        {/* <th className="px-2">ID</th> */}
                        <th className="px-2">Image</th>
                        <th className="px-2">Name</th>
                        {/* <th className="px-2">Description</th> */}
                        <th className="px-2">Owner</th>
                        <th className="px-2">Total Price</th>
                        <th className="px-2">stock</th>
                        <th className="px-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          {/* <td className="px-2">{product.id}</td> */}
                          <td className="px-2"><img  src={product.img_url}/></td>
                          <td className="px-2">{product.name}</td>
                          {/* <td className="px-2">{product.description}</td> */}
                          <td className="px-2">{product.owner}</td>
                          <td className="px-2">${product.price}</td>
                          <td className="px-2">{product.stock}</td>
                          <td className="px-2">
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteProduct(product.id)}
                            >
                              Delete
                            </button>
                            <button
                              className="btn btn-warning mx-2"
                              onClick={() => {updateProduct(product.id);}}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
