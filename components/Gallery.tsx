import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../constants';
import { X } from 'lucide-react';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif text-stone-800 mb-2">Gallery</h2>
        <p className="text-stone-500 text-sm">Our Beautiful Moments</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 max-w-4xl mx-auto">
        {GALLERY_IMAGES.map((img) => (
          <div
            key={img.id}
            className="aspect-[3/4] overflow-hidden cursor-pointer group rounded-sm"
            onClick={() => setSelectedImage(img.url)}
          >
            <img
              src={img.url}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-rose-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <img
            src={selectedImage}
            alt="Expanded view"
            className="max-h-[90vh] max-w-full object-contain shadow-2xl"
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;