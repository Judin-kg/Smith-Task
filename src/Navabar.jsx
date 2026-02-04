



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import logo from "../src/assets/logo1.png";

// const Navbar = () => {
//   const [cartCount, setCartCount] = useState(0);
//   const user = JSON.parse(localStorage.getItem("user"));

//   // 🔄 Fetch cart count when user exists
//   useEffect(() => {
//     if (user) {
//       fetchCartCount();
//     }
//   }, [user]);

//   // ✨ Glass navbar scroll animation
//   useEffect(() => {
//     const onScroll = () => {
//       const nav = document.querySelector(".glass-navbar");
//       if (window.scrollY > 20) {
//         nav.classList.add("scrolled");
//       } else {
//         nav.classList.remove("scrolled");
//       }
//     };
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // 🛒 Fetch cart items count
//   const fetchCartCount = async () => {
//     try {
//       const res = await axios.get(
//         `https://smith-server-qpxw.vercel.app/api/cart/${user._id}`
//       );
//       setCartCount(res.data.length);
//     } catch (err) {
//       console.error("Error fetching cart count:", err);
//     }
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark px-4 glass-navbar">
//       {/* LOGO */}
//       <Link className="navbar-brand" to="/">
//         <img
//           src={logo}
//           alt="Smith Jewellery"
//           style={{ height: "42px"}}
//         />
//       </Link>

//       {/* TOGGLER */}
//       <button
//         className="navbar-toggler"
//         type="button"
//         data-bs-toggle="collapse"
//         data-bs-target="#navbarNav"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       {/* LINKS */}
//       <div className="collapse navbar-collapse" id="navbarNav">
//         <ul className="navbar-nav ms-auto align-items-lg-center">

//           {/* <li className="nav-item">
//             <Link className="nav-link" to="/manager-login">
//               Manager
//             </Link>
//           </li>

//           <li className="nav-item">
//             <Link className="nav-link" to="/admin-login">
//               Admin
//             </Link>
//           </li> */}

//           {/* 🛒 CART */}
//           {user && (
//             <li className="nav-item">
//               <Link
//                 className="nav-link position-relative d-flex align-items-center"
//                 to="/cart"
//               >
//                 <span style={{ fontSize: "18px" }}>🛒</span>
//                 <span className="ms-1">Cart</span>

//                 {cartCount > 0 && (
//                   <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>
//             </li>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../src/assets/logo1.png";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  // 🛒 Fetch cart items count
  const fetchCartCount = useCallback(async () => {
    if (!user) return;

    try {
      const res = await axios.get(
        `https://smith-server-qpxw.vercel.app/api/cart/${user._id}`
      );
      setCartCount(res.data.length);
    } catch (err) {
      console.error("Error fetching cart count:", err);
    }
  }, [user]);

  // 🔄 Fetch cart count when user exists
  useEffect(() => {
    fetchCartCount();
  }, [fetchCartCount]);

  // ✨ Glass navbar scroll animation
  useEffect(() => {
    const onScroll = () => {
      const nav = document.querySelector(".glass-navbar");
      if (!nav) return;

      if (window.scrollY > 20) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-4 glass-navbar">
      {/* LOGO */}
      <Link className="navbar-brand" to="/">
        <img
          src={logo}
          alt="Smith Jewellery"
          style={{ height: "42px" }}
        />
      </Link>

      {/* TOGGLER */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* LINKS */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-lg-center">

          {/* 🛒 CART */}
          {user && (
            <li className="nav-item">
              <Link
                className="nav-link position-relative d-flex align-items-center"
                to="/cart"
              >
                <span style={{ fontSize: "18px" }}>🛒</span>
                <span className="ms-1">Cart</span>

                {cartCount > 0 && (
                  <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
