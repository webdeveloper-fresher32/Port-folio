'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FiZoomIn, FiX } from 'react-icons/fi'
import { SystemDesign } from '@/data/types'

interface SystemDesignViewerProps {
  designs: SystemDesign[]
}

export default function SystemDesignViewer({ designs }: SystemDesignViewerProps) {
  const [selectedDesign, setSelectedDesign] = useState<SystemDesign | null>(null)

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedDesign) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedDesign])

  if (!designs || designs.length === 0) return null

  return (
    <div className="mt-6 mb-2">
      <h4 className="mb-4 text-xl font-semibold text-foreground">Architecture & System Design</h4>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {designs.map((design, index) => (
          <motion.div
            key={index}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card p-2 transition-all hover:border-foreground/30 shadow-sm hover:shadow-md"
            onClick={() => setSelectedDesign(design)}
            whileHover={{ y: -4 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted border border-border/50">
              <Image 
                src={design.image} 
                alt={design.title} 
                fill 
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105" 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                <FiZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>
            <div className="mt-3 px-1 pb-1">
              <h5 className="font-medium leading-tight text-foreground">{design.title}</h5>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedDesign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setSelectedDesign(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-h-full w-full max-w-6xl flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-border p-4 bg-background/50 backdrop-blur-md z-10">
                <h3 className="text-lg font-semibold sm:text-xl text-foreground pr-8">{selectedDesign.title}</h3>
                <button
                  onClick={() => setSelectedDesign(null)}
                  className="rounded-full p-2 text-muted transition-colors hover:bg-muted-foreground/20 hover:text-foreground absolute right-4"
                  aria-label="Close"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>
              
              <div className="relative h-[65vh] w-full overflow-y-auto bg-muted/20 p-4 sm:h-[80vh]">
                <div className="relative w-full h-fit flex justify-center">
                  {/* Using standard img to allow natural height and vertical scrolling for tall diagrams */}
                  <img
                    src={selectedDesign.image}
                    alt={selectedDesign.title}
                    className="w-full h-auto object-cover rounded shadow-sm"
                    loading="lazy"
                  />
                </div>
              </div>
              
              {selectedDesign.description && (
                <div className="border-t border-border p-4 text-sm text-muted bg-background/50 backdrop-blur-md z-10">
                  {selectedDesign.description}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
