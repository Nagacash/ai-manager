"use client";

import { useEffect, useRef, useState } from 'react';

const ChaosExplosion = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const systemErrors = [
    '⚠️ KERNEL PANIC: System compromised!',
    '💥 SEGMENTATION FAULT: Memory corrupted!',
    '🔥 THERMAL OVERLOAD: CPU at 180°C!',
    '⚡ POWER SURGE: Grid failure detected!',
    '🚨 FIREWALL BREACHED: Intruder alert!',
    '💾 DATA CORRUPTION: Files lost forever!',
    '🌐 NETWORK COLLAPSE: Internet down!',
    '🔓 ENCRYPTION BROKEN: All files exposed!',
    '💣 BOMB DETECTED: Evacuate immediately!',
    '👾 VIRUS ACTIVATED: System infected!',
    '🌀 QUANTUM COLLAPSE: Reality unstable!'
  ];

  const chaosParticles = [
    'NULL_POINTER', 'STACK_OVERFLOW', 'HEAP_CORRUPT', 'DOUBLE_FREE',
    'RACE_CONDITION', 'DEADLOCK_DETECTED', 'BUFFER_UNDERFLOW', 'INTEGER_OVERFLOW',
    'DIVIDE_BY_ZERO', 'ACCESS_VIOLATION', 'PAGE_FAULT', 'ILLEGAL_INSTRUCTION',
    'FLOATING_POINT_ERROR', 'MEMORY_LEAK', 'INFINITE_LOOP', 'RECURSION_LIMIT',
    'TIMEOUT_EXPIRED', 'CONNECTION_RESET', 'DNS_FAILURE', 'TLS_ERROR',
    'SSL_VULNERABILITY', 'SQL_INJECTION', 'XSS_ATTACK', 'CSRF_TOKEN_INVALID'
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particleCount = 100;
    
    // Create static overlay
    const staticOverlay = document.createElement('div');
    staticOverlay.className = 'static-storm';
    container.appendChild(staticOverlay);

    // Create chaos particles
    const createChaosParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'chaos-particle';
      particle.textContent = chaosParticles[Math.floor(Math.random() * chaosParticles.length)];
      particle.style.left = `${Math.random() * window.innerWidth}px`;
      particle.style.top = `${Math.random() * window.innerHeight}px`;
      particle.style.setProperty('--explode-x', `${(Math.random() - 0.5) * 1000}px`);
      particle.style.setProperty('--explode-y', `${(Math.random() - 0.5) * 1000}px`);
      particle.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      particle.style.fontSize = `${Math.random() * 10 + 8}px`;
      container.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 2000);
    };

    // Particle explosion
    const particleInterval = setInterval(createChaosParticle, 50);

    // System errors
    const showError = () => {
      const error = systemErrors[Math.floor(Math.random() * systemErrors.length)];
      setErrors(prev => [...prev, error]);
      setTimeout(() => {
        setErrors(prev => prev.slice(1));
      }, 3000);
    };

    const errorInterval = setInterval(showError, 8000);
    
    // Initial chaos
    for (let i = 0; i < 20; i++) {
      setTimeout(createChaosParticle, i * 100);
    }

    setTimeout(showError, 2000);

    return () => {
      clearInterval(particleInterval);
      clearInterval(errorInterval);
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="particle-explosion" />
      <div className="system-error-container">
        {errors.map((error, index) => (
          <div
            key={index}
            className="system-error"
            style={{
              animationDelay: `${index * 0.1}s`,
              transform: `translate(-50%, -50%) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`
            }}
          >
            {error}
          </div>
        ))}
      </div>
    </>
  );
};

export default ChaosExplosion;