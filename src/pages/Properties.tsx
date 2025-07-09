import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import HorizentalPropertyCard from "@/components/property/HorizentalPropertyCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";

import { getAllProperties } from "@/lib/api/propertyController";
import type { Property } from "@/types/Property";
import { Badge } from "@/components/ui/badge";
import NotFound from "./NotFound";
import Loader from "./loading";

type Filter = {
    status: string;
    minPrice: string;
    maxPrice: string;
    location: string;
    type: string;
};

const Properties = () => {
    const [loading, setLoading] = useState(false);
    const [propertyList, setPropertyList] = useState<Property[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const location = useLocation();
    const stateFilters = location.state?.filters;

    const [filters, setFilters] = useState<Filter>({
        status: "all",
        minPrice: "",
        maxPrice: "",
        location: "",
        type: "",
    });

    useEffect(() => {
        if (stateFilters) {
            setFilters((prev) => ({ ...prev, ...stateFilters }));
        }
    }, [stateFilters]);

    const handleFilterChange = (key: keyof Filter, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const fetchProperties = async () => {
        try {
            setLoading(true);
            const data = await getAllProperties();
            setPropertyList(data);
        } catch (err) {
            console.error("Failed to load properties:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    useEffect(() => {
        const filtered = propertyList.filter((p) => {
            return (
                (!filters.status || filters.status === "all" || p.status === filters.status) &&
                (!filters.type || p.type === filters.type) &&
                (!filters.location || p.location?.city?.toLowerCase().includes(filters.location.toLowerCase())) &&
                (!filters.minPrice || p.price >= parseInt(filters.minPrice)) &&
                (!filters.maxPrice || p.price <= parseInt(filters.maxPrice))
            );
        });
        setFilteredProperties(filtered);
        setCurrentPage(1); // Reset to page 1 on filter change
    }, [filters, propertyList]);

    const applyFilters = () => { };

    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
    const paginatedProperties = filteredProperties.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            {/* 🔘 Mobile Filter Button */}
            <div className="md:hidden flex justify-end px-4 mt-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Filter</Button>
                    </DialogTrigger>
                    <DialogContent className="p-4 max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Filter Properties</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                            <div className="col-span-2">
                                <Label>Status</Label>
                                <Select value={filters.status} onValueChange={(val) => handleFilterChange("status", val)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="rent">Rent</SelectItem>
                                            <SelectItem value="sale">Sale</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Min Price</Label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 1000"
                                    value={filters.minPrice}
                                    onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Max Price</Label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 5000"
                                    value={filters.maxPrice}
                                    onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                                />
                            </div>
                            <div className="col-span-2">
                                <Label>Location</Label>
                                <Input
                                    placeholder="e.g. Islamabad"
                                    value={filters.location}
                                    onChange={(e) => handleFilterChange("location", e.target.value)}
                                />
                            </div>
                            <div className="col-span-2">
                                <Label>Type</Label>
                                <Select value={filters.type} onValueChange={(val) => handleFilterChange("type", val)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="apartment">Apartment</SelectItem>
                                            <SelectItem value="house">House</SelectItem>
                                            <SelectItem value="villa">Villa</SelectItem>
                                            <SelectItem value="plot">Plot</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <DialogClose asChild>
                                <Button onClick={applyFilters} className="col-span-2 w-full mt-2">
                                    Apply Filters
                                </Button>
                            </DialogClose>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* 🖥️ Desktop Filters & Property List */}
            <section className="md:flex p-4 gap-x-6">
                {/* Sidebar Filters */}
                <div className="md:w-1/4 hidden md:block min-h-full bg-card border-r px-4 py-6 sticky top-0 space-y-4 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800">Filter Properties</h2>
                    <div className="space-y-4">
                        <div>
                            <Label>Status</Label>
                            <Select value={filters.status} onValueChange={(val) => handleFilterChange("status", val)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="rent">Rent</SelectItem>
                                    <SelectItem value="sale">Sale</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Min Price</Label>
                            <Input
                                type="number"
                                placeholder="e.g. 1000"
                                value={filters.minPrice}
                                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Max Price</Label>
                            <Input
                                type="number"
                                placeholder="e.g. 5000"
                                value={filters.maxPrice}
                                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                placeholder="e.g. Islamabad"
                                value={filters.location}
                                onChange={(e) => handleFilterChange("location", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Type</Label>
                            <Select value={filters.type} onValueChange={(val) => handleFilterChange("type", val)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="apartment">Apartment</SelectItem>
                                    <SelectItem value="house">House</SelectItem>
                                    <SelectItem value="villa">Villa</SelectItem>
                                    <SelectItem value="plot">Plot</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={applyFilters} className="w-full mt-4">
                            Apply Filters
                        </Button>
                    </div>
                </div>

                {/* Property List + Pagination */}
                <div className="md:w-3/4 w-full py-8 space-y-4">
                    {loading ? (
                        <Loader />
                    ) : paginatedProperties.length === 0 ? (
                        <NotFound
                            title="No Properties Found"
                            description="There are currently no properties available. Please check back later or try adjusting your filters."
                            actionLabel="Back to Home"
                            actionLink="/"
                        />

                    ) : (
                        <>
                            <div className="flex justify-between items-center">
                                <h1 className="font-bold text-3xl ">Properties List</h1>
                                <Badge className="text-xl">{propertyList.length}</Badge>
                            </div>
                            {paginatedProperties.map((property, index) => (
                                <Link to={`/property/${property._id}`}>
                                    <HorizentalPropertyCard key={property._id || index} property={property} />
                                </Link>
                            ))}

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex justify-center gap-2 mt-6 flex-wrap">
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <Button
                                            key={i}
                                            variant={currentPage === i + 1 ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setCurrentPage(i + 1)}
                                        >
                                            {i + 1}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default Properties;
