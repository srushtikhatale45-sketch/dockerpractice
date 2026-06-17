import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddProduct.css";

const HandleProduct = ({ productIdToUpdate, addProduct }) => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    brand: "",
    category: "",
    thumbnail: "",
    discountPercentage: 0,
    description: "",
  });

  useEffect(() => {
    if (productIdToUpdate) {
      fetchProductData(productIdToUpdate);
    }
  }, [productIdToUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]:
        name === "price" || name === "discountPercentage"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("SUBMIT DATA:", product);

    // 🔥 Frontend validation before hitting backend
    if (
      !product.title ||
      !product.price ||
      !product.brand ||
      !product.category ||
      !product.thumbnail
    ) {
      alert("Please fill all required fields");
      return;
    }

    addProduct(product);
  };

  const fetchProductData = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/products/${productId}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <fieldset className="form-container">
        <legend>
          {productIdToUpdate ? "Update Product" : "Add Product"}
        </legend>

        {/* TITLE */}
        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* THUMBNAIL */}
        <div className="form-group">
          <label>Thumbnail</label>
          <input
            name="thumbnail"
            value={product.thumbnail}
            onChange={handleChange}
            required
          />
        </div>

        {/* PRICE */}
        <div className="form-group">
          <label>Price</label>
          <input
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* CATEGORY */}
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Choose</option>
            <option value="smartphone">SmartPhone</option>
            <option value="laptops">Laptops</option>
          </select>
        </div>

        {/* BRAND */}
        <div className="form-group">
          <label>Brand</label>
          <select
            name="brand"
            value={product.brand}
            onChange={handleChange}
            required
          >
            <option value="">Choose</option>
            <option value="apple">Apple</option>
            <option value="samsung">Samsung</option>
          </select>
        </div>

        {/* DISCOUNT */}
        <div className="form-group">
          <label>Discount</label>
          <input
            name="discountPercentage"
            type="number"
            value={product.discountPercentage}
            onChange={handleChange}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          {productIdToUpdate ? "Update" : "Add"}
        </button>
      </fieldset>
    </form>
  );
};

export default HandleProduct;