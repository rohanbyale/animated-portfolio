"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const words = ["DEVELOPER", "DESIGNER", "STRATEGIST", "JAVI.TORRES®"];

export default function UltimatePreloader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    // 1. Lock Body Scroll
    document.body.style.overflow = "hidden";

    // 2. Word Cycle Logic
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < words.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 250);

    // 3. Liquid Exit Animation
    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setLoading(false);
          document.body.style.overflow = "auto";
        }
      });

      // The "Liquid" Morph
      // From flat square to a curved "smile" shape to vanishing
      tl.to(pathRef.current, {
        attr: { d: "M 0 0 V 100 Q 50 80 100 100 V 0 z" },
        duration: 0.8,
        ease: "power2.in"
      })
      .to(pathRef.current, {
        attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
        duration: 0.6,
        ease: "power2.out"
      });

      // Fade out text during morph
      tl.to(".loader-text", { opacity: 0, y: -50, duration: 0.4 }, "-=1");

    }, 2000); // Total wait time

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div 
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-transparent pointer-events-none"
            exit={{ opacity: 0 }}
          >
            {/* SVG MASK LAYER */}
            <svg className="absolute inset-0 w-full h-[100vh] fill-zinc-950 pointer-events-none">
              <path 
                ref={pathRef} 
                d="M 0 0 V 100 Q 50 100 100 100 V 0 z" 
              />
            </svg>

            {/* CONTENT OVERLAY */}
            <div className="relative z-[100000] text-center loader-text pointer-events-none">
              <motion.h1 
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="text-white text-5xl md:text-8xl font-black italic tracking-tighter uppercase"
              >
                {words[index]}
              </motion.h1>
              
              <div className="mt-4 flex items-center justify-center gap-3">
                <span className="text-zinc-500 font-mono text-xs tracking-[0.5em]">SYSTEM_READY</span>
                <div className="h-[1px] w-8 bg-zinc-800" />
                <span className="text-white font-mono text-xs">{Math.round(((index + 1) / words.length) * 100)}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REVEAL CONTENT: This scales up once the loader vanishes */}
      <motion.main 
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        animate={!loading ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-0"
      >
        {children}
      </motion.main>
    </>
  );
}