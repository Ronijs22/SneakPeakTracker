
import { Card } from '@/components/ui/card';

const photos = [
  {
    id: 1,
    src: '/assets/photos/sneaker1.jpg',
    size: 'medium',
    caption: 'Sneaker Collection 2024'
  },
  {
    id: 2,
    src: '/assets/photos/sneaker2.jpg',
    size: 'medium',
    caption: 'Street Style'
  },
  {
    id: 3,
    src: '/assets/photos/sneaker3.jpg',
    size: 'small',
    caption: 'Urban Fashion'
  },
  {
    id: 4,
    src: '/assets/photos/sneaker4.jpg',
    size: 'small',
    caption: 'Limited Edition'
  },
  {
    id: 5,
    src: '/assets/photos/sneaker5.jpg',
    size: 'small',
    caption: 'Classic Design'
  },
  {
    id: 6,
    src: '/assets/photos/sneaker6.jpg',
    size: 'large',
    caption: 'Premium Collection'
  },
  {
    id: 7,
    src: '/assets/photos/sneaker7.jpg',
    size: 'medium',
    caption: 'Sport Edition'
  },
  {
    id: 8,
    src: '/assets/photos/sneaker8.jpg',
    size: 'medium',
    caption: 'Lifestyle Series'
  },
  {
    id: 9,
    src: '/assets/photos/sneaker9.jpg',
    size: 'small',
    caption: 'Designer Collab'
  }
];

export default function Photos() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #999999 100%)' }}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-6xl font-heading text-center mb-12">GALERIJA</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {photos.map((photo) => (
            <Card 
              key={photo.id} 
              className={`
                overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300
                ${photo.size === 'large' ? 'col-span-1 row-span-2' : ''}
                ${photo.size === 'medium' ? 'col-span-1' : ''}
                ${photo.size === 'small' ? 'col-span-1' : ''}
              `}
            >
              <div className="relative">
                <img 
                  src={photo.src} 
                  alt={`Gallery photo ${photo.id}`}
                  className={`w-full object-cover
                    ${photo.size === 'large' ? 'h-[306px]' : ''}
                    ${photo.size === 'medium' ? 'h-[235px]' : ''}
                    ${photo.size === 'small' ? 'h-[160px]' : ''}
                  `}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3">
                  <p className="text-sm font-medium">{photo.caption}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
