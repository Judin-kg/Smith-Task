

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import logo from "../src/assets/1000360388-removebg-preview.png";
// import "./Navabar.css";
// const Navbar = () => {
//   const [cartCount, setCartCount] = useState(0);
//   const user = JSON.parse(localStorage.getItem("user")); // 👈 get logged-in user

//   useEffect(() => {
//     if (user) {
//       fetchCartCount();
//     }
//   }, [user]);

//   // ✅ Fetch cart item count
//   const fetchCartCount = async () => {
//     try {
//       const res = await axios.get(`https://smith-server-qpxw.vercel.app/api/cart/${user._id}`);
//       setCartCount(res.data.length); // assuming backend returns array of items
//     } catch (err) {
//       console.error("❌ Error fetching cart count:", err);
//     }
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
     
//       <Link className="navbar-brand" to="/">
//   <img 
//     src={logo}   // 👈 place your logo inside public/images/
//     alt="Smith Logo" 
//     style={{ height: "40px" }} 
//   />
// </Link>

//       <button
//         className="navbar-toggler"
//         type="button"
//         data-bs-toggle="collapse"
//         data-bs-target="#navbarNav"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       <div className="collapse navbar-collapse" id="navbarNav">
//         <ul className="navbar-nav ms-auto">
//           <li className="nav-item">
//             <Link className="nav-link" to="/manager-login">
//               Manager
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to="/admin-login">
//               Admin
//             </Link>
//           </li>

//           {/* ✅ Cart Button */}
//           {user && (
//             <li className="nav-item">
//               <Link className="nav-link position-relative" to="/cart">
//                 🛒 Cart
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


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../src/assets/1000360388-removebg-preview.png";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔄 Fetch cart count when user exists
  useEffect(() => {
    if (user) {
      fetchCartCount();
    }
  }, [user]);

  // ✨ Glass navbar scroll animation
  useEffect(() => {
    const onScroll = () => {
      const nav = document.querySelector(".glass-navbar");
      if (window.scrollY > 20) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 🛒 Fetch cart items count
  const fetchCartCount = async () => {
    try {
      const res = await axios.get(
        `https://smith-server-qpxw.vercel.app/api/cart/${user._id}`
      );
      setCartCount(res.data.length);
    } catch (err) {
      console.error("Error fetching cart count:", err);
    }
  };

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

          {/* <li className="nav-item">
            <Link className="nav-link" to="/manager-login">
              Manager
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/admin-login">
              Admin
            </Link>
          </li> */}

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
