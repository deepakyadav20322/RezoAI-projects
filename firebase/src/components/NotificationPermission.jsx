// import React, { useEffect } from "react";
// import { messaging, db } from "../firebase";
// import { getToken } from "firebase/messaging";
// import { doc, getDoc, updateDoc } from "firebase/firestore";

// const NotificationPermission = () => {
//   const user = JSON.parse(localStorage?.getItem("user"));

//   async function requestPermission() {
//     console.log("Requesting permission");
//     if (!user) return;

//     const userDocRef = doc(db, "users", user.uid);

//     // 🔹 Step 1: Get the existing FCM token from Firestore
//     const userDocSnap = await getDoc(userDocRef);
//     const existingToken = userDocSnap.exists() ? userDocSnap.data().fcmToken : null;
  

//     if (existingToken) {
//       console.log("FCM token already exists:", existingToken);
//       return; // 🔹 If token exists, stop here (no need to request a new one)
//     }

//     // 🔹 Step 2: Ask for Notification Permission
//     const permission = await Notification.requestPermission();
//     console.log("Notification permission status:", permission);
//     if (permission !== "granted") {
//       alert("You denied notification permission");
//       return;
//     }

//     // 🔹 Step 3: Generate and Store the FCM Token
//     const token = await getToken(messaging, {
//       vapidKey: "BMLxkXgQgU_m5I4kCa4r2NphEXwEaO81pk-Wi-vXb3ks36rCyQQ5IJJjRMfkGHXSHIw_O2Zo9e2V7FHdGEaeRQA",
//     });

//     console.log("New Token Generated:", token);
//     await updateDoc(userDocRef, { fcmToken: token });
//   }

//   useEffect(() => {
//     requestPermission();
//   }, []);

//   return <div></div>;
// };

// export default NotificationPermission;



import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../firebase";

// Request permission and get the FCM token
export const requestForToken = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
  try {
  
    const currentToken = await getToken(messaging, {
      vapidKey: "BMLxkXgQgU_m5I4kCa4r2NphEXwEaO81pk-Wi-vXb3ks36rCyQQ5IJJjRMfkGHXSHIw_O2Zo9e2V7FHdGEaeRQA",
    });
    console.log(currentToken)
    if (currentToken) {
      console.log("Current token for client: ", currentToken);
      // Send the token to your server for future use
    } else {
      console.log("No registration token available. Request permission to generate one.");
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
  }
}
};

// Listen for incoming messages while the app is in the foreground
// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => (
//       resolve(payload)
//     ));
//   });

 