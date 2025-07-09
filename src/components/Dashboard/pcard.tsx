import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { Property } from "@/types/Property";

type Props = {
    property: Property;
    onEdit: (p: Property) => void;
    onDelete: (id: string) => void;
};

const PCard = ({ property, onEdit, onDelete }: Props) => (
    <Card className="flex pt-0 overflow-hidden flex-col h-full">
        <img
            src={property.images?.[0] || "/placeholder.jpg"}
            alt={property.title}
            className="h-40 w-full object-cover"
        />
        <CardContent className="pt-4 flex-grow">
            <h3 className="font-semibold truncate">{property.title}</h3>
            <p className="text-primary">{property.price}</p>
            <p className="text-sm text-muted-foreground truncate">
                {property.location?.address}
            </p>
        </CardContent>
        <CardFooter className="border-t pt-2 justify-evenly flex-wrap gap-2">
            <Button size="sm" variant="outline" asChild>
                <Link to={`/property/${property._id}`}>View</Link>
            </Button>
            <Button size="sm" variant="outline" onClick={() => onEdit(property)}>
                Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete(property._id)}>
                Delete
            </Button>
        </CardFooter>
    </Card>
);

export default PCard;
