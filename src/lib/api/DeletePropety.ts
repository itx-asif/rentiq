export const DeletePropeter=async(id:string,token:string)=>{
    
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties/${id}`, {
        method:"DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update property");
      } 
      return res;
    
}