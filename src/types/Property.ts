export interface Property {
    _id: string; 
    title: string;
    description: string;
    price: number;
    location: {
      city: string;
      area: string;
      address: string;
    };
    features: {
      bedrooms: number;
      bathrooms: number;
      area: number; 
      furnished: boolean;
      parking: boolean;
    };
    images: string[]; 
    type: 'house' | 'apartment' | 'commercial' | 'plot';
    status: "sale" | "rent";
    createdBy: {
      phone: string;
      _id: string;
      name: string;
      email: string;
      image: string;
    };
    createdAt: string; 
    updatedAt: string;
    __v?: number;      
  }
  