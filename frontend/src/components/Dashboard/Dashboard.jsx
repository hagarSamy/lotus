import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
  const [isEditing, setIsEditing] = useState(false);

  const [products, setProducts] = useState([
    {
      id: "",
      name: "",
      description: "",
      owner: "",
      price: 0,
      img_url: "",
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    description: "",
    owner: "",
    price: 0,
    img_url: "",
  });

  const [users, setUsers] = useState([
    {
      id: "",
      username: "",
      email: "",
    },
  ]);

  const [newUser, setNewUser] = useState({
    id: "",
    username: "",
    email: "",
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    setIsEditing(false);
  }, []);

  const fetchProducts = async () => {
    // const response = await axios.get("http://localhost:5000/products");
    const {data} = await axios.get("http://localhost:5000/api/v1/products");
    setProducts(data);
  };

  const addProduct = async () => {
    const {data} = await axios.post(
      "http://localhost:5000/api/v1/products",
      newProduct
    );
    setProducts([...products, data]);
    setNewProduct({
      id: "", // Assuming ID generation happens server-side or is auto-incremented
      name: "",
      description: "",
      owner: "",
      price: 0, // Decimal value, initialize as 0
      img_url: "",
    });
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/v1/products/${id}`);
    setProducts(products.filter((product) => product.id !== id));
  };

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  const addUser = async () => {
    const response = await axios.post("http://localhost:5000/users", newUser);
    setUsers([...users, response.data]);
    setNewUser({
      id: "", // Assuming ID generation happens server-side or is auto-incremented
      username: "",
      email: "",
    });
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };
  // ////////////////////

  const fetchProductById = async (id) => {
    const response = await axios.get(`http://localhost:5000/products/${id}`);
    setSelectedProduct(response.data);
    setIsEditing(true); // Set editing mode
  };
  const updateProduct = async () => {
    const response = await axios.put(
      `http://localhost:5000/products/${selectedProduct.id}`,
      selectedProduct
    );
    // Update local state with the updated product
    setProducts(
      products.map((product) =>
        product.id === selectedProduct.id ? response.data : product
      )
    );
    setSelectedProduct(null); // Clear the selected product
  };

  return (
    <>
      <div className={`container p-5 bg-white shadow-lg rounded-2 ${styles.ground}`}>
        {/* ////////////////user view/////////////// */}


        <div >
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
          {/* ///////////////////////////////////// */}
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
                  name="name"
                  placeholder="User Name"
                  value={newUser.name}
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
                        <td>{user.name}</td>
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
                    value={isEditing? selectedProduct.name : newProduct.name}
                    onChange={handleProductInputChange}
                  />
                  <input
                    type="text"
                    name="description"
                    placeholder="Product Description"
                    value={isEditing? selectedProduct.description : newProduct.description}

                    onChange={handleProductInputChange}
                  />
                  <input
                    type="text"
                    name="owner"
                    placeholder="Owner"
                    value={isEditing? selectedProduct.owner : newProduct.owner}

                    onChange={handleProductInputChange}
                  />
                  <input
                    type="number"
                    name="total_price"
                    placeholder="Total Price"
                    value={isEditing? selectedProduct.total_price : newProduct.total_price}

                    onChange={handleProductInputChange}
                  />
                  <input
                    type="text"
                    name="img_url"
                    placeholder="Image URL"
                    value={isEditing? selectedProduct.img_url : newProduct.img_url}
                    onChange={handleProductInputChange}
                  />
                  {isEditing? <button onClick={fetchProductById}>update Product</button> : <button onClick={addProduct}>Add Product</button>}
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
                        <th className="px-2">ID</th>
                        <th className="px-2">Name</th>
                        <th className="px-2">Description</th>
                        <th className="px-2">Owner</th>
                        <th className="px-2">Total Price</th>
                        <th className="px-2">Image URL</th>
                        <th className="px-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-2">{product.id}</td>
                          <td className="px-2">{product.name}</td>
                          <td className="px-2">{product.description}</td>
                          <td className="px-2">{product.owner}</td>
                          <td className="px-2">${product.total_price}</td>
                          <td className="px-2">
                            <a
                              href={product.img_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {product.img_url}
                            </a>
                          </td>
                          <td className="px-2">
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteProduct(product.id)}
                            >
                              Delete
                            </button>
                            <button
                              className="btn btn-warning mx-2"
                              onClick={() => fetchProductById(product.id)}
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
