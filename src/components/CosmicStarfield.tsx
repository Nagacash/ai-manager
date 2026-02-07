"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  color: string;
}

export default function CosmicStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const starCount = isMobile ? 100 : 250;

    // Cosmic color palette
    const starColors = [
      "#22d3ee", // Cyan
      "#67e8f9", // Light cyan
      "#a855f7", // Purple
      "#c084fc", // Light purple
      "#ec4899", // Pink
      "#ffffff", // White
    ];

    const shootingStarColors = [
      "#22d3ee", // Cyan
      "#a855f7", // Purple
      "#ec4899", // Pink
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          color: starColors[Math.floor(Math.random() * starColors.length)],
        });
      }
    };

    const createShootingStar = () => {
      if (Math.random() > 0.95) {
        // 2% chance per frame
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height * 0.5), // Start in upper half
          length: Math.random() * 80 + 50,
          speed: Math.random() * 8 + 5,
          angle: (Math.random() * Math.PI) / 4 + Math.PI / 4, // 45-90 degrees
          opacity: 1,
          color:
            shootingStarColors[
              Math.floor(Math.random() * shootingStarColors.length)
            ],
        });
      }
    };

    const drawNebula = () => {
      // Draw visible nebula clouds - MUCH MORE OPAQUE
      const nebulaColors = [
        { color: "#22d3ee", x: 0.2, y: 0.2, radius: 0.5 },
        { color: "#a855f7", x: 0.8, y: 0.5, radius: 0.45 },
        { color: "#ec4899", x: 0.5, y: 0.9, radius: 0.4 },
      ];

      nebulaColors.forEach((nebula) => {
        const gradient = ctx.createRadialGradient(
          canvas.width * nebula.x,
          canvas.height * nebula.y,
          0,
          canvas.width * nebula.x,
          canvas.height * nebula.y,
          canvas.width * nebula.radius,
        );
        gradient.addColorStop(0, nebula.color + "30");
        gradient.addColorStop(0.5, nebula.color + "15");
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
    };

    const drawStars = () => {
      stars.forEach((star) => {
        // Twinkle effect
        star.opacity += Math.sin(Date.now() * star.twinkleSpeed) * 0.01;
        star.opacity = Math.max(0.2, Math.min(1, star.opacity));

        // Draw star with BRIGHT glow
        const gradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.size * 4,
        );
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(0.3, star.color + "80");
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = star.opacity * 0.8;
        ctx.fill();

        // Core - brighter
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = star.opacity;
        ctx.fill();

        // Cross sparkle for larger stars - more visible
        if (star.size > 1) {
          ctx.strokeStyle = star.color;
          ctx.globalAlpha = star.opacity * 0.9;
          ctx.lineWidth = 1;

          // Vertical line
          ctx.beginPath();
          ctx.moveTo(star.x, star.y - star.size * 4);
          ctx.lineTo(star.x, star.y + star.size * 4);
          ctx.stroke();

          // Horizontal line
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 4, star.y);
          ctx.lineTo(star.x + star.size * 4, star.y);
          ctx.stroke();
        }
      });
    };

    const drawShootingStars = () => {
      shootingStars = shootingStars.filter((star) => {
        // Update position
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.015;

        if (star.opacity <= 0) return false;

        // Draw shooting star trail
        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(0.5, star.color + "80");
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.globalAlpha = star.opacity;
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = star.opacity;
        ctx.fill();

        return true;
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawNebula();
      drawStars();
      createShootingStar();
      drawShootingStars();

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        opacity: 0.9,
        zIndex: -25,
      }}
    />
  );
}
