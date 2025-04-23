import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
    title: "Premium Sneakers"
  },
  {
    id: 2,
    src: "https://via.placeholder.com/150",
    title: "Sneaker 2"
  },
  {
    id: 3,
    src: "https://via.placeholder.com/150",
    title: "Sneaker 3"
  },
  {
    id: 4,
    src: "https://via.placeholder.com/150",
    title: "Sneaker 4"
  },
  {
    id: 5,
    src: "https://via.placeholder.com/150",
    title: "Sneaker 5"
  },
  {
    id: 6,
    src: "https://via.placeholder.com/150",
    title: "Sneaker 6"
  },
  {
    id: 7,
    src: "https://via.placeholder.com/150",
    title: "Sneaker 7"
  },
  {
    id: 8,
    src: "https://via.placeholder.com/150",
    title: "Sneaker 8"
  },
  {
    id: 9,
    src: "https://via.placeholder.com/150",
    title: "Sneaker 9"
  },
  {
    id: 10,
    src: "https://via.placeholder.com/150",
    title: "Sneaker 10"
  },
  {
    id: 11,
    src: "https://via.placeholder.com/150",
    title: "Sneaker 11"
  },
  {
    id: 12,
    src: "https://via.placeholder.com/150",
    title: "Sneaker 12"
  },
  {
    id: 13,
    src: "https://via.placeholder.com/150",
    title: "Sneaker 13"
  },
  {
    id: 14,
    src: "https://via.placeholder.com/150",
    title: "Sneaker 14"
  },
  {
    id: 15,
    src: "https://via.placeholder.com/150",
    title: "Sneaker 15"
  },
  {
    id: 16,
    src: "https://via.placeholder.com/150",
    title: "Sneaker 16"
  },
  {
    id: 17,
    src: "https://via.placeholder.com/150",
    title: "Sneaker 17"
  },
  {
    id: 18,
    src: "https://via.placeholder.com/150",
    title: "Sneaker 18"
  },
  {
    id: 19,
    src: "https://via.placeholder.com/150",
    title: "Sneaker 19"
  },
  {
    id: 20,
    src: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2",
    title: "Fashion Forward"
  },
  {
    id: 21,
    src: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b",
    title: "Classic White"
  },
  {
    id: 22,
    src: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f",
    title: "Retro Collection"
  },
  {
    id: 23,
    src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    title: "Running Elite"
  },
  {
    id: 24,
    src: "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
    title: "Streetwear Special"
  },
  {
    id: 25,
    src: "https://images.unsplash.com/photo-1572537165377-627a37043464",
    title: "Urban Runner"
  },
  {
    id: 26,
    src: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de",
    title: "Sport Classic"
  },
  {
    id: 27,
    src: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb",
    title: "Designer Series"
  },
  {
    id: 28,
    src: "https://images.unsplash.com/photo-1551116198-01d550c9809c",
    title: "Limited Run"
  },
  {
    id: 29,
    src: "https://images.unsplash.com/photo-1556048219-bb6978360b84",
    title: "Athletic Pro"
  },
  {
    id: 30,
    src: "https://images.unsplash.com/photo-1562183241-840b8af0721e",
    title: "Exclusive Edition"
  }
];

export default function Gallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPhotos = photos.filter(photo => 
    photo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePhotoClick = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const handleClose = () => {
    setSelectedPhotoIndex(null);
  };

  const handlePrevious = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  const handleNext = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (selectedPhotoIndex === null) return;

    if (event.key === 'ArrowLeft') {
      handlePrevious();
    } else if (event.key === 'ArrowRight') {
      handleNext();
    } else if (event.key === 'Escape') {
      handleClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPhotoIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#999999]">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-6xl font-heading text-center mb-12">GALERIJA</h1>
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Meklēt apavus..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B98615]"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => (
            <Card 
              key={photo.id} 
              className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handlePhotoClick(index)}
            >
              <div className="relative group">
                <img 
                  src={photo.src} 
                  alt={photo.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-medium">{photo.title}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={handleClose}
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="max-w-5xl max-h-[80vh] mx-4">
            <img
              src={photos[selectedPhotoIndex].src}
              alt={photos[selectedPhotoIndex].title}
              className="w-full h-full object-contain"
            />
            <div className="text-white text-center mt-4 text-xl">
              {photos[selectedPhotoIndex].title}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  );
}