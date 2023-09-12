import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ButtonLink from "@components/ButtonLink";
import { useRouter } from "next/router";

require("dotenv").config();

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const RegisterForm: React.FC = () => {
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const url = `http://localhost:3001/api/auth/register`;

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      console.log("URL: ", url);
      const response: any = await axios.post(url, values);
      console.log(response.status);
      if (response.status === 201) {
        router.push("/login");
      } else {
        setError(response.data.error || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <div className="error">{error}</div>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="first_name">First Name</label>
            <Field type="text" id="first_name" name="first_name" />
            <ErrorMessage name="first_name" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="last_name">Last Name</label>
            <Field type="text" id="last_name" name="last_name" />
            <ErrorMessage name="last_name" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <div>
            <button type="submit">Register</button>
          </div>
        </Form>
      </Formik>

      <ButtonLink route="/login" text="Already Have an Account? Login" />
    </div>
  );
};

export default RegisterForm;
