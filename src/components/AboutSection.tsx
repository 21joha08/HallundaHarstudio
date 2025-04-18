
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-4">
          Om Oss
        </h2>
        <p className="section-heading text-center text-salon-600 mb-8">
          Lär känna oss och vår historia
        </p>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="aspect-[4/5] bg-salon-200 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80"
                  alt="Frisör"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-6 rounded-lg bg-accent/90 backdrop-blur max-w-xs">
                <p className="text-white font-serif text-lg italic">
                  "Varje klippning är en möjlighet att skapa något vackert"
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <h3 className="text-2xl font-serif mb-6">Vi är Hallunda Hårstudio</h3>
            <p className="text-salon-700 mb-6">
              På Hallunda Hårstudio prioriterar vi kvalitet, personlig service och en avslappnad atmosfär. Vi lyssnar på dina önskemål och ger råd för att hitta den perfekta stilen för dig.
            </p>

            <Card className="border border-salon-200 bg-secondary shadow-sm">
              <CardContent className="p-6">
                <h4 className="text-xl font-serif mb-4">Vår målgrupp</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Kvinnor och män i alla åldrar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Familjer</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
