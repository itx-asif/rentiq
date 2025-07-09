import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import {
    getAllUsers,
    deleteUser,
    updateUserRole,
} from "@/lib/api/userController";
import type { User } from "@/types/User";
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/ui/Confirm-Dialog";
import Loader from "./loading";

const ITEMS_PER_PAGE = 20;

const AllUsers = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [filterText, setFilterText] = useState("");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const [confirmBulkDeleteOpen, setConfirmBulkDeleteOpen] = useState(false);
    const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
    const filtered = users.filter(
        (u) =>
            u.name?.toLowerCase().includes(filterText.toLowerCase()) ||
            u.email?.toLowerCase().includes(filterText.toLowerCase())
    );
    const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    useEffect(() => {
        if (user?.role === "admin") fetchUsers();
    }, [user]);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            setLoading(true);
            const data = await getAllUsers(token);
            setUsers(data);
        } catch (err) {
            console.error("Failed to load users:", err);
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };


    const handleDeleteUser = (id: string) => {
        setConfirmDeleteId(id);
    };

    const confirmDeleteUser = async (confirmed: boolean) => {
        if (!confirmed || !confirmDeleteId) return setConfirmDeleteId(null);
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No token");
            await deleteUser(confirmDeleteId, token);
            setUsers((prev) => prev.filter((u) => u._id !== confirmDeleteId));
            toast.success("User deleted");
        } catch (err) {
            toast.error("Delete failed");
        } finally {
            setConfirmDeleteId(null);
        }
    };

    const handleBulkDelete = () => {
        setConfirmBulkDeleteOpen(true);
    };

    const confirmBulkDelete = async (confirmed: boolean) => {
        setConfirmBulkDeleteOpen(false);
        if (!confirmed) return;

        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            for (const id of selectedIds) {
                await deleteUser(id, token);
            }
            setUsers((prev) => prev.filter((u) => !selectedIds.includes(u._id)));
            setSelectedIds([]);
            toast.success("Selected users deleted");
        } catch (err) {
            toast.error("Bulk delete failed");
        }
    };

    const handleRoleChange = async (id: string, newRole: string) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            await updateUserRole(id, newRole, token);
            setUsers((prev) =>
                prev.map((user): User =>
                    user._id === id ? { ...user, role: newRole as 'admin' | 'user' } : user
                )
            );
            toast.success("Role updated");
        } catch (err) {
            toast.error("Failed to update role");
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        const ids = paginated.map((u) => u._id);
        const allSelected = ids.every((id) => selectedIds.includes(id));
        if (allSelected) {
            setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
        } else {
            setSelectedIds((prev) => Array.from(new Set([...prev, ...ids])));
        }
    };

    return (
        <div className="p-4 md:p-6 space-y-6">
            <h1 className="text-2xl font-bold">All Users</h1>

            <div className="flex flex-col md:flex-row md:items-center gap-3">
                <Input
                    placeholder="Filter by name or email..."
                    className="max-w-sm"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
                {selectedIds.length > 0 && (
                    <Button variant="destructive" onClick={handleBulkDelete}>
                        Delete Selected ({selectedIds.length})
                    </Button>
                )}
            </div>

            {loading ? (
                <Loader />
            ) : filtered.length === 0 ? (
                <p className="text-muted-foreground">No users found.</p>
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
                                                paginated.every((u) => selectedIds.includes(u._id))
                                            }
                                            onChange={toggleSelectAll}
                                        />
                                    </th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Role</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map((user) => (
                                    <tr key={user._id} className="border-t hover:bg-gray-50">
                                        <td className="px-4 py-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(user._id)}
                                                onChange={() => toggleSelect(user._id)}
                                            />
                                        </td>
                                        <td className="px-4 py-2 font-medium">{user.name}</td>
                                        <td className="px-4 py-2">{user.email}</td>
                                        <td className="px-4 py-2">
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                className="border rounded-md px-2 py-1 text-sm"
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-2 space-x-2 whitespace-nowrap">

                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDeleteUser(user._id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
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

            {/* Confirm dialogs */}
            <ConfirmDialog
                open={!!confirmDeleteId}
                onClose={confirmDeleteUser}
                title="Delete User"
                message="Are you sure you want to delete this user?"
            />
            <ConfirmDialog
                open={confirmBulkDeleteOpen}
                onClose={confirmBulkDelete}
                title="Delete Selected Users"
                message={`Are you sure you want to delete ${selectedIds.length} selected users?`}
            />
        </div>
    );
};

export default AllUsers;
