import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./components/Products/ProductList/ProductList";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import ContentWrapper from "./components/ContentWrapper/ContentWrapper";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HandleProduct from "./components/AddProduct/HandleProduct";
import "./index.css";

function App() {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ FETCH PRODUCTS
  useEffect(() => {
    const getProductsFromAPI = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/products");

        console.log("API RESPONSE:", response.data);

        // 🔥 FIX: handle different backend response formats safely
        const data =
          response.data.products ||
          response.data.data ||
          response.data ||
          [];

        setProducts(data);
      } catch (err) {
        console.log(err);
        setIsError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getProductsFromAPI();
  }, []);

  // ✅ DELETE PRODUCT
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/products/${id}`
      );

      const deletedId = res.data._id || id;

      setProducts((prev) =>
        prev.filter((p) => p._id !== deletedId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // ✅ ADD PRODUCT
  const addProduct = async (product) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/products",
        product
      );

      console.log("Product added:", res.data);

      setProducts((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error Adding product:", error);
    }
  };

  // ✅ UPDATE PRODUCT
  const handleUpdate = async (id, product) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/products/${id}`,
        product
      );

      console.log("Product updated:", res.data);

      setProducts((prev) =>
        prev.map((p) => (p._id === id ? res.data : p))
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // ✅ LOADING / ERROR UI
  if (isError) return <h2>Error: {isError}</h2>;
  if (isLoading) return <h2>Loading...</h2>;

  return (
    <Router>
      <ContentWrapper>
        <div>
          {/* NAVBAR */}
          <nav className="navbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/admin" className="nav-link">
                  Admin Panel
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/admin" className="nav-link">
                  Favourites
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/admin" className="nav-link">
                  About Us
                </Link>
              </li>
            </ul>
          </nav>

          {/* ROUTES */}
          <Routes>
            <Route
              path="/"
              element={<ProductList products={products} />}
            />

            <Route
              path="/admin"
              element={
                <AdminPanel
                  products={products}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                />
              }
            />

            <Route
              path="/addproduct"
              element={<HandleProduct addProduct={addProduct} />}
            />
          </Routes>
        </div>
      </ContentWrapper>
    </Router>
  );
}

export default App;