// pages/RequestReset.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function RequestReset() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: any) => {

    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/request-reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (res.status != 200) {

      return toast.error(data.message)
    } else {
      toast.success(data.message);
    }

  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md min-h-64 mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">Reset Your Password</h1>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit">Send Reset Link</Button>
    </form>
  );
}
