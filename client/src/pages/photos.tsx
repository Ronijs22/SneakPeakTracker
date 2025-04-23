
import { Card } from '@/components/ui/card';

const photos = [
  {
    id: 1,
    src: '/assets/photos/sneaker1.jpg',
    size: 'medium'
  },
  {
    id: 2,
    src: '/assets/photos/sneaker2.jpg',
    size: 'medium'
  },
  {
    id: 3,
    src: '/assets/photos/sneaker3.jpg',
    size: 'small'
  },
  {
    id: 4,
    src: '/assets/photos/sneaker4.jpg',
    size: 'small'
  },
  {
    id: 5,
    src: '/assets/photos/sneaker5.jpg',
    size: 'small'
  },
  {
    id: 6,
    src: '/assets/photos/sneaker6.jpg',
    size: 'large'
  },
  {
    id: 7,
    src: '/assets/photos/sneaker7.jpg',
    size: 'medium'
  },
  {
    id: 8,
    src: '/assets/photos/sneaker8.jpg',
    size: 'medium'
  },
  {
    id: 9,
    src: '/assets/photos/sneaker9.jpg',
    size: 'small'
  }
];

export default function Photos() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #999999 100%)' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className={`
                overflow-hidden rounded-lg
                ${photo.size === 'large' ? 'col-span-1 row-span-2' : ''}
                ${photo.size === 'medium' ? 'col-span-1' : ''}
                ${photo.size === 'small' ? 'col-span-1' : ''}
              `}
            >
              <img 
                src={photo.src} 
                alt={`Gallery photo ${photo.id}`}
                className={`w-full object-cover
                  ${photo.size === 'large' ? 'h-[306px]' : ''}
                  ${photo.size === 'medium' ? 'h-[235px]' : ''}
                  ${photo.size === 'small' ? 'h-[160px]' : ''}
                `}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
