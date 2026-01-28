"use client";

import { useEffect, useRef } from 'react';

const DataCorruption = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Create SVG filter for data corruption
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', 'data-corrupt-filter');
    
    const turbulence = document.createElementNS('http://www.w3.org/2000/svg', 'feTurbulence');
    turbulence.setAttribute('type', 'fractalNoise');
    turbulence.setAttribute('baseFrequency', '0.02');
    turbulence.setAttribute('numOctaves', '3');
    turbulence.setAttribute('result', 'turbulence');
    
    const displacementMap = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
    displacementMap.setAttribute('in', 'SourceGraphic');
    displacementMap.setAttribute('in2', 'turbulence');
    displacementMap.setAttribute('scale', '5');
    
    filter.appendChild(turbulence);
    filter.appendChild(displacementMap);
    svg.appendChild(filter);
    
    document.body.appendChild(svg);
    
    // Animate the corruption
    let time = 0;
    const animateCorruption = () => {
      time += 0.1;
      const scale = 5 + Math.sin(time) * 3;
      const frequency = 0.02 + Math.cos(time * 0.5) * 0.01;
      
      turbulence.setAttribute('baseFrequency', frequency.toString());
      displacementMap.setAttribute('scale', scale.toString());
      
      requestAnimationFrame(animateCorruption);
    };
    
    animateCorruption();
    
    return () => {
      if (svg.parentNode) {
        svg.parentNode.removeChild(svg);
      }
    };
  }, []);

  return <div ref={containerRef} className="data-corrupt" />;
};

export default DataCorruption;