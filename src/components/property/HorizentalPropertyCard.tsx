import { Card } from "@/components/ui/card"
import type { Property } from "@/types/Property"

type Props = {
    property: Property
}

const HorizentalPropertyCard = ({ property }: Props) => {
    return (
        <Card className="flex flex-col md:flex-row md:w-full w-fit mx-auto gap-4 p-4 shadow-sm border bg-white rounded-xl">
            {/* Image Section */}
            <div className="md:w-1/3">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    className=" md:h-40 mx-auto w-auto object-cover rounded-md"
                />
            </div>

            {/* Content Section */}
            <div className="flex md:flex-row flex-col justify-between w-full ">
                <div className="md:w-2/3 flex flex-col justify-around">
                    {/* Title */}
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">{property.title}</h3>
                    </div>

                    {/* Info */}
                    <div className="text-sm text-muted-foreground mt-1">
                        <p>{property.location.city}, {property.location.area}</p>
                        <p className="capitalize">Type: {property.type}</p>
                        <p className="capitalize">Status: {property.status}</p>
                    </div>

                    {/* Price */}

                </div>
                <div className="mt-3">
                    <h1>Price</h1>
                    <div className="inline-block text-base font-semibold px-3 py-1 bg-[#F4400D] text-white rounded-md w-fit">
                        ${property.price.toLocaleString()}
                    </div>

                </div>
            </div>
        </Card>
    )
}

export default HorizentalPropertyCard
