// src/lib/api/updateProperty.ts
export const updateProperty = async (id: string, data: any, token: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update property");
    }
  
    return res.json();
  };
  