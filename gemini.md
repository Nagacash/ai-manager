# Project Constitution: Naga Codex

## Vision
Building a deterministic, high-performance portfolio for a Certified AI Manager. The aesthetic is **"Tech Boss from the Future"**—a blend of refined holographic depth, technical precision, and mission-critical reliability.

## B.L.A.S.T. Protocols
1. **Blueprint**: Data defines the UI. Check `translations.ts` before modifying components.
2. **Link**: All API routes must have Zod validation and structured error handling.
3. **Architect**: 3-Layer separation. `src/components` (UI), `src/app` (Navigation/Pages), `src/lib` (Logic/Data).
4. **Stylize**: opencode
    - **Typography**: `Orbitron` for high-impact display, `JetBrains Mono` for tech metadata, `Inter` for readability.
    - **Palette**: `Cyber-Dark` base (`oklch(0.04 0.012 250)`) with `Neon-Purple` and `Holographic-Cyan` accents.
    - **Motion**: High-impact staggered reveals. Stated: "Staggered reveals > scattered interactions".
5. **Trigger**: Static export with optimized assets.

## Architectural Invariants
- Use `framer-motion` for all transitions.
- Maintain `i18n` support in all new components.
- Components must be responsive down to 320px.
- No "AI Slop": Avoid generic gradients and Inter-only layouts.

## Data Schemas

### Translation Payload
```json
{
  "key": {
    "title": "string",
    "description": "string",
    "metadata": "string[]"
  }
}
```

## Maintenance Log
- 2026-02-06: Initialized System-Pilot protocol and Design Overhaul phase.
