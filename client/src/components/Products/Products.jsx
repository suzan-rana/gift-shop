import React, { useEffect, useState } from "react";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../../redux/slices/productSlice";
import { getCategoryThunk } from "../../../redux/slices/categorySlice";
import {
  getCartItemsThunk,
  calculateTotalItems,
} from "../../../redux/slices/cartSlice";

const Products = () => {
  const [searchInput, setSearchInput] = useState("");
  const [currentCategory, setCurrentCategory] = useState("All Products");
  const allProducts = useSelector((state) => state.productSlice.products);
  const errorStatusCode = useSelector(
    (state) => state.productSlice.errorStatusCode
  );

  const categoryOfProducts = useSelector(
    (state) => state.categorySlice.category
  );

  const [products, setProducts] = useState(allProducts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsThunk());
    dispatch(getCategoryThunk());
    dispatch(getCartItemsThunk());
  }, []);

  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

  if (errorStatusCode) navigate("/auth");

  const handleCategoryChange = (event) => {
    setCurrentCategory(event.target.value);
  };

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    const productsBySearchAndCategory = allProducts?.filter((product) => {
      if (currentCategory === "All Products") return product;
      if (searchInput !== "") {
        return (
          product.name === searchInput &&
          product.category.name === currentCategory
        );
      }
      return product.category.name === currentCategory;
    });
    setProducts(productsBySearchAndCategory);
  };

  return (
    <div className="px-2 md:px-6">
      <div className="my-8">
        <h1 className="text-center text-3xl my-6 ">
          Shop from wide varities of Products
        </h1>
        <div className="flex flex-col md:flex-row  items-center justify-center  gap-4">
          <select
            className="my-4 select select-bordered w-full max-w-xs"
            onChange={(event) => handleCategoryChange(event)}
          >
            <option>All Products</option>
            {categoryOfProducts?.map((category, index) => (
              <option key={index}>{category.name}</option>
            ))}
          </select>
          <input
            onChange={(event) => handleSearchInput(event)}
            type="text"
            placeholder="Search for your products"
            className="input input-bordered w-full max-w-xs"
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12  mx-auto ">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
