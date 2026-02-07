"use client";

import { useEffect, useRef } from "react";

const CodeParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particles: HTMLDivElement[] = [];

    const codeSnippets = [
      // AI & Machine Learning
      "const ai = new Intelligence()",
      "neural.net.train()",
      "GPT-4.generate()",
      "model.fit(X, y)",
      "llm.prompt_engineering",
      "vector.embedding()",
      "agent.autonomous = true",
      "transformer.attention()",
      "torch.cuda.init()",
      "gradio.launch()",
      "mcp.server.connect()",
      "rag.retrieval()",
      // Web Design & Frontend
      "React.useState(magic)",
      "Next.js.render()",
      "Tailwind.apply()",
      "framer-motion.animate()",
      "component.hydrate()",
      "UI.UX.perfection",
      "responsive.design = true",
      "glassmorphism.css",
      "shadcn.ui.mount()",
      "seo.optimize()",
      "Three.js.scene()",
      "canvas.draw()",
      // Full Stack & Backend
      "API.rest.endpoint",
      "database.query()",
      "serverless.deploy()",
      "edge.function.run()",
      "webhook.trigger()",
      "auth.jwt.verify()",
      "cache.hit()",
      "websocket.emit()",
      // Cybersecurity (balanced amount)
      "encrypt.aes256()",
      "firewall.rules.update()",
      "vulnerability.scan()",
      "pentest.authorized",
      "compliance.gdpr = true",
      "zero.trust.arch",
      // Creative & Business
      "brand.identity.craft()",
      "conversion.optimize()",
      "analytics.track()",
      "ci_cd.pipeline()",
      'git.commit -m "ship"',
    ];

    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "code-particle";
      particle.textContent =
        codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      particle.style.left = `${Math.random() * window.innerWidth}px`;
      particle.style.top = `${Math.random() * window.innerHeight}px`;
      particle.style.setProperty(
        "--random-x",
        `${(Math.random() - 0.5) * 200}px`,
      );
      particle.style.setProperty(
        "--random-y",
        `${(Math.random() - 0.5) * 200}px`,
      );
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

    // Create particles periodically - LESS FREQUENT
    const interval = setInterval(createParticle, 1200);

    // Create initial particles - FEWER
    for (let i = 0; i < 5; i++) {
      setTimeout(createParticle, i * 200);
    }

    return () => {
      clearInterval(interval);
      particles.forEach((particle) => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return <div ref={containerRef} />;
};

export default CodeParticles;
