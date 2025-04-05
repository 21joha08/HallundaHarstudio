
import { Instagram, Facebook, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-salon-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h3 className="text-xl font-serif mb-4">Studio Klippglädje</h3>
            <p className="text-salon-300 max-w-xs mx-auto md:mx-0">
              En modern salong där varje kund får en personlig och professionell upplevelse.
            </p>
          </div>
          
          <div className="mb-8 md:mb-0 text-center">
            <h4 className="text-lg font-medium mb-4">Snabblänkar</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#services" className="text-salon-300 hover:text-white transition-colors">Tjänster</a>
              <a href="#prices" className="text-salon-300 hover:text-white transition-colors">Priser</a>
              <a href="#gallery" className="text-salon-300 hover:text-white transition-colors">Galleri</a>
              <a href="#contact" className="text-salon-300 hover:text-white transition-colors">Kontakt</a>
              <a href="#booking" className="text-salon-300 hover:text-white transition-colors">Boka tid</a>
            </nav>
          </div>
          
          <div className="text-center md:text-right">
            <h4 className="text-lg font-medium mb-4">Kontakta oss</h4>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-center md:justify-end">
                <Phone size={18} className="mr-2" />
                <span>[Ditt Telefonnummer]</span>
              </div>
              <div className="flex items-center justify-center md:justify-end">
                <Mail size={18} className="mr-2" />
                <span>[Din E-post]</span>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-4 justify-center md:justify-end">
              <a href="#" className="text-salon-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-salon-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-salon-700 mt-8 pt-8 text-center">
          <p className="text-salon-400 text-sm">
            &copy; {new Date().getFullYear()} Studio Klippglädje. Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
