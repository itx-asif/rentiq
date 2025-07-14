import {

  Menu,
  Search,
  LogIn
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../ui/sheet';
import { Button } from '../ui/button';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { name: 'Home', path: '/', },
  { name: 'Properties', path: '/properties', },
  { name: 'Recommendation', path: '/recommendations', },
  { name: 'Chat', path: '/chat', }
];

import { useState } from "react";


const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [sheetOpen, setSheetOpen] = useState(false); // ← control sheet open/close

  const handleMobileNavClick = (path: string) => {
    navigate(path);
    setSheetOpen(false); // close sheet
  };

  return (
    <nav className='bg-background flex justify-between shadow-border shadow-xs px-8 py-4 items-center'>
      <a href='/' className='logo text-3xl text-forground font-bold'>RENTIQ</a>

      <menu className='md:flex gap-1 hidden'>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className='text-foreground rounded-md hover:bg-accent hover:text-accent-foreground px-3 py-2 text-md font-medium flex items-center space-x-1'
          >
            <span>{link.name}</span>
          </Link>
        ))}
      </menu>

      <div className='flex items-center gap-1'>
        <Button variant="ghost" size="icon" className="inline-flex" title="Search" asChild>
          <Link to={"/properties"}>
            <Search className='h-5 w-5' />
          </Link>
        </Button>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user.image || ''} alt={user.name} />
                <AvatarFallback>
                  {user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mr-8'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/login" className='hidden md:inline-flex'>
            <Button variant='outline' size='sm'>
              <LogIn className='w-4 h-4 mr-1' />
              Login
            </Button>
          </Link>
        )}

        {/* Mobile Sheet Menu */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen} >
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className='md:hidden'>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <menu className='flex flex-col gap-3 mt-4'>
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleMobileNavClick(link.path)}
                  className='text-left text-foreground rounded-md hover:underline px-3 py-2 text-md font-medium flex items-center space-x-2'
                >
                  <span>{link.name}</span>
                </button>
              ))}

              {!user && (
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => handleMobileNavClick("/login")}
                  className='w-full'
                >
                  <LogIn className='w-4 h-4 mr-1' />
                  Login
                </Button>
              )}
            </menu>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default NavBar;
