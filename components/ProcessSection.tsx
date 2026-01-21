'use client'
import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  { 
    title: "Strategy", 
    desc: "I define the digital roadmap and architecture before writing a single line of code.", 
    tag: "Phase 01" 
  },
  { 
    title: "Design", 
    desc: "High-fidelity prototypes that focus on emotional response and seamless interaction.", 
    tag: "Phase 02" 
  },
  { 
    title: "Engineering", 
    desc: "Next-gen development using modern stacks to ensure speed and scalability.", 
    tag: "Phase 03" 
  },
  { 
    title: "Growth", 
    desc: "Iterative testing and optimization to ensure your product scales with your users.", 
    tag: "Phase 04" 
  }
];

export default function ProcessCarousel() {
  const containerRef = useRef(null);

  return (
    <section className="bg-black text-[#F0ECD9] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-purple-500 font-mono tracking-widest uppercase text-sm mb-4">Methodology</h2>
          <h3 className="text-5xl md:text-7xl font-bold tracking-tight">THE <span className="italic font-light text-zinc-500">WAY.</span></h3>
        </div>
        <p className="text-zinc-500 max-w-xs text-sm uppercase tracking-wider leading-relaxed">
          A systematic approach to building world-class digital products.
        </p>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="relative">
        <motion.div 
          ref={containerRef}
          drag="x"
          dragConstraints={{ right: 0, left: -800 }} // Adjust based on card width
          className="flex gap-6 px-6 cursor-grab active:cursor-grabbing"
        >
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              className="min-w-[350px] md:min-w-[450px] group"
            >
              <div className="h-[400px] bg-zinc-900/50 border border-white/10 rounded-2xl p-10 flex flex-col justify-between transition-colors duration-500 group-hover:bg-zinc-900 group-hover:border-purple-500/30">
                
                <div className="flex justify-between items-start">
                  <span className="text-zinc-600 font-mono text-lg group-hover:text-purple-500 transition-colors">
                    {step.tag}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowIcon />
                  </div>
                </div>

                <div>
                  <h4 className="text-4xl font-semibold mb-4 tracking-tight">{step.title}</h4>
                  <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-200 transition-colors">
                    {step.desc}
                  </p>
                </div>

                {/* Decorative Bottom Bar */}
                <div className="w-full h-[1px] bg-white/5 relative overflow-hidden">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    whileInView={{ x: '0%' }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-transparent opacity-40"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Hint for Desktop */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex items-center gap-4 text-zinc-600">
           <div className="h-[1px] w-12 bg-zinc-800" />
           <span className="text-xs uppercase tracking-[0.2em]">Drag to explore</span>
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
      <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" />
    </svg>
  );
}