import PrivateRoute from "@components/PrivateRoute";

const Home = () => {
  return (
    <PrivateRoute>
      <section className="w-full flex-center flex-col">
        <div className="head_text text-center orange_gradient">SysMart.io</div>

        <div className="dashboard_container">dashboard goes here</div>
      </section>
    </PrivateRoute>
  );
};

export default Home;
