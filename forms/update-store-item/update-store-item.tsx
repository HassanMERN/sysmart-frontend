import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ButtonLink from "@components/ButtonLink";
import { putData } from "@helpers/putData";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  quantity: Yup.number().required("Quantity is required"),
  unit_cost: Yup.number().required("Unit Cost is required"),
});

const UpdateStoreItemForm: React.FC<{ initialValues?: any }> = ({
  initialValues,
}) => {
  const router = useRouter();
  const [storeItemUpdateError, setStoreItemUpdateError] = useState<
    string | null
  >(null);

  const url = `api/store-items/update-store-item`; // Updated route
  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Values: ", values);
    let response: any;
    try {
      // Use putData to send a PUT request with the updated values and ID
      response = await putData(url, values, initialValues.id);
      console.log(response);
      if (response?.status === 201) {
        router.push("/store");
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
            <button type="submit">Update Store Item</button>
          </div>
        </Form>
      </Formik>
      <ButtonLink route="/" text="Go back" />
    </div>
  );
};

export default UpdateStoreItemForm;
