import React, { useContext, useState } from "react";
import "./NavB.css";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const Navbar = () => {
  const { setFilteredData, products, logout, isAuthenticated,cart } =
    useContext(AppContext);
    // console.log("user cart s",cart);
  const [searchTerm, setSearchTerm] = useState("");
  const Navigate = useNavigate();

  // const filterByCategory = (cat) =>{
  //   setFilteredData(products.filter((data)=>data?.category.toLowerCase()== cat?.toLowerCase()))
  // }
  const submitHandler = (e) => {
    e.preventDefault();
    Navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };
  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          <Link to={"/"} className="left_bar">
            <h3>LUXIVA</h3>
          </Link>
          <form onSubmit={submitHandler} className="search_bar">
            <span className="material-symbols-outlined">search</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Products"
            />
          </form>
          <div className="right_nav">
            {isAuthenticated && (
              <>
                <Link to={"/profile"}>Profile</Link>
                <Link to={"/cart"} className=" position-relative cart_a fa-solid fa-cart-shopping" style={{marginRight:"3rem"}}>
                
                  <span className="position-relative top-50 start-50 translate-middle badge rounded-pill bg-danger">
                    {cart?.items?.length}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </Link>
                <a
                  onClick={() => {
                    logout();
                    Navigate("/");
                  }}
                >
                  Logout
                </a>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link to={"/login"}>Login</Link>
                <Link to={"/register"}>Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* <div className="sub_bar">
          <div className="items" onClick={()=>filterByCategory(products)}>No Filter</div>
          <div className="items" onClick={()=>filterByCategory("men")}>Men</div>
          <div className="items" onClick={()=>filterByCategory("women")}>Women</div>
          <div className="items" onClick={()=>filterByCategory("boy")}>Boy</div>
          <div className="items" onClick={()=>filterByCategory("girl")}>Girl</div>
          <div className="items" onClick={()=>filterByCategory("child")}>Child</div>
          <div className="items">1500</div>
          <div className="items">2999</div>
          <div className="items">5999</div>
          <div className="items">10k Above</div>
        </div> */}
    </>
  );
};

export default Navbar;
