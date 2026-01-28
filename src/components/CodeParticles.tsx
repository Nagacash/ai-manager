"use client";

import { useEffect, useRef } from 'react';

const CodeParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particles: HTMLDivElement[] = [];
    
    const codeSnippets = [
      '{hack: true}',
      '0xDEADBEEF',
      'while(true) glitch',
      'const quantum = ∞',
      'buffer.overflow()',
      'system.crash()',
      'void *ptr = null',
      'sudo rm -rf /*',
      'init(0xdeadbeef)',
      'malloc(-1)',
      'for(;;) spawn()',
      'SEGFAULT detected',
      'kernel.panic()',
      'exploit.win()',
      'shell.root=true',
      'network.flood()',
      'encrypt.all()',
      'firewall.bypass()',
      'sql.injection()',
      'ddos.attack()',
      'backdoor.install()'
    ];

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'code-particle';
      particle.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      particle.style.left = `${Math.random() * window.innerWidth}px`;
      particle.style.top = `${Math.random() * window.innerHeight}px`;
      particle.style.setProperty('--random-x', `${(Math.random() - 0.5) * 200}px`);
      particle.style.setProperty('--random-y', `${(Math.random() - 0.5) * 200}px`);
      particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
      
      container.appendChild(particle);
      particles.push(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
        const index = particles.indexOf(particle);
        if (index > -1) {
          particles.splice(index, 1);
        }
      }, 10000);
    };

    // Create particles periodically
    const interval = setInterval(createParticle, 500);
    
    // Create initial particles
    for (let i = 0; i < 10; i++) {
      setTimeout(createParticle, i * 100);
    }

    return () => {
      clearInterval(interval);
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return <div ref={containerRef} />;
};

export default CodeParticles;