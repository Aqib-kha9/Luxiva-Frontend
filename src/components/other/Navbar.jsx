import React, { useContext, useState } from "react";
import "./NavB.css";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';


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
            <div className="d-flex brand-logo">
            <DiamondOutlinedIcon sx={{ fontSize: 50 }} className="logo"></DiamondOutlinedIcon>
            <h3>LUXIVA</h3>
            </div>
            
          </Link>
          <form onSubmit={submitHandler} className="search_bar">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Product..."
            />
            <span className="material-symbols-outlined">search</span>
          </form>
          <div className="right_nav">
            {isAuthenticated && (
              <>
                <div className="icons-div">
                <Link to={"/"}><HomeOutlinedIcon sx={{ fontSize: 30 }}></HomeOutlinedIcon></Link>
                {/* <span className="hover">Home</span> */}
                
                </div>
                <div>
                <Link to={"/profile"} ><Person2OutlinedIcon sx={{ fontSize: 30 }}></Person2OutlinedIcon></Link>
                {/* <span className="hover">Profile</span> */}
                </div>
               <div>
               <Link to={"/cart"}>
                <ShoppingCartOutlinedIcon/>
                
                  <span className="position-relative top-5 start-5 translate-middle badge rounded-pill bg-danger">
                    {cart?.items?.length}
                    <span className="visually-hidden"></span>
                  </span>
                </Link>
               </div>
               <div>
               <a className="logout"
                  onClick={() => {
                    logout();
                    Navigate("/");
                  }}
                >
                  <LogoutIcon></LogoutIcon>
                </a>
               </div>

                


              </>
            )}
            {!isAuthenticated && (
              <>
                <Link to={"/"}><HomeOutlinedIcon sx={{ fontSize: 27}}></HomeOutlinedIcon></Link>
                <Link to={"/login"}><LoginOutlinedIcon/></Link>
                <Link to={"/register"}><HowToRegOutlinedIcon/></Link>
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
// fa-cart-shopping
// style={{marginRight:"3rem"}}