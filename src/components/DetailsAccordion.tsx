'use client';

import { useState } from 'react';

type DetailsAccordionProps = {
  details: string[];
};

export default function DetailsAccordion({ details }: DetailsAccordionProps) {
  const [isOpen, setIsOpen] = useState(true); // Default to open for visibility

  return (
    <div className="border-t border-soft-grey dark:border-gray-700">
      <h3 className="w-full flex items-center justify-between py-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-left font-montserrat font-bold text-charcoal dark:text-off-white"
        >
          <span>Details</span>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h3>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="pb-4 pl-4 list-disc list-inside font-merriweather text-charcoal/90 dark:text-soft-grey/90 space-y-2">
          {details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}