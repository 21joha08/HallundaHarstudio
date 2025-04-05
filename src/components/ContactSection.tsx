
import { MapPin, Phone, Mail, Instagram, Facebook, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Kontaktformulär skickat");
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-4">
          Kontakta Oss
        </h2>
        <p className="section-heading text-center text-salon-600 mb-12">
          Vi ser fram emot att höra från dig
        </p>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <div className="bg-secondary p-8 rounded-lg h-full">
              <h3 className="text-2xl font-serif mb-6">Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="mr-4 text-accent flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Adress</h4>
                    <p className="text-salon-600">[Din Salongsadress]</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="mr-4 text-accent flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Öppettider</h4>
                    <p className="text-salon-600">Mån–Fre: 09:00–18:00</p>
                    <p className="text-salon-600">Lördag: 10:00–14:00</p>
                    <p className="text-salon-600">Söndag: Stängt</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="mr-4 text-accent flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Telefon</h4>
                    <p className="text-salon-600">[Ditt Telefonnummer]</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="mr-4 text-accent flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">E-post</h4>
                    <p className="text-salon-600">[Din E-postadress]</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex space-x-4 mt-4">
                    <a href="#" className="text-salon-600 hover:text-accent transition-colors">
                      <Instagram size={24} />
                    </a>
                    <a href="#" className="text-salon-600 hover:text-accent transition-colors">
                      <Facebook size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Namn
                </label>
                <Input id="name" placeholder="Ditt namn" required />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  E-post
                </label>
                <Input id="email" type="email" placeholder="din.epost@exempel.se" required />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Telefon
                </label>
                <Input id="phone" placeholder="Ditt telefonnummer" />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Meddelande
                </label>
                <Textarea id="message" placeholder="Skriv ditt meddelande här..." rows={4} required />
              </div>
              
              <Button type="submit" className="bg-accent hover:bg-accent/90 text-primary transition-colors">
                Skicka meddelande
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-16">
          <div className="h-[400px] w-full rounded-lg overflow-hidden">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/lovable-community.appspot.com/o/images%2Fmap-placeholder.jpg?alt=media&token=f2d89b09-3fef-45f0-bcfd-7c784aad3d4f" 
              alt="Karta" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
