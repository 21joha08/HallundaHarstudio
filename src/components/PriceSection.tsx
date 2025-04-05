
import { Card, CardContent } from "@/components/ui/card";

const prices = [
  {
    service: "Damklippning",
    price: "550 kr",
    description: "Konsultation, tvätt, klippning och styling"
  },
  {
    service: "Herrklippning",
    price: "450 kr",
    description: "Konsultation, tvätt, klippning och styling"
  },
  {
    service: "Barnklippning (0–12 år)",
    price: "300 kr",
    description: "Anpassad klippning för barn"
  },
  {
    service: "Färgning",
    price: "från 1200 kr",
    description: "Inklusive tvätt och färgbehandling"
  },
  {
    service: "Styling",
    price: "400 kr",
    description: "Professionell styling för speciella tillfällen"
  },
];

const PriceSection = () => {
  return (
    <section id="prices" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-4">
          Prislista
        </h2>
        <p className="section-heading text-center text-salon-600 mb-12">
          Våra tjänster och aktuella priser
        </p>
        
        <div className="max-w-3xl mx-auto">
          {prices.map((item, index) => (
            <Card key={index} className="mb-4 border border-salon-200 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="p-6 flex-1">
                    <h3 className="text-xl font-serif mb-1">{item.service}</h3>
                    <p className="text-sm text-salon-600">{item.description}</p>
                  </div>
                  <div className="sm:border-l border-t sm:border-t-0 border-salon-200 p-6 bg-secondary flex-shrink-0 text-center sm:text-left w-full sm:w-auto">
                    <span className="text-xl font-medium text-salon-800 block sm:whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-salon-600 italic">
            * Priserna kan variera beroende på hårets längd och tjocklek. Kontakta oss för en personlig prisuppgift.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PriceSection;
