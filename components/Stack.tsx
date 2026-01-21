'use client'
import { motion } from 'framer-motion';

const capabilities = [
  { title: "Frontend", tools: "Next.js / React / Html / css / javascript/ Tailwind css " },
  { title: "Backend", tools: "Node / PostgreSQL / MySql / MongoDB" },
  { title: "Design", tools: "Gsap / Framer-Motion / Locomotive / Lenis" },
  { title: "Strategy", tools: "SEO / UX / Growth" },
];

export default function Capabilities() {
  return (
    <section className="py-10 border-y border-white/5 bg-[#080808]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-white/10">
          {capabilities.map((cap, i) => (
            <motion.div 
              key={i}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
              className="p-10 border-r border-b border-white/10 group cursor-default"
            >
              <span className="text-[10px] font-mono text-purple-500 mb-10 block">0{i + 1}</span>
              <h3 className="text-3xl font-bold mb-4 tracking-tighter">{cap.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                {cap.tools}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}