export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    phone?: string;
    image?: string;
    googleId?: string;
    city?:string;
    isGoogleUser: boolean;
    createdAt: string;
    updatedAt: string;
  }
  