import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs"

const PropertySearch = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState("rent")

  const [formValues, setFormValues] = useState({
    status: "rent",
    location: "",
    type: "",
    minPrice: "",
    maxPrice: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormValues(prev => ({ ...prev, [field]: value }))
  }

  const handleTabChange = (val: string) => {
    setTab(val)
    handleChange("status", val === "buy" ? "sale" : val) // sync tab and status
  }

  const handleSubmit = () => {
    navigate("/properties", {
      state: {
        filters: {
          ...formValues,
          status: tab === "buy" ? "sale" : tab, // make absolutely sure
        },
      },
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <Tabs
        defaultValue="rent"
        onValueChange={handleTabChange}
        className="animate-fade-in"
      >
        <TabsList className="flex gap-4 justify-center">
          {["rent", "buy"].map(val => (
            <TabsTrigger
              key={val}
              value={val}
              className="text-foreground data-[state=active]:backdrop-blur-lg data-[state=active]:text-foreground data-[state=active]:bg-background/80"
            >
              {val.charAt(0).toUpperCase() + val.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="bg-background/80 backdrop-blur-lg shadow-md p-6 rounded-b-2xl">
          {["rent", "buy"].map(val => (
            <TabsContent
              key={val}
              value={val}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <div className="w-full">
                <Label htmlFor="location">Location</Label>
                <Input
                  name="location"
                  placeholder="City or area"
                  value={formValues.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
              </div>

              <div className="w-full">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={formValues.type}
                  onValueChange={(val) => handleChange("type", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Type</SelectLabel>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full">
                <Label>Price Range</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Min"
                    type="number"
                    value={formValues.minPrice}
                    onChange={(e) => handleChange("minPrice", e.target.value)}
                  />
                  <Input
                    placeholder="Max"
                    type="number"
                    value={formValues.maxPrice}
                    onChange={(e) => handleChange("maxPrice", e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full self-end">
                <Button onClick={handleSubmit} className="w-full">
                  {val.charAt(0).toUpperCase() + val.slice(1)} Property
                </Button>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  )
}

export default PropertySearch
