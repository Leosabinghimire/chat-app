import React from "react";
import "./RightSidebar.css";
import assets from "../../assets/assets";
import { logout } from "../../config/firebase";

const RightSidebar = () => {
  return (
    <div className="rightside">
      <div className="rs-profile">
        <img src={assets.profile_img} alt="profile" />
        <h3>
          Reason Shrestha{" "}
          <img src={assets.green_dot} alt="greendot" className="dot" />
        </h3>
        <p>Hey, There i am Reason Shrestha.</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
        </div>
      </div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default RightSidebar;
