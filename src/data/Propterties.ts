import type { Property } from "@/types/Property";

export const properties:Property[] = [
  {
    _id: '64f0abc1a1b2c3d4e5f601',
    title: 'Modern 3-Bedroom House in G-11',
    description: 'A beautiful 3-bedroom fully furnished house located in the heart of Islamabad.',
    price: 25000000,
    location: {
      city: 'Islamabad',
      area: 'G-11',
      address: 'Street 45, House 7'
    },
    features: {
      bedrooms: 3,
      bathrooms: 3,
      area: 2800,
      furnished: true,
      parking: true
    },
    images: ['https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg'],
    type: 'house',
    status: 'sale',
    createdBy: '64f0user1abc1abc1abc1abc1',
    createdAt: '2025-07-06T10:00:00.000Z',
    updatedAt: '2025-07-06T12:00:00.000Z',
    __v: 0
  },
  {
    _id: '64f0abc1a1b2c3d4e5f602',
    title: '2-Bed Apartment in Bahria Town',
    description: 'A cozy 2-bedroom apartment near Bahria Town Phase 4, perfect for small families.',
    price: 7500000,
    location: {
      city: 'Rawalpindi',
      area: 'Bahria Town Phase 4',
      address: 'Block B, Building 5, Flat 302'
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      area: 1150,
      furnished: false,
      parking: true
    },
    images: ['https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg'],
    type: 'apartment',
    status: 'sale',
    createdBy: '64f0user2abc2abc2abc2abc2',
    createdAt: '2025-07-06T11:00:00.000Z',
    updatedAt: '2025-07-06T11:30:00.000Z',
    __v: 0
  },
  {
    _id: '64f0abc1a1b2c3d4e5f603',
    title: 'Commercial Plot in Blue Area',
    description: 'Ideal location for setting up your next business hub in the most premium zone of Islamabad.',
    price: 95000000,
    location: {
      city: 'Islamabad',
      area: 'Blue Area',
      address: 'Main Jinnah Avenue, Plot 14'
    },
    features: {
      bedrooms: 0,
      bathrooms: 0,
      area: 6000,
      furnished: false,
      parking: true
    },
    images: ['https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg'],
    type: 'plot',
    status: 'sale',
    createdBy: '64f0user1abc1abc1abc1abc1',
    createdAt: '2025-07-06T14:00:00.000Z',
    updatedAt: '2025-07-06T14:00:00.000Z',
    __v: 0
  } ,{
    _id: '64f0abc1a1b2c3d4e5f602',
    title: '2-Bed Apartment in Bahria Town',
    description: 'A cozy 2-bedroom apartment near Bahria Town Phase 4, perfect for small families.',
    price: 7500000,
    location: {
      city: 'Rawalpindi',
      area: 'Bahria Town Phase 4',
      address: 'Block B, Building 5, Flat 302'
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      area: 1150,
      furnished: false,
      parking: true
    },
    images: ['https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg'],
    type: 'apartment',
    status: 'sale',
    createdBy: '64f0user2abc2abc2abc2abc2',
    createdAt: '2025-07-06T11:00:00.000Z',
    updatedAt: '2025-07-06T11:30:00.000Z',
    __v: 0
  },
];
