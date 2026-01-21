"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './MagicBento.css';

// Professional "About Me" Data
const cardData = [
  {
    title: 'Full-Stack Developer',
    desc: 'Building high-performance web applications with Next.js, JavaScript, and React js.',
    label: 'Expertise',
    size: 'large' // We can use this for layout later
  },
  {
    title: 'Design',
    desc: 'Designing interactive interfaces with GSAP and Tailwind CSS.',
    label: 'Creative',
    size: 'small'
  },
  {
    title: 'Problem Solver',
    desc: 'Transforming complex business logic into clean, scalable code architecture.',
    label: 'Mindset',
    size: 'small'
  },
  {
    title: 'Tech Stack',
    desc: 'React, Javascript, Node js , Java ,  Tailwind CSS , MongoDB , Typescript .',
    label: 'Toolbox',
    size: 'small'
  },
  {
    title: 'Continuous Learner',
    desc: 'Always staying ahead of the curve with emerging web technologies.',
    label: 'Growth',
    size: 'small'
  },
  {
    title: 'Collaboration',
    desc: 'Experience working in Agile teams to deliver quality products.',
    label: 'Teamwork',
    size: 'small'
  }
];

const MagicBento: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.bento-card');
    if (!cards) return;

    let ctx = gsap.context(() => {
      cards.forEach((card) => {
        const el = card as HTMLElement;

        const handleMouseMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          // Move the spotlight glow
          el.style.setProperty('--x', `${x}px`);
          el.style.setProperty('--y', `${y}px`);
          el.style.setProperty('--opacity', '1');

          // Smooth 3D Tilt
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 12;
          const rotateY = (centerX - x) / 12;

          gsap.to(el, {
            rotateX: -rotateX,
            rotateY: -rotateY,
            duration: 0.4,
            ease: 'power2.out',
          });
        };

        const handleMouseLeave = () => {
          el.style.setProperty('--opacity', '0');
          gsap.to(el, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)',
          });
        };

        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bento-wrapper text-[#F0ECD9]">
      <div ref={containerRef} className="bento-grid text-[#F0ECD9]">
        {cardData.map((item, i) => (
          <div key={i} className={`bento-card ${item.size === 'large' ? 'card-wide' : ''}`}>
            {/* Hover spotlight layer */}
            <div className="glow-overlay" />
            
            <div className="card-inner">
              <span className="card-label ">{item.label}</span>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-description ">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MagicBento;