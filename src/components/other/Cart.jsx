import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import "./Cart.css";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } =
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
      {cart?.items?.length == 0 ? (
        <>
          <div className="cart-container mt-5 mb-5">
            <Link to={"/exclusivDeals"} className="btn btn-outline-danger cart-btn ">
              Your Cart is empty Continue Shopping....
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="cart-container">
            <h3 style={{ marginTop: "2rem", marginBottom: "1rem" }}>
              Shopping Cart
            </h3>
            {cart?.items?.map((product) => (
              <div key={product._id} style={{ width: "88vw" }}>
                <hr />

                <div className="cart">
                  <div to={`/product/${product._id}`} className="left-cart">
                    <img src={product?.imgSrc} alt="" />
                    <p>{product?.title}</p>
                  </div>
                  <div className="cart-price">
                    <h4>&#8377; {product.price?.toLocaleString("en-IN")}</h4>
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
          </div>
          <div className="cart-total d-flex mb-5">
            <div className="cart-footer" style={{ width: "88vw" }}>
              <hr />
              <div className="inner-cart-i d-flex flex-row">
                <div className="left-cart-info">
                  <button className="btn btn-outline-dark btn1 ">
                    Total Qty: <b>{qty}</b>
                  </button>
                  <button className="btn btn-outline-dark btn1">
                    Total Price: &#8377; <b>{price?.toLocaleString("en-IN")}</b>{" "}
                  </button>
                </div>
                {cart?.items?.length > 0 && (
                  <div className="right-cart-info">
                    <button
                      onClick={() => Navigate("/shipping")}
                      className="btn btn-outline-success btn1 "
                    >
                      Chekout
                    </button>
                    <button
                      className="btn btn-outline-danger "
                      onClick={() => {
                        if (confirm("Are you sure, want to clear cart....?")) {
                          clearCart();
                        }
                      }}
                    >
                      Clear Cart
                    </button>
                  </div>
                )}
              </div>

              <hr />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
