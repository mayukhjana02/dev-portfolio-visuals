
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useSkillBricksEffect } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface SkillCategory {
  name: string;
  skills: {
    name: string;
    logo: string;
    level: number;
  }[];
}

const skillsData: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", level: 90 },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", level: 85 },
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", level: 80 },
      { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg", level: 90 },
      { name: "Three.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg", level: 75 },
    ]
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", level: 85 },
      { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", level: 85 },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", level: 80 },
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", level: 75 },
      { name: "GraphQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg", level: 70 },
    ]
  },
  {
    name: "DevOps",
    skills: [
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", level: 90 },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", level: 70 },
      { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg", level: 65 },
      { name: "CI/CD", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg", level: 75 },
      { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", level: 80 },
    ]
  }
];

const Skills: React.FC = () => {
  useSkillBricksEffect();

  return (
    <section id="skills" className="portfolio-section bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-heading">Technical Skills</h2>
        <p className="section-subheading">
          The technologies, tools, and languages I work with to build exceptional web applications.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {skillsData.map((category) => (
            <div key={category.name} className="animate-on-scroll">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-border shadow-md h-full">
                <h3 className="text-xl font-bold mb-4 text-primary">{category.name}</h3>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div 
                      key={skill.name}
                      className="flex items-center p-3 rounded-lg bg-secondary/20 border border-border transition-all duration-300 hover:shadow-md"
                    >
                      <img src={skill.logo} alt={skill.name} className="w-6 h-6 mr-3" />
                      <span className="font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
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
