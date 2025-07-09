import { cn } from "@/lib/utils"; // Optional utility if using `shadcn`

type StatItem = {
  count: string;
  label: string;
};

const statsData: StatItem[] = [
  { count: "5K+", label: "Properties Listed" },
  { count: "2K+", label: "Happy Clients" },
  { count: "100+", label: "Top Agents" },
];

const StatsSection = ({
  stats = statsData,
  className = "",
}: {
  stats?: StatItem[];
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-background px-auto py-8 flex justify-around flex-wrap gap-6 animate-fade-in",
        className
      )}
      style={{ animationDelay: "0.6s" }}
    >
      {stats.map((stat, index) => (
        <div key={index} className="md:flex items-center">
          <div className="w-16 h-16 bg-primary text-primary-foreground backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
            <span className="text-xl font-bold">{stat.count}</span>
          </div>
          <span className="text-foreground">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
