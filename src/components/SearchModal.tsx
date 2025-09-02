"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import { searchProducts } from "@/app/_actions/search";
import Link from "next/link";

// Define the shape of the search result object
type SearchResult = {
  id: number;
  name: string;
  imageSrc: string;
  category: {
    name: string;
  };
};

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Debounce function
  const debouncedSearch = useCallback((searchQuery: string) => {
    startTransition(async () => {
      const products = await searchProducts(searchQuery);
      setResults(products);
    });
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        debouncedSearch(query);
      } else {
        setResults([]);
      }
    }, 300); // 300ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [query, debouncedSearch]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prevIndex) => (prevIndex + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(
          (prevIndex) => (prevIndex - 1 + results.length) % results.length
        );
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        router.push(`/product/${results[activeIndex].id}`);
        onClose();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, activeIndex, results, router, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-20"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(-1);
          }}
          placeholder="Search for products..."
          className="w-full p-4 text-lg border-b border-soft-grey focus:outline-none focus:ring-2 focus:ring-mocha-mousse rounded-t-lg"
          autoFocus
        />
        {isPending && <p className="p-4 text-gray-500">Searching...</p>}
        {results.length > 0 && (
          <ul className="max-h-96 overflow-y-auto">
            {results.map((product, index) => (
              <li
                key={product.id}
                className={index === activeIndex ? "bg-soft-grey" : ""}
              >
                <Link
                  href={`/product/${product.id}`}
                  className="flex items-center p-4"
                  onClick={onClose}
                >
                  <img
                    src={product.imageSrc}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md mr-4"
                  />
                  <div>
                    <p className="font-semibold text-charcoal">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {product.category.name}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {!isPending && query && results.length === 0 && (
          <p className="p-4 text-gray-500">No results found for "{query}".</p>
        )}
      </div>
    </div>
  );
}
