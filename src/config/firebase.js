import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDYAYIlD6i1L4B8ciWeYqaJMHWtVcuySzw",
  authDomain: "chat-app-d9896.firebaseapp.com",
  projectId: "chat-app-d9896",
  storageBucket: "chat-app-d9896.appspot.com",
  messagingSenderId: "509096276336",
  appId: "1:509096276336:web:a06adf3d647e9ef1b61fb5",
  measurementId: "G-X4PVCF36K7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Format Firebase error codes into user-friendly messages
const formatErrorCode = (code) => {
  switch (code) {
    case "auth/user-not-found":
      return "No user found with this email address. Please check your email or sign up.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/email-already-in-use":
      return "Email is already in use.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/operation-not-allowed":
      return "Operation not allowed.";
    case "auth/weak-password":
      return "Password is too weak.";
    default:
      return "An error occurred. Please try again.";
  }
};

// Signup function
const signup = async (username, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email: email,
      name: "",
      avatar: "",
      bio: "Hey There I am using chat app",
      lastSeen: Date.now(),
    });

    // Create an empty chat document for the user
    await setDoc(doc(db, "chats", user.uid), {
      chatsData: [],
    });

    toast.success("Account created successfully!");
    return { user, error: null };
  } catch (error) {
    console.error("Signup error:", error);
    toast.error(formatErrorCode(error.code));
    return { user: null, error: error.code };
  }
};

// Login function with chat data fetching
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Fetch chat data after successful login
    const chatData = await fetchChatData(user.uid);
    console.log("Chat data fetched:", chatData);

    toast.success("Login successful!");
    return { user, chatData, error: null };
  } catch (error) {
    console.error("Login error:", error);
    toast.error(formatErrorCode(error.code));
    return { user: null, chatData: [], error: error.code };
  }
};

// Fetch chat data function
const fetchChatData = async (userId) => {
  try {
    const docRef = doc(db, "chats", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.chatsData || [];
    } else {
      console.log("No chat document found for user:", userId);
      // Create an empty chat document if it doesn't exist
      await setDoc(docRef, { chatsData: [] });
      return [];
    }
  } catch (error) {
    console.error("Error fetching chat data:", error);
    return [];
  }
};

// Logout function
const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logout successful!");
    return { error: null };
  } catch (error) {
    console.error("Logout error:", error);
    toast.error(formatErrorCode(error.code));
    return { error: error.code };
  }
};

export { signup, login, logout, fetchChatData, auth, db };
