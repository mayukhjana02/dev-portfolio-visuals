
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, Github } from 'lucide-react';

export interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
}

const ProjectCard: React.FC<ProjectProps> = ({
  title,
  description,
  tags,
  imageUrl,
  liveUrl,
  repoUrl
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="animate-on-scroll group relative overflow-hidden rounded-xl bg-white border border-border h-full flex flex-col transition-all duration-500 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        transform: isHovered ? 'perspective(1000px) rotateY(10deg)' : 'perspective(1000px) rotateY(0deg)',
        transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
      }}
    >
      <div className="relative h-60 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="relative flex-1 flex flex-col p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all">{title}</h3>
        
        <p className="text-muted-foreground text-sm flex-1 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          {repoUrl && (
            <a 
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border hover:bg-secondary transition-colors"
              aria-label={`${title} repository`}
            >
              <Github size={18} />
            </a>
          )}
          
          {liveUrl && (
            <a 
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary border border-border transition-colors"
              aria-label={`${title} live preview`}
            >
              <span>View Project</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
      
      <div 
        className={cn(
          "absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 bg-radial-gradient",
          isHovered && "opacity-10"
        )}
      />
    </div>
  );
};

export default ProjectCard;
