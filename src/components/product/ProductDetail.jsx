import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './DetailP.css';
import RelatedProduct from "./RelatedProduct";

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const url = "http://localhost:8080/api";

  const { id } = useParams();

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
  }, [id]);

  return (
    <>
      <div className="Detail">
        <div className="left">
          <img src={product?.imgSrc} alt="" />
        </div>
        <div className="right">
          <h3>{product?.title}</h3>
          <h5 style={{color:"red"}}>
            <b>&#8377;{product?.price.toLocaleString("en-IN")}</b>
          </h5>
          <p style={{fontWeight:"600", color:"#687188"}}>{product?.description}</p>
          <p><b><span style={{color:"#687188"}}>Category:</span> {product?.category}</b></p>
          <p><b><span style={{color:"#687188"}}>Stocks: </span>{product?.qty}</b></p>
          <hr />
          <div className="btnbox">
          <button className="btn btn-related btn-outline-danger ">Buy Now</button>
          <button className="btn btn-related btn-outline-dark">Add To Cart</button>
          </div>
          <hr />        
          {/* <p>{product?.createdAt}</p> */}
        </div>
        
      </div>

      <RelatedProduct category={product?.category}/>
    </>
  );
};

export default ProductDetail;
