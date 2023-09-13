import { useEffect, useState } from "react";
import { fetchData } from "@helpers/fetchData";
import PrivateRoute from "@components/PrivateRoute";
import ButtonLink from "@components/ButtonLink";
import ViewTable from "@components/ViewTable";

const MyPurchases = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const user: any = localStorage.getItem("user");

    if (user) {
      const parsedUser: any = JSON.parse(user);
      setUserData(parsedUser);
    }
  }, []);

  const [poData, setpoData] = useState<any>(null);

  useEffect(() => {
    const fetchpoDataFromAPI = async () => {
      try {
        const response: any = await fetchData(
          "api/purchase-orders/my-purchase-orders"
        );
        localStorage.setItem(
          "purchaseOrders",
          JSON.stringify(response.data.purchaseOrders)
        );
        setpoData(response.data.purchaseOrders);
      } catch (error) {
        console.error("Error fetching poData:", error);
      }
    };
    fetchpoDataFromAPI();
  }, []);

  const storeItemColumns = [
    { name: "ID", field: "id" },
    {
      name: "Store Item Id",
      field: "item_id",
    },
    {
      name: "Cost",
      field: "total_cost",
    },
    {
      name: "Quantity",
      field: "quantity",
    },
  ];

  return (
    <PrivateRoute>
      <section className="w-full flex-center flex-col">
        <h1>My Purchases</h1>

        {poData && poData.length ? (
          <div className="store-container">
            <div className="button-wrapper flex-center">
              <ViewTable data={poData} columns={storeItemColumns} />
            </div>
          </div>
        ) : (
          <div>
            <h3>Loading Data</h3>
          </div>
        )}
      </section>
      <div className="flex-center">
        <h3>Wanna Purchase More?</h3>
        <div className="button-wrapper flex-center">
          <ButtonLink text="Go to market place" route="/market" />
        </div>
      </div>
      <ButtonLink route="/" text="go to dashboard" />
    </PrivateRoute>
  );
};

export default MyPurchases;
