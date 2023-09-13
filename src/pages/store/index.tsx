import { useEffect, useState } from "react";
import { fetchData } from "@helpers/fetchData";
import PrivateRoute from "@components/PrivateRoute";
import ButtonLink from "@components/ButtonLink";
import DataTable from "@components/DataTable";
import { deleteData } from "@helpers/deleteData";

const Store = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const user: any = localStorage.getItem("user");

    if (user) {
      const parsedUser: any = JSON.parse(user);
      setUserData(parsedUser);
    }
  }, []);

  const [storeData, setstoreData] = useState<any>(null);
  const [storeItems, setStoreItems] = useState<any>([]);

  useEffect(() => {
    const fetchstoreDataFromAPI = async () => {
      try {
        const response: any = await fetchData("api/stores/get-user-stores");
        localStorage.setItem("userStore", JSON.stringify(response.data));
        localStorage.setItem("userStoreId", response.data.id);
        setstoreData(response.data);
      } catch (error) {
        console.error("Error fetching storeData:", error);
      }
    };
    fetchstoreDataFromAPI();
  }, []);

  useEffect(() => {
    const fetchstoreItemsFromAPI = async () => {
      try {
        const response: any = await fetchData(
          "api/store-items/get-my-store-items"
        );
        localStorage.setItem("storeItems", JSON.stringify(response.data));
        setStoreItems(response.data);
      } catch (error) {
        console.error("Error fetching storeData:", error);
      }
    };
    fetchstoreItemsFromAPI();
  }, []);
  const handleDelete = () => {
    const id: any = localStorage.getItem("userStoreId");
    deleteData("api/stores/delete-store", id);
    window.location.reload();
  };
  const storeItemColumns = [
    { name: "Title", field: "title" },
    { name: "Unit Cost", field: "unit_cost" },
    { name: "Quantity Available", field: "quantity" },
  ];

  return (
    <PrivateRoute>
      <section className="w-full flex-center flex-col">
        <h1>Store page</h1>

        {storeData && storeData?.id ? (
          <div className="store-container">
            <div className="button-wrapper flex-center">
              <ButtonLink
                route="/store/create-store-item"
                text="Create a store item"
              />

              {storeItems ? (
                <DataTable
                  data={storeItems}
                  columns={storeItemColumns}
                  updateEndPoint="store/update-store-item"
                  deleteEndPoint="api/store-items/delete-store-item"
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h3>You don't have a store</h3>
            <div className="button-wrapper flex-center">
              <ButtonLink text="create one" route="/store/create-store" />
              <ButtonLink text="Go back to dashboard" route="/" />
            </div>
          </div>
        )}
      </section>
      {storeData ? (
        <>
          <button onClick={() => handleDelete()}>Delete Store</button>
          <ButtonLink route="/" text="go to dashboard" />
        </>
      ) : (
        <></>
      )}
    </PrivateRoute>
  );
};

export default Store;
