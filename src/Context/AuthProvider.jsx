import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";

import { GoogleAuthProvider } from "firebase/auth";
import auth from "../Firebase/firebase.init";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [useCode, setUseCode] = useState([]);

  const googleProvider = new GoogleAuthProvider();

  const SignUpEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const SignInEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const SignInGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const Update_information = (name, photo) => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(true);
      // setLoginEmail(currentUser.email)
    });
    return () => {
      unSubscribe();
    };
  }, []);
  const AuthInfo = {
    user,
    setUser,
    SignInEmailAndPassword,
    SignUpEmailAndPassword,
    handleSignOut,
    SignInGoogle,
    Update_information,
    loading,
    loginEmail,
    setLoginEmail,
    useCode,
    setUseCode,
  };
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
