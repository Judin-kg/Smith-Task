import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const UpdateProductFormModal = ({
  show,
  onClose,
  onUpdate,
  product,
  categories,
  subcategories,
  smiths,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Cloudinary config
  const cloudName = "djuihd2af";
  const uploadPreset = "rjatlas";

  /* =========================
     Prefill form on open
  ========================= */
  useEffect(() => {
    if (product) {
      setValue("productName", product.productName);
      setValue("smithName", product.smithName);
      setValue("category", product.category);
      setValue("subCategory", product.subCategory);
      setValue("mc", product.mc);
      setValue("makingDuration", product.makingDuration);
      setValue("weight", product.weight);
      setPreviewImage(product.image);
    }
  }, [product, setValue]);

  /* =========================
     Upload Image to Cloudinary
  ========================= */
  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    return result.secure_url;
  };

  /* =========================
     Submit Update
  ========================= */
  const onSubmit = async (data) => {
    try {
      setUploading(true);

      let imageUrl = product.image;

      if (data.image && data.image[0]) {
        imageUrl = await uploadImageToCloudinary(data.image[0]);
      }

      const updatedProduct = {
        productName: data.productName,
        smithName: data.smithName,
        category: data.category,
        subCategory: data.subCategory,
        mc: data.mc,
        makingDuration: data.makingDuration,
        weight: data.weight,
        image: imageUrl,
      };

      const res = await axios.put(
        `https://smithtask-server.vercel.app/api/products/${product._id}`,
        updatedProduct
      );

      if (res.data.success) {
        alert("✅ Product updated");
        onUpdate(res.data.data);
        reset();
        onClose();
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("❌ Failed to update product");
    } finally {
      setUploading(false);
    }
  };

  if (!show || !product) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Product</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              
              {/* Product Name */}
              <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input
                  className="form-control"
                  {...register("productName", { required: "Required" })}
                />
                {errors.productName && (
                  <small className="text-danger">{errors.productName.message}</small>
                )}
              </div>

              {/* Smith */}
              <div className="mb-3">
                <label className="form-label">Smith</label>
                <select className="form-select" {...register("smithName")}>
                  {smiths.map((s) => (
                    <option key={s._id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select className="form-select" {...register("category")}>
                  {categories.map((c) => (
                    <option key={c._id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* SubCategory */}
              <div className="mb-3">
                <label className="form-label">Sub Category</label>
                <select className="form-select" {...register("subCategory")}>
                  {subcategories.map((s) => (
                    <option key={s._id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* MC */}
              <div className="mb-3">
                <label className="form-label">MC</label>
                <input type="number" className="form-control" {...register("mc")} />
              </div>

              {/* Making Duration */}
              <div className="mb-3">
                <label className="form-label">Making Duration</label>
                <input
                  type="number"
                  className="form-control"
                  {...register("makingDuration")}
                />
              </div>

              {/* Weight */}
              <div className="mb-3">
                <label className="form-label">Weight (g)</label>
                <input type="number" className="form-control" {...register("weight")} />
              </div>

              {/* Image */}
              <div className="mb-3">
                <label className="form-label">Product Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  {...register("image")}
                  onChange={(e) =>
                    setPreviewImage(URL.createObjectURL(e.target.files[0]))
                  }
                />
              </div>

              {previewImage && (
                <div className="text-center mb-3">
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{ maxWidth: "150px" }}
                    className="img-thumbnail"
                  />
                </div>
              )}

              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={uploading}
                >
                  {uploading ? "Updating..." : "Update Product"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductFormModal;
