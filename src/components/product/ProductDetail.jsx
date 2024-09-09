import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./DetailP.css";
import RelatedProduct from "./RelatedProduct";
import Review from "./ReviewShow";
import AppContext from "../../context/AppContext";

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const [productReview, setProductReview] = useState();
  const { user } = useContext(AppContext);
  const url = "http://localhost:8080/api";
  // const url = "https://luxiva-backend-api.onrender.com/api";

  const { id } = useParams();
  const { token, reload, addToCart } = useContext(AppContext);

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      //console.log(api.data);
      setProduct(api.data.product);
    };

    fetchProduct();
  }, [id, reload]);

  useEffect(() => {
    const fetchProductReview = async () => {
      const api = await axios.get(`${url}/product/${id}/all`, {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      // console.log(api.data.getAllReviews);
      setProductReview(api.data.getAllReviews);
    };

    fetchProductReview();
  }, [id, token]);

  return (
    <>
      <div className="Detail">
        <div className="left">
          <img src={product?.imgSrc} alt="" />
        </div>
        <div className="right">
          <h3>{product?.title}</h3>
          <span
            style={{ color: "red", fontWeight: "bold", fontSize: "x-large" }}
          >
            &#8377;{product?.price?.toLocaleString("en-IN")}
          </span>
          &nbsp;{" "}
          <span style={{ textDecoration: "line-through", fontSize: "large" }}>
            &#8377;{product?.oldPrice?.toLocaleString("en-IN")}
          </span>
          &nbsp; &nbsp;
          <span style={{ color: "green" }}>{product?.percentOff}% Off</span>
          <p style={{ fontWeight: "600", color: "#687188" }}>
            {product?.shortDescription}
          </p>
          <p>
            <i
              style={{ color: "#FF324D" }}
              className="fa-solid fa-shield-heart"
            ></i>{" "}
            {product?.warranty}
          </p>
          <p>
            <i
              style={{ color: "#FF324D" }}
              className="fa-solid fa-arrow-rotate-left"
            ></i>{" "}
            {product?.returnPolicy}
          </p>
          <p>
            <i
              style={{ color: "#FF324D" }}
              className="fa-solid fa-sack-dollar"
            ></i>{" "}
            {product?.paymentMethod}
          </p>
          <span style={{ color: "#687188" }}>Color </span>
          {product?.color.map((color, i) => (
            <span
              style={{ backgroundColor: color, color: color }}
              className="colorArray"
            ></span>
          ))}
          <br />
          <span style={{ color: "#687188" }}>Size </span>
          {product?.size.map((size, i) => (
            <span className="sizeArray">{size}</span>
          ))}
          <hr />
          <div className="btnbox">
            {/* <button className="btn btn-related btn-outline-danger ">
              Buy Now
            </button> */}
            <button
              onClick={() =>
                addToCart(
                  product._id,
                  product.title,
                  product.price,
                  1,
                  product.imgSrc
                )
              }
              className="btn btn-related btn-outline-dark"
            >
              
              Add To {" "} <i className="fa-solid fa-cart-plus"></i>
            </button>
          </div>
          <hr />
          <p>
            <b>
              <span style={{ color: "#687188" }}>Category:</span>{" "}
              {product?.category}
            </b>
          </p>
          <p>
            <b>
              <span style={{ color: "#687188" }}>Stocks: </span>
              {product?.qty}
            </b>
          </p>
          {/* <p>{product?.createdAt}</p> */}
        </div>
      </div>
      <Review product={product} />
      <RelatedProduct category={product?.category} />
    </>
  );
};

export default ProductDetail;
