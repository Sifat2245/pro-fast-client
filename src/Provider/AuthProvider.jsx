import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "../Context/AuthContext";
import { auth } from "../Firebase/firebase.init";
import { useEffect, useState } from "react";

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () =>{
    setLoading(true)
    return signInWithPopup(auth,  googleProvider)
  }

  const logOut = () =>{
    setLoading(true)
    return signOut(auth)
  }

  const updateUser = profileInfo =>{
    return  updateProfile(auth.currentUser, profileInfo)
  }
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);


  const userInfo = {
    createUser,
    loginUser,
    logOut,
    signInWithGoogle,
    loading,
    user,
    updateUser
  };

  return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
