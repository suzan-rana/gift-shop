import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategoryThunk } from "../../../../redux/slices/categorySlice";

const Category = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState({
    name: "",
    color: "#ffffff",
    image: "",
  });
  const handleChange = (event) => {
    setCategory((prevCategory) => ({
      ...prevCategory,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log(category);
    let formData = new FormData()
    formData.append('name', category.name)
    formData.append('color', category.color)
    formData.append('image', category.image)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    dispatch(addCategoryThunk(formData, config));
  };
  const handleImages = (event) => {
    const image = event.target.files ? event.target.files[0] : null;
    setCategory((prevCategory) => ({
      ...prevCategory,
      image: image,
    }));
  };

  return (
    <div className="hero bg-base-800 mt-24">
      <div className="hero-content flex-col ">
        <div className="card px-6 py-4 flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
          <div className="text-center lg:text-left">
            <p className="pt-6 pb-2">Hello, Admin</p>
            <h1 className="text-3xl font-bold">Add a New Category !</h1>
          </div>
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                onChange={(event) => handleChange(event)}
                type="text"
                placeholder="name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Add color ( {category?.color} )
                </span>
              </label>
              <input
                value={category.color}
                name="color"
                onChange={(event) => handleChange(event)}
                type="color"
                className="input w-[100%] px-0 rounded-md"
              />
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
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
