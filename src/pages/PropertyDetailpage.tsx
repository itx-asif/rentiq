import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Mail,
  Share,
  ChevronLeft,
  MapPin,
  Bed,
  Bath,
  Square,
  Check,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'react-toastify';
import { getPropertyById } from '@/lib/api/propertyController';
import type { Property } from '@/types/Property';
import Loader from './loading';
import NotFound from './NotFound';

const PropertyDetailPage = () => {
  const { id = null } = useParams<{ id?: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);


  function formatDateTime(isoString: string) {
    const date = new Date(isoString);
    return date.toLocaleString("en-PK", {
      timeZone: "Asia/Karachi",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).replace(" at", "\n");
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadProperty = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const propertyData = await getPropertyById(id);

        if (propertyData) {
          setProperty(propertyData);
        } else {
          setProperty(null); // this is optional because null is default
          toast.error('The property you are looking for does not exist.');
        }
      } catch (error) {
        console.error('Failed to load property:', error);
        toast.error('An error occurred while loading the property.');
      } finally {
        setLoading(false);
      }
    };

    loadProperty();

    if (window.location.hash === '#contact') {
      setTimeout(() => {
        contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, [id]);

  if (loading) return <Loader />

  if (!property) {
    return (
      <NotFound
        title="Property Not Found"
        description="The property you’re looking for doesn’t exist, was removed, or the link is invalid."
        actionLabel="Back to Listings"
        actionLink="/properties"
        icon={null}
      />

    );
  }

  return (
    <div className="bg-background text-foreground py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <Link
            to="/properties"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to listings
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success('Property link copied to clipboard');
            }}
          >
            <Share size={16} className="mr-2" />
            Share
          </Button>
        </div>

        <h1 className="text-3xl font-heading font-bold mb-2">{property.title}</h1>
        <div className="flex items-center text-muted-foreground mb-8">
          <MapPin size={16} className="mr-1" />
          <span>{property.location.address}</span>
        </div>

        <div className="lg:flex gap-8">
          {/* Image + Contact Section */}
          <div className="mb-8 lg:sticky top-0 h-full lg:max-w-1/3">
            <Card className="overflow-hidden relative aspect-video rounded-xl mb-4">
              <img
                src={property.images[activeImageIndex]}
                alt="Main Image"
                className="w-full h-full object-cover"
              />

            </Card>

            <div className="flex gap-2 snap-x relative overflow-x-auto my-4 " style={{
              scrollbarWidth: 'none', // Firefox
            }}>
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`shrink-0 snap-center aspect-video w-24 sm:w-32 rounded-md overflow-hidden border-2 ${activeImageIndex === index ? 'border-primary' : 'border-gray-300 dark:border-gray-700'
                    }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <Card ref={contactSectionRef} className="my-8 hover:shadow-md">
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-4">Contact Agent</h3>
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={property.createdBy.image} alt={property.createdBy.name} />
                    <AvatarFallback>{property.createdBy.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{property.createdBy.name}</p>
                    <div className="flex items-center my-2 text-sm text-muted-foreground">
                      <Mail size={14} className="mr-1" />
                      <span>{property.createdBy.email}</span>
                    </div>
                    {property.createdBy.phone && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone size={14} className="mr-1" />
                        <span>{property.createdBy.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 grow">
            <div className="lg:col-span-2 space-y-8">

              <Card className="hover:shadow-md">
                <CardContent className="p-6">
                  <h2 className="text-xl font-heading font-semibold mb-4">Description</h2>
                  <p className="text-muted-foreground whitespace-pre-line">{property.description}</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md">
                <CardContent className="p-6">
                  <h2 className="text-xl font-heading font-semibold mb-4">Features</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                    {property.features.bedrooms > 0 && (
                      <div className="flex items-center space-x-2">
                        <Bed className="h-5 w-5 text-primary" />
                        <span>{property.features.bedrooms} Bedrooms</span>
                      </div>
                    )}
                    {property.features.bathrooms > 0 && (
                      <div className="flex items-center space-x-2">
                        <Bath className="h-5 w-5 text-primary" />
                        <span>{property.features.bathrooms} Bathrooms</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Square className="h-5 w-5 text-primary" />
                      <span>{property.features.area} Area</span>
                    </div>
                    {property.features.furnished && (
                      <div className="flex items-center space-x-2">
                        <Check className="h-5 w-5 text-primary" />
                        <span>Furnished</span>
                      </div>
                    )}
                    {property.features.parking && (
                      <div className="flex items-center space-x-2">
                        <Check className="h-5 w-5 text-primary" />
                        <span>Parking Available</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    label: 'Price',
                    value: property.price,
                    note: property.status === 'rent' ? 'per month' : 'one-time',
                  },
                  {
                    label: 'Type',
                    value: property.type,
                    note: property.status === 'sale' ? 'For Sale' : 'For Rent',
                  },
                  {
                    label: 'Area',
                    value: property.features.area,
                    note: 'Square Feet',
                  },
                  {
                    label: 'Posted',
                    value: formatDateTime(property.createdAt),
                  },
                ].map((item, idx) => (
                  <Card key={idx} className="hover:shadow-md text-center">
                    <CardContent className="p-4">
                      <p className="text-muted-foreground text-sm">{item.label}</p>
                      <p className="text-xl font-semibold mt-1 whitespace-pre-line">{item.value}</p>
                      {item.note && <p className="text-xs text-muted-foreground mt-1">{item.note}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="hover:shadow-md">
                <CardContent className="p-4">
                  <h3 className="font-semibold">Address:</h3>
                  <p className="text-muted-foreground">
                    {property.location.address}, {property.location.area}, {property.location.city}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
