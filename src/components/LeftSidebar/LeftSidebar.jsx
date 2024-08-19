import React from "react";
import "./LeftSidebar.css";
import assets from "../../assets/assets";

const LeftSidebar = () => {
  return (
    <div className="leftsidebar">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} alt="logo" className="logo" />
          <div className="menu">
            <img src={assets.menu_icon} alt="menuicon" />
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="searchicon" />
          <input type="text" placeholder="Search here.." />
        </div>
      </div>
      <div className="ls-list">
        {Array(12)
          .fill("")
          .map((item, index) => (
            <div key={index} className="friends">
              <img src={assets.profile_img} alt="profile" />
              <div>
                <p>Reason Shrestha</p>
                <span>Hello, How are you?</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
