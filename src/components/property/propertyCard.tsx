import type { Property } from "@/types/Property";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";

interface PropertyCardProps {
    property: Property;
}
const PropertyCard = ({ property }: PropertyCardProps) => {
    return (
        <Card className="grow cursor-pointer h-full shadow-primary/60 shadow-md hover:shadow-lg">
            <CardHeader className="relative">
                <div className="overflow-hidden rounded-md">
                    <img src={property.images[0]} alt="" className="object-cover w-full h-40 hover:scale-105 transition duration-150 ease-in-out" />
                    <div className="absolute left-10 bg-background px-4 py-2 transition-all text-xs top-4 rounded-2xl capitalize">
                        {property.type}
                    </div>
                </div>
                <CardTitle className="text-wrap mb-1">{property.title}</CardTitle>
                <CardDescription>
                    {property.location.area}, {property.location.city}
                </CardDescription>
            </CardHeader>
            <CardContent className=" grid-cols-1 grid gap-y-1">

                <div className="grid grid-cols-2 gap-2">
                    <CardTitle>Price</CardTitle>
                    <CardDescription> $ {property.price}</CardDescription>

                </div>
                <div className="grid grid-cols-2 gap-2">
                    <CardTitle>Bedrooms</CardTitle>
                    <CardDescription>{property.features.bedrooms}</CardDescription>

                </div>
                <div className="grid grid-cols-2 gap-2">
                    <CardTitle>Bathrooms</CardTitle>
                    <CardDescription>{property.features.bathrooms}</CardDescription>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <CardTitle>Area</CardTitle>
                    <CardDescription>{property.features.area} Sqm</CardDescription>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <CardTitle>Furnished</CardTitle>
                    <CardDescription>{property.features.furnished ? "Yes" : "No"}</CardDescription>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <CardTitle>Parking Slot</CardTitle>
                    <CardDescription>{property.features.parking ? "Yes" : "No"}</CardDescription>
                </div>
            </CardContent>

        </Card>
    );
};

export default PropertyCard;
