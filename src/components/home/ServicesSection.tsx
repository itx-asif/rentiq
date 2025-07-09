
import { Link } from 'react-router-dom';
import {
  Home,
  MessageSquare,
  Calculator,
  BrainCircuit,
  ArrowRight,
  Search
} from 'lucide-react';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  link
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string
}) => {
  return (
    <Card className='shadow-md shadow-primary/40 hover:shadow-lg'>
      <CardHeader >
        <Icon className=" h-12 mb-2 w-12 px-2 py-2 bg-teal-100 rounded-full text-primary text-2xl" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardContent>
        <CardAction ><Link to={link} className='flex text-primary hover:underline font-medium gap-2 justify-end'>Learn More <ArrowRight /></Link></CardAction>
      </CardContent>
    </Card>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: Home,
      title: "Property Listings",
      description: "Browse through our extensive collection of residential and commercial properties in Islamabad.",
      link: "/properties"
    },
    {
      icon: BrainCircuit,
      title: "AI Recommendations",
      description: "Get personalized property recommendations based on your preferences and search history.",
      link: "/recommendations"
    },
    {
      icon: MessageSquare,
      title: "Property Chat",
      description: "Ask questions about properties, locations, and get instant answers from our smart assistant.",
      link: "/chat"
    },
    {
      icon: Search,
      title: "Advanced Search",
      description: "Use filters like price, location, and property type to find exactly what you need.",
      link: "/properties"
    }

  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive range of real estate services designed to make your property journey seamless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
