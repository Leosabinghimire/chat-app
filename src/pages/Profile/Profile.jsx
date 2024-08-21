import React, { useState } from "react";
import "./Profile.css";
import assets from "../../assets/assets";

const Profile = () => {
  const [image, setImage] = useState(null);

  return (
    <div className="profile">
      <div className="profile-container">
        <form>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={image ? URL.createObjectURL(image) : assets.avatar_icon}
              alt="avatar"
            />
            Upload profile image
          </label>
          <input type="text" placeholder="Your name" required />
          <textarea placeholder="Write profile bio"></textarea>
          <button type="submit">Save</button>
        </form>
        <img
          src={image ? URL.createObjectURL(image) : assets.logo_icon}
          alt="logoicon"
          className="profile-pic"
        />
      </div>
    </div>
  );
};

export default Profile;
