'use client'

import { useEffect, useState } from 'react'

interface Section {
  id: string
  label: string
}

const sections: Section[] = [
  { id: 'hero', label: 'Inicio' },
  { id: 'catalog', label: 'Catálogo' },
  { id: 'blog', label: 'Blog' },
  { id: 'events', label: 'Enoturismo' },
  { id: 'instagram', label: 'Instagram' }
]

export default function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200 // Offset for better accuracy
      
      // Find the section that is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.id)
        if (!element) continue
        
        const rect = element.getBoundingClientRect()
        if (rect.top <= 200) {
          setActiveSection(section.id)
          break
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Add a small offset to prevent the navbar from covering the section
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }
  
  return (
    <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
      <div className="flex flex-col items-center">
        {/* Vertical line connecting the dots */}
        <div className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-crred to-transparent left-1/2 -translate-x-1/2 -z-10 rounded-full" />
        
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          
          return (
            <div onClick={() => scrollToSection(section.id)} key={section.id} className="group cursor-pointer relative flex items-center py-3">
              <div
                
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-crred/85  scale-125 shadow-lg shadow-crred/30' 
                    : 'bg-white/95  group-hover:bg-crred/65'
                }`}
                aria-label={`Scroll to ${section.label}`}
              />
              
              {/* Label */}
              <div 
                className={` flex items-center absolute left-6 pl-2 whitespace-nowrap transition-all duration-300 ${
                  isActive 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
              >
                <span 
                  className={`text-sm font-medium italic ${
                    isActive ? 'text-crred' : 'text-gray-600 group-hover:text-crred'
                  }`}
                >
                  {section.label}
                </span>
                
                {/* Active indicator line */}
                {isActive && (
                  <div className="absolute -left-1 top-1/2 h-[1px] w-1 bg-crred transform -translate-y-1/2" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
} 