
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="w-full bg-white/90 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <a href="#hero" className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-serif font-semibold text-salon-800">
                Hallunda Hårstudio
              </h1>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <a href="#services" className="text-salon-600 hover:text-salon-800 px-3 py-2 text-sm font-medium transition-colors">
              Tjänster
            </a>
            <a href="#about" className="text-salon-600 hover:text-salon-800 px-3 py-2 text-sm font-medium transition-colors">
              Om oss
            </a>
            <a href="#prices" className="text-salon-600 hover:text-salon-800 px-3 py-2 text-sm font-medium transition-colors">
              Priser
            </a>
            <a href="#gallery" className="text-salon-600 hover:text-salon-800 px-3 py-2 text-sm font-medium transition-colors">
              Galleri
            </a>
            <a href="#contact" className="text-salon-600 hover:text-salon-800 px-3 py-2 text-sm font-medium transition-colors">
              Kontakt
            </a>
            <Button asChild className="ml-4 bg-accent hover:bg-accent/90 text-primary transition-colors">
              <a href="#booking">Boka tid</a>
            </Button>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-salon-600 hover:text-salon-800 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-salon-100 animate-fade-in">
          <div className="pt-2 pb-4 space-y-1 px-4">
            <a href="#services" className="block px-3 py-2 text-salon-600 font-medium hover:text-salon-800 hover:bg-salon-50 rounded" onClick={toggleMobileMenu}>
              Tjänster
            </a>
            <a href="#about" className="block px-3 py-2 text-salon-600 font-medium hover:text-salon-800 hover:bg-salon-50 rounded" onClick={toggleMobileMenu}>
              Om oss
            </a>
            <a href="#prices" className="block px-3 py-2 text-salon-600 font-medium hover:text-salon-800 hover:bg-salon-50 rounded" onClick={toggleMobileMenu}>
              Priser
            </a>
            <a href="#gallery" className="block px-3 py-2 text-salon-600 font-medium hover:text-salon-800 hover:bg-salon-50 rounded" onClick={toggleMobileMenu}>
              Galleri
            </a>
            <a href="#contact" className="block px-3 py-2 text-salon-600 font-medium hover:text-salon-800 hover:bg-salon-50 rounded" onClick={toggleMobileMenu}>
              Kontakt
            </a>
            <Button asChild className="w-full mt-3 bg-accent hover:bg-accent/90 text-primary transition-colors">
              <a href="#booking" onClick={toggleMobileMenu}>Boka tid</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
