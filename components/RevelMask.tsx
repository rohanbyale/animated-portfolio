'use client'
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function RevealMask() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  // The mask expands from 30% to 100% of the screen
  const maskSize = useTransform(scrollYProgress, [0, 0.4], ["inset(30% 20% 30% 20% round 40px)", "inset(0% 0% 0% 0% round 0px)"]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1.2, 1]);

  return (
    <section ref={container} className="relative h-[150vh] bg-[#080808]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div 
          style={{ clipPath: maskSize }}
          className="relative w-full h-full"
        >
          <motion.img 
            style={{ scale }}
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" 
            className="w-full h-full object-cover"
            alt="Agency Visual"
          />
          {/* Overlay Text */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-white text-[10vw] font-black uppercase tracking-tighter">
              The Detail.
            </h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
}