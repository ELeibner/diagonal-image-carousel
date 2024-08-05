import React, { useCallback, useState } from 'react';
import './Carousel.css';

const images = [
  'Image 1',
  'Image 2',
  'Image 3',
  'Image 4',
  'Image 5',
  'Image 6',
  'Image 7',
  'Image 8',
  'Image 9',
  'Image 10',
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  return (
    <div className="carousel relative w-[512px] h-[360px] overflow-hidden border border-gray-200 bg-gray-50 mx-auto my-16">
      <div className="absolute inset-0 flex items-center justify-center">
        {images.map((image, index) => {
          const offset = (index - currentIndex + images.length) % images.length;
          const diagonalStyle = {
            transform: `translate(${
              (offset - Math.floor(images.length / 2)) * 100
            }%, ${(offset - Math.floor(images.length / 2)) * 50}%)`,
            opacity: offset === Math.floor(images.length / 2) ? 1 : 0.4,
          };
          return (
            <div
              key={index}
              style={diagonalStyle}
              className={`absolute transition-transform transform`}
            >
              <div
                className={`w-32 h-48 bg-gray-300 flex items-center justify-center border border-gray-500 ${
                  offset === Math.floor(images.length / 2)
                    ? 'scale-100'
                    : 'scale-75'
                }`}
              >
                {image}
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
      >
        &lt;
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
