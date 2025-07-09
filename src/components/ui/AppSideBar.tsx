import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
    Home,
    House,
    Calculator,
    MessageCircle,
    LayoutDashboard,
    Building2,
    PlusCircle,
    List,
    Users,
    EllipsisVertical,
    Badge,
} from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useAuth } from "@/context/AuthContext";

const publicLinks = [
    { name: "Home", path: "/", icon: <Home /> },
    { name: "Properties", path: "/properties", icon: <House /> },
    { name: "Recommendations", path: "/recommendations", icon: <Badge /> },
    { name: "Chat", path: "/chat", icon: <MessageCircle /> },
];

const userLinks = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard /> },
    { name: "My Properties", path: "/dashboard/properties", icon: <Building2 /> },
    { name: "Add Property", path: "/dashboard/add-property", icon: <PlusCircle /> },
];

const adminLinks = [
    { name: "All Properties", path: "/admin/properties", icon: <List /> },
    { name: "All Users", path: "/admin/users", icon: <Users /> },
];

type AppSidebarProps = {
    active: string;
};

export function AppSidebar({ active }: AppSidebarProps) {
    const { user, logout } = useAuth();

    return (
        <Sidebar bg-background >
            <SidebarHeader>
                <h1 className="logo text-3xl text-foreground font-bold text-center mt-4">RENTIQ</h1>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Public</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {publicLinks.map((item) => (
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton asChild >
                                        <a href={item.path} className={`flex items-center gap-2 `}>
                                            {item.icon}
                                            <span>{item.name}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {user && (
                    <SidebarGroup>
                        <SidebarGroupLabel>User Dashboard</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {userLinks.map((item) => (
                                    <SidebarMenuItem key={item.name}>
                                        <SidebarMenuButton asChild isActive={item.path === active}>
                                            <a href={item.path} className="flex items-center gap-2">
                                                {item.icon}
                                                <span>{item.name}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}

                {user?.role === "admin" && (
                    <SidebarGroup>
                        <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {adminLinks.map((item) => (
                                    <SidebarMenuItem key={item.name}>
                                        <SidebarMenuButton asChild isActive={item.path === active}>
                                            <a href={item.path} className="flex items-center gap-2">
                                                {item.icon}
                                                <span>{item.name}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}
            </SidebarContent>

            {user && (
                <SidebarFooter className="border-t p-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <Avatar className="h-8 w-8 rounded-lg grayscale">
                                    <AvatarImage src={user.image || ''} alt={user.name} />
                                    <AvatarFallback className="rounded-lg">{user.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{user.name}</span>
                                    <span className="text-muted-foreground truncate text-xs">
                                        {user.email}
                                    </span>
                                </div>
                                <EllipsisVertical className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48 mt-2">
                            <DropdownMenuItem asChild>
                                <a href="/dashboard/profile">Profile</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={logout}>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarFooter>
            )}
        </Sidebar>
    );
}
