import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./FeaturedProduct.css";
import 'swiper/css';
import "./ShowP.css"
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const FeaturedProduct = () => {
  const { productType, addToCart } = useContext(AppContext);
  const { products, url } = useContext(AppContext);
  const [reviewsData, setReviewsData] = useState({}); // To store reviews for each product
  // .length
  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsMap = {};
      for (let product of products) {
        if (product?.reviews?.length) {
          try {
            const response = await axios.get(
              `${url}/product/${product._id}/all`, // Assuming this endpoint fetches all reviews for a given product
              { params: { reviewIds: product.reviews } } // Pass the review IDs to get the details
            );

            // Set reviews correctly based on the response structure
            reviewsMap[product._id] = response.data.getAllReviews; // Access getAllReviews from the response data
          } catch (error) {
            console.error(
              "Error fetching reviews for product:",
              product._id,
              error
            );
          }
        }
      }
      setReviewsData(reviewsMap);
    };

    if (products?.length) {
      fetchReviews();
    }
  }, [products]);


  return (
    <>

      {productType.length > 0 ? (
        <div>
          <h1 style={{ textAlign: "center" }}>Featured Products</h1>
        </div>
      ) : (
        <p></p>
      )}
        <div className="container scrollbox" style={{justifyContent:"start",flexWrap: "nowrap",overflowY: "auto",gap:"1.5rem"}}>
          {productType?.length > 0 ? (
            productType?.map((product) =>{ 
              // Get the reviews for the current product, or an empty array if undefined
          const reviews = reviewsData[product._id] || [];

          // Calculate the average rating if there are reviews
          const totalRating = reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          );
          const averageRating =
            reviews.length > 0 ? totalRating / reviews.length : 0;

              return(

              <div key={product._id} className="card-body-featured">
                
                  
                  <div className="card">
                    <div>
                      <div className="hover-img">
                        <img
                          className="img2 card-img-top"
                          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFRUXFxUXFxcXFRoVHRoXFRUXFxUaGhUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAJRABAQACAgICAQUBAQAAAAAAAPABcRHhYfFR0cECIUGBkaES/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AOIAoIvAgKAAAALlALRdqAW0XICHBhQQUBBQEMgCKAIcgACgn+qnPkABQRQAAAW6L0oJm8F2t7TAGLyXRegC0WlL2CcX5LYXoAtLwYBOL8imQZGk4BAAEUBBUBf7wJxkBUFAtAAW1wAFozfZeyvALbLovQCWltGAEW2F6AxfRaDm+wS7W2leFvQF0loXACXa8pXgC2l0uboBLQZK8AcAAnAKAAAphAW0GLsAtrdIAtoteUUDgthegLpLS15L2BdltFvQF0WgvYIt2XtK8Af9/JdF6WvIJaLs5vswBbQAAABAFAAUwAttABS0gCiV4LegW6LQWtgXZbK8JegUtIXsBUwAttLpb0leQLS3Zi7QC2XQAIoCAZyAHIAAC4BQDhLpbQJheEuzF5AW0nN+C0C8CKAnJbAAtF2BgAC0qcXwXYLbELYAXRaAryl7W7LYIZLoA/rCpx4AFwAHC5RbQHBhLs4vkAvRxfgtAV5L2XZxfIBktl0Ai2i7AMV8FsugFS0XYHF9rey2WwSvBei6LQFeVxdpm+y2BxX8Gboui0AgAf6H/ryAAAq4u0uy2BXhb0XRaAL2YS2AF0AXoLRdgYuwtgF6C0l2C3svZi8gKIWgC9rdpbArwXpeb8FoEyi5QAAD/A48YAMAoBegAryLnCcAAAIt6ALSKAIoAACKHAIvN9nFfycX2BXgvQt6BkUAReb7QC2F6ATjwqf6AvAAKAACgnF8l0t6MV8glo4vyvF9pXgDi+S6M3QBaA5AyqZL0C3SWjBewLstleDm+gLotFeQC7LsygFsulzdIBaLsvYB/YfuoIIAq4TCgpdJeivILaLs5vtAW2l0XpQTm+C7AAADF9FpMgLjN+VtoZugW6S0LewLXlM4vnyAFsujIBm8IqAWwygL/SsfsA0JycgpjIAWlu0vYC2y6EBq0IAttAyAvN8Il7BRFtgV4M3jRdFoFLaYQGub5SvBbLoDF4E5vgAABA5ATnyACgApgQFAAVDAKgAKgAAAt6QtApe0AUS2AubpAAC2AcIAAAAAAAAACooJyvIACKBgEAAwAqKACYyCotoAQOQAAAwAAAcqnCgi4/kAZ/UoAfAAL+lFAAAQADC5AEyZADJgAQ+wA/UYADBgARoAQx/CgIAD/9k="
                          alt=""
                        />
                        <button
                          // type="button"
                          className="btn btn-outline-danger  btn-cart" //btn-outline-dark
                          onClick={() =>
                            addToCart(
                              product._id,
                              product.title,
                              product.price,
                              1,
                              product.imgSrc
                            )
                          }
                        >
                          <i className="fa-solid fa-cart-plus"></i>
                        </button>
                      </div>
                      <img
                        src={product.imgSrc}
                        className="card-img-top"
                        alt="..."
                      />
                    </div>

                    <div className="card-body">
                      <Link
                        to={`/product/${product._id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {" "}
                        <h6
                          style={{ fontWeight: "bold" }}
                          className="card-title"
                        >
                          {product.title}
                        </h6>
                      </Link>
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        &#8377;{product.price.toLocaleString("en-IN")}
                      </span>
                      &nbsp;
                      <span
                        style={{
                          textDecoration: "line-through",
                          fontSize: "small",
                        }}
                      >
                        &#8377;{product?.oldPrice?.toLocaleString("en-IN")}
                      </span>
                      &nbsp; &nbsp;
                      <span style={{ color: "green" }}>
                        {product?.percentOff}% Off
                      </span>
                      <div className="d-flex align-items-center">
                    {reviews.length ? (
                      <Stack spacing={1}>
                        <Rating
                          size="small"
                          name="half-rating-read"
                          value={averageRating}
                          precision={0.5}
                          readOnly
                        />
                      </Stack>
                    ) : (
                      <span style={{fontSize:"small"}}>No Reviews Yet</span>
                    )}
                    <span>({reviews.length})</span>
                  </div>
                    </div>
                    
                  </div>
                  
              </div>
            )})
          ) : (
            <p>No Featured Products Available</p>
          )}
        </div>
     
    </>
  );
};

export default FeaturedProduct;
