import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import Loader from "./loading";
import NotFound from "./NotFound";


const Reset = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({ password: "", confirmPassword: "" });
    const [loading, setLoading] = useState(false);
    const [validToken, setValidToken] = useState<boolean | null>(null);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/verify-reset-token/${token}`);
                if (!res.ok) throw new Error("Invalid token");
                setValidToken(true);
            } catch {
                setValidToken(false);
            }
        };

        verifyToken();
    }, [token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/reset-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: form.password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            toast.success("Password reset successfully");
            navigate("/login");
        } catch (err: any) {
            toast.error(err.message || "Reset failed");
        } finally {
            setLoading(false);
        }
    };

    if (validToken === false) {
        return (
            <NotFound
                title="Invalid or Expired Link"
                description="The password reset link is invalid, expired, or has already been used."
                actionLabel="Request New Link"
                actionLink="/forgot-password"
                icon={null} // Hides the icon
            />
        );
    }

    if (validToken === null) {
        return (
            <Loader />
        );
    }

    return (
        <div className="max-w-md mx-auto my-10 h-64 p-6 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    name="password"
                    type="password"
                    placeholder="New password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Resetting..." : "Reset Password"}
                </Button>
            </form>
        </div>
    );
};

export default Reset;
