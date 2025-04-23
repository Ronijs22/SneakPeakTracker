
import { useState } from 'react';
import { Card } from '@/components/ui/card';

const photos = [
  {
    id: 1,
    src: '/assets/photos/photo1.jpg',
    title: 'Sneaker Collection 2023',
    description: 'Our latest collection showcase'
  },
  {
    id: 2,
    src: '/assets/photos/photo2.jpg',
    title: 'Store Interior',
    description: 'A peek inside our store'
  },
  {
    id: 3,
    src: '/assets/photos/photo3.jpg',
    title: 'Custom Designs',
    description: 'Unique sneaker customizations'
  }
];

export default function Photos() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Mūsu Galerija</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <Card key={photo.id} className="overflow-hidden">
            <img 
              src={photo.src} 
              alt={photo.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{photo.title}</h3>
              <p className="text-gray-600">{photo.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
