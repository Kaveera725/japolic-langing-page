# Japolic Design System Specification

**Document Version:** 1.0  
**Design Concept:** Early Computing × Modern Infrastructure  
**Aesthetic Profile:** Classic · Warm · Technical · Trustworthy · Confident · Polished  
**Target Path:** `/docs/design-system.md`  

---

## 1. Design Concept & Philosophy

The Japolic design system unites the deliberate craft and physical permanence of **early computing documentation** (DEC manuals, Bell Labs technical papers, Braun instrument panels) with the razor-sharp precision of **modern high-performance cloud infrastructure**.

### The Aesthetic Tension
- **Early Computing Heritage:** Warm ivory papers, deep charcoal ink, disciplined editorial serif display type, tactile borders, ruled section dividers, monospace metadata, and industrial olive/sage indicator accents.
- **Modern Infrastructure Performance:** Crisp vector schematics, 1200px responsive grid, zero-overhead layout primitives, high-contrast monospace code blocks, and microsecond-level telemetry aesthetics.

### Visual Guardrails (Strict Exclusions)
- ❌ **No neon or synthetic gradients:** No electric cyan, magenta, or violet glows.
- ❌ **No generic purple AI styling:** Avoid the ubiquitous 2024 AI SaaS aesthetic.
- ❌ **No excessive glassmorphism:** No milky frosted backdrops or blurred translucent blobs.
- ❌ **No hyper-rounded bubbly containers:** Radii are disciplined (0px to 6px maximum). Cards are structural and architectural, not pillowy.
- ❌ **No floating drop shadows:** Elevation is articulated through 1px calibrated hairline borders, subtle tint shifts, and crisp inner bevels.

---

## 2. Token Architecture & CSS Custom Properties

```css
:root {
  /* ==========================================================================
     1. COLOR TOKENS
     ========================================================================== */

  /* Base Canvas & Paper Surfaces */
  --color-canvas-base:        #F6F4EE; /* Warm archival ivory / unbleached technical paper */
  --color-canvas-subtle:      #EFECE4; /* Slightly deeper tone for inset panels & table headers */
  --color-canvas-elevated:    #FCFAF6; /* Elevated card surface in light mode */
  --color-canvas-sunken:      #E5E0D5; /* Sunken wells, keyboard caps, track boundaries */

  /* Dark / Terminal / Inverse Surfaces (Hero, Code, Terminal, Footer) */
  --color-canvas-dark:        #161513; /* Deep technical charcoal (warm undertone, not blue) */
  --color-canvas-dark-card:   #1E1C19; /* Elevated dark card surface */
  --color-canvas-dark-subtle: #272420; /* Dark borders and subtle nested panels */

  /* Typography / Text Colors (Light Contexts) */
  --color-text-primary:       #181715; /* Dense charcoal black (high legibility) */
  --color-text-secondary:     #4D4842; /* Sub-copy and secondary labels */
  --color-text-tertiary:      #787268; /* Metadata, timestamps, captions */
  --color-text-muted:         #A49E93; /* Disabled states and subtle dividers */

  /* Typography / Text Colors (Dark / Terminal Contexts) */
  --color-text-inverse:       #F7F5F0; /* High contrast light text on dark charcoal */
  --color-text-inverse-sub:   #B8B2A6; /* Secondary copy on dark surfaces */
  --color-text-inverse-mute:  #706B62; /* Terminal comments and dim metadata */

  /* Technical Accent Palette (Early Computing Instrument Indicators) */
  --color-accent-olive:       #3F5744; /* Primary indicator green / Bell Labs olive */
  --color-accent-olive-light: #526F58; /* Hover state for olive interactive elements */
  --color-accent-olive-dim:   #253328; /* Deep olive for dark container accents */
  --color-accent-olive-wash:  #E8ECE7; /* Soft 10% tint for light badge backgrounds */

  /* Secondary Utilitarian Accents (Strictly limited to status indicators) */
  --color-status-amber:       #A36A26; /* Warning, telemetry cache misses, pending mounts */
  --color-status-amber-wash:  #F7F0E4; /* Amber badge fill */
  --color-status-rust:        #8C382A; /* Error, packet drop, disk fault */
  --color-status-rust-wash:   #F9ECE9; /* Red/rust badge fill */

  /* 1px Hairline Borders */
  --color-border-light:       #DDD7CB; /* Standard hairline border on light canvas */
  --color-border-strong:      #BDB5A4; /* Emphasized boundaries and form inputs */
  --color-border-dark:        #2C2925; /* Hairline border on charcoal canvas */
  --color-border-dark-subtle: #22201D; /* Low-contrast inner lines in dark modules */

  /* ==========================================================================
     2. TYPOGRAPHY TOKENS
     ========================================================================== */

  /* Font Families */
  --font-display:             "Newsreader", "Besley", "Iowan Old Style", Georgia, serif;
  --font-sans:                "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono:                "IBM Plex Mono", "SF Mono", "Consolas", "Liberation Mono", monospace;

  /* Font Weights */
  --font-weight-regular:      400;
  --font-weight-medium:       500;
  --font-weight-semibold:     600;
  --font-weight-bold:         700;

  /* Line Heights */
  --leading-tight:            1.15; /* Large display headings */
  --leading-snug:             1.3;  /* Subheadings and card titles */
  --leading-normal:           1.55; /* Body copy and technical descriptions */
  --leading-loose:            1.7;  /* Longform reading and code blocks */

  /* Letter Spacing */
  --tracking-tighter:        -0.035em;
  --tracking-tight:          -0.015em;
  --tracking-normal:          0.000em;
  --tracking-wide:            0.040em; /* Section kickers and monospace badges */
  --tracking-wider:           0.080em; /* Uppercase technical labels */

  /* Modular Scale (1.250 — Major Third) */
  --text-2xs:                 0.6875rem; /* 11px — Terminal micro-metrics */
  --text-xs:                  0.75rem;   /* 12px — Badges, table meta, status pills */
  --text-sm:                  0.875rem;  /* 14px — Captions, secondary labels, mono code */
  --text-base:                1.00rem;   /* 16px — Standard body text */
  --text-md:                  1.125rem;  /* 18px — Lead paragraphs, card titles */
  --text-lg:                  1.375rem;  /* 22px — Subheadings, feature titles */
  --text-xl:                  1.75rem;   /* 28px — Section headings (H2) */
  --text-2xl:                 2.25rem;   /* 36px — Major section title */
  --text-3xl:                 3.125rem;  /* 50px — Hero title on desktop */
  --text-4xl:                 3.75rem;   /* 60px — Display numerals and hero metrics */

  /* ==========================================================================
     3. SPACING SCALE (8-Point Fixed System)
     ========================================================================== */
  --space-1:                  0.125rem;  /* 2px */
  --space-2:                  0.25rem;   /* 4px */
  --space-3:                  0.50rem;   /* 8px */
  --space-4:                  0.75rem;   /* 12px */
  --space-5:                  1.00rem;   /* 16px */
  --space-6:                  1.50rem;   /* 24px */
  --space-7:                  2.00rem;   /* 32px */
  --space-8:                  3.00rem;   /* 48px */
  --space-9:                  4.00rem;   /* 64px */
  --space-10:                 5.00rem;   /* 80px */
  --space-11:                 6.50rem;   /* 104px */
  --space-12:                 8.00rem;   /* 128px */

  /* ==========================================================================
     4. CONTAINER WIDTHS
     ========================================================================== */
  --container-max:            1200px;
  --container-readable:       720px;
  --container-narrow:         960px;
  --gutter-desktop:           2.5rem;    /* 40px */
  --gutter-mobile:            1.25rem;   /* 20px */

  /* ==========================================================================
     5. BORDER SYSTEM
     ========================================================================== */
  --border-width-hairline:    1px;
  --border-width-focus:       2px;
  --border-style-solid:       solid;
  --border-style-dashed:      dashed;

  /* Standard Border Compositions */
  --border-standard:          var(--border-width-hairline) solid var(--color-border-light);
  --border-strong:            var(--border-width-hairline) solid var(--color-border-strong);
  --border-dark-mode:         var(--border-width-hairline) solid var(--color-border-dark);
  --border-ruled-divider:     1px solid rgba(0, 0, 0, 0.08);

  /* ==========================================================================
     6. RADIUS SYSTEM (Disciplined & Architectural)
     ========================================================================== */
  --radius-none:              0px;       /* Terminal blocks, technical rules, tables */
  --radius-xs:                2px;       /* Badges, inline code snippets, data cells */
  --radius-sm:                3px;       /* Input fields, small buttons, status pills */
  --radius-md:                5px;       /* Cards, terminal window framing */
  --radius-pill:              9999px;    /* Strictly for status dot indicators */

  /* ==========================================================================
     7. SHADOW SYSTEM (Subtle & Restrained)
     ========================================================================== */
  --shadow-none:              none;
  /* Architectural 1px Elevation Shadows */
  --shadow-sm:                0 1px 2px rgba(24, 23, 21, 0.04);
  --shadow-card:              0 1px 3px rgba(24, 23, 21, 0.05), 0 4px 12px rgba(24, 23, 21, 0.02);
  --shadow-terminal:          0 12px 32px -8px rgba(10, 9, 8, 0.35);
  /* Inset Well for Inputs & Counters */
  --shadow-inset:             inset 0 1px 2px rgba(0, 0, 0, 0.04);

  /* ==========================================================================
     8. TRANSITION TOKENS
     ========================================================================== */
  --ease-mechanical:          cubic-bezier(0.16, 1, 0.3, 1); /* Instant snap-in with smooth stop */
  --duration-fast:            120ms;
  --duration-normal:          200ms;
  --duration-slow:            350ms;
}
```

---

## 3. Responsive Breakpoint Specification

| Breakpoint Token | Viewport Width | Columns | Gutter | Margin | Target Devices |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `--bp-mobile` | `< 640px` | 4 | `16px` | `20px` | Mobile handsets (iPhone, Pixel) |
| `--bp-tablet` | `640px – 1023px` | 8 | `24px` | `32px` | Tablets, foldables, vertical splits |
| `--bp-desktop` | `1024px – 1279px` | 12 | `32px` | `40px` | Laptops, medium desktop monitors |
| `--bp-wide` | `≥ 1280px` | 12 | `32px` | `auto (max 1200px)` | High-resolution displays |

---

## 4. Typography System & Type Scale Application

### 4.1 Type Pairing Logic
1. **The Display Voice (`--font-display` — Newsreader Serif):**
   - Imparts academic permanence, editorial authority, and architectural weight.
   - Applied to the **Hero Headline**, **Major Section Titles (H2)**, and **Key Pull Quotes**.
   - Style: High x-height, precise serifs, natural optical weight without dramatic flair.
2. **The Structural Body (`--font-sans` — IBM Plex Sans):**
   - Engineered by IBM for clear technical documentation and enterprise software.
   - Applied to **subheadings**, **card descriptions**, **navigation items**, and **interactive controls**.
   - Characteristics: Neutral, crisp ink traps, high legibility across dense paragraphs.
3. **The Metadata Voice (`--font-mono` — IBM Plex Mono):**
   - Carries the industrial heritage of punch cards and line printers.
   - Applied to **version tags**, **terminal lines**, **protocol indicators**, **table metrics**, and **section kickers**.

### 4.2 Type Roles & CSS Specifications

```css
/* Hero Display Heading (H1) */
.type-display-hero {
  font-family: var(--font-display);
  font-size: clamp(2.35rem, 5vw, 3.5rem);
  font-weight: 500;
  line-height: 1.12;
  letter-spacing: -0.025em;
  color: var(--color-text-inverse);
}

/* Section Heading (H2) */
.type-heading-section {
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 3.5vw, 2.35rem);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
}

/* Card & Module Heading (H3) */
.type-heading-card {
  font-family: var(--font-sans);
  font-size: var(--text-md);
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.01em;
  color: var(--color-text-primary);
}

/* Section Kicker / Overline (Monospace) */
.type-kicker {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--color-accent-olive);
}

/* Lead Subtitle */
.type-lead {
  font-family: var(--font-sans);
  font-size: var(--text-md);
  font-weight: 400;
  line-height: var(--leading-normal);
  color: var(--color-text-secondary);
}

/* Standard Body Copy */
.type-body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 400;
  line-height: var(--leading-normal);
  color: var(--color-text-secondary);
}

/* Technical Specification / Mono Data */
.type-mono-sm {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: 400;
  line-height: var(--leading-snug);
  letter-spacing: -0.01em;
}
```

---

## 5. UI Component Specifications

### 5.1 Button System
Buttons follow physical instrument panel switches: structured, restrained, and tactile.

```css
/* Base Button Primitive */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: 0.01em;
  padding: 0.625rem 1.125rem;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  text-decoration: none;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-mechanical);
  white-space: nowrap;
}

/* Primary Button (Muted Olive / Instrument Green) */
.btn-primary {
  background-color: var(--color-accent-olive);
  border-color: #2F4233;
  color: #FFFFFF;
  box-shadow: 0 1px 2px rgba(22, 21, 19, 0.12);
}
.btn-primary:hover {
  background-color: var(--color-accent-olive-light);
  border-color: var(--color-accent-olive);
}
.btn-primary:active {
  background-color: var(--color-accent-olive-dim);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Secondary Button (Outlined / Archival Paper) */
.btn-secondary {
  background-color: transparent;
  border-color: var(--color-border-strong);
  color: var(--color-text-primary);
}
.btn-secondary:hover {
  background-color: var(--color-canvas-subtle);
  border-color: var(--color-text-secondary);
}

/* Dark Mode Action Button (Inside Hero & Dark Terminal) */
.btn-inverse-outline {
  background-color: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.18);
  color: var(--color-text-inverse);
}
.btn-inverse-outline:hover {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.35);
}
```

---

### 5.2 Navigation System
A calm, uncrowded horizontal masthead anchoring the top of the interface.

- **Height:** `64px` desktop / `56px` mobile.
- **Surface:** Translucent warm ivory with a 1px border (`backdrop-filter: blur(8px); background: rgba(246, 244, 238, 0.94); border-bottom: 1px solid var(--color-border-light);`).
- **Wordmark:** Logotype set in `IBM Plex Sans` (SemiBold, 17px) paired with a monospace version pill:
  ```html
  <a href="/" class="nav-brand">
    <span class="brand-name">Japolic</span>
    <span class="brand-pill">v0.9</span>
  </a>
  ```
- **Navigation Links:** `14px`, Medium 500, `#4D4842`. Subtle underline indicator upon `:hover`.
- **Right Cluster:** Minimalist documentation link + `Request Access` button.

---

### 5.3 Cards & Container System
Cards are structural containers with 1px architectural hairline borders. No rounded corners beyond `4px`.

```css
/* Standard Feature Card (Light Canvas) */
.card-feature {
  background-color: var(--color-canvas-elevated);
  border: var(--border-standard);
  border-radius: var(--radius-sm);
  padding: var(--space-7);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: var(--shadow-sm);
  transition: border-color var(--duration-normal) var(--ease-mechanical),
              box-shadow var(--duration-normal) var(--ease-mechanical);
}

.card-feature:hover {
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-card);
}

/* Card Header Metadata */
.card-header-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-canvas-subtle);
  padding-bottom: var(--space-3);
}

/* Technical Specification Tag at Base of Card */
.card-spec-footer {
  margin-top: var(--space-6);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-canvas-subtle);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
}
```

---

### 5.4 Technical Badges & Status Indicators
Utilitarian pills inspired by oscilloscopes and mainframe console lights.

```css
/* Base Technical Badge */
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.1875rem 0.5rem;
  border-radius: var(--radius-xs);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border: 1px solid transparent;
}

/* Status: Active / Operational (Olive Green) */
.badge-active {
  background-color: var(--color-accent-olive-wash);
  border-color: rgba(63, 87, 68, 0.25);
  color: var(--color-accent-olive);
}

/* Status: System Telemetry Dot */
.status-indicator-dot {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-pill);
  background-color: var(--color-accent-olive);
  display: inline-block;
}

/* Subtle Inset Badge (Dark Surface) */
.badge-dark {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.12);
  color: var(--color-text-inverse-sub);
}
```

---

### 5.5 Diagram & Schematic Styling
Technical schematics are rendered as clean, high-precision SVG vector diagrams with zero cartoonish elements.

- **Background:** Technical charcoal grid (`#1E1C19`) or faint graph-paper coordinates (`#EFECE4` with a 24px grid repeat).
- **Line Art:** `1.5px` crisp SVG stroke.
  - Primary data path: `stroke: #3F5744` (olive green) or `stroke: #DDD7CB`.
  - Secondary path: `stroke-dasharray: 4 4; stroke: #787268`.
- **Node Boxes:** Crisp rectangles (`radius="2"`), hairline borders, and monospace labels (`font-size="11"`, `fill="#A49E93"`).
- **Flow Indicator:** Subtle directional pulse traveling along the interconnect vector.

---

### 5.6 Code & Terminal System
Terminals replicate classic UNIX workstations: purposeful, dark charcoal, with clear prompt separation.

```css
/* Terminal Container */
.terminal-window {
  background-color: var(--color-canvas-dark);
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-terminal);
}

/* Terminal Chrome / Titlebar */
.terminal-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-5);
  background-color: #1A1815;
  border-bottom: 1px solid var(--color-border-dark);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-inverse-mute);
}

/* Terminal Body */
.terminal-body {
  padding: var(--space-5);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: var(--leading-loose);
  color: var(--color-text-inverse);
  overflow-x: auto;
}

/* Command Prompt ($) */
.terminal-prompt {
  color: var(--color-accent-olive-light);
  user-select: none;
  margin-right: var(--space-2);
}

/* Terminal Flags & Arguments */
.terminal-cmd { color: #FFFFFF; font-weight: 500; }
.terminal-flag { color: #8FA893; }
.terminal-arg { color: #C49F72; }
.terminal-dim { color: var(--color-text-inverse-mute); }
```

---

## 6. Layout Grid & Section Layout Patterns

### 6.1 Section Layout Rules
1. **Vertical Rhythm:**
   - Section padding: `80px – 112px` desktop (`--space-10` to `--space-11`) / `56px` mobile.
   - Section header margin-bottom: `48px` (`--space-8`).
2. **Alternating Section Atmospheric Shifts:**
   - **Hero:** Deep Charcoal Canvas (`#161513`), high-contrast crisp text, rich architectural diagram.
   - **Problem / Solution:** Archival Warm Ivory Canvas (`#F6F4EE`), 50/50 split comparison matrix with ruled divider.
   - **Capabilities Grid:** Warm Ivory Canvas with Elevated Cards (`#FCFAF6`), 3-column architectural grid.
   - **Workloads / Deep Dives:** Subtle Sand Canvas (`#EFECE4`), alternating two-column layouts with terminal configurations.
   - **Footer:** Deep Charcoal Canvas (`#161513`), completing the visual bracket with the hero.

---

## 7. Quality Checklist & Verification

| Design System Dimension | Japolic Standard Verification |
| :--- | :--- |
| **Color Temperature** | Warm ivory (`#F6F4EE`) avoids sterile cold grays; deep charcoal (`#161513`) avoids pitch black. |
| **Accent Discipline** | Olive green (`#3F5744`) reserved exclusively for primary actions, active states, and system indicators. |
| **Typography Integrity** | Newsreader (editorial authority) + IBM Plex Sans (modern clarity) + IBM Plex Mono (technical precision). |
| **Container Geometry** | Radii capped between `0px` and `5px`; strictly eliminates consumer-SaaS bulbous curves. |
| **Performance Overhead** | Zero external frameworks; 100% pure CSS custom properties; native responsive flexbox/grid. |
