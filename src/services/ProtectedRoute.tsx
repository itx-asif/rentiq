import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import NotFound from "@/pages/NotFound";
import Loader from "@/pages/loading";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return user ? <Outlet /> :
    <NotFound />

};

export default ProtectedRoute;
