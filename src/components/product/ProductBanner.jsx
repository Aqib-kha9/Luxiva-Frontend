import React, { useContext, Component } from "react";
import AppContext from "../../context/AppContext";
import "./ProductBan.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Loading from '../loader/Loading';
const ProductBanner = () => {


  const { bannerProducts,isLoading } = useContext(AppContext);

  if (isLoading) {
    return <Loading />;
  }
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
                <Link to={"/index"} className="btn btn-outline-danger">
                    Shop Now
                </Link>
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
