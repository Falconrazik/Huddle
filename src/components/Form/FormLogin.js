import React from "react";
import "./Form.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../../firebase";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getAuth } from "@firebase/auth";

const FormLogin = ({ submitForm }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = getAuth();

  // Login validation
  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email").required(),
    password: Yup.string().required("Please enter your password"),
  });

  // Handle Login with firebase

  const formik = useFormik({
    validationSchema: loginSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, actions) => {
      setLoading(true);
      try {
        actions.setSubmitting(true);
        // do api stuff here
        await login(values.email, values.password);
        navigate("/app", { replace: true });
        toast.success("Logged in!");
      } catch {
        toast.promise("Wrong email or password");
      }
      setLoading(false);
      actions.setSubmitting(false);
    },
  });

  return (
    <div className="form-content-right">
      <form onSubmit={formik.handleSubmit} className="form">
        <h1>Login with your email and password</h1>
        <div className="form-inputs">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-input"
            type="text"
            name="email"
            placeholder="Enter your Email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <div className="form-error">{formik.errors.email}</div>
        </div>

        <div className="form-inputs">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <div className="form-error">{formik.errors.password}</div>
        </div>

        <button className="form-input-btn" type="submit">
          Login
        </button>
        <span className="form-input-login">
          Don't have an account? Sign Up <a href="/register">here</a>
        </span>
      </form>
    </div>
  );
};

export default FormLogin;
