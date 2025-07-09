// src/layouts/DashboardLayout.tsx
import { Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/AppSideBar';

const DashboardLayout = () => {
    const location = useLocation();

    return (
        <SidebarProvider>
            <AppSidebar active={location.pathname} />
            <main className="pl-6 min-h-screen bg-muted/20 w-full">
                <div className='flex gap-2 items-center'>
                    <SidebarTrigger />
                    <p className='capitalize'>{location.pathname}</p>
                </div>
                <div className="p-4">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    );
};

export default DashboardLayout;
