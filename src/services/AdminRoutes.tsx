import { useAuth } from "@/context/AuthContext";
import Loader from "@/pages/loading";
import NotFound from "@/pages/NotFound";
import { Outlet } from "react-router-dom";

const AdminRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return <Loader />;

    if (user && user.role === "admin") {
        return <Outlet />;
    }

    // Show Not Authorized message
    return (
        <NotFound />
    );
};

export default AdminRoute;
