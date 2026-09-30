import React, { useState } from 'react';
import { Container } from '../components/Container';
import { SectionLabel } from '../components/SectionLabel';
import { ScrollReveal } from '../components/ScrollReveal';
import { SystemStatusIndicator, TechnicalLabel } from '../components/visuals';

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

const CAPABILITIES = [
  {
    num: '01',
    tag: 'ALL NODES, ONE MOUNT',
    title: 'Shared access across nodes',
    body: 'Every compute node mounts the same shared directory simultaneously. Read and write concurrently across your entire cluster — no staging pipelines, no manual data synchronization.',
    detail: 'POSIX-compliant · Concurrent R/W',
  },
  {
    num: '02',
    tag: 'NVMe / RAM CACHE',
    title: 'Local-speed data access',
    body: 'Hot data blocks are served from node-local NVMe and memory cache, bypassing network file system roundtrips. Read latency is close to reading directly from local disk.',
    detail: 'Sub-ms reads · Direct bus path',
  },
  {
    num: '03',
    tag: 'S3 NATIVE',
    title: 'Native S3 compatibility',
    body: 'Mount existing S3 buckets or S3-compatible storage directly as a POSIX filesystem. Read objects as files, write files as objects — zero migration, zero proprietary formats.',
    detail: 'AWS S3 · R2 · MinIO · Ceph',
  },
  {
    num: '04',
    tag: 'HOT↔COLD LIFECYCLE',
    title: 'Automatic storage tiering',
    body: 'Active working sets stay in high-speed cache automatically. Dormant blocks flush to commodity object storage without manual intervention or migration scripts.',
    detail: 'LRU eviction · Continuous prefetch',
  },
] as const;

/* Which SVG layer groups each capability highlights */
type LayerKey =
  | 'apps'
  | 'servers'
  | 'bus'
  | 'japolic-frame'
  | 'cache'
  | 'metadata'
  | 'tiering'
  | 'sync'
  | 'storage';

const LAYER_MAP: Record<number, LayerKey[]> = {
  0: ['servers', 'bus', 'japolic-frame'],
  1: ['japolic-frame', 'cache'],
  2: ['japolic-frame', 'sync', 'storage'],
  3: ['japolic-frame', 'cache', 'tiering', 'sync', 'storage'],
};

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */

export const ProductFeatures: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);

  /** Compute inline opacity style for each SVG layer group. */
  const ls = (layer: LayerKey): React.CSSProperties => {
    if (active === null) return { opacity: 1, transition: 'opacity 0.35s ease' };
    const hit = LAYER_MAP[active]?.includes(layer) ?? false;
    // Keep apps / metadata slightly visible for context even when dimmed
    const dim = layer === 'apps' || layer === 'metadata' ? 0.25 : 0.12;
    return { opacity: hit ? 1 : dim, transition: 'opacity 0.35s ease' };
  };

  return (
    <section
      id="product"
      className="py-20 md:py-28 bg-canvas-base border-b border-hairline-light scroll-mt-16"
      aria-labelledby="cap-heading"
    >
      <div id="capabilities" className="scroll-mt-24" />
      <Container>
        {/* ── Section Header ── */}
        <ScrollReveal>
          <div className="max-w-3xl mb-12 md:mb-16">
            <SectionLabel label="THE ARCHITECTURE" variant="olive" dot className="mb-5" />
            <h2
              id="cap-heading"
              className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-medium leading-[1.12] tracking-tight text-ink-primary mb-5"
            >
              One data layer across your infrastructure.
            </h2>
            <p className="font-sans text-[15px] sm:text-base md:text-lg text-ink-secondary leading-[1.65]">
              Under the hood, Japolic is a virtual file system layer. It aggregates
              local NVMe cache, network-attached compute nodes, and cloud object
              buckets into a single mountable directory — so every application reads
              and writes files the same way it always has.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Interactive Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT: Capability List */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="border border-hairline-light rounded-sm overflow-hidden bg-canvas-elevated">
              {CAPABILITIES.map((cap, idx) => (
                <div
                  key={cap.num}
                  role="button"
                  tabIndex={0}
                  aria-pressed={active === idx}
                  aria-label={`${cap.title}: ${cap.body}`}
                  onMouseEnter={() => setActive(idx)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setActive(active === idx ? null : idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActive(active === idx ? null : idx);
                    }
                  }}
                  className={`
                    relative px-5 py-5 border-l-2 transition-all duration-200 cursor-default outline-none
                    focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-inset
                    ${active === idx
                      ? 'border-l-olive bg-olive-wash/40'
                      : active !== null
                        ? 'border-l-transparent opacity-45'
                        : 'border-l-transparent hover:border-l-olive/40 hover:bg-canvas-subtle/40'
                    }
                    ${idx < CAPABILITIES.length - 1 ? 'border-b border-b-hairline-light' : ''}
                  `}
                >
                  {/* Top row: number + tag */}
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span
                      className={`font-display text-xl font-medium transition-colors duration-200 ${
                        active === idx ? 'text-olive' : 'text-ink-muted'
                      }`}
                    >
                      {cap.num}
                    </span>
                    <span className="font-mono text-[10px] tracking-wider text-ink-tertiary font-medium">
                      {cap.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-sans text-[15px] font-semibold text-ink-primary mb-1.5 tracking-tight">
                    {cap.title}
                  </h3>

                  {/* Body */}
                  <p className="font-sans text-[13px] text-ink-secondary leading-[1.6]">
                    {cap.body}
                  </p>

                  {/* Spec footer */}
                  <div className="mt-3 font-mono text-[10px] text-ink-tertiary tracking-wide flex items-center gap-1.5">
                    <span
                      className={`h-1 w-1 rounded-full transition-colors duration-200 ${
                        active === idx ? 'bg-olive' : 'bg-ink-muted'
                      }`}
                    />
                    {cap.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Interactive Architecture Diagram */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="sticky top-24 rounded-md border border-hairline-light bg-canvas-elevated shadow-card overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-hairline-light bg-canvas-subtle/50 font-mono text-[10px] tracking-wider text-ink-tertiary">
                <div className="flex items-center gap-2">
                  <SystemStatusIndicator status="active" label="LIVE" size="sm" />
                  <span className="font-semibold text-ink-secondary">
                    SYSTEM TOPOLOGY // DATA LAYER ARCHITECTURE
                  </span>
                </div>
                <TechnicalLabel variant="bracket" size="xs">
                  POSIX_VFS
                </TechnicalLabel>
              </div>

              {/* Mobile Dedicated Interactive Architecture Topology (< sm) */}
              <div className="sm:hidden p-3.5 space-y-2 bg-canvas-base border-b border-hairline-light">
                {/* Layer 0: Workloads */}
                <div
                  className={`p-2.5 rounded-xs border transition-all duration-300 ${
                    active === null || active === 0
                      ? 'bg-canvas-elevated border-hairline-strong'
                      : 'bg-canvas-subtle/50 border-hairline-light opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-ink-tertiary mb-1">
                    <span>LAYER 01 // WORKLOADS</span>
                    <span>AI · ETL · APPS</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-ink-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                    <span className="font-medium">Distributed Compute Applications</span>
                  </div>
                </div>

                <div className="flex justify-center text-ink-muted text-[10px] font-mono select-none">
                  ↓ POSIX MOUNT
                </div>

                {/* Layer 1: Compute Nodes & Japolic VFS */}
                <div
                  className={`p-2.5 rounded-xs border transition-all duration-300 ${
                    active === 0 || active === 1 || active === 3
                      ? 'bg-olive-wash/60 border-olive/50 shadow-subtle'
                      : 'bg-canvas-elevated border-hairline-light opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-olive font-semibold mb-1">
                    <span>LAYER 02 // JAPOLIC SHARED VFS</span>
                    <span>COHERENT CACHE</span>
                  </div>
                  <div className="text-xs font-mono text-ink-primary font-medium">
                    Node-Local NVMe / RAM Cache
                  </div>
                  <div className="text-[10px] font-mono text-ink-secondary mt-0.5">
                    Sub-ms reads · Direct kernel VFS bus
                  </div>
                </div>

                <div className="flex justify-center text-ink-muted text-[10px] font-mono select-none">
                  ↕ ZERO-COPY SYNC
                </div>

                {/* Layer 2: Persistence */}
                <div
                  className={`p-2.5 rounded-xs border transition-all duration-300 ${
                    active === 2 || active === 3
                      ? 'bg-olive-wash/60 border-olive/50 shadow-subtle'
                      : 'bg-canvas-elevated border-hairline-light opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-ink-tertiary font-semibold mb-1">
                    <span>LAYER 03 // OBJECT PERSISTENCE</span>
                    <span className="text-olive">S3 PROTOCOL</span>
                  </div>
                  <div className="text-xs font-mono text-ink-primary font-medium">
                    AWS S3 · Cloudflare R2 · MinIO
                  </div>
                  <div className="text-[10px] font-mono text-ink-secondary mt-0.5">
                    Continuous tiering · Commodity pricing
                  </div>
                </div>

                {/* Mobile Interactive Hint */}
                <div className="pt-1 text-center font-mono text-[10px] text-ink-muted">
                  Tap any capability below to inspect system layers
                </div>
              </div>

              {/* Desktop SVG Schematic (sm and above) */}
              <div className="hidden sm:block p-3 sm:p-5 overflow-x-auto">
                <svg
                  viewBox="0 0 680 430"
                  className="w-full min-w-[580px] h-auto select-none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Interactive architecture diagram — hover a capability to highlight the relevant system layer"
                >
                  {/* Grid */}
                  <defs>
                    <pattern id="fGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M20 0L0 0 0 20" fill="none" stroke="#EFECE4" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="680" height="430" fill="url(#fGrid)" opacity="0.5" />

                  {/* ════════════════════════════════════════
                      LAYER 0 — APPLICATION WORKLOADS
                      ════════════════════════════════════════ */}
                  <g style={ls('apps')}>
                    <text x="22" y="14" fill="#A49E93" fontSize="9" fontFamily="monospace" letterSpacing="0.1em">WORKLOADS</text>

                    <g transform="translate(20, 22)">
                      <rect width="170" height="34" rx="2" fill="#FCFAF6" stroke="#DDD7CB" strokeWidth="1" />
                      <text x="12" y="21" fill="#4D4842" fontSize="11" fontFamily="monospace">AI / ML Training</text>
                    </g>
                    <g transform="translate(255, 22)">
                      <rect width="170" height="34" rx="2" fill="#FCFAF6" stroke="#DDD7CB" strokeWidth="1" />
                      <text x="12" y="21" fill="#4D4842" fontSize="11" fontFamily="monospace">Data Analytics</text>
                    </g>
                    <g transform="translate(490, 22)">
                      <rect width="170" height="34" rx="2" fill="#FCFAF6" stroke="#DDD7CB" strokeWidth="1" />
                      <text x="12" y="21" fill="#4D4842" fontSize="11" fontFamily="monospace">App Services</text>
                    </g>

                    {/* Lines to servers */}
                    <line x1="105" y1="56" x2="105" y2="76" stroke="#DDD7CB" strokeWidth="1" />
                    <line x1="340" y1="56" x2="340" y2="76" stroke="#DDD7CB" strokeWidth="1" />
                    <line x1="575" y1="56" x2="575" y2="76" stroke="#DDD7CB" strokeWidth="1" />
                  </g>

                  {/* ════════════════════════════════════════
                      LAYER 1 — COMPUTE SERVERS
                      ════════════════════════════════════════ */}
                  <g style={ls('servers')}>
                    <text x="22" y="74" fill="#A49E93" fontSize="9" fontFamily="monospace" letterSpacing="0.1em">COMPUTE CLUSTER</text>

                    <g transform="translate(20, 80)">
                      <rect width="170" height="40" rx="2" fill="#FCFAF6" stroke="#BDB5A4" strokeWidth="1" />
                      <circle cx="15" cy="20" r="3.5" fill="#3F5744" />
                      <text x="26" y="18" fill="#181715" fontSize="11" fontFamily="monospace" fontWeight="600">node-01</text>
                      <text x="26" y="32" fill="#787268" fontSize="10" fontFamily="monospace">GPU · /mnt/shared</text>
                    </g>
                    <g transform="translate(255, 80)">
                      <rect width="170" height="40" rx="2" fill="#FCFAF6" stroke="#BDB5A4" strokeWidth="1" />
                      <circle cx="15" cy="20" r="3.5" fill="#3F5744" />
                      <text x="26" y="18" fill="#181715" fontSize="11" fontFamily="monospace" fontWeight="600">node-02</text>
                      <text x="26" y="32" fill="#787268" fontSize="10" fontFamily="monospace">GPU · /mnt/shared</text>
                    </g>
                    <g transform="translate(490, 80)">
                      <rect width="170" height="40" rx="2" fill="#FCFAF6" stroke="#BDB5A4" strokeWidth="1" />
                      <circle cx="15" cy="20" r="3.5" fill="#787268" />
                      <text x="26" y="18" fill="#181715" fontSize="11" fontFamily="monospace" fontWeight="600">node-03</text>
                      <text x="26" y="32" fill="#787268" fontSize="10" fontFamily="monospace">vCPU · /mnt/shared</text>
                    </g>
                  </g>

                  {/* ════════════════════════════════════════
                      VFS BUS BAR
                      ════════════════════════════════════════ */}
                  <g style={ls('bus')}>
                    {/* Vertical drops from servers */}
                    <line x1="105" y1="120" x2="105" y2="136" stroke="#3F5744" strokeWidth="1.5" />
                    <line x1="340" y1="120" x2="340" y2="136" stroke="#3F5744" strokeWidth="1.5" />
                    <line x1="575" y1="120" x2="575" y2="136" stroke="#526F58" strokeWidth="1" strokeDasharray="4 3" />

                    {/* Horizontal bus */}
                    <line x1="105" y1="136" x2="575" y2="136" stroke="#3F5744" strokeWidth="1.5" />

                    {/* Junction dots */}
                    <circle cx="105" cy="136" r="3" fill="#3F5744">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="340" cy="136" r="3" fill="#3F5744">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="0.4s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="575" cy="136" r="3" fill="#526F58">
                      <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite" />
                    </circle>

                    {/* Bus label */}
                    <rect x="258" y="142" width="164" height="14" rx="1" fill="#FCFAF6" />
                    <text x="340" y="153" fill="#3F5744" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="0.07em" fontWeight="500">POSIX VFS / FILE I/O</text>

                    {/* Drop to Japolic */}
                    <line x1="340" y1="136" x2="340" y2="168" stroke="#3F5744" strokeWidth="1.5" strokeDasharray="5 3">
                      <animate attributeName="strokeDashoffset" values="0;-16" dur="2s" repeatCount="indefinite" />
                    </line>
                    <polygon points="340,172 336,165 344,165" fill="#3F5744" />
                  </g>

                  {/* ════════════════════════════════════════
                      LAYER 2 — JAPOLIC FILE SYSTEM (Frame)
                      ════════════════════════════════════════ */}
                  <g style={ls('japolic-frame')}>
                    <rect x="40" y="172" width="600" height="150" rx="3" fill="#FCFAF6" stroke="#3F5744" strokeWidth="1.5" />

                    {/* Header bar */}
                    <rect x="40" y="172" width="600" height="26" rx="3" fill="#E8ECE7" />
                    <rect x="40" y="186" width="600" height="12" fill="#E8ECE7" />
                    <line x1="40" y1="198" x2="640" y2="198" stroke="#3F5744" strokeWidth="0.5" opacity="0.25" />
                    <text x="60" y="190" fill="#3F5744" fontSize="11" fontFamily="monospace" fontWeight="600" letterSpacing="0.05em">▸ JAPOLIC FILE SYSTEM ENGINE</text>
                    <text x="615" y="190" fill="#526F58" fontSize="9" fontFamily="monospace" textAnchor="end">v0.9</text>
                  </g>

                  {/* Cache module (inside Japolic) */}
                  <g style={ls('cache')}>
                    <g transform="translate(60, 206)">
                      <rect width="265" height="62" rx="2" fill="#F6F4EE" stroke="#BDB5A4" strokeWidth="1" />
                      <line x1="0" y1="0" x2="0" y2="62" stroke="#3F5744" strokeWidth="2.5" />
                      <text x="14" y="18" fill="#3F5744" fontSize="9" fontFamily="monospace" fontWeight="600" letterSpacing="0.06em">COHERENT CACHE</text>
                      <text x="14" y="35" fill="#181715" fontSize="11" fontFamily="monospace">NVMe / RAM Hot Tier</text>
                      <text x="14" y="51" fill="#787268" fontSize="10" fontFamily="monospace">Sub-ms read · Direct bus transfer</text>
                    </g>
                  </g>

                  {/* Metadata module (inside Japolic) */}
                  <g style={ls('metadata')}>
                    <g transform="translate(345, 206)">
                      <rect width="275" height="62" rx="2" fill="#F6F4EE" stroke="#DDD7CB" strokeWidth="1" />
                      <line x1="0" y1="0" x2="0" y2="62" stroke="#BDB5A4" strokeWidth="2" />
                      <text x="14" y="18" fill="#787268" fontSize="9" fontFamily="monospace" fontWeight="600" letterSpacing="0.06em">METADATA COORDINATOR</text>
                      <text x="14" y="35" fill="#181715" fontSize="11" fontFamily="monospace">Distributed Lock-Free Sync</text>
                      <text x="14" y="51" fill="#787268" fontSize="10" fontFamily="monospace">Multi-writer · Zero contention</text>
                    </g>
                  </g>

                  {/* Tiering bar (inside Japolic) */}
                  <g style={ls('tiering')}>
                    <g transform="translate(60, 278)">
                      <rect width="560" height="26" rx="2" fill="#F6F4EE" stroke="#DDD7CB" strokeWidth="1" />
                      <text x="14" y="17" fill="#787268" fontSize="9" fontFamily="monospace" letterSpacing="0.04em">TIERING ENGINE · AUTO LRU EVICTION · CONTINUOUS PREFETCH · HOT↔COLD</text>
                    </g>
                  </g>

                  {/* ════════════════════════════════════════
                      OBJECT SYNC CONNECTION
                      ════════════════════════════════════════ */}
                  <g style={ls('sync')}>
                    {/* Exit arrow */}
                    <polygon points="340,322 336,329 344,329" fill="#A36A26" opacity="0.8" />

                    {/* Central drop */}
                    <line x1="340" y1="322" x2="340" y2="362" stroke="#A36A26" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.7">
                      <animate attributeName="strokeDashoffset" values="0;-16" dur="2s" repeatCount="indefinite" />
                    </line>

                    {/* Label */}
                    <rect x="245" y="338" width="190" height="14" rx="1" fill="#FCFAF6" />
                    <text x="340" y="349" fill="#A36A26" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="0.07em" opacity="0.9">OBJECT SYNCHRONIZATION</text>

                    {/* Fan-out to storage boxes */}
                    <line x1="340" y1="358" x2="105" y2="374" stroke="#A36A26" strokeWidth="0.8" opacity="0.35" strokeDasharray="3 3" />
                    <line x1="340" y1="358" x2="340" y2="374" stroke="#A36A26" strokeWidth="1" opacity="0.5" />
                    <line x1="340" y1="358" x2="575" y2="374" stroke="#A36A26" strokeWidth="0.8" opacity="0.35" strokeDasharray="3 3" />

                    <circle cx="340" cy="358" r="2.5" fill="#A36A26" opacity="0.6">
                      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
                    </circle>
                  </g>

                  {/* ════════════════════════════════════════
                      LAYER 3 — OBJECT STORAGE
                      ════════════════════════════════════════ */}
                  <g style={ls('storage')}>
                    <text x="22" y="384" fill="#A49E93" fontSize="9" fontFamily="monospace" letterSpacing="0.1em">PERSISTENCE TIER</text>

                    <g transform="translate(20, 380)">
                      <rect width="170" height="36" rx="2" fill="#FCFAF6" stroke="#DDD7CB" strokeWidth="1" />
                      <text x="12" y="16" fill="#4D4842" fontSize="11" fontFamily="monospace" fontWeight="500">AWS S3</text>
                      <text x="12" y="29" fill="#A49E93" fontSize="9" fontFamily="monospace">Object pricing</text>
                    </g>
                    <g transform="translate(255, 380)">
                      <rect width="170" height="36" rx="2" fill="#FCFAF6" stroke="#DDD7CB" strokeWidth="1" />
                      <text x="12" y="16" fill="#4D4842" fontSize="11" fontFamily="monospace" fontWeight="500">Cloudflare R2</text>
                      <text x="12" y="29" fill="#A49E93" fontSize="9" fontFamily="monospace">Zero egress</text>
                    </g>
                    <g transform="translate(490, 380)">
                      <rect width="170" height="36" rx="2" fill="#FCFAF6" stroke="#DDD7CB" strokeWidth="1" />
                      <text x="12" y="16" fill="#4D4842" fontSize="11" fontFamily="monospace" fontWeight="500">MinIO / Ceph</text>
                      <text x="12" y="29" fill="#A49E93" fontSize="9" fontFamily="monospace">On-premise</text>
                    </g>
                  </g>

                  {/* Corner annotation */}
                  <text x="660" y="425" fill="#DDD7CB" fontSize="7" fontFamily="monospace" textAnchor="end">TOPOLOGY // v0.9-VFS</text>
                </svg>
              </div>

              {/* Footer status strip */}
              <div className="px-4 py-2.5 border-t border-hairline-light bg-canvas-subtle/30 font-mono text-[10px] tracking-wide text-ink-tertiary min-h-[28px]">
                {active !== null ? (
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-olive shrink-0" />
                    <span className="text-olive font-medium">{CAPABILITIES[active].tag}</span>
                    <span className="text-ink-muted">—</span>
                    <span>{CAPABILITIES[active].detail}</span>
                  </span>
                ) : (
                  <span className="text-ink-muted">Hover a capability to explore the diagram</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
