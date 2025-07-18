import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserProperties } from "@/lib/api/propertyController";
import { DeletePropeter } from "@/lib/api/DeletePropety";
import EditPropertyDialog from "@/components/Dashboard/EditPropertyDialog";
import ConfirmDialog from "@/components/ui/Confirm-Dialog";
import { toast } from "react-toastify";
import type { Property } from "@/types/Property";
import Loader from "./loading";
import NotFound from "./NotFound";
import PCard from "@/components/Dashboard/pcard";

const MyProperties = () => {
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
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const data = await getUserProperties(token);
            setProperties(data);
        } catch (err) {
            console.error("Failed to load properties:", err);
            toast.error("Failed to load properties.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id: string) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const confirmDelete = async (confirmed: boolean) => {
        setConfirmOpen(false);
        if (!confirmed || !deleteId) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No token");

            await DeletePropeter(deleteId, token);
            setProperties((prev) => prev.filter((p) => p._id !== deleteId));
            toast.success("Property deleted successfully.");
        } catch (err: any) {
            toast.error(err.message || "Failed to delete property.");
        } finally {
            setDeleteId(null);
        }
    };

    const handleEditClick = (property: Property) => {
        setEditingProperty(property);
        setEditOpen(true);
    };

    const handleUpdate = (updated: Property) => {
        setProperties((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">My Properties</h1>

            {loading ? (
                <Loader />
            ) : properties.length === 0 ? (
                <NotFound
                    title="No Properties Listed"
                    description="You haven’t listed any properties yet. Start by adding your first property now."
                    actionLabel="Add Property"
                    actionLink="/add-property"
                    icon={null}
                />

            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <PCard property={property} onDelete={handleDelete} onEdit={handleEditClick} />
                    ))}
                </div>
            )}

            <EditPropertyDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                property={editingProperty}
                onUpdate={handleUpdate}
            />

            <ConfirmDialog
                open={confirmOpen}
                onClose={confirmDelete}
                title="Delete Property?"
                message="Are you sure you want to delete this property? This action cannot be undone."
            />
        </div>
    );
};

export default MyProperties;
