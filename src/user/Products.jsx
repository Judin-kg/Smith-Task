






// import React, { useEffect, useState } from "react";
// import "../user/Product.css";

// import axios from "axios";


// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [user, setUser] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [subcategories, setSubcategories] = useState([]);
//   const [selectedSubcategory, setSelectedSubcategory] = useState("All");

//   const [stats, setStats] = useState({ usersCount: 0, ordersCount: 0 });
//   const [userGraph, setUserGraph] = useState([]);
//   const [orderGraph, setOrderGraph] = useState([]);

//   useEffect(() => {
//     axios.get("https://smithtask-server.vercel.app/api/dashboard/stats").then((res) => setStats(res.data.data));
//     axios.get("https://smithtask-server.vercel.app/api/dashboard/user-graph").then((res) => setUserGraph(res.data));
//     axios.get("https://smithtask-server.vercel.app/api/dashboard/order-graph").then((res) => setOrderGraph(res.data));
//   }, []);

//   const formatData = (data) =>
//     data.map((d) => ({
//       month: new Date(2025, d._id - 1).toLocaleString("default", { month: "short" }),
//       count: d.count,
//     }));

//   // const userData = formatData(userGraph);
//   // const orderData = formatData(orderGraph);

//   useEffect(() => {
//     fetchProducts();
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     setUser(storedUser);
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("https://smithtask-server.vercel.app/api/products");
//       setProducts(res.data.data);

//       const uniqueCategories = ["All", ...new Set(res.data.data.map((item) => item.category))];
//       setCategories(uniqueCategories);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     }
//   };

// console.log(products,"prooooooooduct");


//   // const handleOrder = async (product) => {
//   //   if (!user) {
//   //     alert("Please login first to place an order.");
//   //     return;
//   //   }

//   //   const orderData = {
//   //     productId: product.productId,
//   //     productName: product.subCategory,
//   //     weight: product.weight,
//   //     mc: product.mc,
//   //     userId: user.id,
//   //     username: user.username,
//   //     email: user.email,
//   //   };

//   //   try {
//   //     const res = await axios.post("http://localhost:3000/api/orders", orderData);
//   //     alert(`✅ Order placed successfully! Order ID: ${res.data.order._id}`);
//   //   } catch (err) {
//   //     if (err.response) {
//   //       alert(err.response.data.message);
//   //     } else {
//   //       alert("❌ Failed to place order.");
//   //     }
//   //   }
//   // };

//   // ✅ When category changes, update subcategories
  
//   const handleOrder = async (product, qty) => {
//   if (!user) {
//     alert("Please login first to place an order.");
//     return;
//   }

//   const orderData = {
//     productId: product.productId,
//     productName: product.subCategory,
//     weight: product.weight,
//     mc: product.mc,
//     userId: user.id,
//     username: user.username,
//     email: user.email,
//     quantity: parseInt(qty, 10),   // ✅ add qty
//   };

//   try {
//     const res = await axios.post("https://smithtask-server.vercel.app/api/orders", orderData);
//     alert(`✅ Order placed successfully! Order ID: ${res.data.order._id}`);
//   } catch (err) {
//     if (err.response) {
//       alert(err.response.data.message);
//     } else {
//       alert("❌ Failed to place order.");
//     }
//   }
// };

  
//   useEffect(() => {
//     if (selectedCategory === "All") {
//       setSubcategories([]);
//       setSelectedSubcategory("All");
//     } else {
//       const subs = [
//         "All",
//         ...new Set(products.filter((p) => p.category === selectedCategory).map((p) => p.subCategory)),
//       ];
//       setSubcategories(subs);
//       setSelectedSubcategory("All");
//     }
//   }, [selectedCategory, products]);

//   // ✅ Filter logic
//   const filteredProducts = products.filter((p) => {
//     if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
//     if (selectedSubcategory !== "All" && p.subCategory !== selectedSubcategory) return false;
//     return true;
//   });

//  // ✅ Add to Cart function
//   // const handleAddToCart = async (item) => {
//   //   if (!user) {
//   //     alert("⚠ Please login first to add items to cart.");
//   //     return;
//   //   }
//   //   try {
//   //     const qty = document.getElementById(`qty-${item._id}`).value;

//   //     await axios.post("http://localhost:3000/api/cart", {
//   //       productId: item._id,
//   //       productName: item.subCategory,
//   //       weight: item.weight,
//   //       mc: item.mc,
//   //       userId: user.id,
//   //       username: user.username,
//   //       email: user.email,
//   //       quantity: parseInt(qty, 10),
//   //     });

//   //     alert("✅ Added to cart successfully!");
//   //   } catch (err) {
//   //     console.error("Error adding to cart:", err);
//   //     alert("❌ Failed to add to cart");
//   //   }
//   // };

//    // ✅ Add to Cart

//   const handleAddToCart = async (product) => {
//     if (!user) {
//       alert("⚠ Please login first!");
//       return;
//     }

//     const qtyInput = document.getElementById(`qty-${product.productId}`);
//     const qty = qtyInput ? parseInt(qtyInput.value) : 1;

//     try {
//       const res = await axios.post("https://smithtask-server.vercel.app/api/cart", {
//         userId: user.id,
//         username: user.username,
//         email: user.email,
//         productId: product.productId,
//         productName: product.subCategory,
//         category:product.category,
//         makingDuration:product.makingDuration,
//         weight: product.weight,
//         mc: product.mc,
//         quantity: qty,
//       });
//       console.log(res,"ressssssssssss");
      
//       alert(res.data.message);
//     } catch (err) {
//       console.error("❌ Add to Cart Error:", err);
//       alert("Failed to add product to cart");
//     }
//   };


//   console.log(stats,"staaaaaaaaaates");
  
// console.log(categories,"categorieeeeeeeees");

//   return (
//     <div className="container-fluid mt-5">
//       <div className="row">
//         {/* ✅ Sidebar */}
//         <div className="col-md-3">
//           {/* <div className="card h-100 p-3">
//             <h4 className="mb-3">SubCategories</h4>
//             {subcategories.length > 0 ? (
//               <ul className="list-group">
//                 {subcategories.map((sub, idx) => (
//                   <li
//                     key={idx}
//                     className={`list-group-item ${selectedSubcategory === sub ? "active" : ""}`}
//                     style={{ cursor: "pointer" }}
//                     onClick={() => setSelectedSubcategory(sub)}
//                   >
//                     {sub}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No SubCategories</p>
//             )}
//           </div> */}
         
//           <div className="card h-100 p-3">
//   <h4 className="mb-3">SubCategories</h4>
//   {subcategories.length > 0 ? (
//     <ul className="list-group">
//       {subcategories.map((sub, idx) => {
//         // Count products under each subcategory
//         const count =
//           sub === "All"
//             ? products.filter((p) =>
//                 selectedCategory === "All" ? true : p.category === selectedCategory
//               ).length
//             : products.filter(
//                 (p) =>
//                   p.category === selectedCategory && p.subCategory === sub
//               ).length;

//         return (
//           <li
//             key={idx}
//             className={`list-group-item d-flex justify-content-between align-items-center ${
//               selectedSubcategory === sub ? "active" : ""
//             }`}
//             style={{ cursor: "pointer" }}
//             onClick={() => setSelectedSubcategory(sub)}
//           >
//             {sub}
//             <span className="badge bg-secondary rounded-pill">{count}</span>
//           </li>
//         );
//       })}
//     </ul>
//   ) : (
//     <p>No SubCategories</p>
//   )}
// </div>


//         </div>
       

//         {/* ✅ Main Content */}
//         <div className="col-md-9">
//           {/* Stats Cards */}

//          {/* Plotly Charts */}

//          {/* Category Buttons */}

//           <div className="category-buttons mb-3">
//             {categories.map((cat, index) => (
//               <button
//                 key={index}
//                 // className={`btn me-2 ${selectedCategory === cat ? "btn-secondary" : "btn-outline-secondary"}`}
//                 onClick={() => setSelectedCategory(cat)}
//                  className={`btn btn-lg rounded-pill shadow-sm px-4 ${
//         selectedCategory === cat ? "btn-secondary" : "btn-outline-secondary"
//       }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>

//           {/* Product Grid */}
//           <ul className="products__grid">
//             {filteredProducts.map((item) => (
//               <li key={item.productId}>
//                 <article className="product-card" data-product-id={item.productId}>
//                   {/* Quantity Input */}
       
                 
//                    <button
//           className="btn btn-primary w-100"
//           onClick={() => {
//             const qty = document.getElementById(`qty-${item.productId}`).value;
//             handleOrder(item, qty);
//           }}
//           aria-label={`Order ${item.subCategory}`}
//         >
//           Order Now
//         </button>
//         <div className="pt-2">
//         <button
//                       className="btn btn-outline-primary w-100"
//                       onClick={() => handleAddToCart(item)}
//                     >
//                       Add to Cart
//                     </button>
// </div>
//                   <div className="product-card__details">
//                     <img
//                       className="product-card__image"
//                       src={item.image}
//                       alt={`${item.subCategory} — ${item.weight}g`}
//                       loading="lazy"
//                     />

//                     <div className="product-card__meta">
//                       <h3 className="product-card__name">{item.subCategory}</h3>
//                       <p className="product-card__row">
//                         <span className="label">Product Name:</span>
//                         <span className="value">{item.productName}</span>
//                       </p>
//                       <p className="product-card__row">
//                         <span className="label">Category:</span>
//                         <span className="value">{item.category}</span>
//                       </p>
//                       <p className="product-card__row">
//                         <span className="label">MC:</span>
//                         <span className="value">{item.mc} g</span>
//                       </p>
//                       <p className="product-card__row">
//                         <span className="label">Product ID:</span>
//                         <span className="value">{item.productId}</span>
//                       </p>
//                       <p className="product-card__row">
//                         <span className="label">MakingDuration:</span>
//                         <span className="value">{item.makingDuration}hr</span>
//                       </p>
//                     </div>
//                   </div>
//                    <div className="mb-2 w-25">
//           <label className="form-label">Qty</label>
//           <input
//             type="number"
//             min="1"
//             defaultValue="1"
//             className="form-control"
//             id={`qty-${item.productId}`}
//           />
//         </div>
//                 </article>
//               </li>
//             ))}
//           </ul>


//              {/* <div className="row g-3 mb-4 pt-4">
//             <div className="col-md-6">
//               <div className="card h-100 text-center">
//                 <div className="card-body">
//                   <h5 className="card-title">Users</h5>
//                   <h2>{stats.userCount}</h2>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-6">
//               <div className="card h-100 text-center">
//                 <div className="card-body">
//                   <h5 className="card-title">Orders</h5>
//                   <h2>{stats.orderCount}</h2>
//                 </div>
//               </div>
//             </div>
//           </div> */}
//                 {/* <div className="card mb-4">
//             <div className="card-body">
//               <h5>User & Order Growth</h5>
//               <Plot
//                 data={[
//                   {
//                     x: userData.map((d) => d.month),
//                     y: userData.map((d) => d.count),
//                     type: "scatter",
//                     mode: "lines+markers",
//                     name: "Users",
//                     line: { color: "blue" },
//                   },
//                   {
//                     x: orderData.map((d) => d.month),
//                     y: orderData.map((d) => d.count),
//                     type: "scatter",
//                     mode: "lines+markers",
//                     name: "Orders",
//                     line: { color: "green" },
//                   },
//                 ]}
//                 layout={{
//                   autosize: true,
//                   height: 400,
//                   margin: { t: 30, r: 30, b: 40, l: 50 },
//                   xaxis: { title: "Month" },
//                   yaxis: { title: "Count" },
//                   legend: { orientation: "h", y: -0.2 },
//                 }}
//                 style={{ width: "100%" }}
//               />
//             </div>
//           </div> */}

//         </div>
//         </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import "../user/Product.css";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");

  // 🔹 Load products + user
  useEffect(() => {
    fetchProducts();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // 🔹 Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://smithtask-server.vercel.app/api/products"
      );
      const data = res.data.data;

      setProducts(data);
      setCategories(["All", ...new Set(data.map((p) => p.category))]);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
    }
  };

  // 🔹 Update subcategories
  useEffect(() => {
    if (selectedCategory === "All") {
      setSubcategories([]);
      setSelectedSubcategory("All");
    } else {
      const subs = [
        "All",
        ...new Set(
          products
            .filter((p) => p.category === selectedCategory)
            .map((p) => p.subCategory)
        ),
      ];
      setSubcategories(subs);
      setSelectedSubcategory("All");
    }
  }, [selectedCategory, products]);

  // 🔹 Filter products
  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== "All" && p.category !== selectedCategory)
      return false;
    if (
      selectedSubcategory !== "All" &&
      p.subCategory !== selectedSubcategory
    )
      return false;
    return true;
  });

  // 🔹 Add to cart
  const handleAddToCart = async (product) => {
    if (!user) {
      alert("⚠ Please login first");
      return;
    }

    const qty =
      parseInt(
        document.getElementById(`qty-${product.productId}`)?.value,
        10
      ) || 1;

    try {
      const res = await axios.post(
        "https://smithtask-server.vercel.app/api/cart",
        {
          userId: user.id,
          username: user.username,
          email: user.email,
          productId: product.productId,
          productName: product.subCategory,
          category: product.category,
          makingDuration: product.makingDuration,
          weight: product.weight,
          mc: product.mc,
          quantity: qty,
        }
      );

      alert(res.data.message);
    } catch (err) {
      console.error("❌ Add to cart error:", err);
      alert("Failed to add to cart");
    }
  };

  // 🔹 Order product
  const handleOrder = async (product, qty) => {
    if (!user) {
      alert("⚠ Please login first");
      return;
    }

    try {
      const res = await axios.post(
        "https://smithtask-server.vercel.app/api/orders",
        {
          productId: product.productId,
          productName: product.subCategory,
          weight: product.weight,
          mc: product.mc,
          quantity: parseInt(qty, 10),
          userId: user.id,
          username: user.username,
          email: user.email,
        }
      );

      alert(`✅ Order placed successfully!\nID: ${res.data.order._id}`);
    } catch (err) {
      console.error("❌ Order error:", err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="card h-100 p-3">
            <h4 className="mb-3">Sub Categories</h4>

            {subcategories.length > 0 ? (
              <ul className="list-group">
                {subcategories.map((sub, idx) => (
                  <li
                    key={idx}
                    className={`list-group-item ${
                      selectedSubcategory === sub ? "active" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedSubcategory(sub)}
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Subcategories</p>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="col-md-9">
          {/* Category buttons */}
          <div className="mb-3">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`btn btn-lg rounded-pill me-2 mb-2 ${
                  selectedCategory === cat
                    ? "btn-secondary"
                    : "btn-outline-secondary"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products grid */}
          <ul className="products__grid">
            {filteredProducts.map((item) => (
              <li key={item.productId}>
                <article className="product-card">
                  <img
                    src={item.image}
                    alt={item.subCategory}
                    className="product-card__image"
                  />

                  <h3>{item.subCategory}</h3>
                  <p>Product Name: {item.productName}</p>
                  <p>Category: {item.category}</p>
                  <p>MC: {item.mc}</p>
                  <p>Duration: {item.makingDuration} hr</p>

                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="form-control mb-2"
                    id={`qty-${item.productId}`}
                  />

                  <button
                    className="btn btn-primary w-100 mb-2"
                    onClick={() =>
                      handleOrder(
                        item,
                        document.getElementById(`qty-${item.productId}`).value
                      )
                    }
                  >
                    Order Now
                  </button>

                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
