import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Navigate, redirect } from "react-router-dom";
import {
  loginUserThunk,
  registerUserThunk,
} from "../../../redux/slices/authSlice";

const LoginAndRegister = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const [userData, setUserData] = useState(user);
  console.log(userData);
  useEffect(() => {
    setUserData(user);
  }, []);
  useEffect(() => {
    if (userData) {
      navigate("/auth");
    }
  }, []);

  console.log("this is location", location);
  const dispatch = useDispatch();
  const [regiserMode, setRegisterMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegisterMode = () => {
    setRegisterMode((prevRegisterMode) => !prevRegisterMode);
  };

  const handleOnChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.email || !formData.password) return;
    if (!regiserMode) {
      dispatch(loginUserThunk(formData)).then(() => {
        navigate("/");
      });
    } else {
      dispatch(registerUserThunk(formData)).then(() => {
        navigate("/");
      });
    }
  };

  return (
    <div className="hero mt-12">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="pt-12">
          <h1 className="text-center text-2xl">
            {regiserMode ? "Register" : "Login"} to My Gift Shop
          </h1>
        </div>
        <div className="card-body">
          <div div className="form-control">
            {regiserMode && (
              <>
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  name="username"
                  onChange={(event) => handleOnChange(event)}
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                />
              </>
            )}

            <label className="label mt-2">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              onChange={(event) => handleOnChange(event)}
              type="text"
              placeholder="email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              onChange={(event) => handleOnChange(event)}
              type="text"
              placeholder="password"
              className="input input-bordered"
            />
            {regiserMode && (
              <>
                <label className="label mt-2">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  name="confirmPassword"
                  onChange={(event) => handleOnChange(event)}
                  type="text"
                  placeholder="password"
                  className="input input-bordered"
                />
              </>
            )}

            {regiserMode && (
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            )}
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" onClick={handleSubmit}>
              {regiserMode ? "Register" : "Login"}
            </button>
          </div>
          <div className="form-control mt-3 border-primary">
            <button className="py-2" onClick={handleRegisterMode}>
              {regiserMode
                ? "Have an account ? Login"
                : "Dont have an account ? Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAndRegister;
