import React from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ButtonLink from "@components/ButtonLink";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm: React.FC = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const router = useRouter();

  const url = `http://localhost:3001/api/auth/login`;
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await axios.post(url, values);
      await localStorage.setItem("token", response.data.data.user.token);
      await localStorage.setItem(
        "user",
        JSON.stringify(response.data.data.user)
      );
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
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
            <button type="submit">Login</button>
          </div>
        </Form>
      </Formik>
      <ButtonLink route="/register" text="Don't Have an Account? Sign Up " />
    </div>
  );
};

export default LoginForm;
