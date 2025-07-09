import { useNavigate } from 'react-router-dom';
import {
  Home,
  Building,
  Store,
  MapPin
} from 'lucide-react';
import { CardHeader, CardTitle, Card, CardDescription, CardContent } from '../ui/card';

const PropertyTypeItem = ({
  icon: Icon,
  title,
  count,
  filterType
}: {
  icon: React.ElementType;
  title: string;
  count: number;
  filterType: string;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/properties', {
      state: {
        filters: {
          type: filterType,
          status: "all",
          minPrice: "",
          maxPrice: "",
          location: ""
        }
      }
    });
  };

  return (
    <Card
      onClick={handleClick}
      className="shadow-md shadow-primary/40 hover:shadow-lg transition cursor-pointer group"
    >
      <CardHeader className="items-center text-center space-y-4">
        <div className="bg-teal-100 flex justify-center mx-auto rounded-full p-3 w-fit">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <CardContent>
          <CardTitle className="text-lg font-semibold group-hover:text-primary">{title}</CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            {count} Properties
          </CardDescription>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

const PropertyTypes = () => {
  const types = [
    { icon: Home, title: 'Houses', count: 128, filterType: 'house' },
    { icon: Building, title: 'Apartments', count: 84, filterType: 'apartment' },
    { icon: Store, title: 'Villa', count: 42, filterType: 'villa' },
    { icon: MapPin, title: 'Plots', count: 56, filterType: 'plot' },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold mb-4">Search by Property Type</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select a property category to instantly filter results that match your interest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map((type, index) => (
            <PropertyTypeItem
              key={index}
              icon={type.icon}
              title={type.title}
              count={type.count}
              filterType={type.filterType}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyTypes;
