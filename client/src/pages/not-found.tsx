
import { Card } from "@/components/ui/card";

const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
    title: "Premium Sneakers"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1605408499391-6368c628ef42",
    title: "Street Collection"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28",
    title: "Urban Style"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9",
    title: "Classic Design"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1603036050141-c61fde866f5c",
    title: "Limited Edition"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b",
    title: "Sport Series"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1576672843344-f01907a9d40c",
    title: "Modern Collection"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
    title: "Designer Edition"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1584735175315-9d5df23be620",
    title: "Performance Line"
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1499013819532-e4ff41b00669",
    title: "Exclusive Series"
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1552346154-21d32810aba3",
    title: "Signature Collection"
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    title: "Heritage Line"
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
    title: "Innovation Series"
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1520316587275-5e4f06f355e6",
    title: "Training Elite"
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de",
    title: "Lifestyle Edition"
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3",
    title: "Urban Collection"
  },
  {
    id: 17,
    src: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
    title: "Premium Series"
  },
  {
    id: 18,
    src: "https://images.unsplash.com/photo-1597248881519-db089d3744a5",
    title: "Signature Line"
  },
  {
    id: 19,
    src: "https://images.unsplash.com/photo-1543508282-6319a3e2621f",
    title: "Street Style"
  },
  {
    id: 20,
    src: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2",
    title: "Fashion Forward"
  }
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#999999]">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-6xl font-heading text-center mb-12">GALERIJA</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
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
    </div>
  );
}
