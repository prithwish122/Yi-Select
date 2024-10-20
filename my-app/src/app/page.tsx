"use client";

import { FC, useEffect, useRef } from "react";
import { gsap } from "gsap"; // Import GSAP
import Carousel from "./components/Carousel"; // Adjust the path if needed
import Link from "next/link";

const HomePage: FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null); // Create a ref for the scroll icon

  // GSAP Animation
  useEffect(() => {
    if (scrollRef.current) {
      gsap.fromTo(
        scrollRef.current,
        { y: 0, opacity: 0 },
        {
          y: 20,
          opacity: 1,
          repeat: -1,
          yoyo: true,
          duration: 1,
          ease: "power1.inOut",
        }
      );
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div
        className="h-[170vh] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
        style={{ backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/887/227/638/tech-sphere-wallpaper-preview.jpg')" }}
      >
        <div className="p-4 rounded-lg text-center text-white mb-10">
          {/* Carousel Section */}
          <Carousel />

          {/* Scroll Down Icon */}
          <div ref={scrollRef} className="mt-10 flex justify-center"> {/* Center aligned */}
            <svg
              className="w-8 h-8 animate-bounce cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} // Scroll down smoothly
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m0 0l-4-4m4 4l4-4"
              />
            </svg>
          </div>
        </div>
      

      {/* Content Section with Two Side-by-Side Containers */}
      <div className="flex justify-center items-center flex-wrap mt-40">
        {/* Container 1 */}
        <div className="relative bg- backdrop-blur-md p-8 border-white m-4 rounded-lg shadow-lg w-1/2 max-w-md text-center">
          <h2 className="text-xl font-bold mb-4">
            Are you someone who got some spicy topic to cover votes?
          </h2>
          <p className="mb-4">
            POST YOUR SPICY TOPIC HERE
          </p>
          <Link href="/create-topic">
            <button className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300">
              Create
            </button>
          </Link>
        </div>

        {/* Container 2 */}
        <div className="relative bg-blur backdrop-blur-md p-8 m-4 rounded-lg shadow-lg w-1/2 max-w-md text-center">
          <h2 className="text-xl font-bold mb-4">
            Are you one with curious, right judgement?
          </h2>
          <p className="mb-4">
            Participate and vote
          </p>
          <Link href="/explore">
            <button className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300">
              EXPLORE Here
            </button>
          </Link>
        </div>
      </div>
      </div>
    </>
  );
};

export default HomePage;
