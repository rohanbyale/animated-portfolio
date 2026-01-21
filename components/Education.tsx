'use client'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { degrees } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const history = [
  { 
    institution: "BabaSaheb Naik College Of Engineering , Pusad",
    degree: "Computer Science & Engineering", 
    duration: "pursuing",
    // details: "Specialized in Human-Computer Interaction and Distributed Systems."
  },
  { 
    institution: "Government Polyechnic , Solapur",
    degree: "Computer Technology", 
    duration: "2020 — 2023",
    details: "Focused on advanced motion physics, React architecture, and performance optimization."
  },
  { 
    institution: "Shri Mahatma Basaveshwar Vidyalay , Omerga",
    degree: "SSC", 
    duration: "2009 — 2019",
    // details: "Explored the intersection of classical art principles and modern digital interfaces."
  }
];

export default function GSAPEducation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // mm = MatchMedia (The pro way to handle responsive GSAP)
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // DESKTOP ONLY LOGIC
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftSideRef.current,
        pinSpacing: false,
      });

      gsap.fromTo(lineRef.current, 
        { scaleY: 0 },
        { 
          scaleY: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          }
        }
      );
    });

    mm.add("(max-width: 1023px)", () => {
        // MOBILE ONLY LOGIC: Just fade the line in normally
        gsap.fromTo(lineRef.current, 
            { scaleY: 0 },
            { scaleY: 1, duration: 1.5, ease: "power2.out",
              scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top 80%",
              }
            }
        );
    });

    // SHARED ANIMATIONS (Both Mobile & Desktop)
    gsap.utils.toArray('.edu-item').forEach((item: any) => {
      gsap.fromTo(item, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => mm.revert(); 
  }, []);

  return (
    <section ref={containerRef} className="relative bg-black py-16 md:py-32 lg:py-40 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 xl:px-20">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-0">
          
          {/* LEFT SIDE HEADER */}
          <div 
            ref={leftSideRef} 
            className="w-full lg:w-1/2 lg:h-screen flex flex-col justify-center lg:pr-10"
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <span className="text-purple-500 font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase">
                Background
              </span>
              <div className="h-[1px] w-8 md:w-12 bg-purple-500/50" />
            </div>

            <h3 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-[#F0ECD9] leading-[0.85] mb-6 md:mb-10">
              Academic <br className="hidden md:block" /> 
              <span className="text-zinc-800 italic font-extralight">Foundation</span>
            </h3>

            <div className="max-w-xs border-l border-zinc-900 pl-6 md:pl-8 ml-1 md:ml-2">
              <p className="text-zinc-500 text-xs md:text-sm leading-relaxed uppercase tracking-[0.2em] font-medium">
                A chronicle of specialized education and research in digital systems.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="w-full lg:w-1/2 relative pl-10 md:pl-16 lg:pl-20 py-10 md:py-20 lg:pt-[30vh]">
            {/* Background Line Track */}
            <div className="absolute left-0 top-0 w-[1px] h-full bg-zinc-900" />
            
            {/* The Animated Stem */}
            <div 
              ref={lineRef}
              className="absolute left-[-1px] top-0 w-[3px] bg-gradient-to-b from-purple-500 via-indigo-500 to-purple-600 origin-top z-10 shadow-[0_0_30px_rgba(168,85,247,0.3)]" 
            />
            
            {history.map((item, i) => (
              <div key={i} className="edu-item mb-20 md:mb-40 lg:mb-80 last:mb-0 relative group">
                {/* Connector Dot */}
                <div className="absolute left-[-41px] md:left-[-65px] lg:left-[-69px] top-1.5 md:top-2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-black border-2 border-zinc-800 group-hover:border-purple-500 transition-all duration-500 group-hover:scale-125 z-20" />

                <span className="text-[10px] md:text-[11px] font-mono text-purple-500 uppercase tracking-[0.3em] block mb-3 md:mb-4">
                  {item.duration}
                </span>

                <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#F0ECD9] mb-2 md:mb-3 tracking-tight group-hover:text-purple-50 transition-colors">
                  {item.institution}
                </h3>

                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="h-[1px] w-6 md:w-8 bg-zinc-800 group-hover:w-12 group-hover:bg-purple-500 transition-all" />
                  <p className="text-[11px] md:text-sm font-mono text-zinc-500 uppercase tracking-widest group-hover:text-zinc-300 transition-colors">
                    {item.degree}
                  </p>
                </div>

                <p className="text-zinc-500 text-sm md:text-lg leading-relaxed max-w-md font-light">
                  {item.details}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}