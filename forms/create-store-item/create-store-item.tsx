import React, { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ButtonLink from "@components/ButtonLink";
import { postData } from "@helpers/postData";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  quantity: Yup.number().required("Quantity is required"),
  unit_cost: Yup.number().required("Unit Cost is required"),
});

const StoreItemForm: React.FC = () => {
  const initialValues = {
    title: "",
    quantity: "",
    unit_cost: "",
  };
  const router = useRouter();
  const [storeItemCreateError, setStoreItemCreateError] = useState<
    string | null
  >(null);

  const url = `api/store-items/create-store-item`;
  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Values: ", values);
    let response: any;
    try {
      response = await postData(url, values);
      console.log(response);
      if (response?.status === 201) {
        router.push("/store");
      }
    } catch (error: any) {
      setStoreItemCreateError(error);
    }
  };

  return (
    <div>
      <h1>Create a Store Item</h1>
      {storeItemCreateError && (
        <div className="error">{storeItemCreateError}</div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="title">Item Title</label>
            <Field type="title" id="title" name="title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="quantity">Quantity</label>
            <Field type="number" id="quantity" name="quantity" />
            <ErrorMessage name="quantity" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="unit_cost">Unit cost</label>
            <Field type="number" id="unit_cost" name="unit_cost" />
            <ErrorMessage name="unit_cost" component="div" className="error" />
          </div>

          <div>
            <button type="submit">Create Store Item</button>
          </div>
        </Form>
      </Formik>
      <ButtonLink route="/" text="Don't want to create a store? go back" />
    </div>
  );
};

export default StoreItemForm;
