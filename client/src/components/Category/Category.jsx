import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategoryThunk } from "../../../redux/slices/productSlice"

const Category = () => {
    const dispatch = useDispatch()
  const [category, setCategory] = useState({
    name: "",
    color: "#ffffff",
  });
  const handleChange = (event) => {
    setCategory((prevCategory) => ({
      ...prevCategory,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log(category)
    dispatch(addCategoryThunk(category))
  }

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
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={handleSubmit}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
