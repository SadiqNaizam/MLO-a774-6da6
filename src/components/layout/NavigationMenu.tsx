import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus, LayoutDashboard, Moon, Sun } from 'lucide-react'; // Example icons
// import { useTheme } from 'next-themes'; // Assuming next-themes for dark/light mode

interface NavigationMenuProps {
  // Add any props if needed, e.g., for user state
}

const NavigationMenu: React.FC<NavigationMenuProps> = () => {
  console.log("Rendering NavigationMenu");
  // const { theme, setTheme } = useTheme(); // Uncomment if using next-themes

  return (
    <nav className="bg-background border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              CryptoDash
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cryptocurrencies">
              <Button variant="ghost">All Cryptos</Button>
            </Link>
            {/* Add more navigation links here as needed */}
          </div>
          <div className="flex items-center space-x-2">
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button> */}
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" aria-label="User Dashboard">
                <LayoutDashboard className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="sm">
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
            </Link>
             {/* Example Register Button - conditionally render based on auth state
             <Link to="/auth?mode=register">
              <Button variant="default" size="sm">
                <UserPlus className="mr-2 h-4 w-4" /> Register
              </Button>
            </Link> */}
          </div>
          {/* Mobile menu button (implementation needed if desired) */}
          {/* <div className="md:hidden"> <Button variant="ghost" size="icon"> <Menu className="h-6 w-6" /> </Button> </div> */}
        </div>
      </div>
      {/* Mobile menu content (implementation needed if desired) */}
    </nav>
  );
};

export default NavigationMenu;