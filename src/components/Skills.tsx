import React from 'react';
import { cn } from '@/lib/utils';

interface WorkStep {
  name: string;
  description: string;
  icon: string;
}

const workSteps: WorkStep[] = [
  {
    name: "Discovery",
    description: "Understanding your needs through in-depth consultation and research to create a solid foundation for your project.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  {
    name: "Design & Planning",
    description: "Creating detailed wireframes and technical specifications while choosing the right technologies for your solution.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Development",
    description: "Building your application with clean, maintainable code while following best practices and modern standards.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  }
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="portfolio-section bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-heading">How I Work</h2>
        <p className="section-subheading">
          My systematic approach to turning your ideas into reality.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {workSteps.map((step, index) => (
            <div key={step.name} className="animate-on-scroll">
              <div className={cn(
                "bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-border shadow-md h-full",
                "transform transition-all duration-500 hover:scale-105"
              )}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <img src={step.icon} alt={step.name} className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm text-primary/60 font-medium">Step {index + 1}</span>
                    <h3 className="text-xl font-bold text-primary">{step.name}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 animate-on-scroll">
          <div className="p-8 bg-white rounded-xl border border-border shadow-sm">
            <h3 className="text-2xl font-bold mb-6 text-center">Experience Timeline</h3>
            
            <div className="relative border-l-2 border-primary/20 pl-8 pb-8 space-y-12">
              {[
                {
                  title: "Senior Full Stack Developer",
                  company: "Tech Innovations Inc",
                  period: "2021 - Present",
                  description: "Leading the development of a SaaS platform using React, Node.js, and AWS. Managing a team of 5 developers."
                },
                {
                  title: "Full Stack Developer",
                  company: "Digital Solutions Ltd",
                  period: "2019 - 2021",
                  description: "Built RESTful APIs, implemented authentication systems, and developed responsive UIs for client projects."
                },
                {
                  title: "Frontend Developer",
                  company: "Creative Web Agency",
                  period: "2017 - 2019",
                  description: "Created interactive UI components and responsive layouts using React, Redux, and CSS-in-JS solutions."
                }
              ].map((experience, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-10 top-1 w-4 h-4 rounded-full border-2 border-primary bg-white" />
                  <div>
                    <h4 className="text-lg font-bold">{experience.title}</h4>
                    <div className="flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground mb-2">
                      <span>{experience.company}</span>
                      <span className="hidden sm:inline-block mx-2">•</span>
                      <span>{experience.period}</span>
                    </div>
                    <p className="text-muted-foreground">{experience.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
