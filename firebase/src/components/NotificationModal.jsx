// import { useEffect, useState } from "react";
// import { fetchUnreadNotifications } from "./fetchNotifications";

// const NotificationsModal = ({ userId }) => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const getNotifications = async () => {
//       const unreadNotifications = await fetchUnreadNotifications(userId);
//       setNotifications(unreadNotifications);
//     };

//     getNotifications();
//   }, [userId]);

//   return (
//     <div className="modal">
//       <h2>Notifications</h2>
//       {notifications.length > 0 ? (
//         notifications.map((notif) => (
//           <p key={notif.id}>{notif.message}</p>
//         ))
//       ) : (
//         <p>No new notifications</p>
//       )}
//     </div>
//   );
// };

// export default NotificationsModal;
