import { useRouter } from "next/router";
import { useEffect } from "react";
import { isAuthenticated } from "../helpers/authenticated";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, []);

  return children;
};

export default PrivateRoute;
