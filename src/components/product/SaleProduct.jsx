import React, { useContext, Component } from "react";
import AppContext from "../../context/AppContext";
import './SaleProduct.css';
import { Link } from "react-router-dom";

const SaleProduct = () => {

  const { saleProducts } = useContext(AppContext);
  
  return (
    <>
        <div className="sale-container">
        {saleProducts?.map((product) => (
        <div key={product._id} >
            <div className="inner-sale">
              <div
                style={{ backgroundImage: `url(${product?.imgSrc})`,backgroundSize:"100% 100%",backgroundRepeat: "no-repeat"}}//
                className="backgroundimg"
              >
                <div className="side-container">
                    <p>{product?.description}</p>
                    <h2>{product?.title}</h2>
                    <Link to={"/exclusivDeals"}>Shop Now</Link>
                </div>
                
              </div>
             
            </div>
        </div>
      ))}
        </div>
     
    </>
  );
};

export default SaleProduct;
