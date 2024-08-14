import React, { useContext, useState } from "react";
import "../user/RegisterF.css";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const Address = () => {
  const { shippingAddress,userAddress } = useContext(AppContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    pinCode: "",
    phoneNumber: "",
    state: "",
    country:"",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { fullName,address,city,pinCode,phoneNumber,state,country} = formData;
  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await shippingAddress(fullName,address,city,pinCode,phoneNumber,state,country);

    if (result.success) {
      navigate("/checkout");
    }
    console.log(formData);
    setFormData({
      fullName: "",
      address: "",
      city: "",
      pinCode: "",
      phoneNumber: "",
      state: "",
      country:"",
    })
  };

  return (
    <>
      <div className="parent-register mt-5 row">
        <div className="container_register shipping-container col-8">
          <form onSubmit={submitHandler}>
            <h3>Shipping Address</h3>
            <div className="row">
            <div className=" mt-4 col-md-6">
              <input
                name="fullName"
                value={formData.fullName}
                onChange={onChangeHandler}
                required
                placeholder="Full Name *"
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              
            </div>
            <div className="mt-4 col-md-6">
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChangeHandler}
                required
                placeholder="Phone No. *"
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              
            </div>
            </div>
            
            <div className="mb-3 col">
              <input
                name="address"
                value={formData.address}
                onChange={onChangeHandler}
                required
                placeholder="AddressLine/nearby *"
                type="text"
                className="form-control"
                id="exampleInputEmail2"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="row">
              <div className=" col-md-6">
                <input
                  name="country"
                  value={formData.country}
                  onChange={onChangeHandler}
                  required
                  placeholder="Country *"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail2"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className=" col-md-6">
                <input
                  name="state"
                  value={formData.state}
                  onChange={onChangeHandler}
                  required
                  placeholder="State *"
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <input
                  name="city"
                  value={formData.city}
                  onChange={onChangeHandler}
                  required
                  placeholder="City *"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail2"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="col-md-6">
                <input
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={onChangeHandler}
                  required
                  placeholder="Pin Code *"
                  type="number"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
            </div>
            <div className="d-flex gap-4">
              {userAddress&& (
                <button
                  type="submit"
                  className="btn btn-outline-danger btn-register"
                  onClick={()=>navigate("/checkout")}
                >
                  Use Old Address
                </button>

              )}
              <button
                type="submit"
                className="btn btn-outline-danger btn-register"
              >
                Submit
              </button>
            </div>
            
            
          </form>
        </div>
      </div>
    </>
  );
};

export default Address;
