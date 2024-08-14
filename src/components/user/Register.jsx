import React, { useContext, useState } from "react";
import "./RegisterF.css";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const {register} = useContext(AppContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
    })
    const onChangeHandler = (e) =>{
        const {name,value} = e.target;
        setFormData({...formData,[name]:value})
    }
    const {email,password,name} = formData;
    const submitHandler = async(e) =>{
        e.preventDefault();
        const result = await register(name,email,password);
        
        if(result.success){
            navigate("/login")
        }
        console.log(formData);

    }

  return (
    <>
      <div className="parent-register">
        <div className="container_register">
          <form onSubmit={submitHandler}>
            <h3>Create An Account</h3>
            <div className="mb-3 mt-4">
              <input
                name="name"
                value={formData.name}
                onChange={onChangeHandler}
                required
                placeholder="Enter Your Name"
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              {/* <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div> */}
            </div>
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
              {/* <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div> */}
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
            {/* <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div> */}
            <button type="submit" className="btn btn-outline-danger btn-register">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
