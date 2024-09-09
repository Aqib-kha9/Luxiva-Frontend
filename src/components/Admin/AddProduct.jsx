import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  // State for form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    qty: "",
    oldPrice: "",
    percentOff: "",
    size: "",
    paymentMethod: "",
    color: "",
    warranty: "",
    productType: "",
    shortDescription: "",
    returnPolicy: "",
  });

  const [image, setImage] = useState(null); // State for the image file
  const [message, setMessage] = useState(""); // State for success or error message

  // Handle input change for text fields
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data to send
    const formToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formToSend.append(key, formData[key]);
    });
    formToSend.append("image", image); // Append the image file

    try {
      const response = await axios.post(
        "http://localhost:8080/api/product/add",
        formToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);
      // Clear the form after successful submission
    //   setFormData({
    //     title: "",
    //     description: "",
    //     price: "",
    //     category: "",
    //     qty: "",
    //     oldPrice: "",
    //     percentOff: "",
    //     size: "",
    //     paymentMethod: "",
    //     color: "",
    //     warranty: "",
    //     productType: "",
    //     shortDescription: "",
    //     returnPolicy: "",
    //   });
      setImage(null);
    } catch (error) {
      console.error("Error uploading product", error);
      setMessage("Failed to add product");
    }
  };

  return (
    <div>
      <h1>Add New Product</h1>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="qty"
          placeholder="Quantity"
          value={formData.qty}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="oldPrice"
          placeholder="Old Price"
          value={formData.oldPrice}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="percentOff"
          placeholder="Percent Off"
          value={formData.percentOff}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="size"
          placeholder="Size"
          value={formData.size}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="paymentMethod"
          placeholder="Payment Method"
          value={formData.paymentMethod}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="color"
          placeholder="Color"
          value={formData.color}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="warranty"
          placeholder="Warranty"
          value={formData.warranty}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="productType"
          placeholder="Product Type"
          value={formData.productType}
          onChange={handleInputChange}
        />
        <textarea
          name="shortDescription"
          placeholder="Short Description"
          value={formData.shortDescription}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="returnPolicy"
          placeholder="Return Policy"
          value={formData.returnPolicy}
          onChange={handleInputChange}
        />

        {/* Image upload field */}
        <input type="file" onChange={handleImageChange} required />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
