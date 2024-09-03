import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ReviewShow.css";
import AppContext from "../../context/AppContext";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const Review = ({ product }) => {
  const [productReview, setProductReview] = useState();
  const [showDescription, setShowDescription] = useState(true);
  const { user, deleteReview, reload } = useContext(AppContext);
  // const url = "http://localhost:8080/api";
  const url = "https://luxiva-backend-api.onrender.com/api";



  const { id } = useParams();
  const { token } = useContext(AppContext);
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
  }, [id, token, reload]);

  return (
    <>
      <div className="review-parent">
        <div className="toggle-buttons">
          <span className="buttons" onClick={() => setShowDescription(true)}>
            Description
          </span>
          <span className="buttons" onClick={() => setShowDescription(false)}>
            Reviews ({product?.reviews?.length})
          </span>
          <hr />
        </div>

        {showDescription ? (
          <div className="content">
            <p
              style={{
                fontWeight: "600",
                color: "#687188",
                lineHeight: "2rem",
              }}
            >
              {product?.description}
            </p>
          </div>
        ) : (
          <div className="content">
            <h5>
              <b>{product?.reviews?.length}</b> Reviews For{" "}
              <b>{product?.title}</b>
            </h5>
            {productReview?.map((review) => (
              <div key={review?._id} className="inner-review">
                <div>
                  <img
                    style={{
                      height: "120px",
                      width: "120px",
                      borderRadius: "100px",
                    }}
                    src={review.imgSrc}
                  />
                </div>
                <div className="right-review">
                  <div
                    className="d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <span style={{ fontWeight: "bold" }}>{user?.name}</span>
                    <div className="d-flex align-items-center">
                      <Box sx={{ "& > legend": { mt: 2 } }}>
                        <Rating
                          name="read-only"
                          value={review?.rating}
                          readOnly
                        />
                      </Box>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => {
                          if (
                            confirm("Are you sure, want to delete this review")
                          )
                            deleteReview(product._id, review._id);
                        }}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </div>
                  </div>

                  <span style={{ fontWeight: "600", color: "#687188" }}>
                    {review?.createdAt}
                  </span>

                  <p style={{ fontWeight: "600", color: "#687188" }}>
                    {review?.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Review;
