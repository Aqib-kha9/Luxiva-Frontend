import React from "react";
import "./FooterLinks.css";
const FooterLinks = () => {
  return (
    <>
      <div className="parent-footer-links">
        <div className="brand-name">
          <h3>LUXIVA</h3>
          <p>
            If you are going to use of Lorem Ipsum need to be sure there isn't
            hidden of text
          </p>
        </div>
        <div>
          <h6>Useful Links</h6>
          <li>About Us</li>
          <li>FAQ</li>
          <li>Location</li>
          <li>Affiliates</li>
          <li>Contact</li>
        </div>
        <div>
          <h6>Category</h6>
          <li>Men</li>
          <li>Woman</li>
          <li>Kids</li>
          <li>Best Saller</li>
          <li>New Arrivals</li>
        </div>
        <div>
          <h6>My Account</h6>
          <li>My Account</li>
          <li>Discount</li>
          <li>Returns</li>
          <li>Orders History</li>
          <li>Order Tracking</li>
        </div>
        <div>
          <h6>Contact Info</h6>
          <li>123 Street, Old Trafford, New</li>
          <li>South London , UK</li>
          <li>info@sitename.com</li>
          <li>+ 457 789 789 65</li>
        </div>
      </div>
    </>
  );
};

export default FooterLinks;
