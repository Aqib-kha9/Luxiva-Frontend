import React from "react";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Link } from "react-router-dom";
const OrderConfirmation = () => {
  return (
    <>
      <div className="container order-con center my-5" style={{width:"60vw"}}>
        <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 80, color:"red" }}></CheckCircleOutlineOutlinedIcon>
        <h1>Your order is completed!</h1>
        <span>
          Thank you for your order! Your order is being processed and will be
          completed within 3-6 hours. You will receive an email confirmation
          when your order is completed.
        </span>
        <Link to={"/exclusivDeals"} className="btn btn-outline-danger d-flex" style={{height:"3rem",width:"15rem", alignItems:"center", justifyContent:"center" }}>Continue Shopping</Link>

       
      </div>
    </>
  );
};

export default OrderConfirmation;
