"use client";

import { useState } from "react";

type Color = {
  name: string;
  hex: string;
};

type ColorSelectorProps = {
  colors: Color[];
};

export default function ColorSelector({ colors }: ColorSelectorProps) {
  const [selectedColor, setSelectedColor] = useState<Color | null>(
    colors[0] || null
  );

  return (
    <div>
      <h3 className="text-sm font-montserrat font-bold text-charcoal dark:text-off-white mb-2">
        Color: <span className="font-normal">{selectedColor?.name}</span>
      </h3>
      <div className="flex space-x-2">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => setSelectedColor(color)}
            className={`
              w-10 h-10 rounded-full border-2
              transition-transform duration-200 transform
              ${
                selectedColor?.name === color.name
                  ? "border-mocha-mousse scale-110"
                  : "border-soft-grey hover:border-charcoal/50 dark:border-gray-700 dark:hover:border-soft-grey"
              }
            `}
            style={{ backgroundColor: color.hex }}
            aria-label={`Select color ${color.name}`}
          >
            <span className="sr-only">{color.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
