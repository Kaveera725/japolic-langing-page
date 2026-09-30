# UX Audit — Japolic Landing Page

**Reviewer perspective:** First-time developer. No prior knowledge of Japolic.
**Viewport tested:** Desktop 1440×900 · Mobile 390×844
**Date:** 2026-09-30

---

## The 10-Second Test

| Question | Pass? | Notes |
|---|---|---|
| 1. What is Japolic? | ⚠️ Partial | "Shared storage. Local-disk performance." answers *what it does* but not *what it is* — a product, protocol, or service? |
| 2. What problem does it solve? | ✅ Yes | Hero subtext and Problem section both land this |
| 3. Who is it for? | ❌ No | Page never calls out an audience in the first two sections |
| 4. Why does it matter? | ⚠️ Partial | Benefit language is present but hidden behind jargon |
| 5. What can I do next? | ✅ Yes | Two CTAs visible in hero |

**Verdict:** Partially passes. A developer landing here cold understands Japolic is storage-related, but won't know if it's SaaS, open-source, or hardware. The audience signal is missing above the fold.

---

## Section-by-Section Audit

### HERO

**Issues:**
1. **Headline says what it delivers, not what it is.** No frame of reference for "Japolic" — is it a service, daemon, or appliance?
2. **Subtext front-loads jargon.** "POSIX file interfaces," "NVMe speeds," "cold-data tiering" require infrastructure background to parse in 3 seconds.
3. **Missing audience signal.** AI teams, platform engineers, infrastructure teams — mentioned only 3 scrolls down.
4. **Tags above headline are category labels, not value signals.** They confirm what Japolic is but don't motivate the reader.
5. **Primary CTA "Explore Japolic" is too vague.** Reader doesn't know what they'd explore. "See how it works" is more predictive.

### PROBLEM / SOLUTION

**Issues:**
1. Friction 02 body uses "exponential" — hyperbolic. Prefer "high" or "steep."
2. Friction 03 body: "lock contention and metadata serialization bottlenecks" — too technical for landing page copy.
3. Friction 04 body: "analytics corpuses" — unusual word, slows reading.
4. "THE RESOLUTION" in the transition divider — unusual word. Most readers expect "THE SOLUTION."
5. Solution intro paragraph partially repeats hero subtext.

### PRODUCT / FEATURES

**Issues:**
1. **Section label "PRODUCT" is redundant.** Reader knows they're reading about the product.
2. **Subtext nearly identical to hero paragraph.** Reads as filler; adds no new information.
3. **Capability tag "MULTI-NODE NAMESPACE"** — jargon. Reader won't know what namespace means here.
4. **Capability tag "OBJECT PROTOCOL BRIDGE"** — overly abstract.
5. **Capability 02 body:** "Read performance approaches physical disk latency" is ambiguous — "approaching" could mean worse than disk.
6. **Diagram hover hint** is passive and wordy.

### USE CASES

**Issues:**
1. **"APPLICATION DOMAINS" section label** — internal jargon. No one self-identifies as an application domain.
2. **Heading abstract:** "Engineered for systems where storage is the critical path" loses readers not thinking in "critical path" terms.
3. **"Architecture Spec 04" annotation** — internal design artifact. Not user-facing value.
4. **"AUDIENCE / VALUE COUPLING · 4 VERIFIED PROFILES"** — reads as internal documentation.
5. **Use Case 03 body:** "delivering microsecond local-disk access latencies" — specific claim without supporting data.
6. **CTA label "EVALUATE JAPOLIC IN YOUR ENVIRONMENT"** — corporate language.
7. **CTA headline "compute clusters"** — assumes reader has clusters. Excludes solo developers and small teams.

### FOOTER

**Issues:**
1. **Footer body too technical and too long.** Reader is deciding to act — needs one clear sentence, not a technical description.
2. **"VFS ENGINE v0.9.4"** — pre-release version number signals product is not production-ready. Remove from public footer.
3. **Brand positioning statement is the third restatement** of the same value prop (Hero → Use Cases CTA → Footer).
4. **"Product" and "How it Works" both link to #capabilities** — should point to distinct anchors.

---

## Priority Fixes Table

| Priority | Section | Issue | Fix Applied |
|---|---|---|---|
| P0 | Hero | Missing audience signal | Added "Built for AI teams, platform engineers, and data-intensive workloads" |
| P0 | Hero | CTA "Explore Japolic" vague | Changed to "See how it works" |
| P0 | Use Cases | "APPLICATION DOMAINS" jargon | Changed to "WHO IT'S FOR" |
| P0 | Use Cases | Heading abstract | Changed to concrete benefit headline |
| P1 | Product | Section label redundant | Changed "PRODUCT" to "THE ARCHITECTURE" |
| P1 | Product | Subtext repeats hero | Rewrote to add new information |
| P1 | Problem | Jargon in body copy | Simplified friction 02, 03, 04 body |
| P1 | Use Cases | Internal annotations | Removed "Architecture Spec 04" and right-side annotation |
| P2 | Footer | Body too technical | Simplified to one sentence |
| P2 | Footer | Version label v0.9.4 | Removed |
| P2 | Product | Tag "MULTI-NODE NAMESPACE" | Renamed to "ALL NODES, ONE MOUNT" |
| P2 | Product | Tag "OBJECT PROTOCOL BRIDGE" | Renamed to "S3 NATIVE" |
| P3 | Problem | "THE RESOLUTION" divider | Changed to "THE SOLUTION" |
| P3 | Use Cases | CTA "EVALUATE JAPOLIC" | Changed to "GET STARTED" |
| P3 | Use Cases | CTA "compute clusters" | Changed to inclusive wording |

