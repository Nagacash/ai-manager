"use client";

import { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const columns = Math.floor(window.innerWidth / 20);
    
    // Create matrix rain columns
    for (let i = 0; i < columns; i++) {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      column.style.left = `${i * 20}px`;
      column.style.animationDuration = `${Math.random() * 5 + 5}s`;
      column.style.animationDelay = `${Math.random() * 5}s`;
      
      // Generate random code characters
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
      let code = '';
      for (let j = 0; j < 50; j++) {
        code += characters[Math.floor(Math.random() * characters.length)] + '<br>';
      }
      column.innerHTML = code;
      
      container.appendChild(column);
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return <div ref={containerRef} className="matrix-bg" />;
};

export default MatrixRain;