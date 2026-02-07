"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface TerminalLine {
  type: "prompt" | "output" | "error" | "success" | "info" | "blank";
  text: string;
}

const COMMANDS: { cmd: string; output: TerminalLine[] }[] = [
  {
    cmd: "neofetch",
    output: [
      { type: "info", text: "  ╔══════════════════════════════╗" },
      { type: "info", text: "  ║   NAGA CODEX v3.7.1         ║" },
      { type: "info", text: "  ╚══════════════════════════════╝" },
      { type: "output", text: "  OS:      NagaOS 3.7 Neural" },
      { type: "output", text: "  Kernel:  6.8.0-quantum-amd64" },
      { type: "output", text: "  Shell:   nsh 2.1.0" },
      { type: "output", text: "  CPU:     Quantum Core x128 @ 4.2THz" },
      { type: "output", text: "  GPU:     Neural RTX 9090 Ti (48GB)" },
      { type: "output", text: "  Memory:  256GB / 512GB (49%)" },
      { type: "output", text: "  Uptime:  847d 13h 22m" },
    ],
  },
  {
    cmd: "naga-scan --network --deep",
    output: [
      { type: "output", text: "Scanning network interfaces..." },
      { type: "output", text: "  eth0:    192.168.1.42  [ACTIVE]" },
      { type: "output", text: "  wlan0:   10.0.0.17     [ACTIVE]" },
      { type: "output", text: "  tun0:    172.16.0.1    [VPN-ENCRYPTED]" },
      { type: "success", text: "✓ 3 interfaces scanned. No anomalies detected." },
      { type: "output", text: "Firewall status: ACTIVE (2,847 rules loaded)" },
      { type: "success", text: "✓ Network integrity: SECURE" },
    ],
  },
  {
    cmd: "gpu-status --ai-cluster",
    output: [
      { type: "output", text: "AI Compute Cluster Status:" },
      { type: "output", text: "  Node-0:  ██████████████████░░  89%  72°C" },
      { type: "output", text: "  Node-1:  ████████████████████  97%  78°C" },
      { type: "output", text: "  Node-2:  ██████████░░░░░░░░░░  52%  61°C" },
      { type: "output", text: "  Node-3:  ████████████████░░░░  81%  69°C" },
      { type: "success", text: "✓ VRAM Pool: 184GB / 192GB allocated" },
      { type: "output", text: "  Active models: GPT-4o, Codex-v3, Whisper-L" },
    ],
  },
  {
    cmd: "python3 train.py --model naga-llm --epochs 100 --lr 3e-4",
    output: [
      { type: "output", text: "Loading dataset: naga-corpus-v2 (2.4TB)..." },
      { type: "output", text: "Tokenizer: BPE-64k initialized" },
      { type: "output", text: "Epoch  1/100  loss=4.2831  lr=3.0e-4  ⏱ 12m 34s" },
      { type: "output", text: "Epoch  2/100  loss=3.9147  lr=2.9e-4  ⏱ 12m 28s" },
      { type: "output", text: "Epoch  3/100  loss=3.6024  lr=2.8e-4  ⏱ 12m 31s" },
      { type: "success", text: "✓ Checkpoint saved: ./checkpoints/naga-llm-ep3.pt" },
      { type: "info", text: "  Training in progress... (ETA: ~19h 42m)" },
    ],
  },
  {
    cmd: "nmap -sV -O 10.0.0.0/24 --script vuln",
    output: [
      { type: "output", text: "Starting Nmap 7.94 at 2026-02-07 14:32 CET" },
      { type: "output", text: "Scanning 254 hosts on subnet 10.0.0.0/24..." },
      { type: "output", text: "  10.0.0.1    router    OpenWrt 23.05    22/tcp,80/tcp" },
      { type: "output", text: "  10.0.0.5    server    Ubuntu 24.04     22,443,8080" },
      { type: "output", text: "  10.0.0.17   workst    NagaOS 3.7       22,3000,5432" },
      { type: "output", text: "  10.0.0.23   iot-hub   RTOS 4.1         80,1883" },
      { type: "success", text: "✓ 4 hosts up, 0 critical vulnerabilities found" },
    ],
  },
  {
    cmd: "docker ps --format 'table {{.Names}}\\t{{.Status}}\\t{{.Ports}}'",
    output: [
      { type: "output", text: "NAMES             STATUS          PORTS" },
      { type: "output", text: "naga-api          Up 12 days      0.0.0.0:3000->3000" },
      { type: "output", text: "naga-db           Up 12 days      5432/tcp" },
      { type: "output", text: "redis-cache       Up 12 days      6379/tcp" },
      { type: "output", text: "vector-store      Up 5 days       6333/tcp" },
      { type: "output", text: "model-server      Up 2 days       8080/tcp" },
      { type: "success", text: "✓ 5 containers running, 0 restarting" },
    ],
  },
  {
    cmd: "git log --oneline -5",
    output: [
      { type: "output", text: "a3f8c21 feat: add RAG pipeline with vector search" },
      { type: "output", text: "e7b1d04 fix: resolve CORS issue on /api/chat" },
      { type: "output", text: "9c2a6f8 perf: optimize embedding batch inference" },
      { type: "output", text: "1d4e7b3 feat: implement JWT auth middleware" },
      { type: "output", text: "b8f2c91 chore: update dependencies, patch CVE-2026-1847" },
    ],
  },
  {
    cmd: "curl -s https://api.naga-codex.ai/health | jq",
    output: [
      { type: "output", text: "{" },
      { type: "success", text: '  "status": "operational",' },
      { type: "output", text: '  "version": "3.7.1",' },
      { type: "output", text: '  "uptime": "847d 13h 22m",' },
      { type: "output", text: '  "models_loaded": 3,' },
      { type: "output", text: '  "requests_today": 12847,' },
      { type: "output", text: '  "avg_latency_ms": 42' },
      { type: "output", text: "}" },
    ],
  },
];

const PROMPT = "naga@codex:~$";

const HackerTerminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "info", text: "NagaOS 3.7.1 LTS (GNU/Linux 6.8.0-quantum-amd64)" },
    { type: "blank", text: "" },
    { type: "output", text: "Last login: Fri Feb  6 09:14:22 2026 from 192.168.1.42" },
    { type: "blank", text: "" },
  ]);
  const [currentTyping, setCurrentTyping] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const commandIndexRef = useRef(0);
  const mountedRef = useRef(true);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const typeCommand = useCallback(
    (cmd: string): Promise<void> => {
      return new Promise((resolve) => {
        let i = 0;
        setIsTyping(true);
        setCurrentTyping("");

        const tick = () => {
          if (!mountedRef.current) return;
          if (i < cmd.length) {
            setCurrentTyping(cmd.slice(0, i + 1));
            i++;
            const delay = Math.random() * 60 + 30;
            setTimeout(tick, delay);
          } else {
            setIsTyping(false);
            setCurrentTyping("");
            resolve();
          }
        };
        setTimeout(tick, 400);
      });
    },
    [],
  );

  const printOutput = useCallback(
    (outputLines: TerminalLine[]): Promise<void> => {
      return new Promise((resolve) => {
        let i = 0;
        const printNext = () => {
          if (!mountedRef.current) return;
          if (i < outputLines.length) {
            const currentLine = outputLines[i];
            setLines((prev) => [...prev, currentLine]);
            i++;
            const delay = Math.random() * 80 + 40;
            setTimeout(printNext, delay);
          } else {
            resolve();
          }
        };
        setTimeout(printNext, 200);
      });
    },
    [],
  );

  const runSequence = useCallback(async () => {
    while (mountedRef.current) {
      const cmdObj = COMMANDS[commandIndexRef.current % COMMANDS.length];
      commandIndexRef.current++;

      setLines((prev) => [...prev, { type: "blank", text: "" }]);

      await typeCommand(cmdObj.cmd);

      setLines((prev) => [
        ...prev,
        { type: "prompt", text: `${PROMPT} ${cmdObj.cmd}` },
      ]);

      await printOutput(cmdObj.output);

      if (commandIndexRef.current % COMMANDS.length === 0) {
        await new Promise((r) => setTimeout(r, 2000));
        setLines([
          { type: "prompt", text: `${PROMPT} clear` },
          { type: "blank", text: "" },
        ]);
        await new Promise((r) => setTimeout(r, 500));
      } else {
        await new Promise((r) => setTimeout(r, 1500));
      }
    }
  }, [typeCommand, printOutput]);

  useEffect(() => {
    const timeout = setTimeout(runSequence, 800);
    return () => clearTimeout(timeout);
  }, [runSequence]);

  useEffect(() => {
    scrollToBottom();
  }, [lines, currentTyping, scrollToBottom]);

  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "prompt":
        return "";
      case "error":
        return "text-red-400";
      case "success":
        return "text-purple-300";
      case "info":
        return "text-purple-400";
      default:
        return "text-slate-300";
    }
  };

  return (
    <div
      ref={scrollRef}
      className="absolute inset-0 overflow-y-auto overflow-x-hidden p-4 md:p-5 font-mono text-[11px] md:text-[13px] leading-[1.7] z-20 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
    >
      {lines.map((line, i) => {
        if (!line) return null;
        return (
        <div key={i} className={`whitespace-pre-wrap break-all ${getLineColor(line.type)}`}>
          {line.type === "prompt" ? (
            <>
              <span className="text-purple-400 font-bold">naga@codex</span>
              <span className="text-slate-500">:</span>
              <span className="text-purple-300 font-bold">~</span>
              <span className="text-slate-500">$ </span>
              <span className="text-slate-200">
                {line.text.replace(`${PROMPT} `, "")}
              </span>
            </>
          ) : line.type === "blank" ? (
            "\u00A0"
          ) : (
            line.text
          )}
        </div>
        );
      })}

      {/* Active typing line */}
      <div className="whitespace-pre-wrap break-all">
        <span className="text-purple-400 font-bold">naga@codex</span>
        <span className="text-slate-500">:</span>
        <span className="text-purple-300 font-bold">~</span>
        <span className="text-slate-500">$ </span>
        <span className="text-slate-200">{currentTyping}</span>
        <span
          className={`inline-block w-[7px] h-[15px] md:h-[17px] ml-px align-middle ${
            showCursor ? "bg-purple-400" : "bg-transparent"
          } transition-colors duration-100`}
        />
      </div>
    </div>
  );
};

export default HackerTerminal;
