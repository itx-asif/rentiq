import { Button } from "@/components/ui/button";
import PCard from "./pcard";
import { Link } from "react-router-dom";
import type { Property } from "@/types/Property";
import NotFound from "@/pages/NotFound";

type Props = {
    properties: Property[];
    onEdit: (p: Property) => void;
    onDelete: (id: string) => void;
};

const RecentProperties = ({ properties, onEdit, onDelete }: Props) => {

    if (properties.length === 0) {
        return (
            <NotFound
                title="No Properties Listed"
                description="You haven’t listed any properties yet. Start by adding your first property now."
                actionLabel="Add Property"
                actionLink="/dashboard/add-property"
                icon={null}
            />

        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.slice(0, 6).map((property) => (
                <PCard
                    key={property._id}
                    property={property}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default RecentProperties;
