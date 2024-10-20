"use client";

import { FC, useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const Carousel: FC = () => {
  const slides = [
    {
      image: "https://wallpaper.forfun.com/fetch/ae/ae2cbe4c74a79df332455ab8fe742e7c.jpeg",
      text: "Create vote questions with tokens, cast your vote, and earn tokens when your choice wins—making every decision rewarding",
    },
    {
      image: "https://wallpapers.com/images/hd/tech-background-t29vt7psb6i6sgcy.jpg",
      text: "This is the second slide.",
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1671995576248-57bf9036d326?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVjaCUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D",
      text: "This is the third slide.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Automatically change the slide every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // GSAP Animation for Slide Change
  useEffect(() => {
    if (carouselRef.current) {
      // Animate fading and sliding out of the current slide
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, x: 100 }, // Start off screen to the right
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
        }
      );
    }
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-[1200px] h-[500px] mx-auto mt-8 overflow-hidden">
      <div
        className="w-full h-full bg-cover bg-center rounded-lg shadow-lg"
        style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
        ref={carouselRef} // Attach ref for GSAP animation
      >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-30">
          <h1 className="text-3xl font-bold text-white text-center px-4">
            {slides[currentIndex].text}
          </h1>
        </div>
      </div>
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full hover:bg-opacity-75"
      >
        &#8592;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full hover:bg-opacity-75"
      >
        &#8594;
      </button>
    </div>
  );
};

export default Carousel;
