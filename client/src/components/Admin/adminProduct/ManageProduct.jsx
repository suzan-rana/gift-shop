import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productSlice, {
  createProductsThunk,
} from "../../../../redux/slices/productSlice";
import { getCategoryThunk } from "../../../../redux/slices/categorySlice";

const ManageProducts = () => {
  const categoryList = useSelector((state) => state.categorySlice.category);
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    quantity: "",
    price: "",
    imageUrl: null,
    image: null,
  });
  useEffect(() => {
    console.log("get category");
    dispatch(getCategoryThunk()).then(() => console.log("then category"));
  }, []);

  const handleOnChange = (event) => {
    setProductData((prevProductData) => ({
      ...prevProductData,
      [event.target.name]: event.target.value,
    }));
  };
  const handleImages = (event) => {
    setProductData((prevProductData) => {
      const imageFile = event.target.files ? event.target.files[0] : null;
      return {
        ...prevProductData,
        imageUrl: imageFile ? URL.createObjectURL(imageFile) : null,
        image: imageFile,
      };
    });
  };
  const handleSubmit = () => {
    const category =  categoryList.find(item => item.name === productData.category)
    const formData = new FormData();
    formData.append("image", productData.image);
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("category", category.id);
    formData.append("quantity", productData.quantity);
    formData.append("price", productData.price);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    dispatch(createProductsThunk(formData, config));
  };
  return (
    <div className="hero  mt-12  bg-base-800">
      <div className="hero-content  flex-col md:flex-row">
        <div className="flex flex-col gap-6 text-left lg:text-left">
          <div className="">
            <p>Hello, Admin.</p>
            <h1 className="text-6xl font-bold">Create a Product</h1>
          </div>

          <div className="form-control block ">
            {productData.imageUrl && (
              <img
                className="max-w-[100%]"
                src={productData.imageUrl}
                alt="Looks like you uploaded image files other than supporting formats."
              />
            )}
          </div>
        </div>

        <div className="card flex-shrink-0 w-full md:max-w-md shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                name="name"
                onChange={(event) => handleOnChange(event)}
                type="text"
                placeholder="name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>

              <select
                name="category"
                className="select select-bordered w-full"
                onChange={(event) => handleOnChange(event)}
              >
                <option disabled selected>
                  Select a category
                </option>
                {categoryList.map((item, index) => (
                  <option key={index}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                htmlFor="file_input"
                onChange={(event) => handleImages(event)}
              >
                Upload file
              </label>
              <input
                // name="image"
                onChange={(event) => handleImages(event)}
                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Description</span>
              </label>
              <textarea
                name="description"
                onChange={(event) => handleOnChange(event)}
                className="textarea textarea-bordered"
                placeholder="decription"
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Total Quantity</span>
              </label>
              <input
                name="quantity"
                onChange={(event) => handleOnChange(event)}
                type="number"
                placeholder="Quantity"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                name="price"
                onChange={(event) => handleOnChange(event)}
                type="text"
                placeholder="Price"
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
