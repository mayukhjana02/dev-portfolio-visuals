
import { useEffect, useRef } from 'react';

export const useAnimateOnScroll = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        animatedElements.forEach((el) => {
          observerRef.current?.unobserve(el);
        });
      }
    };
  }, []);
};

export const useParallax = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-parallax') || '0.1');
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        (element as HTMLElement).style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
};

export const useSkillBricksEffect = () => {
  useEffect(() => {
    const container = document.querySelector('.skills-container');
    if (!container) return;

    const bricks = document.querySelectorAll('.skill-brick');
    
    const handleMouseMove = (e: MouseEvent) => {
      const containerRect = container.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;
      
      bricks.forEach((brick) => {
        const brickRect = brick.getBoundingClientRect();
        const brickCenterX = brickRect.left + brickRect.width / 2 - containerRect.left;
        const brickCenterY = brickRect.top + brickRect.height / 2 - containerRect.top;
        
        const distanceX = mouseX - brickCenterX;
        const distanceY = mouseY - brickCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        const maxDistance = 300;
        const intensity = Math.max(0, 1 - distance / maxDistance);
        
        const moveX = distanceX * intensity * -0.1;
        const moveY = distanceY * intensity * -0.1;
        const scale = 1 + intensity * 0.1;
        
        (brick as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
        (brick as HTMLElement).style.zIndex = intensity > 0.2 ? '10' : '1';
      });
    };
    
    const handleMouseLeave = () => {
      bricks.forEach((brick) => {
        (brick as HTMLElement).style.transform = 'translate(0, 0) scale(1)';
        (brick as HTMLElement).style.zIndex = '1';
      });
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
};
