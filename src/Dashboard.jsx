// import React, { useEffect, useState } from 'react';

// import axios from 'axios';
// import Ads from './user/Ads';
// import Products from './user/Products';

// const Dashboard = () => {
//   const [username, setUsername] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       window.location.href = '/login'; // Redirect if not logged in
//       return;
//     }

//     axios
//       .get('https://smithtask-server.vercel.app/api/user/profile', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         setUsername(res.data.username);
//       })
//       .catch((err) => {
//         localStorage.removeItem('token');
//         setError('Session expired or unauthorized');
//         setTimeout(() => {
//           window.location.href = '/login';
//         }, 2000);
//       });
//   }, []);

//   return (
//     <div className="container mt-5">
//      <Ads />
//      <Products />
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from "react";
import axios from "axios";
import Ads from "./user/Ads";
import Products from "./user/Products";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios
      .get("https://smithtask-server.vercel.app/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsername(res.data.username);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setError("Session expired. Redirecting to login...");
        setLoading(false);

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {error && <p className="text-danger">{error}</p>}

      {username && (
        <h5 className="mb-4">
          Welcome, <strong>{username}</strong> 👋
        </h5>
      )}

      <Ads />
      <Products />
    </div>
  );
};

export default Dashboard;
