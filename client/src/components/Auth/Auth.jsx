import React from "react";
import { useState } from "react";

const LoginAndRegister = () => {
  const [regiserMode, setRegisterMode] = useState(false);

  const handleRegisterMode = () => {
    setRegisterMode((prevRegisterMode) => !prevRegisterMode);
  };


  return (
    <div className="hero mt-12">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="pt-12">
          <h1 className="text-center text-2xl">
            {regiserMode ? 'Register': 'Login'} to My Gift Shop</h1>
        </div>
        <div className="card-body">
          <div div className="form-control">
            {regiserMode && (
              <>
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
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
            <button className="btn btn-primary">
              {regiserMode ? "Register" : "Login"}
            </button>
          </div>
          <div className="form-control mt-3 border-primary">
            <button className="py-2" onClick={handleRegisterMode}>
              {regiserMode ? "Have an account ? Login" : "Dont have an account ? Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAndRegister;
