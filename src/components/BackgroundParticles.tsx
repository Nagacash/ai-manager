"use client";

import { useEffect, useRef } from "react";

interface CosmicParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  pulsePhase: number;
  pulseSpeed: number;
}

export default function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: CosmicParticle[] = [];
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 60;
    const connectionDistance = 180;
    const mouse = { x: -1000, y: -1000, radius: 200 };

    // Cosmic color palette matching the design system
    const cosmicColors = [
      "#22d3ee", // Cyan
      "#67e8f9", // Cyan light
      "#a855f7", // Purple
      "#c084fc", // Purple light
      "#ec4899", // Pink
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          color: cosmicColors[Math.floor(Math.random() * cosmicColors.length)],
          alpha: Math.random() * 0.5 + 0.3,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse interaction - gentle repulsion
        const dxm = mouse.x - p.x;
        const dym = mouse.y - p.y;
        const distMouse = Math.sqrt(dxm * dxm + dym * dym);
        if (distMouse < mouse.radius) {
          const force = (mouse.radius - distMouse) / mouse.radius;
          p.x -= dxm * force * 0.015;
          p.y -= dym * force * 0.015;
        }

        // Pulse effect
        p.pulsePhase += p.pulseSpeed;
        const pulseFactor = Math.sin(p.pulsePhase) * 0.3 + 0.7;
        const currentAlpha = p.alpha * pulseFactor;

        // Draw glowing Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulseFactor, 0, Math.PI * 2);

        // Create radial gradient for glow effect
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 4,
        );
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(0.5, p.color + "40");
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.globalAlpha = currentAlpha * 0.6;
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = currentAlpha;
        ctx.fill();

        // Draw Connections with cosmic glow
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.3;

            ctx.beginPath();
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            // Add glow to connections
            ctx.beginPath();
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = opacity * 0.3;
            ctx.lineWidth = 2;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    drawParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-20"
      style={{ opacity: 0.4 }}
    />
  );
}
