
import { useTransform, useScroll, motion } from 'framer-motion';
import { useRef } from 'react';

export default function PerspectiveSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  // Perspective 3D Tilt Logic
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [45, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={container} className="relative h-[80vh] flex items-center justify-center [perspective:1500px] overflow-hidden">
      <motion.div 
        style={{ rotateX, scale, opacity }}
        className="max-w-5xl px-6 text-center z-10"
      >
        <h2 className="text-[10px] font-black tracking-[0.8em] text-purple-500 uppercase mb-8">
          The Philosophy
        </h2>
        <p className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
          Static code is dead. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
            Motion is the new
          </span> <br />
          Standard.
        </p>
        
        <div className="mt-16 flex justify-center gap-10 md:gap-20 opacity-30">
           {['Innovation', 'Precision', 'Elegance'].map((text) => (
             <span key={text} className="text-[10px] font-black uppercase tracking-[0.3em]">{text}</span>
           ))}
        </div>
      </motion.div>
      
      {/* Background Grid Decoration */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
    </section>
  );
}

// 'use client'
// import { useTransform, useScroll, motion, useSpring } from 'framer-motion';
// import { useRef } from 'react';

// export default function PerspectiveSection() {
//   const container = useRef(null);
  
//   // High-precision scroll tracking
//   const { scrollYProgress } = useScroll({
//     target: container,
//     offset: ["start end", "end start"]
//   });

//   // Smooth out the scroll progress for that "heavy/expensive" feel
//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001
//   });

//   // 3D Transformations
//   const rotateX = useTransform(smoothProgress, [0, 0.5], [60, 0]);
//   const skewX = useTransform(smoothProgress, [0, 0.5], [-10, 0]);
//   const scale = useTransform(smoothProgress, [0, 0.5], [0.6, 1]);
//   const opacity = useTransform(smoothProgress, [0, 0.25, 0.8, 1], [0, 1, 1, 0]);
  
//   // Parallax layers (different items move at different speeds)
//   const yText = useTransform(smoothProgress, [0, 1], [100, -100]);
//   const yGlow = useTransform(smoothProgress, [0, 1], [-200, 200]);

//   return (
//     <section 
//       ref={container} 
//       className="relative h-[120vh] flex items-center justify-center overflow-hidden bg-[#080808]"
//       style={{ perspective: "2000px" }}
//     >
//       {/* 🟣 PREMIUM GLOW ORB (Animated Background) */}
//       <motion.div 
//         style={{ y: yGlow }}
//         className="absolute w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[160px] pointer-events-none"
//       />

//       <motion.div 
//         style={{ 
//           rotateX, 
//           scale, 
//           opacity,
//           skewX,
//           transformStyle: "preserve-3d" 
//         }}
//         className="relative z-10 flex flex-col items-center"
//       >
//         {/* Layer 1: Top Label */}
//         <motion.div 
//           style={{ translateZ: "100px" }}
//           className="mb-6 py-2 px-4 border border-purple-500/30 rounded-full bg-purple-500/5 backdrop-blur-md"
//         >
//           <span className="text-[10px] font-black tracking-[0.5em] text-purple-400 uppercase">
//             The Design Manifesto
//           </span>
//         </motion.div>

//         {/* Layer 2: Main Title */}
//         <motion.div 
//           style={{ translateZ: "50px", y: yText }}
//           className="max-w-6xl px-6 text-center"
//         >
//           <h2 className="text-6xl md:text-[10rem] font-black tracking-[ -0.05em] leading-[0.8] uppercase italic">
//             Static is <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20">
//               Boring.
//             </span>
//           </h2>
          
//           <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6">
//              <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-purple-500" />
//              <p className="text-gray-400 font-medium text-lg md:text-2xl lowercase tracking-tight">
//                engineering <span className="text-white font-bold">fluid</span> digital emotions
//              </p>
//              <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-purple-500" />
//           </div>
//         </motion.div>

//         {/* Layer 3: Bottom Tags */}
//         <motion.div 
//           style={{ translateZ: "150px" }}
//           className="mt-20 flex justify-center gap-8 md:gap-16"
//         >
//            {['01. Motion', '02. Depth', '03. Logic'].map((text) => (
//              <div key={text} className="group cursor-default">
//                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 group-hover:text-purple-400 transition-colors duration-500">
//                 {text}
//                </span>
//                <div className="h-[2px] w-0 bg-purple-500 group-hover:w-full transition-all duration-500 mt-1" />
//              </div>
//            ))}
//         </motion.div>
//       </motion.div>
      
//       {/* 🏁 PREMIUM GRID (With depth) */}
//       <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:100px_100px]">
//         <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808]" />
//       </div>
//     </section>
//   );
// }