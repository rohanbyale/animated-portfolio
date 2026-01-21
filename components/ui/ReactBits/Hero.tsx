"use client";

import React from "react";
import TiltedCard from "@/components/TiltedCard";
import ScrollReveal from "@/components/ScrollReveal";

const AboutSection = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 md:px-12 lg:px-32 py-20 bg-transparent overflow-hidden">
      
      {/* 1. VISUAL SIDE (LEFT) */}
      <div className="relative z-10 w-full lg:w-1/2 flex justify-center lg:justify-start group mb-12 md:mb-16 lg:mb-0">
        {/* Decorative background glow - made smaller on mobile */}
        <div className="absolute -inset-4 md:-inset-10 bg-purple-600/10 blur-[80px] md:blur-[120px] rounded-full group-hover:bg-purple-600/20 transition-all duration-1000" />
        
        {/* Wrapper to handle TiltedCard responsive scaling */}
        <div className="w-full max-w-[320px] md:max-w-[400px]">
          <TiltedCard
            imageSrc="https://i.pinimg.com/736x/e8/51/1d/e8511dad3f22c87589a5de7dbcaca189.jpg" 
            altText="Rohan - Software Developer"
            captionText="Based in India"
            // Using percentages or responsive logic here if your component supports it, 
            // otherwise we rely on the container max-width.
            containerHeight="450px"
            containerWidth="100%"
            imageHeight="450px"
            imageWidth="100%"
            rotateAmplitude={10}
            scaleOnHover={1.03}
            showTooltip={false}
            displayOverlayContent={true}
            overlayContent={
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-black via-transparent to-transparent rounded-[15px]">
                <p className="text-purple-400 font-mono text-[10px] md:text-xs tracking-widest uppercase"> Developer</p>
                <h3 className="text-purple-400 text-xl md:text-2xl font-bold tracking-tight uppercase italic">DESIGNER</h3>
              </div>
            }
          />
        </div>
      </div>

      {/* 2. CONTENT SIDE (RIGHT) */}
      <div className="relative z-10 w-full lg:w-1/2 flex flex-col items-start text-left">
        
        {/* Section Title */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
             <div className="h-px w-8 md:w-12 bg-purple-500"></div>
             <span className="text-purple-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em]">01 // WHO AM I</span>
          </div>
          {/* Responsive Text: text-5xl on mobile, text-8xl on desktop */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase italic leading-[0.9] md:leading-[0.85]">
            <span className="text-[#F0ECD9] block">Crafting</span>
            <span className="text-gray-600 block">The Future.</span>
          </h1>
        </div>

        {/* About Bio Text */}
        <div className="w-full max-w-xl">
          <ScrollReveal
            baseOpacity={0.1}
            enableBlur={true}
            baseRotation={2}
            blurStrength={15}
            // Adjusted font sizes for mobile (text-lg) vs desktop (text-2xl)
            className="text-lg md:text-xl lg:text-2xl text-[#F0ECD9] font-light leading-relaxed mb-8"
          >
            I am a full-stack developer specialized in building highly interactive digital experiences. 
            I bridge the gap between complex engineering and minimalist design.
          </ScrollReveal>
          
          {/* Tech Stack - Flex-wrap ensures items stack on small screens */}
          <div className="flex flex-wrap gap-2 md:gap-3 mt-6">
            {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Motion'].map((tech) => (
              <span key={tech} className="px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-white/10 bg-white/5 text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-gray-400 hover:border-purple-500/50 hover:text-white transition-all cursor-default">
                {tech}
              </span>
            ))}
          </div>

          {/* Action Button - Full width on mobile, auto on desktop */}
         <div className="pt-8 md:pt-12 w-full md:w-auto">
      <a
        // 1. Place your PDF in the 'public' folder of your project
        // 2. Update the href below to match your filename
        href="/resume.pdf" 
        
        // This attribute forces the download instead of opening it
        download="My_Professional_CV.pdf"
        
        // Added 'inline-block' and 'text-center' to maintain button styling
        className="inline-block text-center w-full md:w-auto px-8 md:px-10 py-4 border border-white text-[#F0ECD9] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 cursor-pointer"
      >
        Download CV
      </a>
    </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;