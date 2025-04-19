
import { useEffect } from 'react';

interface BrickState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isDragging: boolean;
  offsetX: number;
  offsetY: number;
}

export const useSkillBricks = () => {
  useEffect(() => {
    const container = document.querySelector('.skills-container');
    if (!container) return;

    const bricks = document.querySelectorAll('.skill-brick');
    const brickStates = new Map<Element, BrickState>();
    
    // Initialize brick states
    bricks.forEach((brick) => {
      const rect = brick.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      const x = Math.random() * (containerRect.width - rect.width);
      const y = -rect.height * (1 + Math.random() * 3);
      
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
    
    // Animation frame handler
    const animate = () => {
      const containerRect = container.getBoundingClientRect();
      
      bricks.forEach((brick) => {
        const state = brickStates.get(brick);
        if (!state) return;
        
        const rect = brick.getBoundingClientRect();
        
        if (!state.isDragging) {
          state.vy += 0.2;
          state.vx *= 0.99;
          state.x += state.vx;
          state.y += state.vy;
          
          if (state.y > containerRect.height - rect.height) {
            state.y = containerRect.height - rect.height;
            state.vy *= -0.6;
            state.vx += (Math.random() - 0.5) * 2;
          }
          
          if (state.x < 0) {
            state.x = 0;
            state.vx *= -0.6;
          } else if (state.x > containerRect.width - rect.width) {
            state.x = containerRect.width - rect.width;
            state.vx *= -0.6;
          }
          
          if (Math.abs(state.vy) < 0.5 && Math.abs(state.y - (containerRect.height - rect.height)) < 1) {
            state.vy = 0;
          }
        }
        
        (brick as HTMLElement).style.left = `${state.x}px`;
        (brick as HTMLElement).style.top = `${state.y}px`;
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    let animationId = requestAnimationFrame(animate);
    
    // Event handlers
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
          
          let newX = e.clientX - state.offsetX;
          let newY = e.clientY - state.offsetY;
          
          newX = Math.max(0, Math.min(newX, containerRect.width - rect.width));
          newY = Math.max(0, Math.min(newY, containerRect.height - rect.height));
          
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
    
    // Touch event handlers
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
      e.preventDefault();
      
      bricks.forEach((brick) => {
        const state = brickStates.get(brick);
        if (state && state.isDragging && e.touches[0]) {
          const containerRect = container.getBoundingClientRect();
          const rect = brick.getBoundingClientRect();
          
          let newX = e.touches[0].clientX - state.offsetX;
          let newY = e.touches[0].clientY - state.offsetY;
          
          newX = Math.max(0, Math.min(newX, containerRect.width - rect.width));
          newY = Math.max(0, Math.min(newY, containerRect.height - rect.height));
          
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
    
    // Add event listeners
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
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
