import type { Property } from "@/types/Property";

export const getUserProperties = async (token: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch user properties");
    }
  
    return data.data; 
  };
  export const getAllProperties = async (): Promise<Property[]> => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties`, {
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to fetch all properties");
    }
  
    const data = await res.json();
    return data.data || [];
  };

  export const getPropertyById = async(id:string): Promise<Property>=>{
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties/${id}`,{});

if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to fetch all properties");
    }
    const data = await res.json();
    return data.data
  }
 
  