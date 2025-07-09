import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { uploadImageToCloudinary } from '@/services/UploadtoCLoudinary';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface FormState {
    title: string;
    description: string;
    price: string;
    status: 'sale' | 'rent';
    type: 'apartment' | 'house' | 'commercial' | 'plot';
    location: {
        city: string;
        area: string;
        address: string;
    };
    features: {
        bedrooms: string;
        bathrooms: string;
        area: string;
        furnished: boolean;
        parking: boolean;
    };
    images: (File | string)[]; // URLs from Cloudinary
}

const AddProperty = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState<FormState>({
        title: '',
        description: '',
        price: '',
        status: 'sale',
        type: 'apartment',
        location: { city: '', area: '', address: '' },
        features: { bedrooms: '', bathrooms: '', area: '', furnished: false, parking: false },
        images: [],
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name.startsWith('location.')) {
            const field = name.split('.')[1];
            setForm((prev) => ({
                ...prev,
                location: { ...prev.location, [field]: value },
            }));
        } else if (name.startsWith('features.')) {
            const field = name.split('.')[1];
            setForm((prev) => ({
                ...prev,
                features: { ...prev.features, [field]: value },
            }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleCheckbox = (field: 'furnished' | 'parking') => {
        setForm((prev) => ({
            ...prev,
            features: { ...prev.features, [field]: !prev.features[field] },
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const newFiles = Array.from(files);
        setForm((prev) => ({
            ...prev,
            images: [...prev.images, ...newFiles],
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!user) {
                toast.error("You must be logged in to add a property.");
                navigate('/login');
                return;
            }

            if (form.images.length === 0) {
                toast.error("Please select at least one image.");
                return;
            }

            const uploadedUrls: string[] = [];
            for (const file of form.images) {
                const url = await uploadImageToCloudinary(file);
                if (url) uploadedUrls.push(url);
            }

            const payload = {
                title: form.title,
                description: form.description,
                price: Number(form.price),
                status: form.status,
                type: form.type,
                location: form.location,
                features: {
                    bedrooms: Number(form.features.bedrooms),
                    bathrooms: Number(form.features.bathrooms),
                    area: Number(form.features.area),
                    furnished: form.features.furnished,
                    parking: form.features.parking,
                },
                images: uploadedUrls,
                createdBy: user._id,
            };

            const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

            const res = await fetch(`${BASE_URL}/properties`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Property added successfully!");
                navigate('/dashboard/properties');
            } else {
                toast.error(data.message || "Failed to add property");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="max-w-4xl mx-auto p-6">
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold">Add New Property</h2>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <Input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Property title"
                            required
                        />
                        <Textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Write description"
                            required
                        />
                        <Input
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            type="number"
                            required
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input
                                name="location.city"
                                value={form.location.city}
                                onChange={handleChange}
                                placeholder="City"
                                required
                            />
                            <Input
                                name="location.area"
                                value={form.location.area}
                                onChange={handleChange}
                                placeholder="Area"
                                required
                            />
                            <Input
                                name="location.address"
                                value={form.location.address}
                                onChange={handleChange}
                                placeholder="Full Address"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input
                                name="features.bedrooms"
                                value={form.features.bedrooms}
                                onChange={handleChange}
                                placeholder="Bedrooms"
                                type="number"
                                required
                            />
                            <Input
                                name="features.bathrooms"
                                value={form.features.bathrooms}
                                onChange={handleChange}
                                placeholder="Bathrooms"
                                type="number"
                                required
                            />
                            <Input
                                name="features.area"
                                value={form.features.area}
                                onChange={handleChange}
                                placeholder="Area (sqft)"
                                type="number"
                                required
                            />
                        </div>

                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2">
                                <Checkbox
                                    checked={form.features.furnished}
                                    onCheckedChange={() => handleCheckbox('furnished')}
                                />
                                <span>Furnished</span>
                            </label>

                            <label className="flex items-center gap-2">
                                <Checkbox
                                    checked={form.features.parking}
                                    onCheckedChange={() => handleCheckbox('parking')}
                                />
                                <span>Parking</span>
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-muted-foreground">Status</label>
                                <Select
                                    value={form.status}
                                    onValueChange={(value) => setForm((prev) => ({ ...prev, status: value as any }))}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sale">For Sale</SelectItem>
                                        <SelectItem value="rent">For Rent</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-sm text-muted-foreground">Type</label>
                                <Select
                                    value={form.type}
                                    onValueChange={(value) => setForm((prev) => ({ ...prev, type: value as any }))}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="apartment">Apartment</SelectItem>
                                        <SelectItem value="house">House</SelectItem>
                                        <SelectItem value="commercial">Commercial</SelectItem>
                                        <SelectItem value="plot">Plot</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Input
                            type="file"
                            name="images"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {/* Display uploaded images with remove buttons */}
                        <div className="mt-4 flex flex-wrap gap-4">
                            {form.images.map((image, index) => {
                                const isFile = image instanceof File;
                                const previewUrl = isFile ? URL.createObjectURL(image) : image as string;

                                return (
                                    <div key={index} className="relative w-24 h-24 border rounded overflow-hidden">
                                        <img
                                            src={previewUrl}
                                            alt={`Uploaded ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setForm((prev) => ({
                                                    ...prev,
                                                    images: prev.images.filter((_, i) => i !== index),
                                                }));
                                            }}
                                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
                                            aria-label="Remove image"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                );
                            })}
                        </div>


                    </CardContent>

                    <CardFooter className="justify-end mt-2">
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Adding...' : 'Add Property'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
            <ToastContainer />
        </div>
    );
};

export default AddProperty;
