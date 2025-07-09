import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { updateProperty } from "@/lib/api/updateProperty";
import type { Property } from "@/types/Property";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: Property | null;
  onUpdate: (updated: Property) => void;
};

const EditPropertyDialog = ({ open, onOpenChange, property, onUpdate }: Props) => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    status: "sale",
    type: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    description: "",
  });

  useEffect(() => {
    if (property) {
      setForm({
        title: property.title || "",
        price: property.price?.toString() || "",
        status: property.status || "sale",
        type: property.type || "",
        address: property.location?.address || "",
        bedrooms: property.features.bedrooms?.toString() || "",
        bathrooms: property.features.bathrooms?.toString() || "",
        area: property.features.area?.toString() || "",
        description: property.description || "",
      });
    }
  }, [property]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!property) return;

    const updatedData = {
      title: form.title,
      price: parseFloat(form.price),
      status: form.status,
      type: form.type,
      location: {
        ...property.location,
        address: form.address,
      },
      features: {
        ...property.features,
        bedrooms: parseInt(form.bedrooms),
        bathrooms: parseInt(form.bathrooms),
        area: parseFloat(form.area),
      },
      description: form.description,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in.");
        return;
      }

      const result = await updateProperty(property._id, updatedData, token);
      onUpdate(result.data);
      toast.success("Property updated successfully");
      onOpenChange(false);
    } catch (err: any) {
      console.error("Update failed:", err.message);
      toast.error(err.message || "Failed to update property");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>
          <DialogDescription>Update the fields below to edit the property.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Title</Label>
            <Input name="title" value={form.title} onChange={handleChange} />
          </div>

          <div>
            <Label>Price</Label>
            <Input name="price" type="number" value={form.price} onChange={handleChange} />
          </div>

          <div>
            <Label>Status</Label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>

          <div>
            <Label>Type</Label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="house">House</option>
              <option value="appartment">Apartment</option>
              <option value="commertial">Commercial</option>
              <option value="plot">Plot</option>
            </select>
          </div>

          <div>
            <Label>Address</Label>
            <Input name="address" value={form.address} onChange={handleChange} />
          </div>

          <div>
            <Label>Bedrooms</Label>
            <Input name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} />
          </div>

          <div>
            <Label>Bathrooms</Label>
            <Input name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} />
          </div>

          <div>
            <Label>Area (sqft)</Label>
            <Input name="area" type="number" value={form.area} onChange={handleChange} />
          </div>

          <div className="md:col-span-2">
            <Label>Description</Label>
            <Textarea name="description" value={form.description} onChange={handleChange} rows={3} />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Update Property</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPropertyDialog;
