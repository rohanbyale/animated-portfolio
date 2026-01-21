'use client'
import { motion } from 'framer-motion';

export default function TechSlider() {
  const techs = ["NEXT.JS", "FRAMER", "TYPESCRIPT", "TAILWIND", "THREE.JS", "PRISMA", "DOCKER"];
  
  return (
    <div className="py-5 bg-black overflow-hidden flex border-b border-white/5">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="flex whitespace-nowrap gap-20"
      >
        {[...techs, ...techs].map((t, i) => (
          <span key={i} className="text-gray-600 font-black text-sm uppercase tracking-[0.5em]">
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}