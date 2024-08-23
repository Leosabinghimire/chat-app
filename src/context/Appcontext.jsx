import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import { onSnapshot } from "firebase/firestore";

import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);

  const loadUserData = async (uid, isNewAccount = false) => {
    try {
      const userRef = doc(db, "users", uid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();

      if (userData) {
        setUserData(userData);

        if (isNewAccount) {
          navigate("/profile"); // Navigate to profile if it's a new account
        } else {
          if (userData.avatar && userData.name) {
            navigate("/chat");
          } else {
            navigate("/profile");
          }
        }

        await updateDoc(userRef, { lastSeen: Date.now() });

        setInterval(async () => {
          if (auth.currentUser) {
            await updateDoc(userRef, { lastSeen: Date.now() });
          }
        }, 60000);
      } else {
        // Handle case where no user data is found
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  useEffect(() => {
    if (userData) {
      const chatRef = doc(db, "chats", userData.id);
      const unSub = onSnapshot(chatRef, async (res) => {
        const chatItems = res.data().chatData;
        const tempData = [];
        for (const item of chatItems) {
          const userRef = doc(db, "users", item.rid);
          const usersnap = await getDoc(userRef);
          const userData = usersnap.data();
          tempData.push({ ...item, userData });
        }
        setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
      });
      return () => {
        unSub();
      };
    }
  });

  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
