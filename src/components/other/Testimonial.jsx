import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import "./Testimonial.css";
import Slider from "react-slick";

const Testimonial = () => {
  const { testimonials } = useContext(AppContext);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear"
  };
  return (
    <>
      

      
        <div className="testimonial-parent slider-container">
        <h3 style={{ textAlign: "center",marginBottom:"1.5rem", fontWeight:"bold"}}>Our Client Say!</h3>
        <Slider {...settings}>
          {testimonials?.map((testimonial) => (
            <div key={testimonial._id} >
                <div className="testimonial-inner ">
                  <p style={{textAlign: "center",fontWeight:"500",color:"#687188",lineHeight:"2rem"}}>{testimonial?.description}</p>
                  <div className="testi-profile">
                    <img style={{height:"70px",width:"70px"}} src={testimonial?.imgSrc} alt="image" />
                    <div className="d-flex flex-column justify-content-center">
                    <h6>{testimonial?.name}</h6>
                    
                    <h6 style={{color:"red"}}>{testimonial?.designation}</h6>
                    </div>
                    
                  </div>
                </div>
              
            </div>
            
          ))}
          </Slider>
        </div>
    </>
  );
};

export default Testimonial;
