import React from "react";
import "./Chatbox.css";
import assets from "../../assets/assets";

const Chatbox = () => {
  return (
    <div className="chatbox">
      <div className="chat-user">
        <img src={assets.profile_img} alt="profile" />
        <p>
          Reason Shrestha{" "}
          <img src={assets.green_dot} alt="onlinedot" className="dot" />
        </p>
        <img src={assets.help_icon} alt="help" className="help" />
      </div>

      <div className="chat-msg">
        <div className="s-msg">
          <p className="msg">Hello k xa sathi haha ....</p>
          <div>
            <img src={assets.profile_img} alt="profile" />
            <p>2:30 PM</p>
          </div>
        </div>
        <div className="s-msg">
          <img src={assets.pic1} alt="pic1" className="msg-img" />
          <div>
            <img src={assets.profile_img} alt="profile" />
            <p>2:30 PM</p>
          </div>
        </div>
        <div className="r-msg">
          <p className="msg">
            Hello k xa sathi haha. Momo khana jane haina ta hahah 😁
          </p>
          <div>
            <img src={assets.profile_img} alt="profile" />
            <p>2:30 PM</p>
          </div>
        </div>
      </div>

      <div className="chat-input">
        <input type="text" placeholder="send a message" />
        <input type="file" id="image" accept="image/png, image/jpeg" hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="gallery" />
        </label>
        <img src={assets.send_button} alt="send" />
      </div>
    </div>
  );
};

export default Chatbox;
