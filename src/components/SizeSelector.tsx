'use client';

import { useState } from 'react';

type SizeSelectorProps = {
  sizes: ('S' | 'M' | 'L' | 'XL')[];
};

export default function SizeSelector({ sizes }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div>
      <h3 className="text-sm font-montserrat font-bold text-charcoal dark:text-off-white mb-2">
        Size
      </h3>
      <div className="flex space-x-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`
              w-12 h-12 rounded-md flex items-center justify-center
              font-montserrat font-bold text-sm
              transition-colors duration-200
              ${
                selectedSize === size
                  ? 'bg-charcoal text-off-white dark:bg-off-white dark:text-charcoal'
                  : 'bg-soft-grey text-charcoal hover:bg-gray-300 dark:bg-gray-700 dark:text-off-white dark:hover:bg-gray-600'
              }
            `}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}