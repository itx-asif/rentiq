
// lib/api/userController.ts
export const getAllUsers = async (token: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  };
  
  export const deleteUser = async (id: string, token: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to delete user");
  };
  
  export const resetUserPassword = async (id: string, token: string) => {
   
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${id}/reset-password`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to reset password");
  };
  export const updateUserRole = async (id: string, role: string, token: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${id}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update role");
    }
  
    return res.json();
  };

  export const updateUserProfile = async (form:object ,token: string) => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
console.log(JSON.stringify(form))
    const res = await fetch(`${BASE_URL}/users/update-profile`, {
        method: "PUT",
        
        headers: {
         "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
           
        },
    
        body:  JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Profile update failed");
    }

    return data;
};
