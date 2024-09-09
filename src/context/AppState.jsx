import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from 'react-router-dom';

const AppState = (props) => {
  const url = "http://localhost:8080/api";
  // const url = "https://luxiva-backend-api.onrender.com/api";

  const [products, setProducts] = useState([]);
  const [bannerProducts, setBannerProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [reload, setReaload] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [productType, setProductType] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const userId = user?._id;
  // console.log(userId);

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
    
      // console.log(api.data.products);
      setProducts(api.data.products);
      profile();
      userCart();
      getAddress();
    };

    fetchProduct();
  }, [token,reload]);


//fetch Banner Product

  useEffect(() => {
    const fetchBannerProduct = async () => {
      const api = await axios.get(`${url}/product/banner/all`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      setBannerProducts(api.data.products);
      
    };
    fetchBannerProduct();
  }, [token,reload]);

// fetch Sale Product
  useEffect(() => {
    const fetchSaleProduct = async () => {
      const api = await axios.get(`${url}/product/sale/all`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      // console.log(api.data.products);
      setSaleProducts(api.data.products);
    };
    fetchSaleProduct();
  }, [token, reload]);

  // fetch product based on product type


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/product/all`, {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        });

        const featuredProducts = api.data.products.filter((product) => product.productType === "Featured");

        setProductType(featuredProducts);

        // console.log(featuredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProduct();
  }, [token, reload]); 

  // fetch Testimonials 
  useEffect(() => {
    const fetchTestimonials = async () => {
      const api = await axios.get(`${url}/product/testimonial/all`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      // console.log(api.data.testimonial);
      setTestimonials(api.data.testimonial);
    };
    fetchTestimonials();
  },[token, reload] );


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
    // console.log("user Address",api.data.userAddress);
    setUserAddress(api.data.userAddress);
  };


  // News Letter
  const newsLetter = async (email) => {
    const api = await axios.post(`${url}/newsletter/add`,{email},{
      headers: {
        "Content-Type": "Application/json",
      },
      withCredentials: true,
    });
    setReaload(!reload);
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


 // Delete Review
 const deleteReview = async (reviewProductId,reviewId) =>{
  // console.log(userId);
  const api = await axios.delete(`${url}/product/${reviewProductId}/${reviewId}?userId=${userId}`,{
    headers:{
      "Content-Type":"Appliction/json",
      Auth: token,
    },
    // userId: {userId} ,
    withCredentials:true,
  });
  console.log(api.data);
  setReaload(!reload);

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
 }


 // Review ADD

//  const  = async (productId,comment,rating,imgSrc)=>{
//     const api = await axios.post(`${api}/product/${productId}`,{comment,rating,imgSrc},{
//       headers:{
//         "Content-Type":"Application/json",
//         Auth: token
//       },
//       withCredentials: true,
//     });
//     console.log(api);
//   }

  const reviewAdd = async (productId,comment,rating,imgSrc,name) => {
    console.log(productId);
    const apiUrl = `${url}/product/${productId}/review`;
    console.log(productId);
    const response = await axios.post(apiUrl, 
      { comment, rating, imgSrc, name },{
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    
    setReaload(!reload);
    console.log("review added", response);
    toast.success(response.data.message, {
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
    return response.data;
  };




  return (
    <AppContext.Provider
      value={{
        
        products,
        bannerProducts,
        saleProducts,
        productType,
        testimonials,
        newsLetter,
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
        deleteReview,
        reload,
        reviewAdd,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
