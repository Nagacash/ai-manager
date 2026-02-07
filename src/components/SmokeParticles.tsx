"use client";

import { useEffect, useRef } from "react";

export default function SmokeParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      life: number;
      maxLife: number;
    }[] = [];

    const createParticle = () => {
      const x = Math.random() * canvas.width;
      const size = Math.random() * 100 + 60;
      return {
        x,
        y: canvas.height + size,
        size,
        speedX: Math.random() * 1.5 - 0.75,
        speedY: Math.random() * -1.2 - 0.5,
        opacity: 0,
        life: 0,
        maxLife: Math.random() * 250 + 200,
      };
    };

    let frameCount = 0;
    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      frameCount++;
      if (frameCount % 2 === 0 && particles.length < 40) {
        particles.push(createParticle());
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;

        const progress = p.life / p.maxLife;
        p.opacity = Math.sin(progress * Math.PI) * 0.2;

        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size,
        );
        gradient.addColorStop(0, `rgba(100, 100, 120, ${p.opacity})`);
        gradient.addColorStop(0.5, `rgba(80, 80, 100, ${p.opacity * 0.5})`);
        gradient.addColorStop(1, "rgba(60, 60, 80, 0)");

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
}
