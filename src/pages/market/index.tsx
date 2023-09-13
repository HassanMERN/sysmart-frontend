import { useEffect, useState } from "react";
import { fetchData } from "@helpers/fetchData";
import PrivateRoute from "@components/PrivateRoute";
import ButtonLink from "@components/ButtonLink";
import DataTable from "@components/DataTable";

const Store = () => {
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
      </section>
      <ButtonLink route="/" text="go to dashboard" />
    </PrivateRoute>
  );
};

export default Store;
