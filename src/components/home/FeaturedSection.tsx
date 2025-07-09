// src/components/home/FeaturedProperties.tsx
import { useEffect, useState } from 'react';
import PropertyCard from '../property/propertyCard';
import type { Property } from '@/types/Property'; // adjust path based on your structure
import { getAllProperties } from '@/lib/api/propertyController';
import { Link } from 'react-router-dom';
import Loader from '@/pages/loading';


const FeaturedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const all = await getAllProperties();

        // Shuffle and select 4 random properties
        const randomProperties = all
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);

        setProperties(randomProperties);
      } catch (error) {
        console.error("Error fetching featured properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }

  if (properties.length === 0) {
    return (
      <section className="py-10 px-6 md:px-12 text-center text-muted-foreground">
        No featured properties found.
      </section>
    );
  }

  return (
    <section className="py-10 px-6 md:px-12 bg-background">
      <h2 className="text-3xl font-bold text-center mb-6 text-foreground">
        Featured Properties
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {properties.map((property) => (
          <Link to={`/property/${property._id}`}>
            <PropertyCard key={property._id} property={property} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProperties;


