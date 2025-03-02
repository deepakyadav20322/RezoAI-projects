require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccountKey.json")),
});

const db = admin.firestore();

// Save FCM Token
app.post("/save-token", async (req, res) => {
  const { userId, token } = req.body;
  if (!userId || !token) return res.status(400).json({ error: "Invalid data" });

  await db.collection("users").doc(userId).set({ fcmToken: token }, { merge: true });
  res.status(200).json({ success: true });
});

// Send Notification When Order Status Updates
app.post("/send-notification", async (req, res) => {
  const { userId, status } = req.body;

  const userDoc = await db.collection("users").doc(userId).get();
  if (!userDoc.exists) return res.status(404).json({ error: "User not found" });

  const fcmToken = userDoc.data().fcmToken;
  if (!fcmToken) return res.status(400).json({ error: "FCM Token not found" });

  const message = {
    notification: {
      title: "Order Status Updated",
      body: `Your order status has changed to ${status}`,
    },
    token: fcmToken,
  };

  try {
    await admin.messaging().send(message);
    res.status(200).json({ success: true, message: "Notification sent" });
  } catch (error) {
    res.status(500).json({ error: "Notification failed", details: error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
