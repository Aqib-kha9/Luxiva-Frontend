import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewsLetter.css";
const NewsLetter = () => {
  const { newsLetter } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email:"",
  });
  const navigate = useNavigate();
  

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { email } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await newsLetter(email);
    console.log(result);
    if (result.success) {
      navigate("/");
    }
    console.log(result)
    console.log(formData);
    setFormData({
      email: "",
    });
  };

  return (
    <>
      <div className="newsLetter-parent">
        <div className="para-div">
        <h2 style={{letterSpacing:"-0.05rem",fontWeight:"600"}}>Subscribe Our Newsletter</h2>
        </div>
      <div className="form-div">
      <form onSubmit={submitHandler}>
        <input
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          type="email"
          required
          placeholder="Enter Email Address"
          />
        <button>Subscribe</button>
      </form>
      </div>
      
          </div>
    </>
  );
};

export default NewsLetter;
