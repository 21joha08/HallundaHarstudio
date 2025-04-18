
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
                    <p className="text-salon-600">Hallundavägen 1, 145 68 Norsborg</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="mr-4 text-accent flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Öppettider</h4>
                    <p className="text-salon-600">Mån–Fre: 10:00–19:00</p>
                    <p className="text-salon-600">Lördag: 10:00–17:00</p>
                    <p className="text-salon-600">Söndag: 10:00-16:00</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="mr-4 text-accent flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Telefon</h4>
                    <p className="text-salon-600">070-777 75 14</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="mr-4 text-accent flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">E-post</h4>
                    <p className="text-salon-600"></p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex space-x-4 mt-4">
                    <a href="https://www.instagram.com/hallundaharstudio/" className="text-salon-600 hover:text-accent transition-colors">
                      <Instagram size={24} />
                    </a>
                    <a href="https://www.facebook.com/pages/Hallunda-H%C3%A5rstudio/180322911996307" className="text-salon-600 hover:text-accent transition-colors">
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

        <div className="w-full mt-16">
          <div className="w-full h-[400px] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2040.29723626891!2d17.82367367698341!3d59.24447367457324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f7395a96feaa9%3A0xc39be921251fe894!2sHallundav%C3%A4gen%201%2C%20145%2068%20Norsborg!5e0!3m2!1ssv!2sse!4v1744983967768!5m2!1ssv!2sse"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
