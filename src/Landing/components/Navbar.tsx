import React, { useState, useEffect } from 'react';
import DoDraftLogo from '../../assets/DoDraft.png';




import { Button } from './Button';

interface NavbarProps {
  onOpenEditor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEditor }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
       <div className="flex items-center gap-2">
  <img
    src={DoDraftLogo}
    alt="DoDraft Logo"
    className="h-8 w-auto"
  />

  <span className="font-bold text-xl tracking-tight text-slate-900">
    DoDraft
  </span>
</div>

        
        <div className="flex items-center gap-4">
          {/* <Button 
            onClick={onOpenEditor} 
            variant="ghost" 
            className="hidden sm:inline-flex text-slate-600 hover:text-indigo-600"
          >
            Open Editor
          </Button> */}
          <div className="flex items-center gap-4">
  <Button
    variant="ghost"
    onClick={() => window.location.href = "/login"}
  >
    Login
  </Button>

  <Button
  size="sm"
  onClick={() => {
    // Ensure user is logged out
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    localStorage.removeItem("sr_auth_token"); // if extension token exists

    // Navigate to main website
    window.location.href = "/app";
  }}
>
  Open Editor
</Button>

</div>
        </div>
      </div>
    </nav>
  );
};
