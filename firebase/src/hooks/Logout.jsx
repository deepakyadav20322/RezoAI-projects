import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/AuthSlice"; 

const useLogout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
      
        dispatch(logout());
        console.log("User signed out");
      })
      .catch((error) => {

        console.error("Error during sign-out: ", error.message);
      });
  };

  return handleLogout;
};

export default useLogout;
