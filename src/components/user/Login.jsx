import React, { useContext, useState } from "react";
import "./RegisterF.css";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const {login} = useContext(AppContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email:"",
        password:"",
    })
    const onChangeHandler = (e) =>{
        const {name,value} = e.target;
        setFormData({...formData,[name]:value})
    }
    const {email,password} = formData;
    const submitHandler = async(e) =>{
        e.preventDefault();
        const result = await login(email,password);
        
        if(result.success){
            navigate("/")
        }
        // console.log(formData);

    }

  return (
    <>
      <div className="parent-register">
        <div className="container_register">
          <form onSubmit={submitHandler}>
            <h3>Login</h3>
            <div className="mb-3">
              <input
                name="email"
                value={formData.email}
                onChange={onChangeHandler}
                required
                placeholder="Enter Your Email"
                type="email"
                className="form-control"
                id="exampleInputEmail2"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <input
                name="password"
                value={formData.password}
                onChange={onChangeHandler}
                required
                placeholder="Enter Strong Password"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" className="btn btn-outline-danger btn-register">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
