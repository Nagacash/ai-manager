"use client";

import { useEffect, useRef } from "react";

interface OrbitalRing {
  x: number;
  y: number;
  radius: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
  tilt: number;
}

interface Planet {
  angle: number;
  distance: number;
  size: number;
  color: string;
  glowColor: string;
  speed: number;
}

export default function OrbitalRings() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    // Define orbital rings
    const rings: OrbitalRing[] = [
      {
        x: 0.8, // 80% from left
        y: 0.3, // 30% from top
        radius: isMobile ? 80 : 150,
        rotation: 0,
        rotationSpeed: 0.002,
        color: "#22d3ee",
        opacity: 0.15,
        tilt: 0.3,
      },
      {
        x: 0.2,
        y: 0.7,
        radius: isMobile ? 60 : 100,
        rotation: Math.PI / 4,
        rotationSpeed: -0.003,
        color: "#a855f7",
        opacity: 0.12,
        tilt: -0.2,
      },
      {
        x: 0.5,
        y: 0.5,
        radius: isMobile ? 100 : 200,
        rotation: Math.PI / 2,
        rotationSpeed: 0.001,
        color: "#ec4899",
        opacity: 0.1,
        tilt: 0.1,
      },
    ];

    // Planets orbiting the rings
    const planets: Planet[][] = rings.map((ring, index) => {
      const planetCount = index === 2 ? 3 : 2; // Middle ring has 3 planets
      return Array.from({ length: planetCount }, (_, i) => ({
        angle: ((Math.PI * 2) / planetCount) * i,
        distance: ring.radius * (0.7 + Math.random() * 0.2),
        size: Math.random() * 3 + 2,
        color: ["#22d3ee", "#a855f7", "#ec4899"][Math.floor(Math.random() * 3)],
        glowColor: ["#22d3ee", "#a855f7", "#ec4899"][
          Math.floor(Math.random() * 3)
        ],
        speed: ring.rotationSpeed * (1 + Math.random() * 0.5),
      }));
    });

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawRing = (ring: OrbitalRing) => {
      const centerX = canvas.width * ring.x;
      const centerY = canvas.height * ring.y;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(ring.rotation);
      ctx.scale(1, Math.cos(ring.tilt)); // Create 3D tilt effect

      // Draw main ring
      ctx.beginPath();
      ctx.arc(0, 0, ring.radius, 0, Math.PI * 2);
      ctx.strokeStyle = ring.color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = ring.opacity;
      ctx.stroke();

      // Draw ring segments for tech look
      const segments = 12;
      for (let i = 0; i < segments; i++) {
        const angle = ((Math.PI * 2) / segments) * i;
        const x1 = Math.cos(angle) * (ring.radius - 5);
        const y1 = Math.sin(angle) * (ring.radius - 5);
        const x2 = Math.cos(angle) * (ring.radius + 5);
        const y2 = Math.sin(angle) * (ring.radius + 5);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = ring.color;
        ctx.globalAlpha = ring.opacity * 1.5;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawPlanet = (planet: Planet, ring: OrbitalRing) => {
      const centerX = canvas.width * ring.x;
      const centerY = canvas.height * ring.y;

      // Calculate 3D position
      const cosTilt = Math.cos(ring.tilt);
      const x = centerX + Math.cos(planet.angle) * planet.distance;
      const y = centerY + Math.sin(planet.angle) * planet.distance * cosTilt;

      // Planet glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, planet.size * 4);
      gradient.addColorStop(0, planet.glowColor);
      gradient.addColorStop(0.5, planet.glowColor + "60");
      gradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.arc(x, y, planet.size * 4, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.4;
      ctx.fill();

      // Planet body
      ctx.beginPath();
      ctx.arc(x, y, planet.size, 0, Math.PI * 2);
      ctx.fillStyle = planet.color;
      ctx.globalAlpha = 0.9;
      ctx.fill();

      // Highlight
      ctx.beginPath();
      ctx.arc(
        x - planet.size * 0.3,
        y - planet.size * 0.3,
        planet.size * 0.3,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = 0.6;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      rings.forEach((ring, ringIndex) => {
        // Update ring rotation
        ring.rotation += ring.rotationSpeed;

        // Draw ring
        drawRing(ring);

        // Update and draw planets
        planets[ringIndex].forEach((planet) => {
          planet.angle += planet.speed;
          drawPlanet(planet, ring);
        });
      });

      ctx.globalAlpha = 1;
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
      className="fixed inset-0 w-full h-full pointer-events-none -z-15"
      style={{ opacity: 0.5 }}
    />
  );
}
