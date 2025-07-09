import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { askGemini } from "@/lib/gemni";

export default function PropertyRecommendation() {
    const [form, setForm] = useState({
        name: "",
        location: "",
        budget: "",
        type: "buy",
        propertyType: "house",
    });
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        const prompt = `
You are a property advisor in Pakistan.

Based on the user's data:
- Name: ${form.name}
- Interested in: ${form.type}
- Property type: ${form.propertyType}
- Preferred location: ${form.location}
- Budget: PKR ${Number(form.budget).toLocaleString()}

Suggest 2–3 ideal property recommendations or investment advice.
Keep it short, professional, and practical. do reseach from zameen.com and other plateforms
    `;

        try {
            const aiResponse = await askGemini(prompt);
            setResponse(aiResponse);
        } catch (err) {
            setResponse("Failed to get recommendation.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 max-w-7xl mx-auto">
            {/* Form Section */}
            <div className="md:w-1/3 w-full space-y-4">
                <h2 className="text-xl font-semibold">Get a Property Recommendation</h2>

                <div className="space-y-2">
                    <Label>Name</Label>
                    <Input name="name" value={form.name} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                    <Label>Preferred Location</Label>
                    <Input name="location" value={form.location} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                    <Label>Budget (PKR)</Label>
                    <Input name="budget" type="number" value={form.budget} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                    <Label>Looking to</Label>
                    <RadioGroup
                        defaultValue="buy"
                        className="flex gap-4"
                        onValueChange={(value) => setForm((f) => ({ ...f, type: value }))}
                    >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="buy" id="buy" />
                            <Label htmlFor="buy">Buy</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="sell" id="sell" />
                            <Label htmlFor="sell">Sell</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="rent" id="rent" />
                            <Label htmlFor="rent">Rent</Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="space-y-2 ">
                    <Label>Property Type</Label>
                    <Input
                        name="propertyType"
                        value={form.propertyType}
                        onChange={handleChange}
                        placeholder="e.g. House, Flat, Commercial"
                    />
                </div>

                <Button className="w-full" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Loading..." : "Get Recommendation"}
                </Button>
            </div>

            {/* AI Response Section */}
            <div className="md:w-2/3 w-full h-[-webkit-fill-availabe] space-y-4">
                <h2 className="text-xl font-semibold">AI Recommendation</h2>
                <Textarea
                    className="min-h-[250px] h-[90%] "
                    value={response}
                    readOnly
                    placeholder="Your recommendation will appear here..."
                />
            </div>
        </div>
    );
}
