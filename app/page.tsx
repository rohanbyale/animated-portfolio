'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import Nav from '@/components/ui/ReactBits/Nav'
import Hero from '@/components/ui/ReactBits/Hero'
import TextPressure from '@/components/TextPressure'
import ProfileCard from '@/components/ProfileCard'
import MagicBento from '@/components/MagicBento'
import Lang from '@/components/ui/ReactBits/Lang'
import HoverExpand from '@/components/ui/hover-expand'

import { Github, Twitter, Linkedin, Mail, Code2, Rocket, Layout, ArrowUpRight } from 'lucide-react'
import PerspectiveSection from '@/components/PerspectiveSection'
import VelocityMarquee from '@/components/VelocityMarquee'
import ProcessSection from '@/components/ProcessSection'
import RevealMask from '@/components/RevelMask'

import InfiniteSroll from '@/components/InfinteScroll'
import Stack from '@/components/Stack'
import Revel from '@/components/Revel'
import MetricSection from '@/components/Education'
import MetricRevel  from '@/components/MetricReveal'
import Seconnav from '@/components/ui/Seconnav'


const Page = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // --- 1. MOUSE FOLLOWER LOGIC (Awwwards Style) ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics makes the cursor feel "fluid" and organic
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // --- 2. SMOOTH SCROLL (LENIS) ---
 // Update your Lenis useEffect like this:
useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
  })

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  // Critical: Tell Lenis to emit scroll events that other libs can hear
  lenis.on('scroll', () => {
    // This helps refresh scroll-triggered animations
  })

  return () => {
    lenis.destroy()
  }
}, [])

  // --- 3. SCROLL PROGRESS LOGIC ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      title: "Web Development",
      desc: "Building high-performance, scalable web applications using the latest Next.js features.",
      icon: <Code2 className="text-purple-500" size={32} />,
      img: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "UI/UX Design",
      desc: "Crafting intuitive user interfaces and engaging experiences with a focus on aesthetics.",
      icon: <Layout className="text-purple-500" size={32} />,
      img: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Mobile Solutions",
      desc: "Creating responsive, mobile-first designs that work seamlessly across all devices.",
      icon:  <Rocket className="text-purple-500" size={32} />,
      img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop"
    }
    
  ]

  const projects = [
    {
      url: "https://assets.awwwards.com/awards/submissions/2025/09/68b7aa90dbac3889881012.jpg",
      title: "Mammoth Murals",
      link: "https://mammothmurals-agency.netlify.app/",
      github: "https://github.com/rohanbyale/Mammoth-Murals"
    },
     {
      url: "/lazarev.png",
      title: "Lazarev",
      link: "https://portfoli0-lazrev.netlify.app/"
    },
    {
      url: "/peaky.png",
      title: "The Garrison Times",
      link: "https://the-garrison-times.netlify.app/",
      github:"https://github.com/rohanbyale/The-Garrison-Times"
    },
    {
      url: "/ochi.png",
      title: "Ochi Design",
      link: "https://ochi-de-sign.netlify.app/",
      github:"https://github.com/rohanbyale/Ochi-Design"
    },
    {
      url: "/worksstudio.png",
      title: "Works Studio",
   link: "https://works-studioro.netlify.app/",
      github:"https://github.com/rohanbyale/Works-Studio?tab=readme-ov-file"
    },
    {
      url: "https://cdn.dribbble.com/userupload/42675164/file/original-cbd633c1b343179c6494dc643abf6cda.png?format=webp&resize=400x300&vertical=center",
      title: "Task Management",
      link: "https://github.com/rohanbyale/Task_Management",
      github:"https://github.com/rohanbyale/Task_Management"
    },

  ]

  return (
   
    <main className="relative min-h-screen w-full bg-[#121213] text-[#F0ECD9] selection:bg-purple-500/30 overflow-x-hidden ">

      {/* 🚀 AWWWARDS MOUSE FOLLOWER
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
            scale: isHovering ? 1 : 0.7,
        }}
      >
        {isHovering && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[4px] font-black text-black uppercase tracking-tighter">View</motion.span>
        )}
      </motion.div> */}

      {/* 🟢 SCROLL PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-purple-500 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* 2. NAVIGATION */}
      {/* <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-black/60 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter">RO<span className="">HAN.</span></div>
          <div className="hidden md:flex gap-8 items-center text-sm uppercase tracking-widest font-medium">
            <a href="#services" className="hover:text-purple-400 transition-colors">Services</a>
            <a href="#work" className="hover:text-purple-400 transition-colors">Work</a>
            <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
            <button className="px-6 py-2 bg-[#121213] text-black font-bold rounded-full hover:bg-purple-500 hover:text-white transition-all">
              Hiring?
            </button>
          </div>
        </div>
      </nav> */}
   <Seconnav />

      {/* 3. HERO SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 pt-40 pb-20 px-6"
      >
        <section className="flex flex-col items-center justify-center">
          <div className="w-full max-w-6xl mb-12">
            <div className="overflow-hidden">
               <TextPressure text="PREMIUM" flex={true} textColor="#F0ECD9" minFontSize={48} />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
               <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-purple-500/50 to-transparent hidden md:block"></div>
               <TextPressure text="EXPERIENCES" flex={true} textColor="#a855f7" minFontSize={48} />
               <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-purple-500/50 to-transparent hidden md:block"></div>
            </div>
          </div>
          <Hero />
        </section>
      </motion.div>
<PerspectiveSection />


      {/* 4. SERVICES SECTION */}
      <section id="services" className="relative z-10 container mx-auto px-6 py-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6"
        >
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">WHAT I <span className="text-purple-500 italic">OFFER.</span></h2>
            <p className="text-xl text-gray-400">Transforming ideas into digital reality with cutting-edge tech.</p>
          </div>
          <div className="text-purple-500 font-mono text-sm hidden md:block uppercase tracking-widest">Available for projects — 2026</div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div 
              key={i} 
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-purple-500/30 transition-all duration-500 overflow-hidden"
            >
              <div className="relative z-10">
                <div className="mb-6 w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-8 line-clamp-3">{service.desc}</p>
                <div className="flex items-center text-xs font-black uppercase tracking-widest group-hover:text-purple-400 transition-colors">
                  Explore Service <ArrowUpRight size={14} className="ml-1" />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[80px] group-hover:bg-purple-500/10 transition-all"></div>
            </motion.div>
          ))}
        </div>
      </section>

<VelocityMarquee />
      {/* 5. PORTFOLIO SECTION */}
      <section id="work" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="relative z-10 py-32 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center mb-20"
          >
            {/* <span className="text-purple-500 text-sm font-bold tracking-[0.3em] uppercase mb-4">Selected Works</span> */}
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic text-center">Selected Work</h2>
          </motion.div>
          <div className="rounded-[40px] overflow-hidden border border-white/10 bg-black p-4 md:p-12">
            <HoverExpand images={projects} initialSelectedIndex={0} />
          </div>
        </div>
      </section>
<ProcessSection />

      {/* 6. BENTO & ABOUT SECTION */}
      <section id="about" className="relative z-10 container mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col justify-center"
          >
             <div className="mb-10">
                <h3 className="text-4xl font-bold mb-6">The Engineer behind the <span className="text-purple-500">pixels.</span></h3>
                <p className="text-gray-400 leading-relaxed mb-8">
                  I specialize in bridging the gap between design and technology. My approach is rooted in clean code and emotional aesthetics.
                </p>
             </div>
             <ProfileCard name="Rohan" title="Full Stack Dev" status="Available" avatarUrl="https://i.pinimg.com/736x/e8/51/1d/e8511dad3f22c87589a5de7dbcaca189.jpg" enableTilt={true} />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 min-h-[500px] rounded-3xl overflow-hidden border border-white/5 bg-[#080808]"
          >
            <MagicBento />
          </motion.div>
        </div>
      </section>
<MetricSection />
      {/* 7. TECH STACK MASTERY */}
      <section className="relative z-10 py-32 overflow-hidden">
        <div className="flex flex-col items-center mb-16">
           <h2 className="text-sm tracking-[0.5em] uppercase opacity-40 mb-6 font-bold">The Core Tech</h2>
           <div className="h-[1px] w-20 bg-purple-500 mb-6"></div>
        </div>
        <Lang />
        <Stack />
        <InfiniteSroll />
      </section>
<Revel />
<MetricRevel />
      {/* 8. PREMIUM FOOTER */}
      <footer className="relative z-10 border-t border-white/5 bg-[#030303] pt-32 pb-12 overflow-hidden">
        <div className="absolute top-0 py-4 w-full border-b border-white/[0.02] flex whitespace-nowrap overflow-hidden opacity-20 select-none pointer-events-none">
          <div className="flex animate-marquee font-black uppercase text-[13px] tracking-[0.8em] text-white">
            &nbsp;Available for new projects • Design • Development • Strategy •&nbsp;
          </div>
          <div className="flex animate-marquee font-black uppercase text-[13px] tracking-[0.8em] text-white">
            &nbsp;Available for new projects • Design • Development • Strategy •&nbsp;
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
            
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <h3 className="text-6xl md:text-7xl font-black mb-8 leading-[0.85] tracking-tighter">
                  READY TO <br/> 
                  <span className="text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">ELEVATE?</span>
                </h3>
                <p className="text-xl text-gray-400 mb-10 max-w-sm leading-relaxed">
                  Let's blend your vision with technical excellence.
                </p>
              </div>
              
              <div className="flex gap-3">
                {[
                  { Icon: Github, href: "https://github.com/rohanbyale" },
                  // { Icon: Twitter, href: "#" },
                  { Icon: Linkedin, href: "https://www.linkedin.com/in/rohan-byale" },
                  { Icon: Mail, href: "mailto:byalerohan@gmail.com" }
                ].map(({ Icon, href }, idx) => (
                  <a 
                    key={idx} 
                    href={href} 
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="w-14 h-14 flex items-center justify-center bg-white/[0.03] rounded-full border border-white/5 hover:border-purple-500/50 hover:bg-purple-500 hover:text-white transition-all duration-500 group relative overflow-hidden"
                  >
                    <Icon size={20} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-3 md:pt-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mb-10">Directory</h4>
              <ul className="space-y-4">
                {['Home', 'Services', 'Portfolio', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`} 
                      className="text-2xl font-bold tracking-tight text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center group"
                    >
                      <span className="w-0 h-[2px] bg-purple-500 group-hover:w-4 transition-all mr-0 group-hover:mr-3"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4 md:pt-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mb-10">Get in touch</h4>
              <div className="space-y-8">
                <div className="group cursor-pointer">
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-purple-500 transition-colors">Click to copy email</p>
                  <p 
                    onClick={() => {
                      navigator.clipboard.writeText('hello@rohan.codes');
                      alert('Email copied!');
                    }}
                    className="text-3xl font-bold text-white hover:text-purple-400 transition-colors break-all underline decoration-white/10 underline-offset-8 decoration-2"
                  >
                    byalerohan@gmail.com
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </div>
                  <p className="text-gray-400 text-sm font-medium tracking-wide">Currently taking new projects</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-[10px] font-black tracking-[0.2em] uppercase text-gray-600">
            <p>© 2026 ROHAN — DESIGNED IN NEXT JS</p>
            <div className="flex gap-12">
              <span className="hover:text-purple-500 cursor-pointer transition-all">Privacy Policy</span>
              <span className="hover:text-purple-500 cursor-pointer transition-all">Terms of Service</span>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}</style>
      </footer> 
     
    </main>
  )
}

export default Page