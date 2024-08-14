import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = (props) => {
  const url = "http://localhost:8080/api";

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [reload, setReaload] = useState(false);
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.products);
      setProducts(api.data.products);
      profile();
      userCart();
      getAddress();
    };

    fetchProduct();
  }, [token,reload]);

  useEffect(() => {
    let lstoken = localStorage.getItem("token");
    if (lstoken) {
      setToken(lstoken);
      setIsAuthenticated(true);
    }
  }, []);

  //register user

  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );

    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 1494,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

    return api.data;
  };

  // login user
  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );

    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 1494,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    console.log("user login", api.data);
    setToken(api.data.token);
    setIsAuthenticated(true);

    localStorage.setItem("token", api.data.token);
    return api.data;
  };

  // logout user

  const logout = () => {
    setIsAuthenticated(false), setToken(" ");
    localStorage.removeItem("token");
    toast.success("Logout Successfully", {
      position: "top-center",
      autoClose: 1494,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  // profile

  const profile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });

    setUser(api.data.user);
  };

  // Add to Cart

  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(
      `${url}/cart/add`,
      {productId, title, price, qty, imgSrc},
      {
        headers: {
          "Content-Type": "Application/json",
          Auth:token
        },
        withCredentials: true,
      }
    );
    setReaload(!reload);
    console.log("My Cart", api);
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 1494,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };



  // user cart

  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setCart(api.data.cart);
    setReaload(!reload);
    // console.log("user cart", api.data.cart);
    // setUser(api.data.user);
  };

  // decrease qty

  const decreaseQty = async (productId,qty) => {
    const api = await axios.post(`${url}/cart/--qty`,{productId,qty}, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // setCart(api.data.cart);
    setReaload(!reload);
    console.log("decrease qty", api);
    // setUser(api.data.user);
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 1494,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  // remove item from cart

  const removeFromCart = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`,{
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // setCart(api.data.cart);
    setReaload(!reload);
    console.log("remove item form cart", api);
    // setUser(api.data.user);
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 1494,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };


   // Clear Cart

   const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`,{
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // setCart(api.data.cart);
    setReaload(!reload);
    // console.log("remove item form cart", api);
    // setUser(api.data.user);
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 1494,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };


  
   // Shipping Address

   const shippingAddress = async (fullName,address,city,pinCode,phoneNumber,state,country) => {
    const api = await axios.post(`${url}/address/add`,{fullName,address,city,pinCode,phoneNumber,state,country},{
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // setCart(api.data.cart);
    setReaload(!reload);
    // console.log("remove item form cart", api);
    // setUser(api.data.user);
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 1494,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    return api.data;
  };

// Get User Address 
  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token
      },
      withCredentials: true,
    });
    console.log("user Address",api.data.userAddress);
    setUserAddress(api.data.userAddress);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        url,
        token,
        setIsAuthenticated,
        isAuthenticated,
        logout,
        user,
        addToCart,
        cart,
        decreaseQty,
        removeFromCart,
        clearCart,
        shippingAddress,
        userAddress,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
