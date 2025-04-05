
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="hero" className="hero-section min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6 leading-tight">
          Studio Klippglädje
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
      </div>
    </section>
  );
};

export default HeroSection;
