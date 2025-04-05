
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80",
    alt: "Färgning och styling",
    category: "färgning"
  },
  {
    url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80",
    alt: "Herrklippning",
    category: "herrklippning"
  },
  {
    url: "https://images.unsplash.com/photo-1580618864174-ecdd0f756bad?auto=format&fit=crop&q=80",
    alt: "Kvinna med långt hår",
    category: "damklippning"
  },
  {
    url: "https://images.unsplash.com/photo-1552642986-ccb41e7059e7?auto=format&fit=crop&q=80",
    alt: "Uppklippt frisyr",
    category: "damklippning"
  },
  {
    url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80",
    alt: "Slingor och styling",
    category: "färgning"
  },
  {
    url: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80",
    alt: "Brud uppsättning",
    category: "uppsättning"
  },
  {
    url: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&q=80",
    alt: "Modernt hår",
    category: "damklippning"
  },
  {
    url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80",
    alt: "Herrstil",
    category: "herrklippning"
  },
];

type Category = "alla" | "damklippning" | "herrklippning" | "färgning" | "uppsättning";

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<Category>("alla");
  const [filteredImages, setFilteredImages] = useState(galleryImages);
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (filter === "alla") {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(img => img.category === filter));
    }
  }, [filter]);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const navigateImage = (direction: "next" | "prev") => {
    if (selectedImage === null) return;
    
    if (direction === "next") {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    } else {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImage === null) return;
    
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowRight") {
      navigateImage("next");
    } else if (e.key === "ArrowLeft") {
      navigateImage("prev");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <section id="gallery" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-4">
          Vårt Galleri
        </h2>
        <p className="section-heading text-center text-salon-600 mb-8">
          Bli inspirerad av några av våra tidigare arbeten
        </p>
        
        {/* Category filters */}
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === "alla" ? "bg-accent text-primary" : "bg-accent/10 hover:bg-accent/20 text-salon-700"}`}
            onClick={() => setFilter("alla")}
          >
            Alla
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === "damklippning" ? "bg-accent text-primary" : "bg-accent/10 hover:bg-accent/20 text-salon-700"}`}
            onClick={() => setFilter("damklippning")}
          >
            Damklippning
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === "herrklippning" ? "bg-accent text-primary" : "bg-accent/10 hover:bg-accent/20 text-salon-700"}`}
            onClick={() => setFilter("herrklippning")}
          >
            Herrklippning
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === "färgning" ? "bg-accent text-primary" : "bg-accent/10 hover:bg-accent/20 text-salon-700"}`}
            onClick={() => setFilter("färgning")}
          >
            Färgning & Slingor
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === "uppsättning" ? "bg-accent text-primary" : "bg-accent/10 hover:bg-accent/20 text-salon-700"}`}
            onClick={() => setFilter("uppsättning")}
          >
            Uppsättningar
          </button>
        </div>
        
        {/* Mobile view - Carousel */}
        {mobileView ? (
          <div className="mt-8">
            <Carousel className="w-full max-w-md mx-auto">
              <CarouselContent>
                {filteredImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <div 
                        className="aspect-square overflow-hidden rounded-lg relative"
                        onClick={() => openLightbox(galleryImages.findIndex(img => img.url === image.url))}
                      >
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                          <Maximize2 className="text-white h-8 w-8" />
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
        ) : (
          /* Desktop view - Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <div 
                key={index} 
                className="aspect-square overflow-hidden rounded-lg cursor-pointer relative group"
                onClick={() => openLightbox(galleryImages.findIndex(img => img.url === image.url))}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                    <Maximize2 className="text-white h-8 w-8" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button 
              className="absolute top-4 right-4 text-white hover:text-accent"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>
            <button 
              className="absolute left-4 text-white hover:text-accent"
              onClick={() => navigateImage("prev")}
            >
              <ChevronLeft size={40} />
            </button>
            <div className="relative max-h-[80vh] max-w-[90vw]">
              <img
                src={galleryImages[selectedImage].url}
                alt={galleryImages[selectedImage].alt}
                className="max-h-[80vh] max-w-full object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-center rounded-b-lg">
                {galleryImages[selectedImage].alt}
              </div>
            </div>
            <button 
              className="absolute right-4 text-white hover:text-accent"
              onClick={() => navigateImage("next")}
            >
              <ChevronRight size={40} />
            </button>
            
            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
