
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useParallax } from '@/lib/motion';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useParallax();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      containerRef.current?.classList.add('loaded');
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto px-6 py-16 md:py-24 w-full flex flex-col md:flex-row items-center justify-between"
      >
        <div className="w-full md:w-1/2 md:pr-8 z-10">
          <div className="space-y-6">
            <span className="inline-block font-mono text-sm text-muted-foreground px-3 py-1 border border-border rounded-full opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Full Stack Developer
            </span>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              Creating <span className="text-gradient">digital experiences</span> with code
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              Crafting beautiful, functional, and responsive web applications that
              deliver exceptional user experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
              <a 
                href="#projects" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium transition-all hover:scale-105"
              >
                View Projects
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-border bg-transparent hover:bg-secondary transition-all"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 mt-12 md:mt-0 hidden md:block relative">
          <div 
            className="relative w-full h-[400px] opacity-0 animate-fade-in rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5"
            style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
          />
        </div>
      </div>
      
      <a 
        href="#projects" 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-sm text-muted-foreground animate-bounce"
      >
        <span className="mb-2">Scroll</span>
        <ChevronDown size={20} />
      </a>
    </section>
  );
};

export default Hero;
