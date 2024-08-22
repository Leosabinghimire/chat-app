import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import assets from "../../assets/assets";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import upload from "../../lib/upload"; // Adjust the import based on your export method
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

        if (image) {
          try {
            const imgUrl = await upload(image); // Ensure 'image' is valid and upload function is async
            setPrevImage(imgUrl);
            await updateDoc(docRef, {
              avatar: imgUrl,
              bio: bio,
              name: name,
            });
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        } else {
          await updateDoc(docRef, {
            bio: bio,
            name: name,
          });
        }

        // Fetch updated data after updating the profile
        const snap = await getDoc(docRef);
        setUserData(snap.data());
        navigate("/chat");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      onAuthStateChanged(auth, async (user) => {
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
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        } else {
          navigate("/");
        }
      });
    };

    fetchUserData();
  }, [navigate]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
