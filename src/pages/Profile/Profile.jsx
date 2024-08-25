import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import assets from "../../assets/assets";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import upload from "../../lib/upload";
import { AppContext } from "../../context/Appcontext";

const Profile = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [uid, setUid] = useState(null);
  const { setUserData } = useContext(AppContext);

  const profileUpdate = async (event) => {
    event.preventDefault();
    try {
      if (!prevImage && !image) {
        toast.error("Upload profile picture");
        return;
      }

      if (uid) {
        const docRef = doc(db, "users", uid);

        let updateData = {
          bio: bio,
          name: name,
        };

        if (image) {
          try {
            const imgUrl = await upload(image);
            setPrevImage(imgUrl);
            updateData.avatar = imgUrl;
          } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Error uploading image");
            return;
          }
        }

        await updateDoc(docRef, updateData);

        // Fetch updated data after updating the profile
        const snap = await getDoc(docRef);
        setUserData(snap.data());
        toast.success("Profile updated successfully");
        navigate("/chat");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          setUid(user.uid);
          const docRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(docRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            setName(userData.name || "");
            setBio(userData.bio || "");
            setPrevImage(userData.avatar || "");
          } else {
            console.log("No such document!");
            toast.error("User data not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Error fetching user data");
        }
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <form onSubmit={profileUpdate}>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input
              onChange={handleImageChange}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : prevImage || assets.avatar_icon
              }
              alt="avatar"
            />
            Upload profile image
          </label>
          <input
            onChange={handleNameChange}
            value={name}
            type="text"
            placeholder="Your name"
            required
          />
          <textarea
            onChange={handleBioChange}
            value={bio}
            placeholder="Write profile bio"
          ></textarea>
          <button type="submit">Save</button>
        </form>
        <img
          src={
            image
              ? URL.createObjectURL(image)
              : prevImage
              ? prevImage
              : assets.logo_icon
          }
          alt="logoicon"
          className="profile-pic"
        />
      </div>
    </div>
  );
};

export default Profile;
