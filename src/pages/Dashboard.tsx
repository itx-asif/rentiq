import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardSummary from "@/components/Dashboard/DashboardSummary";
import EditPropertyDialog from "@/components/Dashboard/EditPropertyDialog";
import RecentProperties from "@/components/Dashboard/RecentProperties";
import { getUserProperties } from "@/lib/api/propertyController";
import { DeletePropeter } from "@/lib/api/DeletePropety";
import type { Property } from "@/types/Property";
import ConfirmDialog from "@/components/ui/Confirm-Dialog";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./loading";

const Dashboard = () => {
    const { user } = useAuth();
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [editOpen, setEditOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState<Property | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        if (user) loadProperties();
    }, [user]);

    const loadProperties = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No authentication token found.");
            setLoading(true);
            const props = await getUserProperties(token);
            setProperties(props);
        } catch (err: any) {
            console.error("Failed to load properties:", err);
            toast.error(err.message || "Failed to load your properties.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (property: Property) => {
        setEditingProperty(property);
        setEditOpen(true);
    };

    const handleUpdate = (updated: Property) => {
        setProperties((prev) =>
            prev.map((p) => (p._id === updated._id ? updated : p))
        );
    };

    const askDelete = (id: string) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = async (confirmed: boolean) => {
        setConfirmOpen(false);
        if (!confirmed || !deleteId) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No authentication token found.");

            await DeletePropeter(deleteId, token);
            setProperties((prev) =>
                prev.filter((property) => property._id !== deleteId)
            );
            toast.success("Property deleted successfully.");
        } catch (err: any) {
            console.error("Delete failed:", err);
            toast.error(err.message || "Failed to delete property.");
        } finally {
            setDeleteId(null);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="space-y-8 p-6">
            <h1 className="text-2xl font-bold">Welcome, {user?.name} 👋</h1>

            <DashboardSummary properties={properties} />

            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Recent Properties</h2>
                </div>
                <RecentProperties
                    properties={properties}
                    onEdit={handleEditClick}
                    onDelete={askDelete}
                />
            </div>

            <EditPropertyDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                property={editingProperty}
                onUpdate={handleUpdate}
            />

            <ConfirmDialog
                open={confirmOpen}
                onClose={handleConfirmDelete}
                title="Delete Property?"
                message="Are you sure you want to delete this property? This action cannot be undone."
            />


        </div>
    );
};

export default Dashboard;
