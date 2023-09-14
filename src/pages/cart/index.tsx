import { useEffect, useState } from "react";
import { fetchData } from "@helpers/fetchData";
import PrivateRoute from "@components/PrivateRoute";
import ButtonLink from "@components/ButtonLink";
import DataTable from "@components/DataTable";
import { deleteData } from "@helpers/deleteData";
import ViewTable from "@components/ViewTable";

const Store = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const user: any = localStorage.getItem("user");

    if (user) {
      const parsedUser: any = JSON.parse(user);
      setUserData(parsedUser);
    }
  }, []);

  const [cartData, setCartData] = useState<any>(null);
  const [storeItems, setStoreItems] = useState<any>([]);

  useEffect(() => {
    const fetchCartDataFromAPI = async () => {
      try {
        const response: any = await fetchData("api/cart/my-cart/");
        setCartData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching cartData:", error);
      }
    };
    fetchCartDataFromAPI();
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
        console.error("Error fetching cartData:", error);
      }
    };
    fetchstoreItemsFromAPI();
  }, []);
  const handleDelete = () => {
    const id: any = localStorage.getItem("userStoreId");
    deleteData("api/stores/delete-store", id);
    window.location.reload();
  };
  const cartColumns = [
    { name: "Title", field: "item_name" },
    { name: "Quantity", field: "quantity" },
  ];

  return (
    <PrivateRoute>
      <section className="w-full flex-center flex-col">
        <h1>Your Cart</h1>

        {cartData ? (
          <div className="store-container">
            <div className="button-wrapper flex-center">
              {cartData ? (
                <ViewTable
                  data={cartData}
                  columns={cartColumns}
                  cart={true}
                  deleteEndPoint="api/cart/delete-cart-item"
                  buyItemEndPoint="api/cart/buy-cart-item"
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <h3>Continue Shopping</h3>
        <div className="button-wrapper flex-center">
          <ButtonLink text="Go to Market " route="/market" />
          <ButtonLink text="Go back to dashboard" route="/" />
        </div>
      </section>
    </PrivateRoute>
  );
};

export default Store;
