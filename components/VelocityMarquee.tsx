'use client';

import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  useVelocity, 
  useAnimationFrame, 
  useMotionValue 
} from 'framer-motion';
import { useRef } from 'react';

// Optimized wrap for seamless looping
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function VelocityMarquee() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60, // Increased damping for buttery smoothness
    stiffness: 300
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  // 1. MAGNETIC SPACING: Letters tighten as you scroll faster
  const letterSpacing = useTransform(smoothVelocity, [-1000, 1000], ["-0.05em", "-0.05em"]);
  const tightSpacing = useTransform(smoothVelocity, [-2000, 2000], ["-0.1em", "-0.1em"]);

  // 2. DYNAMIC SKEW: More subtle for the reduced height
  const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [-8, 8]);
  const skewSpring = useSpring(skewVelocity, { stiffness: 400, damping: 50 });

  // 3. SEAMLESS WRAP: Adjusted for 4 clones
  const x = useTransform(baseX, (v) => `${wrap(-2, -27, v)}%`);

  const directionFactor = useRef<number>(1);
  
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * 1.5 * (delta / 1000); // Slower base for elegance

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    // Reduced padding and height for a "Ribbon" look
    <section className="relative py-4 bg-black overflow-hidden select-none group border-y border-white/5">
      
      {/* Subtle Scanner Line Effect */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,transparent_0%,rgba(168,85,247,0.05)_50%,transparent_100%)] group-hover:animate-pulse" />

      <div className="flex whitespace-nowrap">
        <motion.div 
          style={{ x, skew: skewSpring, letterSpacing: tightSpacing }} 
          className="flex whitespace-nowrap flex-nowrap items-center"
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {/* Main Text with RGB Split on Hover */}
              <span className="text-[6vw] font-black uppercase tracking-tighter leading-none text-[#F0ECD9] px-6 transition-all duration-300 group-hover:text-white group-hover:[text-shadow:2px_0_#ff0000,-2px_0_#00ffff]">
                Selected Works
              </span>
              
              {/* Decorative Circle Divider */}
              <div className="w-3 h-3 rounded-full bg-purple-600 mx-4 group-hover:scale-150 transition-transform duration-500 group-hover:bg-white" />

              <span 
                className="text-[6vw] font-black uppercase tracking-tighter leading-none px-6 text-transparent"
                style={{ WebkitTextStroke: "1px rgba(240, 236, 217, 0.2)" }}
              >
                2026
              </span>

              {/* Unique Separator */}
              <span className="text-[4vw] font-thin text-zinc-800 px-6">
                {"//"}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Heavy Sharp Vignette */}
      <div className="absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[20%] bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
}