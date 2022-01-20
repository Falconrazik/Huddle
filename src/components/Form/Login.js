import React, { useState } from "react";
import "./Form.css";
import FormLogin from "./FormLogin";

const Login = () => {
  return (
    <>
      <div className="form-container">
        <span className="close-btn">×</span>
        <div className="form-content-left">
          <img className="form-img" src="img/img-5.svg" alt="spaceship" />
        </div>
        <FormLogin />
      </div>
    </>
  );
};

export default Login;
