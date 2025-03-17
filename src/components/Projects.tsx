
import React from 'react';
import ProjectCard, { ProjectProps } from './ProjectCard';

const projectsData: ProjectProps[] = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with user authentication, product management, and secure checkout.",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    imageUrl: "https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=665&q=80",
    liveUrl: "#",
    repoUrl: "#"
  },
  {
    title: "Portfolio Dashboard",
    description: "Interactive dashboard for monitoring investment portfolios with real-time data visualization.",
    tags: ["React", "TypeScript", "D3.js", "TailwindCSS", "Firebase"],
    imageUrl: "https://images.unsplash.com/photo-1642961669476-c62adfb0e8af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    liveUrl: "#",
    repoUrl: "#"
  },
  {
    title: "AI Content Generator",
    description: "Web application that uses machine learning to generate content for various use cases.",
    tags: ["Next.js", "TensorFlow.js", "OpenAI API", "Vercel", "Framer Motion"],
    imageUrl: "https://images.unsplash.com/photo-1654277033006-3a0d5c9553ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    liveUrl: "#",
    repoUrl: "#"
  },
  {
    title: "3D Web Experience",
    description: "Interactive 3D web experience showcasing creative storytelling through technology.",
    tags: ["Three.js", "WebGL", "React Three Fiber", "GSAP", "React"],
    imageUrl: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    liveUrl: "#"
  }
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="portfolio-section max-w-7xl mx-auto">
      <h2 className="section-heading">Featured Projects</h2>
      <p className="section-subheading">
        A collection of my recent work showcasing my abilities as a full-stack developer.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
        {projectsData.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
