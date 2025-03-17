
import React, { useEffect } from 'react';
import ThreeScene from '@/components/ThreeScene';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useAnimateOnScroll } from '@/lib/motion';
import { toast } from 'sonner';

const Index: React.FC = () => {
  useAnimateOnScroll();
  
  useEffect(() => {
    // Welcome toast
    setTimeout(() => {
      toast('👋 Welcome to my portfolio', {
        description: 'Feel free to explore my projects and skills!',
        duration: 5000,
      });
    }, 2000);
    
    return () => {};
  }, []);
  
  return (
    <div className="min-h-screen overflow-x-hidden">
      <ThreeScene />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
