
import { useEffect, useRef, useState } from 'react';

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
    
    // Initial positions and velocities for falling effect
    const brickStates = new Map<Element, {
      x: number;
      y: number;
      vx: number;
      vy: number;
      isDragging: boolean;
      offsetX: number;
      offsetY: number;
    }>();
    
    bricks.forEach((brick) => {
      const rect = brick.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // Random initial position within the container
      const x = Math.random() * (containerRect.width - rect.width);
      const y = -rect.height * (1 + Math.random() * 3); // Start above the container
      
      brickStates.set(brick, {
        x,
        y,
        vx: 0,
        vy: 0,
        isDragging: false,
        offsetX: 0,
        offsetY: 0
      });
      
      (brick as HTMLElement).style.position = 'absolute';
      (brick as HTMLElement).style.left = `${x}px`;
      (brick as HTMLElement).style.top = `${y}px`;
      (brick as HTMLElement).style.cursor = 'grab';
      (brick as HTMLElement).style.zIndex = '1';
    });
    
    // Animation frame for falling effect
    let animationId: number;
    
    const animate = () => {
      const containerRect = container.getBoundingClientRect();
      
      bricks.forEach((brick) => {
        const state = brickStates.get(brick);
        if (!state) return;
        
        const rect = brick.getBoundingClientRect();
        
        if (!state.isDragging) {
          // Apply gravity
          state.vy += 0.2;
          
          // Apply some horizontal drift
          state.vx *= 0.99;
          
          // Update position
          state.x += state.vx;
          state.y += state.vy;
          
          // Bounce off the bottom
          if (state.y > containerRect.height - rect.height) {
            state.y = containerRect.height - rect.height;
            state.vy *= -0.6; // Bounce with damping
            
            // Add some random horizontal movement on bounce
            state.vx += (Math.random() - 0.5) * 2;
          }
          
          // Bounce off the sides
          if (state.x < 0) {
            state.x = 0;
            state.vx *= -0.6;
          } else if (state.x > containerRect.width - rect.width) {
            state.x = containerRect.width - rect.width;
            state.vx *= -0.6;
          }
          
          // Damping
          if (Math.abs(state.vy) < 0.5 && Math.abs(state.y - (containerRect.height - rect.height)) < 1) {
            state.vy = 0;
          }
        }
        
        // Update position
        (brick as HTMLElement).style.left = `${state.x}px`;
        (brick as HTMLElement).style.top = `${state.y}px`;
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Event handlers for dragging
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const brick = target.closest('.skill-brick');
      
      if (brick) {
        const state = brickStates.get(brick);
        if (state) {
          state.isDragging = true;
          state.offsetX = e.clientX - state.x;
          state.offsetY = e.clientY - state.y;
          (brick as HTMLElement).style.cursor = 'grabbing';
          (brick as HTMLElement).style.zIndex = '10';
        }
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      bricks.forEach((brick) => {
        const state = brickStates.get(brick);
        if (state && state.isDragging) {
          const containerRect = container.getBoundingClientRect();
          const rect = brick.getBoundingClientRect();
          
          // Calculate new position
          let newX = e.clientX - state.offsetX;
          let newY = e.clientY - state.offsetY;
          
          // Constrain to container
          newX = Math.max(0, Math.min(newX, containerRect.width - rect.width));
          newY = Math.max(0, Math.min(newY, containerRect.height - rect.height));
          
          // Update state
          state.x = newX;
          state.y = newY;
          state.vx = 0;
          state.vy = 0;
        }
      });
    };
    
    const handleMouseUp = () => {
      bricks.forEach((brick) => {
        const state = brickStates.get(brick);
        if (state && state.isDragging) {
          state.isDragging = false;
          (brick as HTMLElement).style.cursor = 'grab';
          (brick as HTMLElement).style.zIndex = '1';
        }
      });
    };
    
    // Add mouse event listeners
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const brick = target.closest('.skill-brick');
      
      if (brick && e.touches[0]) {
        const state = brickStates.get(brick);
        if (state) {
          state.isDragging = true;
          state.offsetX = e.touches[0].clientX - state.x;
          state.offsetY = e.touches[0].clientY - state.y;
          (brick as HTMLElement).style.zIndex = '10';
        }
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // Prevent scrolling while dragging
      
      bricks.forEach((brick) => {
        const state = brickStates.get(brick);
        if (state && state.isDragging && e.touches[0]) {
          const containerRect = container.getBoundingClientRect();
          const rect = brick.getBoundingClientRect();
          
          // Calculate new position
          let newX = e.touches[0].clientX - state.offsetX;
          let newY = e.touches[0].clientY - state.offsetY;
          
          // Constrain to container
          newX = Math.max(0, Math.min(newX, containerRect.width - rect.width));
          newY = Math.max(0, Math.min(newY, containerRect.height - rect.height));
          
          // Update state
          state.x = newX;
          state.y = newY;
          state.vx = 0;
          state.vy = 0;
        }
      });
    };
    
    const handleTouchEnd = () => {
      bricks.forEach((brick) => {
        const state = brickStates.get(brick);
        if (state && state.isDragging) {
          state.isDragging = false;
          (brick as HTMLElement).style.zIndex = '1';
        }
      });
    };
    
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
};
