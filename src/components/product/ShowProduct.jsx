import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import "./ShowP.css";
import { Link } from "react-router-dom";

const ShowProduct = () => {
  const { products, addToCart } = useContext(AppContext);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Exclusive Products</h1>
      <div className="container">
        {products?.map((product) => (
          <div key={product._id}>
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

                <img src={product.imgSrc} className="card-img-top" alt="..." />
              </div>

              <div className="card-body">
                <Link
                  to={`/product/${product._id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {" "}
                  <h6 style={{ fontWeight: "bold" }} className="card-title">
                    {product.title}
                  </h6>
                </Link>
                <span style={{ color: "red", fontWeight: "bold" }}>
                  &#8377;{product.price.toLocaleString("en-IN")}
                </span>
                &nbsp;
                <span
                  style={{ textDecoration: "line-through", fontSize: "small" }}
                >
                  &#8377;{product?.oldPrice?.toLocaleString("en-IN")}
                </span>
                &nbsp; &nbsp;
                <span style={{ color: "green" }}>
                  {product?.percentOff}% Off
                </span>
                {/* <span>{product?.reviews}</span> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowProduct;
