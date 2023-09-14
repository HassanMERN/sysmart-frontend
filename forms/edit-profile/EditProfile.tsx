import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios, { AxiosRequestConfig } from "axios";
import ButtonLink from "@components/ButtonLink";
import { useRouter } from "next/router";

require("dotenv").config();

const validationSchema = Yup.object().shape({
  first_name: Yup.string(),
  last_name: Yup.string(),
  email: Yup.string(),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
});

const RegisterForm: React.FC<{ initialValues?: any }> = ({ initialValues }) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const url = `http://localhost:3001/api/users/update-user`;

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const token = localStorage.getItem("token");

      const config: AxiosRequestConfig = {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      };
      console.log("URL: ", url);
      const response: any = await axios.put(url, values, config);
      console.log(response.status);
      if (response.status === 201) {
        router.push("/login");
      } else {
        setError(response.data.error || "update failed.");
      }
    } catch (error) {
      console.error("update error:", error);
      setError("update failed. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Update Profile</h1>
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
            <button type="submit">Update</button>
          </div>
        </Form>
      </Formik>

      <ButtonLink route="/" text="Go Back" />
    </div>
  );
};

export default RegisterForm;
