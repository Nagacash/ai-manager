"use client";

import { motion } from "framer-motion";

export default function AINetworkAnimation() {
  const nodes = [
    { x: 20, y: 30, delay: 0 },
    { x: 50, y: 15, delay: 0.2 },
    { x: 80, y: 25, delay: 0.4 },
    { x: 35, y: 55, delay: 0.1 },
    { x: 65, y: 50, delay: 0.3 },
    { x: 50, y: 75, delay: 0.5 },
    { x: 25, y: 80, delay: 0.6 },
    { x: 75, y: 78, delay: 0.7 },
  ];

  const connections = [
    [0, 1], [1, 2], [0, 3], [1, 4], [2, 4],
    [3, 4], [3, 5], [4, 5], [5, 6], [5, 7], [3, 6], [4, 7]
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ai-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        
        {connections.map(([from, to], i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${nodes[from].x}%`}
            y1={`${nodes[from].y}%`}
            x2={`${nodes[to].x}%`}
            y2={`${nodes[to].y}%`}
            stroke="url(#ai-gradient)"
            strokeWidth="0.3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 1, 0],
              opacity: [0, 0.6, 0.6, 0]
            }}
            transition={{
              duration: 4,
              delay: i * 0.15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {nodes.map((node, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="1.5"
            fill="url(#ai-gradient)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 3,
              delay: node.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
      
      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-purple-500/60 blur-sm"
        animate={{
          x: [0, 100, 200, 100, 0],
          y: [0, 50, 0, -50, 0],
          scale: [1, 1.5, 1, 0.8, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-cyan-500/60 blur-sm"
        animate={{
          x: [0, -80, -160, -80, 0],
          y: [0, -30, 0, 30, 0],
          scale: [1, 0.8, 1.3, 0.9, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}
