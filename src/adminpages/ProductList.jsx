





// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../adminpages/ProductList.css";
// import ProductFormModal from "./ProductFormModal";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   // const [product, setProduct] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [smiths, setSmiths] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterCategory, setFilterCategory] = useState("");
//   const [filterSmith, setFilterSmith] = useState("");
//   // Fetch products from backend
//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//     fetchsubCategories();
//     fetchSmiths();
//   }, []);

//   const fetchsubCategories = async () => {
//     try {
//       const res = await axios.get("https://smithtask-server.vercel.app/api/subcategories");
//       setSubcategories(res.data); // backend should return [{_id, name}]
//       console.log(res.data, " categories fetched");
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get("https://smithtask-server.vercel.app/api/categories");
//       setCategories(res.data.data); // backend should return [{_id, name}]
//       console.log(res.data.data, " categories fetched");
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//     }
//   };

//   const fetchSmiths = async () => {
//     try {
//       const res = await axios.get("https://smithtask-server.vercel.app/api/smiths");
//       setSmiths(res.data.data);
//     } catch (err) {
//       console.error("Error fetching smiths:", err);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("https://smithtask-server.vercel.app/api/products");
//       setProducts(res.data.data); 
//       console.log(res.data.data," products fetched"); // Log products to verify
//       // backend should return array of products
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     }
//   };
//   console.log(products,"productsssssssssss");
  
//   // Save new product (POST request)
//   const handleSaveProduct = async (data) => {
//     try {
//       const res = await axios.get("https://smithtask-server.vercel.app/api/products", data);
//       setProducts([...products, res.data]);
//       console.log("Product saved:", res.data); // Log saved product
      
//        // append new product
//       setShowForm(false);
//     } catch (err) {
//       console.error("Error saving product:", err);
//     }
//   };

//     // Delete product
//   const handleDeleteProduct = async (id) => {
//     try {
//       await axios.delete(`https://smithtask-server.vercel.app/api/products/${id}`);
//       setProducts(products.filter((p) => p._id !== id));
//       console.log("Product deleted:", id);
//     } catch (err) {
//       console.error("Error deleting product:", err);
//     }
//   };

//    // Apply search + filter
//   const filteredProducts = products.filter((item) => {
//     const matchSearch =
//       item.smithName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.subCategory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.productId?.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchCategory = filterCategory ? item.category === filterCategory : true;
//     const matchSmith = filterSmith ? item.smithName === filterSmith : true;

//     return matchSearch && matchCategory && matchSmith;
//   });


//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">Product List</h2>
//        {/* Search & Filter Options */}
//       <div className="row mb-3">
//         <div className="col-md-4">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search by name, category, product ID..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="col-md-3">
//           <select
//             className="form-select"
//             value={filterCategory}
//             onChange={(e) => setFilterCategory(e.target.value)}
//           >
//             <option value="">All Categories</option>
//             {categories.map((cat) => (
//               <option key={cat._id} value={cat.name}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-3">
//           <select
//             className="form-select"
//             value={filterSmith}
//             onChange={(e) => setFilterSmith(e.target.value)}
//           >
//             <option value="">All Smiths</option>
//             {smiths.map((s) => (
//               <option key={s._id} value={s.name}>
//                 {s.name}
//               </option>
//             ))}
//           </select>
//           </div>
//           </div>
//       <div className="d-flex justify-content-end mb-3">
//         <button className="btn btn-primary" onClick={() => setShowForm(true)}>
//           + Add New Product
//         </button>
//       </div>

//       {/* Product Table */}
//       {/* <table className="table table-striped table-bordered table-hover">
//         <thead className="table-dark">
//           <tr>
//             <th>#</th>
//             <th>Smith Name</th>
//             <th>Category</th>
//             <th>Sub Category</th>
//             <th>MC</th>
//             <th>Weight (g)</th>
//             <th>Product Number</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((item, index) => (
//               <tr key={index}>
//                  <td>{index + 1}</td>
//                 <td>{item.smithName}</td>
//                 <td>{item.category}</td>
//                 <td>{item.subCategory}</td>
//                 <td>{item.mc}</td>
//                 <td>{item.weight}</td>
//                 <td>{item.productId}</td>
//                  <td>
//                   <button
//                     className="btn btn-sm btn-warning me-2"
//                     // onClick={() => handleEditProduct(item)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="btn btn-sm btn-danger"
//                     onClick={() => handleDeleteProduct(item._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>

                
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5" className="text-center">
//                 No products available
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table> */}
//       {/* Product Table */}
// <div className="table-wrapper">
//   <table className="table table-striped table-bordered table-hover">
//     <thead className="table-dark">
//       <tr>
//         <th>#</th>
//         <th>Smith Name</th>
//         <th>Product Name</th>
//         <th>Category</th>
//         <th>Sub Category</th>
//         <th>MC</th>
//         <th>Weight (g)</th>
//         <th>Product Number</th>
//         <th>Actions</th>
//       </tr>
//     </thead>
//     <tbody>
//       {filteredProducts.length > 0 ? (
//         filteredProducts.map((item, index) => (
//           <tr key={index}>
//             <td>{index + 1}</td>
//             <td>{item.smithName}</td>
//             <td>{item.productName}</td>
//             <td>{item.category}</td>
//             <td>{item.subCategory}</td>
//             <td>{item.mc}</td>
//             <td>{item.weight}</td>
//             <td>{item.productId}</td>
//             <td>
//               <button
//                 className="btn btn-sm btn-warning me-2"
//                 // onClick={() => handleEditProduct(item)}
//               >
//                 Edit
//               </button>
//               <button
//                 className="btn btn-sm btn-danger"
//                 onClick={() => handleDeleteProduct(item._id)}
//               >
//                 Delete
//               </button>
//             </td>
//           </tr>
//         ))
//       ) : (
//         <tr>
//           <td colSpan="8" className="text-center">
//             No products available
//           </td>
//         </tr>
//       )}
//     </tbody>
//   </table>
// </div>


//       {/* Separate Modal Component */}
//       <ProductFormModal
//         show={showForm}
//         onClose={() => setShowForm(false)}
//         onSave={handleSaveProduct}
//         categories={categories}
//         smiths={smiths}
//         subcategories={subcategories}
//       />
//     </div>
//   );
// };

// export default ProductList;






import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../adminpages/ProductList.css";
import ProductFormModal from "./ProductFormModal";
import UpdateProductFormModal from "./UpdateProductFormModal";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [smiths, setSmiths] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSmith, setFilterSmith] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSubCategories();
    fetchSmiths();
  }, []);

  /* ================= FETCH ================= */

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://smithtask-server.vercel.app/api/products"
      );
      setProducts(res.data.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://smithtask-server.vercel.app/api/categories"
      );
      setCategories(res.data.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const res = await axios.get(
        "https://smithtask-server.vercel.app/api/subcategories"
      );
      setSubcategories(res.data);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
    }
  };

  const fetchSmiths = async () => {
    try {
      const res = await axios.get(
        "https://smithtask-server.vercel.app/api/smiths"
      );
      setSmiths(res.data.data);
    } catch (err) {
      console.error("Error fetching smiths:", err);
    }
  };

  /* ================= ACTIONS ================= */

  const handleSaveProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
    setShowForm(false);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowEditForm(true);
  };

  const handleUpdatedProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) =>
        p._id === updatedProduct._id ? updatedProduct : p
      )
    );
    setShowEditForm(false);
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(
        `https://smithtask-server.vercel.app/api/products/${id}`
      );
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  /* ================= FILTER ================= */

  const filteredProducts = products.filter((item) => {
    const matchSearch =
      item.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.smithName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productId?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchCategory = filterCategory
      ? item.category === filterCategory
      : true;

    const matchSmith = filterSmith
      ? item.smithName === filterSmith
      : true;

    return matchSearch && matchCategory && matchSmith;
  });

  /* ================= UI ================= */

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Product List</h2>

      {/* Search & Filters */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Search product, smith, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={filterSmith}
            onChange={(e) => setFilterSmith(e.target.value)}
          >
            <option value="">All Smiths</option>
            {smiths.map((s) => (
              <option key={s._id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2 text-end">
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Smith</th>
              <th>Product</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>MC</th>
              <th>Weight</th>
              <th>Product ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length ? (
              filteredProducts.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.smithName}</td>
                  <td>{item.productName}</td>
                  <td>{item.category}</td>
                  <td>{item.subCategory}</td>
                  <td>{item.mc}</td>
                  <td>{item.weight}</td>
                  <td>{item.productId}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEditProduct(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteProduct(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      <ProductFormModal
        show={showForm}
        onClose={() => setShowForm(false)}
        onSave={handleSaveProduct}
        categories={categories}
        smiths={smiths}
        subcategories={subcategories}
      />

      {/* Update Modal */}
      <UpdateProductFormModal
        show={showEditForm}
        onClose={() => setShowEditForm(false)}
        product={selectedProduct}
        onUpdate={handleUpdatedProduct}
        categories={categories}
        smiths={smiths}
        subcategories={subcategories}
      />
    </div>
  );
};

export default ProductList;


