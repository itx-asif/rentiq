import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { updateUserProfile } from "@/lib/api/userController";
import { uploadImageToCloudinary } from "@/services/UploadtoCLoudinary";

const UpdateProfile = () => {
    const { user, setUser } = useAuth();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [avatar, setAvatar] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                city: user.city || "",
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
            setPreview(user.image || "");
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const img = new Image();
            img.onload = () => {
                if (img.width !== img.height) {
                    toast.warning("Please crop your image to 1:1 aspect ratio before uploading.");
                }
                setAvatar(file);
                setPreview(URL.createObjectURL(file));
            };
            img.src = URL.createObjectURL(file);
        }
    };

    const handleRemoveImage = () => {
        setAvatar(null);
        setPreview("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (form.newPassword && form.newPassword !== form.confirmPassword) {
            toast.error("New password and confirmation do not match");
            return setLoading(false);
        }

        try {
            let imageUrl = user?.image || "";
            if (avatar) {
                const uploaded = await uploadImageToCloudinary(avatar);
                if (!uploaded) {
                    toast.error("Image upload failed");
                    return;
                }
                imageUrl = uploaded;
            } else if (preview === "") {
                imageUrl = ""; // cleared image
            }

            const token = localStorage.getItem("token");
            if (!token) throw new Error("Unauthorized");

            const payload = {
                ...form,
                image: imageUrl,
            };

            const updated = await updateUserProfile(payload, token);
            toast.success("Profile updated");
            if (setUser && updated?.user) setUser(updated.user);
        } catch (err: any) {
            toast.error(err.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 border rounded-md bg-white shadow">
            <h2 className="text-2xl font-bold mb-6">Update Profile</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Avatar and Preview */}
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-1 space-y-2">
                        <Label>Avatar</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={inputRef}
                        />
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
                            {preview ? (
                                <img
                                    src={preview}
                                    className="w-full h-full object-cover"
                                    alt="Preview"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                                    No Image
                                </div>
                            )}
                        </div>

                        {preview && (
                            <Button
                                variant="destructive"
                                type="button"
                                size="sm"
                                onClick={handleRemoveImage}
                            >
                                Delete Image
                            </Button>
                        )}
                    </div>
                </div>

                {/* Two Column Form */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label htmlFor="name">Name<span className="text-red-500">*</span></Label>
                        <Input id="name" name="name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email<span className="text-red-500">*</span></Label>
                        <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" value={form.phone} onChange={handleChange} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" value={form.city} onChange={handleChange} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" name="newPassword" type="password" value={form.newPassword} onChange={handleChange} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />
                    </div>

                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-1">
                        <Label htmlFor="oldPassword" className="flex items-center gap-1">
                            Old Password <span className="text-red-500">*</span>

                            <span
                                className="cursor-help text-gray-400 text-sm"
                                title="Enter your current password to change it."
                            >
                                ?
                            </span>

                        </Label>
                        <Input
                            id="oldPassword"
                            name="oldPassword"
                            type="password"
                            value={form.oldPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex items-end">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Updating..." : "Upload Profile"}
                        </Button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default UpdateProfile;
