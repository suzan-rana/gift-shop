import React from "react";

const Cart = () => {
  return (
    <div className="overflow-x-auto w-full my-16">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  {/* <div className="mask mask-squircle w-12 h-12">
                    <img
                      src="/tailwind-css-component-profile-2@56w.png"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div> */}
                </div>
                <div className="p-0">
                  <div className="font-bold  ">Black Shoes</div>
                  <div className="text-sm opacity-50">United States</div>
                </div>
              </div>  
            </td>
            <td>
              Zemlak, Daniel and Leannon
              <br />
              <span className="badge badge-ghost badge-sm">
                Desktop Support Technician
              </span>
            </td>
            <td>Purple</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
