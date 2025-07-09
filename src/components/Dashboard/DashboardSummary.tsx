import { Card } from "@/components/ui/card";
import { Building2, Tag } from "lucide-react";
import type { Property } from "@/types/Property";

type Props = {
    properties: Property[];
};

const DashboardSummary = ({ properties }: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-4">
                <div className="flex items-center gap-3">
                    <Building2 className="w-6 h-6 text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Total Properties</p>
                        <p className="text-lg font-semibold">{properties.length}</p>
                    </div>
                </div>
            </Card>

            <Card className="p-4">
                <div className="flex items-center gap-3">
                    <Tag className="w-6 h-6 text-green-600" />
                    <div>
                        <p className="text-sm text-muted-foreground">For Sale</p>
                        <p className="text-lg font-semibold">{properties.filter(p => p.status === "sale").length}</p>
                    </div>
                </div>
            </Card>

            <Card className="p-4">
                <div className="flex items-center gap-3">
                    <Tag className="w-6 h-6 text-purple-600" />
                    <div>
                        <p className="text-sm text-muted-foreground">For Rent</p>
                        <p className="text-lg font-semibold">{properties.filter(p => p.status === "rent").length}</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default DashboardSummary;
