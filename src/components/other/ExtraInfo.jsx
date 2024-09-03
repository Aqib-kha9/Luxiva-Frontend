import React from 'react'
import "./ExtraInfo.css"
const ExtraInfo = () => {
  return (
    <div className='parent-info'>
        <div className='inner-info'>

        <div className="free-delivery d-flex flex-column align-items-center gap-2">
            <i style={{fontSize:"3rem", color:"grey"}} className="fa-solid fa-truck"></i>
            <h4>Free Delivery</h4>
            <p style={{textAlign: "center",fontWeight:"500",color:"#687188",}}>If you are going to use of Lorem, you need to be sure there anything</p>
        </div>
        <hr />
        <div className="return d-flex flex-column align-items-center gap-2">
            <i style={{fontSize:"3rem", color:"grey"}} className="fa-solid fa-hand-holding-dollar"></i>
            <h4>30 Day Return</h4>
            <p style={{textAlign: "center",fontWeight:"500",color:"#687188",}}>If you are going to use of Lorem, you need to be sure there anything</p>
        </div>
        <hr />
        <div className="support d-flex flex-column align-items-center gap-2">
            <i style={{fontSize:"3rem", color:"grey"}} className="fa-solid fa-headset"></i>
            <h4>27/4 Support</h4>
            <p style={{textAlign: "center",fontWeight:"500",color:"#687188",}}>If you are going to use of Lorem, you need to be sure there anything</p>
        </div>

        </div>
    </div>
  )
}

export default ExtraInfo