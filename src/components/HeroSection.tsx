
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return (
    <section id="hero" className="hero-section min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6 leading-tight">
          Hallunda Hårstudio
        </h1>
        <p className="text-lg md:text-xl text-salon-700 max-w-2xl mx-auto mb-8">
          Att erbjuda en modern, avslappnande och personlig frisörupplevelse där varje kund känner sig sedd, vacker och nöjd.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-primary">
            <a href="#booking">Boka tid</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-accent text-salon-800 hover:bg-accent/10">
            <a href="#services">Våra tjänster</a>
          </Button>
        </div>
        
        {isDevelopment && (
          <div className="mt-8 opacity-60 hover:opacity-100 transition-opacity">
            <Button asChild size="sm" variant="outline">
              <a href="#email-setup">Konfigurera E-post</a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
