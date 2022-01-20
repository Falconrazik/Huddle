import React, { useState } from "react";
import "./Form.css";
import { gql, useMutation } from "@apollo/client";
import { registerUserGQL } from "../../common/queries";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signUp } from "../../firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ImageUpload from "../Util/ImageUpload";

const FormSignup = ({ submitForm }) => {
  const [registerUser, { data }] = useMutation(gql(registerUserGQL));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerSchema = Yup.object().shape({
    firstName: Yup.string().required("Please enter your first name"),
    email: Yup.string().email("Please enter a valid email").required(),
    lastName: Yup.string().required("Please enter your last name"),
    university: Yup.string().required("Please enter your university"),
    major: Yup.string().required("Please enter your major"),
    vintage: Yup.string().required("Please choose your vintage"),
    password: Yup.string().required("Please enter your password"),
  });

  const formik = useFormik({
    validationSchema: registerSchema,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      university: "",
      vintage: "",
      major: "",
      password: "",
    },
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      // do api stuff here
      setLoading(true);
      try {
        await signUp(values.email, values.password);
        const res = await registerUser({
          variables: {
            input: {
              first_name: values.firstName,
              last_name: values.lastName,
              email: values.email,
              university: values.university,
              vintage: values.vintage,
              major: values.major,
            },
          },
        });
        toast.success("Successfully created your account");
        navigate("/app", { replace: true });
      } catch {
        toast.error("Oops, account already exists. Please sign in instead");
      }
      setLoading(false);
      actions.setSubmitting(false);
    },
  });

  return (
    <div className="form-content-right">
      <form onSubmit={formik.handleSubmit} className="form">
        <h1>
          Get started with us today! Create your account by filling out the
          information below.
        </h1>
        <div className="form-inputs">
          <label htmlFor="firstName" className="form-label">
            First name
          </label>
          <input
            className="form-input"
            type="text"
            name="firstName"
            placeholder="Enter your firstname"
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          <div className="form-error">{formik.errors.firstName}</div>
        </div>

        <div className="form-inputs">
          <label htmlFor="lastName" className="form-label">
            Last name
          </label>
          <input
            className="form-input"
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
          <div className="form-error">{formik.errors.lastName}</div>
        </div>

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

        <div className="form-inputs">
          <label htmlFor="password2" className="form-label">
            Password
          </label>
          <input
            className="form-input"
            type="password"
            name="password2"
            placeholder="Confirm your password"
            value={formik.values.password2}
            onChange={formik.handleChange}
          />
          <div className="form-error">{formik.errors.password2}</div>
        </div>

        <div className="form-inputs">
          <label htmlFor="university" className="form-label">
            University
          </label>
          <input
            className="form-input"
            type="text"
            name="university"
            placeholder="Enter your university"
            value={formik.values.university}
            onChange={formik.handleChange}
          />
          <div className="form-error">{formik.errors.university}</div>
        </div>

        <div className="form-inputs">
          <label htmlFor="major" className="form-label">
            Major
          </label>
          <input
            className="form-input"
            type="text"
            name="major"
            placeholder="Enter your major"
            value={formik.values.major}
            onChange={formik.handleChange}
          />
          <div className="form-error">{formik.errors.major}</div>
        </div>

        <div className="form-inputs">
          <label htmlFor="vintage" className="form-label">
            Vintage
          </label>
          <input
            className="form-input"
            type="text"
            name="vintage"
            placeholder="Enter your vintage"
            value={formik.values.vintage}
            onChange={formik.handleChange}
          />
          <div className="form-error">{formik.errors.vintage}</div>
        </div>

        <div className="">
          <ImageUpload filename={"photo"}>
            <div className="">
              Upload here
            </div>
          </ImageUpload>
        </div>

        <button disabled={loading} className="form-input-btn" type="submit">
          Sign up
        </button>
        <span className="form-input-login">
          Already have an account? Login <a href="/login">here</a>
        </span>
      </form>
    </div>
  );
};

export default FormSignup;
