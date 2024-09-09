import React from "react";
import { ThreeDots } from "react-loader-spinner";
import './Loading.css';

function Loading({show}) {
  return show && (
    <div className="loader-container">
      <div className="loader">
        <ThreeDots
          visible={true}
          height="300"
          width="200"
          color="#DADBF1"
          radius="20"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  );
}

export default Loading;