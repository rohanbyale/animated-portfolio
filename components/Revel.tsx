'use client'
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Main Component
export default function StatementSection() {
  const container = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "start 0.2"] // Starts when 80% visible, finishes at 20%
  });

  const text = "I build digital products that combine technical logic with human emotion. No templates. No shortcuts. Just pure engineering.";
  const words = text.split(" ");

  return (
    <section ref={container} className="relative py-40 bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Subtle Label */}
        <div className="mb-12 flex items-center gap-4 opacity-50">
          <div className="h-[1px] w-12 bg-white" />
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#F0ECD9]">My Mission</span>
        </div>

        <p className="flex flex-wrap gap-x-[0.3em] gap-y-[0.1em] text-4xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
          {words.map((word, i) => {
            // Calculate start and end for each word
            const start = i / words.length;
            const end = start + 1 / words.length;
            
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}

// Sub-component for individual words
function Word({ children, progress, range }: { children: string, progress: any, range: [number, number] }) {
  // This maps the scroll progress to opacity
  const opacity = useTransform(progress, range, [0.15, 1]);
  
  return (
    <motion.span 
      style={{ opacity }} 
      className="text-[#F0ECD9] inline-block"
    >
      {children}
    </motion.span>
  );
}