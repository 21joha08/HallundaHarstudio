
import { Scissors, User, Users, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Damklippning",
    description: "Professionell klippning anpassad efter din stil och önskemål",
    icon: <Scissors className="h-10 w-10 text-accent" />
  },
  {
    title: "Herrklippning",
    description: "Stilren och modern klippning för alla typer av hår",
    icon: <User className="h-10 w-10 text-accent" />
  },
  {
    title: "Barnklippning",
    description: "Varsam och lekfull klippupplevelse för barn i alla åldrar",
    icon: <Users className="h-10 w-10 text-accent" />
  },
  {
    title: "Färgning & Slingor",
    description: "Högkvalitativa färgbehandlingar som ger liv och glans till ditt hår",
    icon: <Star className="h-10 w-10 text-accent" />
  },
  {
    title: "Styling & Föning",
    description: "Professionell styling för vardag, fest eller speciella tillfällen",
    icon: <Scissors className="h-10 w-10 text-accent rotate-45" />
  },
  {
    title: "Bröllops- och festuppsättningar",
    description: "Elegant uppsättning som håller hela kvällen",
    icon: <Star className="h-10 w-10 text-accent" />
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-4">
          Våra Tjänster
        </h2>
        <p className="section-heading text-center text-salon-600 mb-12">
          Vi erbjuder en rad professionella hårvårdstjänster
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border border-salon-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 flex flex-col items-center">
                {service.icon}
                <CardTitle className="mt-4 text-xl font-serif">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-salon-600">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-salon-700 mb-6">
            Vi erbjuder även hårvårdsprodukter av högsta kvalitet för hemmabruk
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
