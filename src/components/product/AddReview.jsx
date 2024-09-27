import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import AppContext from "../../context/AppContext";
import { useParams } from 'react-router-dom';

const AddReview = () => {
  const { reviewAdd } = useContext(AppContext);
  const  productId = useParams();
  
  const [formData, setFormData] = useState({
    productId:productId.id,
    comment: "",
    rating: "",
    imgSrc:"",
    name:"",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const {comment,rating,imgSrc,name} = formData;
  const submitHandler = async (e) => {
    e.preventDefault();
    
    // console.log(`this is the product id = ${productId.id}`);
    const result = await reviewAdd(productId.id,comment,rating,imgSrc,name);
    // console.log(formData);
    setFormData({
        comment: "",
        rating: "",
        imgSrc:"",
        name:"",
    })
  };


  return (
    <>
      <div className="mt-4 mb-5 ">
        <form onSubmit={submitHandler}>
          <h5 className="mb-3">Add a Review</h5>
          <Box sx={{ "& > legend": { mt: 2 } }}>
            {/* <Typography component="legend">Controlled</Typography> */}
            <Rating
              size="large"
              name="rating"
              value={formData.rating}
                onChange={onChangeHandler}
                required
            />
          </Box>
          <div className="form-floating">
            <textarea
            name="comment"
            value={formData.comment}
            onChange={onChangeHandler}
            required
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style={{ height: " 100px" }}
            ></textarea>
            <label htmlFor="floatingTextarea2">Your Review *</label>
          </div>

          <div className="row g-2">
            <div className="col-md">
              <div className="form-floating">
                <input
                name="imgSrc"
                value={formData.imgSrc}
                onChange={onChangeHandler}
                required
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea"
                ></input>
                <label htmlFor="floatingTextarea">Image Link</label>
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">
                <input
                name="name"
                value={formData.name}
                onChange={onChangeHandler}
                required
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea"
                ></input>
                <label htmlFor="floatingTextarea">User Name</label>
              </div>
            </div>
          </div>

          <button
            style={{ height: "3rem", width: "12rem", fontSize: "larger" }}
            className="btn btn-outline-danger"
          >
            Submit Review
          </button>
        </form>
      </div>
      <div className="toggle-buttons">
        <hr />
        <hr />
        <hr />
      </div>
    </>
  );
};

export default AddReview;
