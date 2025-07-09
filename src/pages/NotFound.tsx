import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

interface NotFoundProps {
    title?: string;
    description?: string;
    actionLabel?: string;
    actionLink?: string;
    icon?: React.ReactNode;
}

export default function NotFound({
    title = "404 – Page Not Found",
    description = "The page you're looking for doesn’t exist or has been moved. Let’s get you back.",
    actionLabel = "Back to Dashboard",
    actionLink = "/",
    icon = <Ghost className="w-16 h-16 text-primary" />,
}: NotFoundProps) {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 bg-white">
            <div className="flex flex-col items-center gap-4">
                {icon}
                <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
                <p className="text-muted-foreground max-w-md">{description}</p>
                <Button asChild>
                    <Link to={actionLink}>{actionLabel}</Link>
                </Button>
            </div>
        </div>
    );
}
