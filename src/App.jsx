import React from "react";
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

const App = () => {
  // let {data} = useContext(AppContext);
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
            <NewsLetter />,
            <FooterLinks />,
          ]}
        />
        <Route
          path="/product/:id"
          element={[<ProductDetail />, <NewsLetter />, <FooterLinks />]}
        />
        <Route path="/product/search/:term" element={<SearchProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Address />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
