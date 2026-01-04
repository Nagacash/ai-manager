"use client";

import { useEffect, useRef } from "react";

export default function PerlinNoiseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Perlin noise implementation
    const noise = (() => {
      const p = new Array(512);
      const permutation = [
        151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225,
        140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148,
        247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32,
        57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175,
        74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122,
        60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54,
        65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169,
        200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64,
        52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212,
        207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213,
        119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
        129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104,
        218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241,
        81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
        184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93,
        222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180,
      ];
      for (let i = 0; i < 256; i++) {
        p[256 + i] = p[i] = permutation[i];
      }

      const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
      const lerp = (a: number, b: number, t: number) => a + t * (b - a);
      const grad = (hash: number, x: number, y: number) => {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
      };

      return (x: number, y: number) => {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        x -= Math.floor(x);
        y -= Math.floor(y);
        const u = fade(x);
        const v = fade(y);
        const A = p[X] + Y;
        const AA = p[A];
        const AB = p[A + 1];
        const B = p[X + 1] + Y;
        const BA = p[B];
        const BB = p[B + 1];
        return lerp(
          lerp(grad(p[AA], x, y), grad(p[BA], x - 1, y), u),
          lerp(grad(p[AB], x, y - 1), grad(p[BB], x - 1, y - 1), u),
          v
        );
      };
    })();

    let time = 0;
    const speed = 0.0002;
    const scale = 0.002;
    const resolution = 3; // Render at lower resolution for better performance
    let animationFrameId: number;

    const tempCanvas = document.createElement("canvas");
    let tempCtx: CanvasRenderingContext2D | null = null;

    const animate = () => {
      time += speed;
      const width = Math.floor(canvas.width / resolution);
      const height = Math.floor(canvas.height / resolution);

      if (!tempCtx || tempCanvas.width !== width || tempCanvas.height !== height) {
        tempCanvas.width = width;
        tempCanvas.height = height;
        tempCtx = tempCanvas.getContext("2d");
      }

      if (!tempCtx) {
        requestAnimationFrame(animate);
        return;
      }

      const imageData = tempCtx.createImageData(width, height);
      const data = imageData.data;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const value = noise(x * scale * resolution, y * scale * resolution + time * 100);
          const normalized = (value + 1) * 0.5;
          // Use subtle gray tones that work on both light and dark backgrounds
          const intensity = normalized * 0.15; // Increased opacity for visibility
          const grayValue = Math.floor(128 + (normalized - 0.5) * 40); // Subtle gray variation
          const index = (y * width + x) * 4;
          data[index] = grayValue;
          data[index + 1] = grayValue;
          data[index + 2] = grayValue;
          data[index + 3] = intensity * 255;
        }
      }

      tempCtx.putImageData(imageData, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-20"
      style={{ mixBlendMode: "soft-light", opacity: 0.3 }}
    />
  );
}

