import React from 'react';
import { ProductCard, ProductItem } from './ProductCard';

interface MarqueeColumnProps {
  items: ProductItem[];
  direction: 'up' | 'down';
  durationSeconds: number;
  reducedMotion: boolean;
  className?: string;
}

export const MarqueeColumn: React.FC<MarqueeColumnProps> = ({
  items,
  direction,
  durationSeconds,
  reducedMotion,
  className = '',
}) => {
  // Duplikasi item untuk looping tanpa sambungan
  const duplicatedItems = [...items, ...items];

  const animationClass =
    direction === 'up' ? 'animate-marquee-up' : 'animate-marquee-down';

  return (
    <div
      className={`relative h-full overflow-hidden select-none group focus-within:[&_.marquee-track]:[animation-play-state:paused] hover:[&_.marquee-track]:[animation-play-state:paused] ${className}`}
    >
      <div
        className={`marquee-track flex flex-col gap-4 sm:gap-6 ${
          reducedMotion ? '' : animationClass
        }`}
        style={
          reducedMotion
            ? { transform: 'none' }
            : { animationDuration: `${durationSeconds}s` }
        }
      >
        {duplicatedItems.map((prod, idx) => (
          <ProductCard
            key={`${prod.id}-${idx}`}
            product={prod}
            className="w-full flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};
