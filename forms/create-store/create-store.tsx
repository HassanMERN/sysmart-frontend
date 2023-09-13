import React, { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ButtonLink from "@components/ButtonLink";
import { postData } from "@helpers/postData";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});

const StoreForm: React.FC = () => {
  const initialValues = {
    title: "",
  };
  const router = useRouter();
  const [storeCreateError, setStoreCreateError] = useState<string | null>(null);

  const url = `api/stores/create-store`;
  const handleSubmit = async (values: typeof initialValues) => {
    let response: any;
    try {
      response = await postData(url, values);
      console.log(response);
      if (response?.status === 201) {
        router.push("/");
      }
    } catch (error) {
      router.push("/");
    }
  };

  return (
    <div>
      <h1>Create a Store</h1>
      <h4>! A user can create only one store</h4>
      {storeCreateError && <div className="error">{storeCreateError}</div>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="title">Store Title</label>
            <Field type="title" id="title" name="title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>

          <div>
            <button type="submit">Create Store</button>
          </div>
        </Form>
      </Formik>
      <ButtonLink route="/" text="Don't want to create a store? go back" />
    </div>
  );
};

export default StoreForm;
