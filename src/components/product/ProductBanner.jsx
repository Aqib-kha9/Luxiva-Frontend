import React, { useContext, Component } from "react";
import AppContext from "../../context/AppContext";
import "./ProductBan.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const ProductBanner = () => {


  const { bannerProducts } = useContext(AppContext);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <>
    <Slider {...settings}>
      {bannerProducts?.map((product) => (
        <div key={product._id} className="head-banner">
            <div className="slider-container" key={product._id}>
              <div
                style={{ backgroundImage: `url(${product?.imgSrc})`,backgroundSize:"100% 100%",backgroundRepeat: "no-repeat"}}
                className="backgroundImg"
              >
                <div className="side-containt">
                <p>{product?.description}</p>
                <h1>{product?.title}</h1>
                <button className="btn btn-outline-danger">
                    Shop Now
                </button>
                </div>
                
              </div>
             
            </div>
        </div>
      ))}
       </Slider>
    </>
  );
};

export default ProductBanner;
