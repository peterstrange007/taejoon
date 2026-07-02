import { useRef } from 'react';
import Image from 'next/image';

export default function FeaturedSlider() {
const sliderRef = useRef<HTMLDivElement>(null);

  const scrollToNext = () => {
    sliderRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const scrollToPrev = () => {
    sliderRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  return (
    <div className="relative mb-12">
      {/* Slider container */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto scroll-snap-x mandatory space-x-4 py-4"
        style={{ scrollbarWidth: 'none' }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-64 rounded-xl bg-surface hover:scale-105 transition-transform duration-200"
          >
            <Image
              src={`/assets/products/slide-show/Alif (${i + 6}).jpg`}
              alt={`Featured ${i + 1}`}
              width={256}
              height={192}
              className="w-full h-48 object-cover rounded-xl"
            />
            <div className="absolute bottom-2 left-2 text-white">
              <p className="font-semibold text-sm">{i + 1}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Left arrow */}
      <button
        onClick={scrollToPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
        aria-label="Scroll left"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 3-3-7 7-3 3 7-7 3 3z"
          />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={scrollToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
        aria-label="Scroll right"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7-1-1z"
          />
        </svg>
      </button>
    </div>
  );
}
