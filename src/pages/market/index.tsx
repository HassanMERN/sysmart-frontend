import { fetchData } from "@helpers/fetchData";
import PrivateRoute from "@components/PrivateRoute";
import ButtonLink from "@components/ButtonLink";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ViewTable from "@components/ViewTable";

const validationSchema = Yup.object().shape({
  searchString: Yup.string().required("search item is required"),
});

const Market = () => {
  const [error, setError] = useState<string | null>(null);
  const [storeItems, setStoreItems] = useState<any>([]);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const user: any = localStorage.getItem("user");

    if (user) {
      const parsedUser: any = JSON.parse(user);
      setUserData(parsedUser);
    }
  }, []);

  const [stores, setStores] = useState<any>(null);

  useEffect(() => {
    const fetchstoresFromAPI = async () => {
      try {
        const response: any = await fetchData("api/stores/all-stores");
        localStorage.setItem("userStore", JSON.stringify(response.data));
        setStores(response.data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    fetchstoresFromAPI();
  }, []);

  const handleSubmit = async (values: typeof initialValues) => {
    const fetchstoreItemsFromAPI = async () => {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : "", // Add the token to the Authorization header
        },
      };
      try {
        const response: any = await axios.get(
          `http://localhost:3001/api/store-items/search?searchString=${values.searchString}`,
          config
        );
        localStorage.setItem("storeItems", JSON.stringify(response.data));
        setStoreItems(response.data.data);
        console.log(storeItems);
      } catch (error) {
        console.error("Error fetching storeData:", error);
      }
    };

    fetchstoreItemsFromAPI();
  };

  const initialValues = {
    searchString: "",
  };

  const storeItemColumns = [
    { name: "Title", field: "title" },
    { name: "Unit Cost", field: "unit_cost" },
    { name: "Quantity Available", field: "quantity" },
  ];

  return (
    <PrivateRoute>
      <section className="w-full flex-center flex-col">
        <h1>All Stores</h1>

        {stores && stores.length ? (
          <div className="store-container">
            {stores.map((store: any) => (
              <div className="button-wrapper flex-center" key={store.id}>
                <ButtonLink
                  route={`/store/view-store/${store.id}`}
                  text={store.title}
                />
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}

        <h1>Search</h1>
        {error && <div className="error">{error}</div>}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div>
              <label htmlFor="searchString">searchString: </label>
              <Field
                type="searchString"
                id="searchString"
                name="searchString"
              />
              <ErrorMessage
                name="searchString"
                component="div"
                className="error"
              />
            </div>

            <div>
              <button type="submit">search</button>
            </div>
          </Form>
        </Formik>

        {storeItems && storeItems.length ? (
          <div className="store-container">
            <div className="button-wrapper flex-center">
              {storeItems ? (
                <ViewTable
                  data={storeItems}
                  columns={storeItemColumns}
                  poEndPoint="purchase-order/create-purchase-order"
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <h3></h3>
        )}
      </section>
      <ButtonLink route="/" text="go to dashboard" />
    </PrivateRoute>
  );
};

export default Market;
