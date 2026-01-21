"use client";

import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// No changes needed to your CSS file, but ensure .word is inline-block
import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  className?: string; 
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0,
  baseRotation = 5,
  blurStrength = 10,
  containerClassName = '',
  className = '',
  rotationEnd = 'bottom 60%', // Adjusted for better visibility
  wordAnimationEnd = 'bottom 50%' // Adjusted for better visibility
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Efficient Text Splitting
  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span 
          className="word inline-block origin-left whitespace-nowrap" 
          key={index}
          style={{ willChange: 'opacity, filter, transform' }}
        >
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Use a context to clean up all animations easily
    let ctx = gsap.context(() => {
      const wordElements = el.querySelectorAll<HTMLElement>('.word');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 60%',   // Start when element is near bottom
          end: wordAnimationEnd,
          scrub: 1.2,         // Adds a "smooth" lag for high-end feel
          markers: false,     // Set to true if you need to debug triggers
        }
      });

      // 2. Multi-Dimensional Animation (Rotation + Blur + Opacity)
      tl.fromTo(
        wordElements,
        { 
          opacity: baseOpacity, 
          filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
          y: 20,              // Subtle lift as they appear
          rotateX: baseRotation, // 3D feel
        },
        { 
          opacity: 1, 
          filter: 'blur(0px)', 
          y: 0,
          rotateX: 0,
          stagger: 0.1, 
          ease: 'power2.out' 
        }
      );
    }, el);

    return () => ctx.revert(); // Total cleanup
  }, [enableBlur, baseRotation, baseOpacity, wordAnimationEnd, blurStrength]);

  return (
    <div 
      ref={containerRef} 
      className={`scroll-reveal-container perspective-1000 ${containerClassName}`}
    >
      <p className={`scroll-reveal-text block leading-tight ${className}`}>
        {splitText}
      </p>
    </div>
  );
};

export default ScrollReveal;