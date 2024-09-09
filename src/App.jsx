import React, { useEffect, useState } from "react";
import ShowProduct from "./components/product/ShowProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./components/product/ProductDetail";
import Navbar from "./components/other/Navbar";
import SearchProduct from "./components/product/SearchProduct";
import Register from "./components/user/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import Cart from "./components/other/Cart";
import Address from "./components/other/Address";
import Checkout from "./components/other/Checkout";
import ProductBanner from "./components/product/ProductBanner";
import SaleProduct from "./components/product/SaleProduct";
import FeaturedProduct from "./components/product/FeaturedProduct";
import Testimonial from "./components/other/Testimonial";
import ExtraInfo from "./components/other/ExtraInfo";
import NewsLetter from "./components/other/NewsLetter";
import FooterLinks from "./components/footer/FooterLinks";
import AddProduct from "./components/Admin/AddProduct"
import Loading from "./components/loader/Loading";
import axios from "axios";

const App = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // // let {data} = useContext(AppContext);
  // useEffect(() => {
  //   axios.interceptors.request.use((config)=> {
  //     setIsLoading(true);
  //     return config;
  // }, function (error) {
  //   // Do something with request error
  //   return Promise.reject(error);
  // });

// Add a response interceptor
// axios.interceptors.response.use((response) =>{
    
//     setIsLoading(false);
//     return response;
//   }, function (error) {
    
//     return Promise.reject(error);
//   });
  
{/* <Loading show={isLoading}/> */}
//   }, [])
  


  return (
    <Router>
      <Navbar />
      <ToastContainer />
      
      <Routes>
        <Route
          path="/"
          element={[
            <ProductBanner />,
            <SaleProduct />,
            <ShowProduct />,
            <SaleProduct />,
            <FeaturedProduct />,
            <Testimonial />,
            <ExtraInfo />,
          ]}
        />
        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />
        <Route path="/product/search/:term" element={<SearchProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Address />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/addproduct" element={<AddProduct/>}></Route>
      </Routes>
      <NewsLetter />
      <FooterLinks />
    </Router>
  );
};

export default App;
