import { useEffect, useState } from "react";
import { fetchData } from "@helpers/fetchData";
import { useRouter } from "next/router";
import PrivateRoute from "@components/PrivateRoute";
import ButtonLink from "@components/ButtonLink";
import ExclusiveProducts from "@components/ExclusiveProducts";

const Home = () => {
  const [userData, setUserData] = useState<any>(null);
  const [storeData, setstoreData] = useState<any>(null);
  const router = useRouter(); // Initialize the useHistory hook

  useEffect(() => {
    const user: any = localStorage.getItem("user");

    if (user) {
      const parsedUser: any = JSON.parse(user);
      setUserData(parsedUser);
    }
  }, []);

  useEffect(() => {
    const fetchstoreDataFromAPI = async () => {
      try {
        const response: any = await fetchData("api/stores/get-user-stores");
        localStorage.setItem("userStore", JSON.stringify(response.data));
        console.log(response.data);
        setstoreData(response.data);
      } catch (error) {
        console.error("Error fetching storeData:", error);
      }
    };
    console.log("Local Storage: ", localStorage);
    fetchstoreDataFromAPI();
  }, []);

  const handleLogout = () => {
    localStorage.clear();

    router.push("/login");
  };

  return (
    <PrivateRoute>
      <section className="w-full flex-center flex-col">
        <div className="dashboard_container">
          <h1>User Dashboard</h1>
          <div className="hello_message">Hello {userData?.first_name}</div>
          <ButtonLink route="edit-profile" text="Edit Profile" />{" "}
          <button onClick={handleLogout}>Logout</button>
          <h3 className="dashboard_heading">Your Store</h3>
          {storeData ? (
            <>
              <ButtonLink text={storeData?.title} route="/store/"></ButtonLink>
              <h3>Your Sales</h3>
              <ButtonLink route="/sales/" text="view your sales" />
            </>
          ) : (
            <>
              <h3>You don't have a store</h3>
              <ButtonLink route="/store/create-store/" text="Create a Store" />
            </>
          )}
          <h3>Market Place</h3>
          <ButtonLink route="/market" text="Go to marketplace" />
          <h3>Your Purchases</h3>
          <ButtonLink
            route="/purchase-order/my-purchases"
            text="View purchase your orders"
          />
          <h3>Shopping Cart</h3>
          <ButtonLink route="/cart" text="Go to cart" />
          <h3>Check out exclusive products</h3>
          <ExclusiveProducts />
        </div>
      </section>
    </PrivateRoute>
  );
};

export default Home;
