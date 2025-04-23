
import { Card } from '@/components/ui/card';

const photos = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb',
    title: 'Premium Sneakers',
    size: 'large'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1605408499391-6368c628ef42',
    title: 'Street Collection',
    size: 'medium'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28',
    title: 'Urban Style',
    size: 'medium'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9',
    title: 'Classic Design',
    size: 'small'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1603036050141-c61fde866f5c',
    title: 'Limited Edition',
    size: 'small'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b',
    title: 'Sport Series',
    size: 'medium'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1576672843344-f01907a9d40c',
    title: 'Modern Collection',
    size: 'medium'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
    title: 'Designer Edition',
    size: 'small'
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1584735175315-9d5df23be620',
    title: 'Performance Line',
    size: 'medium'
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1499013819532-e4ff41b00669',
    title: 'Exclusive Series',
    size: 'large'
  }
];

export default function Photos() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#999999]">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-6xl font-heading text-center mb-12">GALERIJA</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <Card 
              key={photo.id} 
              className={`
                overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300
                ${photo.size === 'large' ? 'col-span-2 row-span-2' : ''}
                ${photo.size === 'medium' ? 'col-span-1' : ''}
                ${photo.size === 'small' ? 'col-span-1' : ''}
              `}
            >
              <div className="relative group">
                <img 
                  src={photo.src} 
                  alt={photo.title}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105
                    ${photo.size === 'large' ? 'h-[600px]' : ''}
                    ${photo.size === 'medium' ? 'h-[400px]' : ''}
                    ${photo.size === 'small' ? 'h-[300px]' : ''}
                  `}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-medium">{photo.title}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
