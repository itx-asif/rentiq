import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { getAllProperties } from "@/lib/api/propertyController";
import { DeletePropeter } from "@/lib/api/DeletePropety";
import type { Property } from "@/types/Property";
import EditPropertyDialog from "@/components/Dashboard/EditPropertyDialog";
import ConfirmDialog from "@/components/ui/Confirm-Dialog";
import { toast } from "react-toastify";
import Loader from "./loading";

const ITEMS_PER_PAGE = 20;

const AllPropertiesAdmin = () => {
    const { user } = useAuth();
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [editOpen, setEditOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState<Property | null>(null);
    const [page, setPage] = useState(1);
    const [filterText, setFilterText] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmBulk, setConfirmBulk] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

    const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);

    const filtered = properties.filter((p) =>
        (p.title?.toLowerCase() ?? "").includes(filterText.toLowerCase()) &&
        (filterStatus === "all" || p.status === filterStatus)
    );

    const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    useEffect(() => {
        if (user?.role === "admin") fetchProperties();
    }, [user]);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            const data = await getAllProperties();
            setProperties(data);
        } catch (err) {
            console.error("Failed to load properties:", err);
            toast.error("Failed to load properties");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (property: Property) => {
        setEditingProperty(property);
        setEditOpen(true);
    };

    const confirmDelete = (id: string) => {
        setPendingDeleteId(id);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = async (confirmed: boolean) => {
        setConfirmOpen(false);
        if (!confirmed || !pendingDeleteId) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No token");

            await DeletePropeter(pendingDeleteId, token);
            setProperties((prev) => prev.filter((p) => p._id !== pendingDeleteId));
            toast.success("Property deleted");
        } catch (err) {
            console.error(err);
            toast.error("Delete failed");
        } finally {
            setPendingDeleteId(null);
        }
    };

    const confirmBulkDelete = () => {
        setConfirmBulk(true);
    };

    const handleConfirmBulk = async (confirmed: boolean) => {
        setConfirmBulk(false);
        if (!confirmed) return;

        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            for (const id of selectedIds) {
                await DeletePropeter(id, token);
            }
            setProperties((prev) => prev.filter((p) => !selectedIds.includes(p._id)));
            setSelectedIds([]);
            toast.success("Selected properties deleted");
        } catch (err) {
            console.error(err);
            toast.error("Bulk delete failed");
        }
    };

    const handleUpdate = (updated: Property) => {
        setProperties((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
    };

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        const ids = paginated.map((p) => p._id);
        const allSelected = ids.every((id) => selectedIds.includes(id));
        if (allSelected) {
            setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
        } else {
            setSelectedIds((prev) => Array.from(new Set([...prev, ...ids])));
        }
    };

    return (
        <div className="p-4 md:p-6 space-y-6">
            <h1 className="text-2xl font-bold">All Properties</h1>

            {/* Filters */}
            <div className="flex flex-col md:flex-row md:items-center gap-3">
                <Input
                    placeholder="Filter by title..."
                    className="max-w-sm"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border px-3 py-2 rounded-md"
                >
                    <option value="all">All Status</option>
                    <option value="sale">Sale</option>
                    <option value="rent">Rent</option>
                </select>
                {selectedIds.length > 0 && (
                    <Button variant="destructive" onClick={confirmBulkDelete}>
                        Delete Selected ({selectedIds.length})
                    </Button>
                )}
            </div>

            {loading ? (
                <Loader />
            ) : filtered.length === 0 ? (
                <p className="text-muted-foreground">No properties found.</p>
            ) : (
                <>
                    <div className="overflow-auto">
                        <table className="min-w-[600px] w-full text-sm border">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="px-4 py-2">
                                        <input
                                            type="checkbox"
                                            checked={
                                                paginated.length > 0 &&
                                                paginated.every((p) => selectedIds.includes(p._id))
                                            }
                                            onChange={toggleSelectAll}
                                        />
                                    </th>
                                    <th className="px-4 py-2">Title</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Type</th>
                                    <th className="px-4 py-2">Price</th>
                                    <th className="px-4 py-2">City</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map((property) => (
                                    <tr key={property._id} className="border-t hover:bg-gray-50">
                                        <td className="px-4 py-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(property._id)}
                                                onChange={() => toggleSelect(property._id)}
                                            />
                                        </td>
                                        <td className="px-4 py-2 font-medium text-primary">
                                            <Link to={`/property/${property._id}`} className="hover:underline">
                                                {property.title}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-2 capitalize">{property.status}</td>
                                        <td className="px-4 py-2 capitalize">{property.type}</td>
                                        <td className="px-4 py-2">Rs. {property.price}</td>
                                        <td className="px-4 py-2">{property.location?.city}</td>
                                        <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                                            <Button size="sm" variant="outline" onClick={() => handleEditClick(property)}>
                                                Edit
                                            </Button>
                                            <Button size="sm" variant="destructive" onClick={() => confirmDelete(property._id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center items-center gap-2 pt-4 flex-wrap">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            Prev
                        </Button>
                        <span className="text-sm">
                            Page {page} of {totalPages}
                        </span>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </>
            )}

            <EditPropertyDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                property={editingProperty}
                onUpdate={handleUpdate}
            />

            {/* Confirmation Dialogs */}
            <ConfirmDialog
                open={confirmOpen}
                onClose={handleConfirmDelete}
                title="Delete Property"
                message="Are you sure you want to delete this property? This action cannot be undone."
            />
            <ConfirmDialog
                open={confirmBulk}
                onClose={handleConfirmBulk}
                title="Delete Selected"
                message={`Are you sure you want to delete ${selectedIds.length} selected properties?`}
            />
        </div>
    );
};

export default AllPropertiesAdmin;
