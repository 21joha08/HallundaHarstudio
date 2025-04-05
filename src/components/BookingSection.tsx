
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const BookingSection = () => {
  return (
    <section id="booking" className="py-20 bg-accent/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
          Boka Din Tid
        </h2>
        <p className="section-heading text-center text-salon-600 mb-8">
          Enkelt och smidigt online
        </p>
        
        <div className="max-w-xl mx-auto">
          <Card className="border border-salon-200 shadow-lg overflow-hidden">
            <div className="p-1 bg-accent/20"></div>
            <CardContent className="p-8">
              <div className="flex flex-col items-center space-y-6">
                <div className="flex items-center justify-center space-x-6">
                  <div className="flex items-center">
                    <Calendar className="mr-2 text-accent" />
                    <span className="text-salon-700">Välj datum</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 text-accent" />
                    <span className="text-salon-700">Välj tid</span>
                  </div>
                </div>
                
                <p className="text-center text-salon-600">
                  Vi erbjuder onlinebokning direkt via vår hemsida. Klicka på knappen nedan 
                  för att komma till vårt bokningssystem.
                </p>
                
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary transition-colors">
                  Boka tid nu
                </Button>
                
                <p className="text-sm text-salon-500">
                  Om du behöver avboka eller ändra din tid, vänligen kontakta oss senast 24 timmar innan din bokade tid.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
