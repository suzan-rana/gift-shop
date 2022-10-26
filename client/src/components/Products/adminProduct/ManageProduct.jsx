import React from "react";
import { useState } from "react";

const ManageProducts = () => {
  const [ productData, setProductData ] = useState({
    name: '',
    description: '',
    category: '',
    quantity: '',
    price: '',
    image: ''
  })

  const handleOnChange = (event) => {
    setProductData(prevProductData => (
      {
        ...prevProductData,
        [event.target.name]: event.target.value
      }
    ))
  }
  return (
    <div className="hero mt-12  bg-base-800">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <p>Hello, Admin.</p>
          <h1 className="text-4xl font-bold">Create a Product</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                for="file_input"
              >
                Upload file
              </label>
              <input
              name="image"
              onChange={(event) => handleOnChange(event)}
                class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Description</span>
              </label>
              <textarea name="description" onChange={(event) => handleOnChange(event)} className="textarea textarea-bordered" placeholder="decription"></textarea>
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
              <button className="btn btn-primary">Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
