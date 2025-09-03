"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface DotButtonProps {
  selected: boolean;
  onClick: () => void;
}

const DotButton = ({ selected, onClick }: DotButtonProps) => (
  <button
    className={`relative w-4 h-4 rounded-full mx-1 focus:outline-none ${
      selected ? "bg-mocha-mousse" : "bg-gray-400"
    }`}
    onClick={onClick}
    type="button"
  />
);

interface AutoplayPlugin {
  options: {
    delay: number;
    stopOnInteraction: boolean;
  };
  timeUntilNext: () => number;
  isPlaying: () => boolean;
}

const HeroCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [
    emblaApi,
  ]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    const autoplay = emblaApi.plugins().autoplay as AutoplayPlugin;
    if (!autoplay) return;

    let animationFrameId: number | undefined;

    const startProgress = () => {
      const delay = autoplay.options.delay;
      const timeUntilNext = autoplay.timeUntilNext();
      const newProgress = 1 - timeUntilNext / delay;
      setProgress(newProgress);
      animationFrameId = requestAnimationFrame(startProgress);
    };

    const stopProgress = () => {
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
      }
      setProgress(0);
    };

    emblaApi.on("autoplay:timerset", startProgress);
    emblaApi.on("autoplay:timerstopped", stopProgress);

    // Initial progress update if autoplay is already playing
    if (autoplay.isPlaying()) {
      startProgress();
    }

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("autoplay:timerset", startProgress);
      emblaApi.off("autoplay:timerstopped", stopProgress);
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [emblaApi, onSelect]);

  const slides = [
    {
      title: "Elevate Your Style",
      description:
        "Discover our new collection of premium apparel and accessories. Unmatched quality and timeless design.",
      imageUrl: "/images/hero-slide-1.png",
      buttonText: "Shop Now",
      buttonLink: "/category/clothing",
    },
    {
      title: "Summer Sale Extravaganza",
      description:
        "Up to 50% off on select items. Don't miss out on the best deals of the season!",
      imageUrl: "/images/hero-slide-2.png",
      buttonText: "Explore Deals",
      buttonLink: "/category/electronics",
    },
    {
      title: "The Perfect Fit, Guaranteed",
      description:
        "From casual wear to formal attire, find pieces that are tailored to your lifestyle. Free returns on all orders.",
      imageUrl: "/images/hero-slide-3.png",
      buttonText: "Discover More",
      buttonLink: "/category/accessories",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden group">
      <div ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <Link
              key={index}
              href={slide.buttonLink}
              className="relative flex-[0_0_100%] h-[550px] bg-gray-200 block"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-8">
                <h1 className="text-4xl md:text-6xl font-bold font-montserrat mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl max-w-2xl font-merriweather mb-8">
                  {slide.description}
                </p>
                {/* Removed the button as the entire slide is now clickable */}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Previous Slide"
      >
        <ArrowLeft className="h-6 w-6 text-charcoal" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Next Slide"
      >
        <ArrowRight className="h-6 w-6 text-charcoal" />
      </button>

      {/* Dot Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center">
        {slides.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;