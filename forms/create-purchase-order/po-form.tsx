import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ButtonLink from "@components/ButtonLink";
import { postData } from "@helpers/postData";

const validationSchema = Yup.object().shape({
  quantity: Yup.number().required("Quantity is required"),
});

const POCreateForm: React.FC<{ initialValues?: any }> = ({ initialValues }) => {
  const router = useRouter();
  const [storeItemUpdateError, setStoreItemUpdateError] = useState<
    string | null
  >(null);

  const url = `api/purchase-orders/create-purchase-order`;
  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Values: ", values);
    let response: any;
    try {
      response = await postData(url, values);
      console.log("response: ", response);
      if (response?.status === 201) {
        router.back();
      }
    } catch (error: any) {
      setStoreItemUpdateError(error);
    }
  };

  return (
    <div>
      {storeItemUpdateError && (
        <div className="error">{storeItemUpdateError}</div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="title">Item Title</label>
            <Field type="text" id="title" name="title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="quantity">Quantity</label>
            <Field type="number" id="quantity" name="quantity" />
            <ErrorMessage name="quantity" component="div" className="error" />
          </div>

          <div>
            <button type="submit">Create Purchase Order</button>
          </div>
        </Form>
      </Formik>
      <ButtonLink route="/" text="Go back" />
    </div>
  );
};

export default POCreateForm;
