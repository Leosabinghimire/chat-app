import React from "react";
import "./LeftSidebar.css";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { collection, getDoc, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

const LeftSidebar = () => {
  const navigate = useNavigate("");

  const inputHandler = async (e) => {
    try {
      const input = e.target.value;
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", input.toLowerCase()));
      const querySnap = await getDoc(q);
      if (!querySnap.empty) {
        console.log(querySnap.docs[0].data());
      }
    } catch (error) {}
  };

  return (
    <div className="leftsidebar">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} alt="logo" className="logo" />
          <div className="menu">
            <img src={assets.menu_icon} alt="menuicon" />
            <div className="sub-menu">
              <p onClick={() => navigate("/profile")}>Edit Profile</p>
              <hr />
              <p>Logout</p>
            </div>
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
