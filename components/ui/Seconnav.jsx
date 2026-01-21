'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PremiumNav() {
  const [scrolled, setScrolled] = useState(false);

  // Auto-detect scroll to prevent "scrolled is not defined" error
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${
      scrolled 
        ? 'py-4 bg-black/80 backdrop-blur-2xl border-b border-white/[0.05]' 
        : 'py-10 bg-transparent'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* --- LOGO SECTION --- */}
        <a href="/" className="group relative flex items-center">
          <motion.div
            animate={{ 
              scale: scrolled ? 0.9 : 1,
              filter: scrolled ? 'brightness(1)' : 'brightness(1.2)'
            }}
            className="relative h-8 w-52" // Set fixed dimensions for the container
          >
            {/* Using standard img for simplicity, or replace with <Image /> */}
              <div className="text-2xl font-black tracking-tighter">RO<span className="">HAN.</span></div>
          <div className="hidden md:flex gap-8 items-center text-sm uppercase tracking-widest font-medium"></div>

            {/* THE "TITANIUM" REFLECTION EFFECT */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear", repeatDelay: 1 }}
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[35deg]"
              />
            </div>
          </motion.div>
        </a>

        {/* --- NAVIGATION LINKS --- */}
        <div className="hidden md:flex gap-10 items-center text-[10px] uppercase tracking-[0.4em] font-bold">
          {['services', 'work', 'about'].map((item) => (
            <a 
              key={item}
              href={`#${item}`} 
              className="relative text-[#F0ECD9] hover:text-white transition-all duration-300 group"
            >
              <span className="relative z-10">{item}</span>
              {/* Premium underline */}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-purple-500 transition-all duration-500 ease-expo group-hover:w-full" />
            </a>
          ))}
          
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#a855f7", color: "#fff" }}
            whileTap={{ scale: 0.95 }}
            className="ml-4 px-6 py-2 border border-white/10 text-[#F0ECD9] rounded-full transition-all duration-300 backdrop-blur-md"
          >
            Hiring?
          </motion.button>
        </div>
      </div>
    </nav>
  );
}