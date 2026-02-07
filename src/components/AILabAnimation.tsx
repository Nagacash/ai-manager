"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const GPU_CORES = 12;
const METRICS_INTERVAL = 2000;

interface GpuMetrics {
  temp: number;
  power: number;
  clock: number;
  memUsed: number;
  memTotal: number;
  fanSpeed: number;
  utilization: number;
}

interface ProcessItem {
  pid: number;
  name: string;
  memMB: number;
  usage: number;
}

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const PROCESS_NAMES = [
  "naga-llm-v3.7",
  "whisper-large-v3",
  "codex-embeddings",
  "sdxl-turbo-gen",
  "rag-retriever",
  "vector-indexer",
  "agent-orchestrator",
  "vision-encoder",
];

export default function AILabAnimation() {
  const [mounted, setMounted] = useState(false);
  const [metrics, setMetrics] = useState<GpuMetrics>({
    temp: 72,
    power: 285,
    clock: 2100,
    memUsed: 21.4,
    memTotal: 24,
    fanSpeed: 68,
    utilization: 94,
  });

  const [processes, setProcesses] = useState<ProcessItem[]>([]);
  const [coreLoads, setCoreLoads] = useState<number[]>(
    Array.from({ length: GPU_CORES }, () => 75), // Static initial value
  );
  const [throughput, setThroughput] = useState(
    Array.from({ length: 20 }, () => 65), // Static initial value
  );
  const [statusLog, setStatusLog] = useState<string[]>([
    "GPU cluster online",
    "CUDA 12.4 initialized",
    "cuDNN 9.1 loaded",
  ]);

  const LOG_MESSAGES = [
    "Batch inference: 128 samples @ 42ms",
    "Embedding pipeline: 2048 vectors indexed",
    "Checkpoint saved: naga-llm-ep47.pt",
    "Attention heads optimized: 32 → 28 active",
    "KV-cache hit ratio: 94.2%",
    "VRAM defrag: recovered 1.2GB",
    "Model shard 3/8 synced to Node-2",
    "Token throughput: 12,847 tok/s",
    "Gradient accumulation step 4/8",
    "Flash Attention v2 enabled",
    "Tensor cores: FP16 mode active",
    "NVLink bandwidth: 600 GB/s",
    "PCIe Gen5 x16: stable",
    "Temperature throttle: none",
    "ECC memory: 0 errors",
  ];

  const generateProcesses = useCallback(() => {
    const count = randomBetween(3, 5);
    const shuffled = [...PROCESS_NAMES].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map((name, i) => ({
      pid: randomBetween(1000, 9999),
      name,
      memMB: randomBetween(800, 6000),
      usage: randomBetween(5, 45),
    }));
  }, []);

  // Initialize random values only on client side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    setCoreLoads(
      Array.from({ length: GPU_CORES }, () => randomBetween(60, 100)),
    );
    setThroughput(Array.from({ length: 20 }, () => randomBetween(40, 95)));
  }, []);

  useEffect(() => {
    setProcesses(generateProcesses());
  }, [generateProcesses]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        temp: randomBetween(68, 82),
        power: randomBetween(260, 320),
        clock: randomBetween(1950, 2250),
        memUsed: +(randomBetween(180, 230) / 10).toFixed(1),
        memTotal: 24,
        fanSpeed: randomBetween(55, 80),
        utilization: randomBetween(85, 99),
      });

      setCoreLoads(
        Array.from({ length: GPU_CORES }, () => randomBetween(50, 100)),
      );

      setThroughput((prev) => [...prev.slice(1), randomBetween(40, 98)]);

      setProcesses(generateProcesses());

      setStatusLog((prev) => {
        const msg = LOG_MESSAGES[randomBetween(0, LOG_MESSAGES.length - 1)];
        const next = [...prev, msg];
        return next.length > 5 ? next.slice(-5) : next;
      });
    }, METRICS_INTERVAL);

    return () => clearInterval(interval);
  }, [generateProcesses]);

  const memPercent = (metrics.memUsed / metrics.memTotal) * 100;
  const tempColor =
    metrics.temp > 80
      ? "text-red-400"
      : metrics.temp > 74
        ? "text-yellow-400"
        : "text-green-400";

  // Prevent hydration mismatch by not rendering dynamic content until mounted
  if (!mounted) {
    return (
      <div className="w-full">
        <div className="relative rounded-2xl border border-slate-700/60 bg-gradient-to-b from-[#1a1a2e] via-[#16162a] to-[#0f0f1a] overflow-hidden shadow-[0_0_80px_rgba(118,185,0,0.04)] h-[400px] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* GPU Card Frame */}
      <div className="relative rounded-2xl border border-white/30 overflow-hidden shadow-[0_0_100px_rgba(168,85,247,0.15)]">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0a0a1a] to-slate-950" />
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(34, 211, 238, 0.2) 0%, transparent 50%)",
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Top bar — NVIDIA style header */}
        <div className="relative flex items-center justify-between px-5 py-3 border-b border-white/20 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-3 rounded-sm bg-[#a855f7] shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
              <div className="w-1.5 h-3 rounded-sm bg-[#a855f7]/40" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a855f7]">
              NAGA RTX 9090 Ti
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-slate-500">
              CUDA 12.4
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              Driver 560.35
            </span>
            <div className="flex items-center gap-1.5">
              <div className="size-1.5 rounded-full bg-[#a855f7] animate-pulse" />
              <span className="text-[10px] font-bold text-[#a855f7]">
                ONLINE
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-0 lg:divide-x divide-slate-700/30">
          {/* Left Panel — GPU Vitals */}
          <div className="p-5 space-y-5">
            {/* Primary Metrics */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  label: "UTIL",
                  value: `${metrics.utilization}%`,
                  bar: metrics.utilization,
                  color: "bg-[#a855f7]",
                },
                {
                  label: "TEMP",
                  value: `${metrics.temp}°C`,
                  bar: metrics.temp,
                  color:
                    metrics.temp > 80
                      ? "bg-red-500"
                      : metrics.temp > 74
                        ? "bg-yellow-500"
                        : "bg-[#a855f7]",
                },
                {
                  label: "PWR",
                  value: `${metrics.power}W`,
                  bar: (metrics.power / 350) * 100,
                  color: "bg-purple-400",
                },
              ].map((m) => (
                <div key={m.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                      {m.label}
                    </span>
                    <span className="text-xs font-bold font-mono text-white">
                      {m.value}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${m.color}`}
                      animate={{ width: `${m.bar}%` }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* VRAM Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                  VRAM
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {metrics.memUsed}GB / {metrics.memTotal}GB
                </span>
              </div>
              <div className="h-3 rounded-full bg-slate-800 overflow-hidden relative">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-400"
                  animate={{ width: `${memPercent}%` }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-white/70">
                    {memPercent.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Core Grid */}
            <div className="space-y-2">
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                SM Cores
              </span>
              <div className="grid grid-cols-6 gap-1">
                {coreLoads.map((load, i) => (
                  <motion.div
                    key={i}
                    className="h-6 rounded-sm relative overflow-hidden bg-slate-800"
                    title={`Core ${i}: ${load}%`}
                  >
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 rounded-sm"
                      style={{
                        background:
                          load > 90
                            ? "linear-gradient(to top, #a855f7, #c084fc)"
                            : load > 70
                              ? "linear-gradient(to top, #a855f7, #a855f7aa)"
                              : "linear-gradient(to top, #475569, #64748b)",
                      }}
                      animate={{ height: `${load}%` }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold text-white/60">
                      {load}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Extra Stats */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 border-t border-slate-700/30">
              {[
                { label: "Clock", value: `${metrics.clock} MHz` },
                { label: "Fan", value: `${metrics.fanSpeed}%` },
                { label: "PCIe", value: "Gen5 x16" },
                { label: "NVLink", value: "600 GB/s" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider">
                    {s.label}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-300">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel — Live Activity */}
          <div className="p-5 space-y-5 border-t lg:border-t-0 border-slate-700/30">
            {/* Throughput Sparkline */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                  Throughput
                </span>
                <span className="text-[11px] font-mono text-[#a855f7]">
                  {throughput[throughput.length - 1]}% peak
                </span>
              </div>
              <div className="flex items-end gap-[3px] h-16 bg-slate-800/50 rounded-lg p-2">
                {throughput.map((val, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{
                      background:
                        i === throughput.length - 1
                          ? "#a855f7"
                          : `rgba(118, 185, 0, ${0.2 + (val / 100) * 0.6})`,
                    }}
                    animate={{ height: `${val}%` }}
                    transition={{ duration: 0.5 }}
                  />
                ))}
              </div>
            </div>

            {/* GPU Processes */}
            <div className="space-y-2">
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                Active Processes
              </span>
              <div className="space-y-1">
                {processes.map((proc) => (
                  <div
                    key={proc.pid}
                    className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-800/40 text-[11px] font-mono"
                  >
                    <span className="text-slate-500 w-10">{proc.pid}</span>
                    <span className="text-cyan-400 flex-1 truncate">
                      {proc.name}
                    </span>
                    <span className="text-slate-400 w-16 text-right">
                      {proc.memMB}MB
                    </span>
                    <div className="w-12">
                      <div className="h-1 rounded-full bg-slate-700 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-[#a855f7]"
                          animate={{ width: `${proc.usage}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </div>
                    <span className="text-slate-500 w-8 text-right">
                      {proc.usage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Log */}
            <div className="space-y-2">
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                System Log
              </span>
              <div className="bg-slate-900/60 rounded-lg p-3 space-y-1 border border-slate-800/50 h-[120px] overflow-hidden">
                {statusLog.map((msg, i) => (
                  <motion.div
                    key={`${msg}-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: i === statusLog.length - 1 ? 1 : 0.5,
                      x: 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-[11px] font-mono flex gap-2"
                  >
                    <span className="text-[#a855f7] flex-shrink-0">▸</span>
                    <span className="text-slate-400 truncate">{msg}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between px-5 py-2 border-t border-slate-700/30 bg-[#0f0f1a]">
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-mono text-slate-600">
              TDP: 350W
            </span>
            <span className="text-[9px] font-mono text-slate-600">
              24GB GDDR7
            </span>
            <span className="text-[9px] font-mono text-slate-600">
              18,432 CUDA Cores
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-slate-600">ECC: OK</span>
            <div className="size-1 rounded-full bg-[#a855f7]" />
          </div>
        </div>
      </div>
    </div>
  );
}
