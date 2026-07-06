# CLAUDE.md — Ease Project
# Pedro Antunes · VFS Digital Design · Vancouver Film School

This file is loaded automatically by Claude Code in VS Code. It gives Claude full context on the project, design system, code conventions, and active skills so you never have to re-explain anything.

---

## 🧠 Project Context

**Product**: Ease — a mobile support platform for caregivers of children with developmental conditions (specifically autism spectrum).
**Tagline**: *"I Know My Child."*
**Status**: Late-stage capstone project, graduating August 2026, Vancouver Film School DD64 T4.
**Live prototype**: https://ease-support-playbook.lovable.app
**GitHub**: https://github.com/pedrosixel/ease-prototype
**Figma file key**: `PAqRKK4yuoajEMLZCU4Nh7`

### Dual-user system
- **Parent flow** — Mariana Oliveira (demo). Primary accent: pink `#F3768D`
- **Caregiver flow** — Paul Smith, Educational Assistant at Maple Grove Elementary (demo). Primary accent: purple `#7B5EA7`

### Demo children
- Tyler (Age 5)
- Heitor Lima (Age 6)

### Mentor
Rob Westwood — Principal UX Designer at Autodesk, NNG certified. Async FigJam reviews + live sessions.

---

## 🎨 Design System — NON-NEGOTIABLE RULES

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Parent Pink | `#F3768D` | Parent UI accents, CTAs, highlights |
| Caregiver Purple | `#7B5EA7` | Caregiver UI accents, CTAs, highlights |
| Crisis Background | `#1A1A1A` | Crisis View ONLY — always dark |
| Pip Gradient Center | `#EB5362` | Pip mascot inner glow |
| Pip Gradient Edge | `#EF0F44` | Pip mascot outer glow |

**Hard rules:**
- Caregiver screens must **NEVER** use coral or pink
- No teal on caregiver UI
- No blush color anywhere in the system
- Pip's radial gradient (`#EB5362` center → `#EF0F44` edges) must **never** be flattened to a solid fill
- Crisis View background is **always** `#1A1A1A`

### Typography

| Role | Font |
|------|------|
| Titles & some subtitles | **Quincy CF** |
| Body & UI text | **Nunito Sans** |

**Do NOT use:** DM Serif Display, DM Sans, Inter, or any other font not listed above.

### Mascot — Pip

- Pip = parent-facing character (pink gradient, rounded, expressive)
- Mini Pip = child character (Leo in the promo video)
- Purple Star = caregiver character
- All Pip SVG expressions use the pink versions (replaced in the last design pass)
- Never flatten Pip's gradient

### Language & Accessibility

- **Always** use person-first language: "children with autism" — **never** "autistic children"
- This is non-negotiable throughout all copy, UI text, and documentation

---

## 💻 Code Conventions (Lovable / React)

### Critical layout rules
- Use `vh` for heights — **never** percentage heights (they break in Lovable's phone frame)
- Use `width: 100%; height: 100%` instead of `position: fixed` (fixed breaks the frame)
- Asset imports use `@/assets/` prefix

### Lovable prompt format (follow strictly when writing prompts)
1. Numbered steps
2. Exact hex values (never approximate)
3. Exact file names
4. Quoted copy strings
5. Closing QA checklist

### Component rules
- Crisis FAB = triangular warning shape with exclamation point — **not** a lightning bolt
- Crisis View = dark background `#1A1A1A`, 3 tactic cards, under-10-second access
- The Playbook = parent-built child profile feature
- The Circle = secure caregiver sharing feature

---

## 🛠 Active Skills

Claude Code should apply these skill frameworks automatically when relevant:

---

### SKILL: Frontend Design

Approach every UI task as a design lead making deliberate, opinionated choices — not defaults.

**Process:**
1. Ground in the subject: name the audience and page's single job before designing
2. **Plan first**: define a compact token system (color, type, layout, signature element)
3. **Self-critique**: ask "does this feel templated?" — if yes, revise before building
4. **Then build**: derive every decision from the plan

**Principles:**
- The hero is a thesis — open with the most characteristic thing
- Typography carries personality — pair faces deliberately with a clear type scale
- Structure encodes information — numbering/labels should reflect actual content structure
- Use motion deliberately — one orchestrated moment beats scattered effects
- Spend boldness in one place — let the signature element stand out, keep everything else quiet
- Build to quality floor without announcing it: responsive, keyboard accessible, reduced motion respected

**Writing in design:**
- Words are design material — bring the same intentionality as spacing/color
- Write from the user's side of the screen — name things by what people recognize, not how the system is built
- Active voice by default — "Save changes", not "Submit"
- Errors are never vague and never apologize — explain what happened and how to fix it
- Empty states are invitations to act

---

### SKILL: Design System

When auditing, documenting, or extending Ease's design system:

**Audit checklist:**
- Check for naming inconsistencies across components
- Find hardcoded hex values that should be tokens
- Verify all components have defined: variants, states (default/hover/active/disabled/loading/error), sizes
- Check accessibility: ARIA roles, keyboard nav, touch target sizes

**Document format for components:**
- Description + when to use
- Variants table (variant → use when)
- Props / Properties table
- States table (state → visual → behavior)
- Accessibility notes (role, keyboard, screen reader)
- Do's and Don'ts
- Code example

**Principles:**
- Consistency over creativity — the system eliminates reinvention
- Flexibility within constraints — components should be composable
- Document as you build — undocumented = doesn't exist
- Breaking changes need migration paths

---

### SKILL: UX Copy

When writing or reviewing copy for Ease:

**What to always consider:**
- Context: which screen/flow/feature?
- User state: what is the user trying to do, and how might they feel?
- Tone for Ease: **warm, reassuring, empowering** — caregiver-first empathy
- Language constraint: person-first language always

**Copy patterns:**
- **CTAs**: start with a verb, be specific — "Save profile" not "Submit"
- **Errors**: what happened + why + how to fix — empathetic, never vague
- **Empty states**: what this is + why empty + how to start
- **Confirmations**: describe the action and consequences — label buttons with the action itself
- **Onboarding**: progressive disclosure, one concept at a time

**Output format:**
- Recommended copy
- 2–3 alternatives with tone notes
- Rationale (why it works)
- Localization notes if relevant (Pedro works across EN/PT-BR context)

---

### SKILL: Design Critique

When reviewing Ease screens, use this framework:

1. **First impression (2 seconds)** — what draws the eye, is that correct, what's the emotional reaction?
2. **Usability** — can the user accomplish their goal, unnecessary steps, obvious interactive elements?
3. **Visual hierarchy** — reading order, emphasis, whitespace, typography hierarchy
4. **Consistency** — design system adherence, spacing/color/type consistency
5. **Accessibility** — contrast ratios, touch target sizes (44×44px min), text readability

**Feedback style:**
- Specific: "The CTA competes with the nav" not "layout is confusing"
- Explain why — connect to design principles or user needs
- Propose solutions — don't just identify problems
- Acknowledge what works
- Match the stage (exploration vs. final polish gets different feedback depth)

---

### SKILL: File Reading

When a file is uploaded and its content is NOT yet in context:

| Type | First move |
|------|-----------|
| `.pdf` | `pdfinfo` + `pdffonts` to check for text layer before extracting |
| `.docx` | `extract-text file.docx \| head -200` |
| `.xlsx` | `extract-text file.xlsx \| head -100` |
| `.pptx` | `extract-text file.pptx \| head -200` |
| `.csv` | `pd.read_csv(file, nrows=5)` — never cat blindly |
| `.json` | `jq 'type'` then drill in |
| Image | Already in context as vision input — no disk read needed |
| Archive | List contents only — never auto-extract |
| Unknown | `file` + `xxd head` to identify |

**Never** `cat` a binary. **Always** stat before reading large files.

---

### SKILL: Refactoring UI (by Adam Wathan & Steve Schoger)

Apply when building or polishing any UI component. These are tactical, concrete rules — not vague advice.

**Slash commands available after install:** `/ui-refactor`, `/fix-hierarchy`, `/fix-typography`, `/fix-layout`, `/fix-colors`

**Visual Hierarchy**
- Hierarchy is about weight and color, not just size — use font-weight and muted tones to de-emphasize secondary info
- Don't use grey text on colored backgrounds — reduce opacity or use a hue-shifted color instead
- Labels are a last resort — let the data speak; "12" next to a calendar icon needs no label
- Separate visual hierarchy from document hierarchy — an `<h2>` can visually look small

**Spacing & Layout**
- Use a defined spacing scale — never arbitrary values. Scale: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128px`
- Start with too much whitespace, then remove — dense UIs are harder to fix than airy ones
- Avoid ambiguous spacing — the space between elements should make grouping obvious
- Fill the whole width only when it makes sense — constrain content width even on wide screens

**Typography**
- Use a hand-picked type scale, not a ratio: `12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72px`
- Two font sizes are usually enough for most UIs
- Keep line length between 45–75 characters for body text
- Use font-weight `400` and `700` — avoid weights in between unless the typeface is designed for it
- Align text consistently — mixed alignments look accidental

**Color (HSL system)**
- Define colors in HSL — it's the only model where you can intuitively adjust lightness and saturation
- Every color needs at least 8–9 shades (100–900). Lighter shades: high lightness + lower saturation. Darker shades: lower lightness + higher saturation
- Rotate hue slightly for darker shades (towards blue) and lighter shades (towards yellow) to keep them feeling natural
- Use saturation to communicate state — disabled = desaturated, active = full saturation
- For Ease: pink `#F3768D` and purple `#7B5EA7` are the base tokens; derive tints/shades from them

**Shadows & Depth (Elevation system)**
- Define shadow levels: `xs` (tight), `sm`, `md`, `lg`, `xl` — never use arbitrary box-shadow values
- Shadows have two parts: ambient (large, blurry, low opacity) + direct (small, sharp, higher opacity)
- Light interfaces use dark shadows; dark interfaces use colored or no shadows
- Don't use shadows to decorate — use them to imply elevation and interaction state

**Polish anti-patterns to avoid:**
- No arbitrary spacing values — always use the scale
- No ratio-based type scales (modular scale) — they produce awkward intermediate sizes
- No fully desaturated greys — always give them a slight hue tint
- No decorative borders where whitespace can do the same job

---

### SKILL: Emil Kowalski — Design Engineering

Apply when building interactive components, animations, or anything that needs to "feel right." Based on Emil Kowalski's design engineering philosophy (emilkowal.ski). Covers the invisible details that compound into interfaces people love.

**Slash command available after install:** `/emil-design-eng`
**Use on a case-by-case basis** — not always-on. Best for animation reviews and interaction polish.

**Animation principles**
- Animation should have a purpose: feedback, continuity, or delight — never decoration
- Duration rule: micro-interactions `100–200ms`, transitions `200–400ms`, complex sequences `400–600ms`
- Easing: use `cubic-bezier` curves, not linear. Entries ease out (fast start, slow end). Exits ease in (slow start, fast end)
- Custom curves beat CSS defaults — `ease-in-out` is a compromise, not a choice
- Performance: animate only `transform` and `opacity` — avoid animating layout properties (`width`, `height`, `padding`, `margin`)
- Respect `prefers-reduced-motion` — provide a no-animation fallback

**Specific interaction patterns**
- **Button press**: scale down slightly on press (`scale(0.97)`), spring back on release — not just a color change
- **Popovers/tooltips**: animate from the trigger's origin point, not from a fixed direction
- **Tooltip delays**: 300–500ms delay before showing, instant hide — prevents tooltip flicker
- **Modals**: fade + slight scale up on enter, reverse on exit — not just opacity
- **Drag**: add momentum and boundary damping — elements should feel physical, not locked to cursor
- **Blur masking**: use backdrop-filter or gradient masks to indicate scrollable content
- **Clip-path reveals**: use for dramatic enter animations, clip from a meaningful edge

**Component craft details**
- Inputs: focus ring should be visible and branded — not browser default
- Loading states: skeleton screens beat spinners for content — spinners for actions
- Empty states: illustrate with Pip! An empty state is a brand moment for Ease
- Error states: red is overused — use warm amber for warnings, reserve red for destructive actions
- Transitions between states should be continuous, not abrupt — morph, don't replace

**For Ease specifically:**
- Crisis View transition: fast, purposeful animation (under 200ms) — urgency demands speed
- Pip expressions: animate with spring physics, not linear — Pip should feel alive
- Card interactions: subtle lift on hover (`translateY(-2px)` + shadow increase)
- Tab/flow switching between parent ↔ caregiver: use a directional slide that implies separate spaces

---

### SKILL: iOS HIG Design (Apple Human Interface Guidelines)

Apply when designing or reviewing Ease's mobile interface. Ease is a mobile-first app — HIG compliance makes it feel native and trustworthy.

**Core Apple design principles: Clarity, Deference, Depth**
- **Clarity**: text is legible, icons are precise, UI is focused on the task
- **Deference**: UI steps back so the user's content is front and center
- **Depth**: visual layers and motion communicate hierarchy

**Safe areas & layout**
- Always respect safe areas — never place interactive elements behind the notch, Dynamic Island, or home indicator
- Use `safeAreaInsets` — content should breathe within the safe zone
- Bottom navigation/tab bars must sit above the home indicator
- Touch targets minimum `44×44pt` — this is an Apple requirement, not a suggestion

**Navigation patterns**
- Use `NavigationStack` patterns (push/pop) for hierarchical flows — parent → child
- Use `TabView`/tab bars for switching between peer-level sections
- Modals (sheets) for focused tasks that don't need full navigation
- No hamburger menus on iOS — they're a web pattern, not native
- No floating action buttons (FABs) in the Android sense — use toolbar buttons or inline CTAs

**Typography — Dynamic Type**
- Support Dynamic Type — users set their preferred text size in iOS settings
- Use semantic text styles: `.largeTitle`, `.title`, `.headline`, `.body`, `.caption`
- Never hardcode font sizes in a way that ignores user preferences
- Minimum readable body size: 17pt at default scale

**Dark Mode**
- Use semantic colors (`.label`, `.secondaryLabel`, `.systemBackground`) that adapt automatically
- For Ease's custom colors: provide both light and dark variants for pink `#F3768D` and purple `#7B5EA7`
- Crisis View (`#1A1A1A`) already dark — verify text contrast in both modes

**SF Symbols**
- Prefer SF Symbols for all icons — they scale with Dynamic Type automatically
- Use filled variants for selected states, outline for unselected
- Don't mix SF Symbols with custom icons unless the custom icon has no SF equivalent

**Accessibility (VoiceOver)**
- All interactive elements need `accessibilityLabel`
- Images need `accessibilityDescription` or mark as decorative
- Custom gestures must have an alternative standard interaction
- Pip mascot images: mark as decorative unless they convey information

**HIG violations to avoid in Ease:**
- No custom back button — use the system chevron
- No bottom sheet that doesn't use spring animation on dismiss
- No full-screen modals for simple choices — use action sheets or alerts
- No more than 5 items in a tab bar
- Crisis View: high contrast is critical — verify AA/AAA compliance on `#1A1A1A`

---

## 📦 Terminal Install Commands

Run these in your project root to get slash commands in Claude Code:

```bash
# Refactoring UI — tactical design rules + slash commands
npx skills add https://github.com/LovroPodobnik/refactoring-ui-skill --skill ui-refactor

# Emil Kowalski — design engineering + animation principles
npx skills add emilkowalski/skill

# iOS HIG — Apple Human Interface Guidelines (use rshankras collection)
git clone https://github.com/rshankras/claude-code-apple-skills.git
cp -r claude-code-apple-skills/skills/ios .claude/skills/
```

After install, you'll have slash commands like:
- `/ui-refactor` — rebuild any UI with Refactoring UI principles
- `/fix-hierarchy`, `/fix-typography`, `/fix-layout`, `/fix-colors` — targeted fixes
- `/emil-design-eng` — animation + interaction review

---

## 📁 Project Structure Notes

- Prototype built in **Lovable** (React + Tailwind)
- Local VS Code environment at `/Users/pedrosixel/Desktop/DD 64 - VFS/T4/`
- AI agent knowledge base: `/Users/pedrosixel/Desktop/DD 64 - VFS/T4/Ease-ai-system` (18 files)
- Asset imports always via `@/assets/`

---

## 🎓 Academic Context

- Graduating August 2026 — portfolio quality standards apply to all deliverables
- Capstone deliverables include: promo video (75–90s, illustrated motion style), Figma prototype (35+ screens), case study, brand campaign
- Promo video characters: Pip (parent Maya), Mini Pip (child Leo), Purple Star (caregiver)
- Video export: 1920×1080 for graduation, 1080×1920 for Instagram

---

## ✅ Quick Reference Checklist

Before shipping any Ease screen or component:
- [ ] Correct font? (Quincy CF titles, Nunito Sans body)
- [ ] Correct accent color for the user flow? (Pink = parent, Purple = caregiver)
- [ ] No pink/coral on caregiver screens?
- [ ] Heights use `vh`, not `%`?
- [ ] No `position: fixed`?
- [ ] Assets imported via `@/assets/`?
- [ ] Person-first language throughout?
- [ ] Pip gradient NOT flattened?
- [ ] Crisis FAB = triangle + exclamation (not lightning bolt)?
- [ ] Crisis View background = `#1A1A1A`?
