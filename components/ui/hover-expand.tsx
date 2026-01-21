"use client"

import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

interface ProjectImage {
  url: string
  title: string
  link: string
  github?: string
}

interface HoverExpandProps {
  images: ProjectImage[] // This ensures it expects an array of objects
  initialSelectedIndex?: number
  maxThumbnails?: number
}


export default function HoverExpand({
  images,
  initialSelectedIndex = 0,
  maxThumbnails = 6,
}: HoverExpandProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(initialSelectedIndex)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsModalOpen(false)
    }
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden")
      document.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.classList.remove("overflow-hidden")
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.classList.remove("overflow-hidden")
    }
  }, [isModalOpen])

  return (
    <div className="relative w-full px-4">
      
      {/* 1. GALLERY GRID */}
      <div className="mx-auto flex w-full max-w-5xl justify-center gap-1.5 py-10 md:gap-3 h-[350px] md:h-[450px]">
        {images.slice(0, maxThumbnails).map((project, i) => (
          <div
            key={`project-${i}`}
            className={`group relative overflow-hidden rounded-xl md:rounded-3xl transition-all duration-500 cursor-pointer ${
              selectedIndex === i 
                ? "flex-[4] md:flex-[5]" // Expanded state
                : "flex-1 opacity-60 hover:opacity-100" // Collapsed state
            }`}
            onMouseEnter={() => setSelectedIndex(i)}
            onClick={() => {
              if (selectedIndex === i) setIsModalOpen(true)
              else setSelectedIndex(i)
            }}
          >
            <motion.div
              layoutId={`image-${i}`}
              className="absolute inset-0 size-full"
            >
              <img
                src={project.url}
                alt={project.title}
                className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay Content (Visible only when selected) */}
              <AnimatePresence>
                {selectedIndex === i && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4 md:p-8"
                  >
                    <h3 className="text-[#F0ECD9] text-lg md:text-2xl font-bold truncate">
                      {project.title}
                    </h3>
                    <div className="flex gap-4 mt-2 md:mt-4">
                       <a href={project.link} target="_blank" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-400 hover:text-white transition-colors">
                         Live <ExternalLink size={14} />
                       </a>
                       {project.github && (
                         <a href={project.github} target="_blank" className="text-white/50 hover:text-white transition-colors">
                           <Github size={18} />
                         </a>
                       )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        ))}
      </div>

      {/* 2. ENLARGED MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-content-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10"
            >
              <motion.div
                layoutId={`image-${selectedIndex}`}
                className="relative aspect-video w-full"
              >
                <img
                  src={images[selectedIndex].url}
                  alt={images[selectedIndex].title}
                  className="size-full object-cover"
                />
              </motion.div>
              
              <div className="p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-3xl font-bold text-[#F0ECD9] mb-2">{images[selectedIndex].title}</h2>
                  <p className="text-gray-400 text-sm max-w-md italic">Click the link below to view the full project and documentation.</p>
                </div>
                <div className="flex gap-4">
                  <a 
                    href={images[selectedIndex].link} 
                    target="_blank"
                    className="px-8 py-3 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-500 transition-all flex items-center gap-2"
                  >
                    View Project <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}