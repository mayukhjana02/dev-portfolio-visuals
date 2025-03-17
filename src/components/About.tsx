
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="portfolio-section max-w-7xl mx-auto">
      <h2 className="section-heading">About Me</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="animate-on-scroll">
          <div className="relative rounded-2xl overflow-hidden aspect-square">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay rounded-2xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=699&q=80" 
              alt="Developer profile"
              className="w-full h-full object-cover rounded-2xl" 
            />
            <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none"></div>
          </div>
        </div>
        
        <div className="animate-on-scroll delay-200">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">Full Stack Developer & Web Enthusiast</h3>
              <p className="text-muted-foreground">
                I'm a passionate full-stack developer with 5+ years of experience building modern web applications. I specialize in creating responsive, accessible, and performant websites that provide exceptional user experiences.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2">My Approach</h4>
              <p className="text-muted-foreground">
                I believe in writing clean, maintainable code and staying up-to-date with the latest technologies and best practices. My goal is to build applications that are not only functional but also beautiful and intuitive.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2">Beyond Coding</h4>
              <p className="text-muted-foreground">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through writing and mentoring.
              </p>
            </div>
            
            <a 
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 mt-4 rounded-md border border-border bg-transparent hover:bg-secondary transition-all"
            >
              View Full Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
