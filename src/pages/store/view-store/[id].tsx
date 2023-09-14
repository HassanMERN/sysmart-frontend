import React, { useState, useEffect } from "react";
import PrivateRoute from "@components/PrivateRoute";
import ButtonLink from "@components/ButtonLink";
import { useRouter } from "next/router";
import { fetchData } from "@helpers/fetchData";
import ViewTable from "@components/ViewTable";

const ViewStore = () => {
  const [storeItems, setStoreItems] = useState<any>([]);
  const [storeOwnerId, setStoreOwnerId] = useState<any>([]);

  const router = useRouter();
  let { id } = router.query;

  useEffect(() => {
    const fetchstoreFromAPI = async () => {
      try {
        console.log("here");
        const response: any = await fetchData(`api/stores/find/` + id);
        console.log(response);
        localStorage.setItem(
          "storeOwnerId",
          JSON.stringify(response.data.userId)
        );
        setStoreOwnerId(response.data.userId);
      } catch (error) {
        console.error("Error fetching storeData:", error);
      }
    };
    if (id) {
      fetchstoreFromAPI();
    }
  }, [id]);

  useEffect(() => {
    const fetchstoreItemsFromAPI = async () => {
      try {
        const response: any = await fetchData(
          `api/store-items/get-by-store/` + id
        );
        localStorage.setItem("storeItems", JSON.stringify(response.data));
        setStoreItems(response.data);
      } catch (error) {
        console.error("Error fetching storeData:", error);
      }
    };
    if (id) {
      fetchstoreItemsFromAPI();
    }
  }, [id]);

  const storeItemColumns = [
    { name: "Title", field: "title" },
    { name: "Unit Cost", field: "unit_cost" },
    { name: "Quantity Available", field: "quantity" },
  ];

  return (
    <PrivateRoute>
      <section className="w-full flex-center flex-col">
        <h1>Store page</h1>

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
          <h3>Loading Store</h3>
        )}
      </section>
      <ButtonLink route="/market" text="go to market" />
      <ButtonLink route="/" text="go to dashboard" />
    </PrivateRoute>
  );
};

export default ViewStore;
