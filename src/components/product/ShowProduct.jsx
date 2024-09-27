import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import "./ShowP.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import axios from "axios";

const ShowProduct = () => {
  const { products, addToCart, url } = useContext(AppContext);
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
      <h1 style={{ textAlign: "center" }}>Exclusive Products</h1>
      <div className="container">
        {products?.map((product) => {
          // Get the reviews for the current product, or an empty array if undefined
          const reviews = reviewsData[product._id] || [];

          // Calculate the average rating if there are reviews
          const totalRating = reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          );
          const averageRating =
            reviews.length > 0 ? totalRating / reviews.length : 0;

          return (
            <div key={product._id}>
              <div className="card">
                <div>
                  <div className="hover-img">
                    <img
                      className="img2 card-img-top"
                      src={product.imgSrc}
                      alt=""
                    />
                    <button
                      className="btn btn-outline-danger btn-cart"
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
                    <h6 style={{ fontWeight: "bold" }} className="card-title">
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
          );
        })}
      </div>
    </>
  );
};

export default ShowProduct;
