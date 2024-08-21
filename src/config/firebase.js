import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore/lite";
import { toast } from "react-toastify";

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

const formatErrorCode = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "Email is already in use.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/operation-not-allowed":
      return "Operation not allowed.";
    case "auth/weak-password":
      return "Password is too weak.";
    case "auth/user-not-found":
      return "User not found.";
    case "auth/wrong-password":
      return "Incorrect password.";
    default:
      return "An error occurred. Please try again.";
  }
};

const signup = async (username, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email: email,
      name: "",
      avatar: "",
      bio: "Hey There I am using chat app",
      lastSeen: Date.now(),
    });

    await setDoc(doc(db, "chats", user.uid), {
      chatData: [],
    });

    toast.success("Account created successfully!");
  } catch (error) {
    console.error(error);
    toast.error(formatErrorCode(error.code));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    toast.success("Login successful!");
  } catch (error) {
    console.error(error);
    toast.error(formatErrorCode(error.code));
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logout successful!");
  } catch (error) {
    console.error(error);
    toast.error(formatErrorCode(error.code));
  }
};

export { signup, login, logout, auth, db };
