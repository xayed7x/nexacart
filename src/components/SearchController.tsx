'use client';

import { useState } from 'react';
import SearchModal from './SearchModal';

// Assuming you have a SearchIcon component or an SVG
const SearchIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export default function SearchController() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="p-2 text-charcoal hover:text-mocha-mousse">
        <span className="sr-only">Search</span>
        <SearchIcon />
      </button>
      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}