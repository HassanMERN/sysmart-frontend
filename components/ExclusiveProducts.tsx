import { useEffect, useState } from "react";
import { fetchData } from "../helpers/fetchData";
import PrivateRoute from "./PrivateRoute";
import ButtonLink from "./ButtonLink";
import ViewTable from "./ViewTable";

const ExclusiveProducts = () => {
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
          "api/store-items/get-all-store-items"
        );
        localStorage.setItem("purchaseOrders", JSON.stringify(response.data));
        setpoData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching poData:", error);
      }
    };
    fetchpoDataFromAPI();
  }, []);

  const storeItemColumns = [
    {
      name: "Item Name",
      field: "title",
    },

    {
      name: "Unit Cost",
      field: "unit_cost",
    },
  ];

  return (
    <PrivateRoute>
      <section className="w-full flex-center flex-col">
        {poData && poData.length ? (
          <div className="store-container">
            <div className="button-wrapper flex-center">
              <ViewTable
                data={poData}
                columns={storeItemColumns}
                poEndPoint="purchase-order/create-purchase-order"
                cartEndPoint="cart/add-to-cart"
              />
            </div>
          </div>
        ) : (
          <div>Loading Products</div>
        )}
      </section>
    </PrivateRoute>
  );
};

export default ExclusiveProducts;
