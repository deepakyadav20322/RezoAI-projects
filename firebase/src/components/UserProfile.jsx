import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import React from "react";

const UserProfile = ({user,loading}) => {
 
    const handleLogout =async () => {
        try {
          // Sign out from Firebase Auth
          await signOut(auth)
       
          window.location.href = "/login";
          clearUser();
          localStorage.removeItem("user");
          console.log("User signed out");
        }
        catch (error) {
          console.error("Error during sign-out: ", error.message);
        }
          // Navigate to login page after logout
         }
  return (
    <div className="max-w-2xl mx-auto border-2 rounded-xl p-6 flex flex-col items-center justify-between bg-white shadow-md">
       <div className="flex justify-between w-full items-center">
        
      <div className="flex flex-col items-center">
        <p className="italic text-gray-600 text-sm mb-2">USER INFORMATION:</p>
        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-5xl">🧑</span>
        </div>
      </div>

    
      <div className="border-2 rounded-md p-4 bg-gray-100">
        <pre className="text-sm text-gray-800">
          {JSON.stringify({ user }, null, 2)}
        </pre>
      </div>
      <div>
      </div>
    </div>
    <div className="flex flex-row items-center justify-center gap-10 my-3">
      {!loading && user &&<div className=' text-lg font-medium bg-slate-300 px-3 text-black py-2 rounded-xl flex justify-center'>ROLE:{" "} <span className="text-red-500 px-2">{user.role}</span> </div>}
      <button onClick={handleLogout} className="  px-2 py-2 border-2 text-lg  rounded-md bg-gray-100 hover:bg-gray-200">
        LOGOUT
      </button>
      </div>
    </div>
  );
};

export default UserProfile;
