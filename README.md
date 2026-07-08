# Ease — Interactive Prototype

**Pedro Sixel · DD64 T4 · Vancouver Film School · 2026**

Ease is a mobile support platform for caregivers of children with autism. A parent builds a **Playbook** for their child — triggers, calming tactics, what to avoid — and shares it with the child's care network. In a difficult moment, **Crisis View** puts the parent's own guidance in any caregiver's hand in under 10 seconds, and post-crisis logs flow back to the parent as insights.

**Live version (no setup needed):** https://ease-support-playbook.lovable.app

---

## Run it locally

Requires [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm run dev
```

Then open **http://localhost:8080**. The app renders inside a simulated iPhone frame; on a real phone it runs full-screen. No login is required — the sign-up form accepts anything.

**Demo controls:** *Settings → Reset demo* restarts onboarding; *Settings → Screen Index* jumps directly to any screen.

## Suggested walkthrough

1. **Parent onboarding** — Sign Up → accept terms → "I'm a parent" → build Tyler's Playbook.
2. **Parent Home** — Profile / Insights / Emergency tabs, then **Caregivers** (invite via QR/link).
3. **Crisis** — bottom-nav **Help** → three tactics → **Add Log** → save.
4. **Caregiver world** — Reset demo → "I'm a caregiver" → bio → connect → **My List** → Check In → Bridge → Playbook → crisis → **Share with Mariana**.
5. **The loop** — back on the parent Home, the Insights tab shows a badge: the caregiver's insight arrived.

## Project structure

| Path | Purpose |
|---|---|
| `src/ease/screens/` | One React component per app screen |
| `src/ease/state.tsx` | Navigation, demo data, and the Playbook model |
| `src/ease/EaseApp.tsx` | Router and screen transitions |
| `src/ease/PhoneFrame.tsx` | The simulated iPhone frame |
| `src/ease/primitives.tsx` | Shared UI components |
| `src/assets/` | Pip & Fip illustrations, logos, demo photos |

**Stack:** React 18 · TypeScript · Tailwind CSS · Vite.
