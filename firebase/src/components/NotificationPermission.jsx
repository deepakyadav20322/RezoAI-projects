import React, { useEffect } from "react";
import { messaging, db } from "../firebase";
import { getToken } from "firebase/messaging";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const NotificationPermission = () => {
  const user = JSON.parse(localStorage?.getItem("user"));

  async function requestPermission() {
    if (!user) return;

    const userDocRef = doc(db, "users", user.uid);

    // 🔹 Step 1: Get the existing FCM token from Firestore
    const userDocSnap = await getDoc(userDocRef);
    const existingToken = userDocSnap.exists() ? userDocSnap.data().fcmToken : null;

    if (existingToken) {
      console.log("FCM token already exists:", existingToken);
      return; // 🔹 If token exists, stop here (no need to request a new one)
    }

    // 🔹 Step 2: Ask for Notification Permission
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("You denied notification permission");
      return;
    }

    // 🔹 Step 3: Generate and Store the FCM Token
    const token = await getToken(messaging, {
      vapidKey: "BMLxkXgQgU_m5I4kCa4r2NphEXwEaO81pk-Wi-vXb3ks36rCyQQ5IJJjRMfkGHXSHIw_O2Zo9e2V7FHdGEaeRQA",
    });

    console.log("New Token Generated:", token);
    await updateDoc(userDocRef, { fcmToken: token });
  }

  useEffect(() => {
    requestPermission();
  }, []);

  return <div></div>;
};

export default NotificationPermission;
