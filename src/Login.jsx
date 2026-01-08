


// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import "./Login.css";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const res = await axios.post(
//         "https://smith-server-qpxw.vercel.app/api/auth/login",
//         formData
//       );

//       const { token, user } = res.data;

//       if (user.status === "blocked") {
//         setMessage("Your account has been blocked by the admin.");
//         return;
//       }

//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));

//       user.role === "admin" ? navigate("/admin") : navigate("/dashboard");
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="login-bg">
//       <div className="login-card">
//         <h2 className="login-title">Welcome Back</h2>
//         <p className="login-subtitle">Sign in to continue</p>

//         {message && <div className="alert alert-danger">{message}</div>}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <input
//               name="email"
//               type="email"
//               placeholder="Email Address"
//               className="form-control glass-input"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               name="password"
//               type="password"
//               placeholder="Password"
//               className="form-control glass-input"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <button className="btn login-btn w-100" type="submit">
//             Login
//           </button>
//         </form>

//         <div className="mt-3 text-center text-light">
//           Don’t have an account?{" "}
//           <Link to="/signup" className="signup-link">
//             Sign Up
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        "https://smithtask-server.vercel.app/api/auth/login",
        formData
      );

      const { token, user } = res.data;

      // 🚫 Blocked user check
      if (user.status === "blocked") {
        setMessage("Your account has been blocked by the admin.");
        return;
      }

      // ✅ Save auth data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      console.log(user.role,"rooooooooooole");
      
      // 🎯 ROLE BASED REDIRECT
      switch (user.role) {
         
         case "manager":
          navigate("/manager");
          break;


        case "admin":
          navigate("/admin");
          break;

        // case "manager":
        //   navigate("/manager");
        //   break;

        case "user":
          navigate("/dashboard");
          break;

        default:
          setMessage("Invalid user role. Contact support.");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to continue</p>

        {message && <div className="alert alert-danger">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="form-control glass-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="form-control glass-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn login-btn w-100" type="submit">
            Login
          </button>
        </form>

        <div className="mt-3 text-center text-light">
          Don’t have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

