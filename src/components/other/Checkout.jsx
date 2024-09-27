import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import "./Cart.css";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./CheckoutC.css";
const Checkout = () => {
  const { cart, decreaseQty, addToCart, removeFromCart ,userAddress} =
    useContext(AppContext);

  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const Navigate = useNavigate();
  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setQty(qty);
    setPrice(price);
  }, [cart]);

  return (
    <>
      <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Order Summary</h3>
      <div className="cart-container checkout mb-5">
        <div className="product-details">
          <h5 style={{ marginTop: "1rem",textAlign:"center",marginBottom:"1rem"}}>
            Product Details
          </h5>
          {cart?.items?.map((product) => (
            <div key={product._id} className="mb-3">
              

              <div className="cart">
                <div to={`/product/${product._id}`} className="left-cart">
                  <img src={product?.imgSrc} alt="" />
                  <p>{product?.title}</p>
                </div>
                <div className="cart-price">
                  <h6>&#8377; {product.price?.toLocaleString("en-IN")}</h6>
                </div>
                <div className="cart-controller">
                  <button onClick={() => decreaseQty(product?.productId, 1)}>
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <div>{product.qty}</div>
                  <button
                    onClick={() =>
                      addToCart(
                        product?.productId,
                        product.title,
                        product.price / product.qty,
                        1,
                        product.imgSrc
                      )
                    }
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                <div className="cart-remove">
                  <button
                    onClick={() => {
                      if (confirm("Are you sure, want remove from cart"))
                        removeFromCart(product?.productId);
                    }}
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
              
            </div>
            
          ))}
          <hr />
          <div className="cart-total d-flex">
        <div className="cart-footer" style={{ width: "88vw" }}>
          
          <div className="inner-cart-i d-flex flex-row">
            <div className="left-cart-info" >
              <button className="btn btn-outline-dark btn1 ">
                Total Qty: {qty}
              </button>
              <button className="btn btn-outline-dark btn1">
                Total Price: &#8377; {price?.toLocaleString("en-IN")}{" "}
              </button>
              <Link to={"/orderConfirmation"} className="btn btn-outline-danger btn1">
                Proceed To Pay
              </Link>
            </div>
          </div>

          <hr />
        </div>
      </div>
        </div>

        <div className="shipping-Address">
          <h5 style={{marginTop:"1rem", textAlign:"center",marginBottom:"1rem"}}>Shipping Address</h5>
          <ul>
            <li><p>Name: {userAddress?.fullName}</p></li>
            <li><p>Phone No. {userAddress?.phoneNumber}</p></li>
            <li><p>Country: {userAddress?.country}</p></li>
            <li><p>State: {userAddress?.state}</p></li>
            <li><p>City: {userAddress?.city}</p></li>
            <li><p>PinCode: {userAddress?.pinCode}</p></li>
            <li><p>Full Address: {userAddress?.address}</p></li>
          </ul>
        </div>
      </div>

      {/* <div className="pay-btn">
        <button>Proceed To Pay</button>
      </div> */}
      
    </>
  );
};

export default Checkout;
