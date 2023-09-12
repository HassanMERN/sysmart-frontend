import { useEffect, useState } from "react";
import { fetchData } from "@helpers/fetchData";
import PrivateRoute from "@components/PrivateRoute";

const Home = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const user: any = localStorage.getItem("user");

    if (user) {
      const parsedUser: any = JSON.parse(user);
      setUserData(parsedUser);
    }
  }, []);

  const [storeData, setstoreData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchstoreDataFromAPI = async () => {
      try {
        const response: any = await fetchData(
          "api/stores/get-user-stores",
          token
        );
        await localStorage.setItem("userStore", JSON.stringify(response.data));
        console.log(response);
      } catch (error) {
        console.error("Error fetching storeData:", error);
      }
    };

    fetchstoreDataFromAPI();
  }, []);

  return (
    <PrivateRoute>
      <section className="w-full flex-center flex-col">
        <div className="dashboard_container">
          <h1>User Dashboard</h1>
          <div className="hello_message">Hello {userData?.first_name}</div>

          <h3 className="dashboard_heading">Your Store</h3>
        </div>
      </section>
    </PrivateRoute>
  );
};

export default Home;
