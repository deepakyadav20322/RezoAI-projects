import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { setUser, clearUser, setLoading } from "../features/auth/AuthSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User logged in:", user.uid);
        try {
        
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            dispatch(
              setUser({ email: user.email, uid: user.uid, role: userData.role })

            );
            localStorage.setItem("user", JSON.stringify({ email: user.email, uid: user.uid, role: userData.role }));
          }
             
         

          // else {
          //   dispatch(setUser({ email: user.email, uid: user.uid, role: "user" })); // Default role
          // }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        dispatch(clearUser());
        localStorage.removeItem("user");

      }
      // setLoading(false);
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return children;
};

export default AuthProvider;
