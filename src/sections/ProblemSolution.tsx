import React from 'react';
import { Container } from '../components/Container';
import { SectionLabel } from '../components/SectionLabel';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  ServerNode,
  StorageNode,
  TechnicalLabel,
  SystemStatusIndicator,
  DataPath,
} from '../components/visuals';
import { ArrowRight } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   DATA: FRICTION POINTS & RESOLUTIONS
   ═══════════════════════════════════════════════════════════ */

const FRICTION_POINTS = [
  {
    num: '01',
    title: 'DATA SILOS',
    annotation: 'NODE-LOCAL NVMe',
    body: 'High-speed NVMe drives are locked to individual server instances. Scaling means duplicating terabytes across nodes with manual sync scripts and staging pipelines.',
  },
  {
    num: '02',
    title: 'STORAGE COST',
    annotation: 'EXPONENTIAL $/TB',
    body: 'Enterprise SAN and NAS appliances carry high per-terabyte pricing. Maintaining petabyte-scale datasets on provisioned block storage becomes expensive at scale.',
  },
  {
    num: '03',
    title: 'ACCESS LATENCY',
    annotation: 'NFS BOTTLENECK',
    body: 'Network file systems introduce contention under concurrent access. Random-access I/O degrades predictably as the number of parallel readers and writers grows.',
  },
  {
    num: '04',
    title: 'DATASET GROWTH',
    annotation: 'CAPACITY BOUNDARY',
    body: 'Training sets and analytics datasets routinely exceed single-node storage boundaries. Data staging and pre-download pipelines waste GPU compute cycles waiting on I/O.',
  },
  {
    num: '05',
    title: 'THE TRADEOFF',
    annotation: 'NO MIDDLE GROUND',
    body: 'Fast storage is expensive. Cheap storage is slow. Conventional architectures offer no path between local NVMe performance and cloud-scale object persistence.',
  },
] as const;

const RESOLUTIONS = [
  {
    num: '01',
    tag: 'NAMESPACE',
    title: 'Unified shared mount',
    body: 'Every compute node mounts the same shared directory. Datasets are immediately accessible cluster-wide — no staging, no rsync, no manual replication between instances.',
  },
  {
    num: '02',
    tag: 'PERFORMANCE',
    title: 'Local-bus cache layer',
    body: 'Hot data blocks execute against node-local NVMe and RAM cache, bypassing network roundtrips entirely. Read performance approaches physical disk access latency.',
  },
  {
    num: '03',
    tag: 'ECONOMICS',
    title: 'S3-backed cold storage',
    body: 'Dormant data resides in commodity object storage — AWS S3, Cloudflare R2, or on-premise MinIO. Pay standard object rates at any scale with automatic tiering.',
  },
] as const;

/* ═══════════════════════════════════════════════════════════
   TRANSITION FLOW DIAGRAM (SVG)
   ═══════════════════════════════════════════════════════════ */

const TransitionDiagram: React.FC = () => (
  <div className="relative w-full h-full min-h-[480px] flex items-start justify-center pt-4">
    <svg
      viewBox="0 0 260 540"
      className="w-full max-w-[260px] h-auto select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Transition diagram showing fragmented data resolving through Japolic to unified shared storage"
    >
      {/* Grid background */}
      <defs>
        <pattern id="transGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#DDD7CB" strokeWidth="0.5" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="260" height="540" fill="url(#transGrid)" opacity="0.4" />

      {/* ── PHASE LABEL: CURRENT STATE ── */}
      <text x="20" y="16" fill="#8C382A" fontSize="9" fontFamily="monospace" letterSpacing="0.12em" fontWeight="600">CURRENT STATE</text>
      <line x1="115" y1="12" x2="245" y2="12" stroke="#8C382A" strokeWidth="0.5" opacity="0.4" />

      {/* ── BOX 1: FRAGMENTED DATA ── */}
      <g transform="translate(15, 26)">
        <rect width="230" height="78" rx="2" fill="#FCFAF6" stroke="#BDB5A4" strokeWidth="1" />
        <line x1="0" y1="0" x2="0" y2="78" stroke="#8C382A" strokeWidth="2.5" />
        <text x="14" y="20" fill="#8C382A" fontSize="10" fontFamily="monospace" fontWeight="600" letterSpacing="0.06em">FRAGMENTED DATA</text>
        <text x="14" y="38" fill="#4D4842" fontSize="10" fontFamily="monospace">Scattered across nodes</text>

        {/* Scattered data blocks */}
        <rect x="14" y="50" width="18" height="14" rx="1" fill="#F9ECE9" stroke="#8C382A" strokeWidth="0.7" opacity="0.8" />
        <rect x="44" y="54" width="18" height="14" rx="1" fill="#F9ECE9" stroke="#8C382A" strokeWidth="0.7" opacity="0.6" />
        <rect x="76" y="48" width="18" height="14" rx="1" fill="#F9ECE9" stroke="#8C382A" strokeWidth="0.7" opacity="0.9" />
        <rect x="110" y="52" width="18" height="14" rx="1" fill="#F9ECE9" stroke="#8C382A" strokeWidth="0.7" opacity="0.5" />
        <rect x="142" y="50" width="18" height="14" rx="1" fill="#F9ECE9" stroke="#8C382A" strokeWidth="0.7" opacity="0.7" />
        <rect x="176" y="55" width="18" height="14" rx="1" fill="#F9ECE9" stroke="#8C382A" strokeWidth="0.7" opacity="0.4" />

        {/* Disconnection marks */}
        <text x="36" y="62" fill="#8C382A" fontSize="9" fontFamily="monospace" opacity="0.6">×</text>
        <text x="68" y="60" fill="#8C382A" fontSize="9" fontFamily="monospace" opacity="0.5">×</text>
        <text x="100" y="62" fill="#8C382A" fontSize="9" fontFamily="monospace" opacity="0.7">×</text>
        <text x="134" y="60" fill="#8C382A" fontSize="9" fontFamily="monospace" opacity="0.6">×</text>
        <text x="166" y="62" fill="#8C382A" fontSize="9" fontFamily="monospace" opacity="0.5">×</text>
      </g>

      {/* ── Connector: dashed, rust ── */}
      <line x1="130" y1="104" x2="130" y2="132" stroke="#8C382A" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <text x="140" y="122" fill="#8C382A" fontSize="8" fontFamily="monospace" opacity="0.6">rsync ↕</text>

      {/* ── BOX 2: ISOLATED SERVERS ── */}
      <g transform="translate(15, 134)">
        <rect width="230" height="88" rx="2" fill="#FCFAF6" stroke="#BDB5A4" strokeWidth="1" />
        <line x1="0" y1="0" x2="0" y2="88" stroke="#8C382A" strokeWidth="2.5" />
        <text x="14" y="20" fill="#8C382A" fontSize="10" fontFamily="monospace" fontWeight="600" letterSpacing="0.06em">ISOLATED SERVERS</text>

        {/* Three isolated partition columns */}
        <g transform="translate(14, 32)">
          {/* Server 1 */}
          <rect width="60" height="44" rx="1" fill="#F9ECE9" stroke="#BDB5A4" strokeWidth="0.7" />
          <text x="8" y="16" fill="#4D4842" fontSize="9" fontFamily="monospace">srv-01</text>
          <rect x="8" y="24" width="16" height="12" rx="1" fill="#E5E0D5" stroke="#BDB5A4" strokeWidth="0.5" />
          <text x="30" y="34" fill="#A49E93" fontSize="7" fontFamily="monospace">NVMe</text>

          {/* Separator with × */}
          <text x="68" y="28" fill="#8C382A" fontSize="11" fontFamily="monospace">×</text>

          {/* Server 2 */}
          <g transform="translate(82, 0)">
            <rect width="60" height="44" rx="1" fill="#F9ECE9" stroke="#BDB5A4" strokeWidth="0.7" />
            <text x="8" y="16" fill="#4D4842" fontSize="9" fontFamily="monospace">srv-02</text>
            <rect x="8" y="24" width="16" height="12" rx="1" fill="#E5E0D5" stroke="#BDB5A4" strokeWidth="0.5" />
            <text x="30" y="34" fill="#A49E93" fontSize="7" fontFamily="monospace">NVMe</text>
          </g>

          {/* Separator with × */}
          <text x="150" y="28" fill="#8C382A" fontSize="11" fontFamily="monospace">×</text>

          {/* Server 3 */}
          <g transform="translate(164, 0)">
            <rect width="38" height="44" rx="1" fill="#F9ECE9" stroke="#BDB5A4" strokeWidth="0.7" />
            <text x="6" y="16" fill="#4D4842" fontSize="8" fontFamily="monospace">srv-03</text>
            <rect x="6" y="24" width="12" height="12" rx="1" fill="#E5E0D5" stroke="#BDB5A4" strokeWidth="0.5" />
          </g>
        </g>
      </g>

      {/* ═══════════════════════════════════════════════════════
          TRANSITION POINT
          ═══════════════════════════════════════════════════════ */}
      <line x1="15" y1="250" x2="245" y2="250" stroke="#BDB5A4" strokeWidth="1" />
      <line x1="15" y1="252" x2="245" y2="252" stroke="#BDB5A4" strokeWidth="1" opacity="0.4" />

      <rect x="70" y="240" width="120" height="22" rx="2" fill="#E8ECE7" stroke="#3F5744" strokeWidth="1" />
      <text x="130" y="255" fill="#3F5744" fontSize="9" fontFamily="monospace" fontWeight="600" textAnchor="middle" letterSpacing="0.08em">JAPOLIC RESOLVES</text>

      {/* Down arrow */}
      <line x1="130" y1="262" x2="130" y2="290" stroke="#3F5744" strokeWidth="1.5">
        <animate attributeName="strokeDashoffset" values="0;-12" dur="2s" repeatCount="indefinite" />
      </line>
      <polygon points="130,293 126,285 134,285" fill="#3F5744" />

      {/* ── PHASE LABEL: WITH JAPOLIC ── */}
      <text x="20" y="310" fill="#3F5744" fontSize="9" fontFamily="monospace" letterSpacing="0.12em" fontWeight="600">WITH JAPOLIC</text>
      <line x1="105" y1="306" x2="245" y2="306" stroke="#3F5744" strokeWidth="0.5" opacity="0.4" />

      {/* ── BOX 3: JAPOLIC VFS ── */}
      <g transform="translate(15, 318)">
        <rect width="230" height="78" rx="2" fill="#E8ECE7" stroke="#3F5744" strokeWidth="1.5" />
        <line x1="0" y1="0" x2="0" y2="78" stroke="#3F5744" strokeWidth="3" />
        <text x="14" y="20" fill="#3F5744" fontSize="10" fontFamily="monospace" fontWeight="600" letterSpacing="0.06em">JAPOLIC FILE SYSTEM</text>
        <text x="14" y="38" fill="#4D4842" fontSize="10" fontFamily="monospace">Unified POSIX namespace</text>

        {/* Unified data block — single connected bar */}
        <rect x="14" y="50" width="202" height="16" rx="1" fill="#3F5744" opacity="0.15" stroke="#3F5744" strokeWidth="0.7" />
        <text x="24" y="62" fill="#3F5744" fontSize="8" fontFamily="monospace" fontWeight="500">/mnt/shared — All nodes, one mount</text>
      </g>

      {/* ── Connector: solid olive ── */}
      <line x1="130" y1="396" x2="130" y2="424" stroke="#3F5744" strokeWidth="1.5" strokeDasharray="6 3">
        <animate attributeName="strokeDashoffset" values="0;-18" dur="2.5s" repeatCount="indefinite" />
      </line>
      <text x="140" y="414" fill="#3F5744" fontSize="8" fontFamily="monospace" opacity="0.7">auto tier ↓</text>

      {/* ── BOX 4: SHARED S3 STORAGE ── */}
      <g transform="translate(15, 426)">
        <rect width="230" height="78" rx="2" fill="#E8ECE7" stroke="#3F5744" strokeWidth="1.5" />
        <line x1="0" y1="0" x2="0" y2="78" stroke="#3F5744" strokeWidth="3" />
        <text x="14" y="20" fill="#3F5744" fontSize="10" fontFamily="monospace" fontWeight="600" letterSpacing="0.06em">SHARED STORAGE · S3</text>
        <text x="14" y="38" fill="#4D4842" fontSize="10" fontFamily="monospace">Commodity object pricing</text>

        {/* Unified bar */}
        <rect x="14" y="50" width="202" height="16" rx="1" fill="#3F5744" opacity="0.1" stroke="#3F5744" strokeWidth="0.5" />
        <text x="24" y="62" fill="#3F5744" fontSize="8" fontFamily="monospace" fontWeight="500" opacity="0.8">AWS S3 · R2 · MinIO · Ceph</text>
      </g>

      {/* Corner annotation */}
      <text x="245" y="530" fill="#A49E93" fontSize="7" fontFamily="monospace" textAnchor="end">ARCH-FLOW // v0.9</text>
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */

export const ProblemSolution: React.FC = () => {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-28 bg-canvas-base border-b border-hairline-light scroll-mt-16"
      aria-labelledby="problem-heading"
    >
      <div id="problem-solution" className="scroll-mt-24" />
      <Container>
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            PROBLEM PHASE
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mb-16 md:mb-24">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 md:mb-16">
            <SectionLabel
              label="THE INFRASTRUCTURE PROBLEM"
              variant="olive"
              dot={true}
              className="mb-5"
            />
            <h2
              id="problem-heading"
              className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-medium leading-[1.12] tracking-tight text-ink-primary mb-5"
            >
              Isolated drives. Network bottlenecks.{' '}
              <span className="text-ink-tertiary">Escalating cost.</span>
            </h2>
            <p className="font-sans text-[15px] sm:text-base md:text-lg text-ink-secondary leading-[1.65] max-w-2xl">
              Modern compute clusters generate data faster than conventional storage
              architectures can serve it. The result is a cascade of engineering
              workarounds that consume time, budget, and performance.
            </p>
          </div>

          {/* Two-Column: Numbered Friction Points + Transition Diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: Editorial Numbered Friction Points */}
            <div className="lg:col-span-7 space-y-0">
              {FRICTION_POINTS.map((item, idx) => (
                <div
                  key={item.num}
                  className={`group py-6 ${
                    idx < FRICTION_POINTS.length - 1
                      ? 'border-b border-hairline-light'
                      : ''
                  }`}
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    {/* Large number */}
                    <div className="shrink-0 w-14 pt-0.5">
                      <span className="font-display text-[2rem] sm:text-[2.4rem] font-medium leading-none tracking-tight text-ink-muted group-hover:text-olive transition-colors duration-200">
                        {item.num}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-mono text-xs font-semibold tracking-wider text-ink-primary">
                          {item.title}
                        </h3>
                        <span className="hidden sm:inline-block h-px flex-1 max-w-[80px] bg-hairline-light" />
                        <span className="hidden sm:inline font-mono text-[10px] tracking-wider text-ink-muted">
                          {item.annotation}
                        </span>
                      </div>
                      <p className="font-sans text-sm sm:text-[15px] text-ink-secondary leading-[1.65]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Vertical Transition Flow Diagram */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="sticky top-24">
                <TransitionDiagram />
              </div>
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            TRANSITION DIVIDER
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="flex items-center gap-4 mb-16 md:mb-24" role="separator">
          <div className="flex-1 h-px bg-hairline-strong" />
          <div className="flex items-center gap-2.5 px-4 py-1.5 border border-olive/25 bg-olive-wash/50 rounded-xs">
            <span className="h-2 w-2 rounded-full bg-olive" />
            <span className="font-mono text-[11px] font-semibold text-olive tracking-wider">
              THE SOLUTION
            </span>
          </div>
          <div className="flex-1 h-px bg-hairline-strong" />
        </div>

        {/* Mobile: Show diagram between problem and solution on small screens */}
        <div className="lg:hidden mb-16">
          <TransitionDiagram />
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SOLUTION PHASE
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div>
          {/* Solution Header */}
          <div className="max-w-3xl mb-10 md:mb-14">
            <SectionLabel
              label="THE JAPOLIC APPROACH"
              variant="olive"
              dot={true}
              className="mb-5"
            />
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-medium leading-[1.12] tracking-tight text-ink-primary mb-5">
              One file system across every node.
            </h2>
            <p className="font-sans text-[15px] sm:text-base md:text-lg text-ink-secondary leading-[1.65] max-w-2xl">
              Every server mounts the same directory. Hot data is served quickly.
              Cold data moves to cheap object storage automatically. No migration
              scripts, no manual replication, no changes to your application.
            </p>
          </div>

          {/* Resolution Items — vertical, left-border accent */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 border border-hairline-light rounded-sm overflow-hidden bg-canvas-elevated">
            {RESOLUTIONS.map((item, idx) => (
              <div
                key={item.num}
                className={`relative p-5 sm:p-8 group hover:bg-[#FAF8F3] transition-colors duration-200 ${
                  idx < RESOLUTIONS.length - 1
                    ? 'border-b md:border-b-0 md:border-r border-hairline-light'
                    : ''
                }`}
              >
                {/* Top metadata row */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-display text-2xl font-medium text-olive/70 group-hover:text-olive transition-colors duration-200">
                    {item.num}
                  </span>
                  <span className="font-mono text-[10px] font-semibold tracking-wider text-olive uppercase px-1.5 py-0.5 rounded-xs bg-olive-wash border border-olive/15">
                    {item.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-sans text-base font-semibold text-ink-primary mb-3 tracking-tight">
                  {item.title}
                </h3>

                {/* Body */}
                <p className="font-sans text-sm text-ink-secondary leading-[1.65]">
                  {item.body}
                </p>

                {/* Bottom olive accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-olive/20 group-hover:bg-olive transition-colors duration-200" />
              </div>
            ))}
          </div>

          {/* ── Visual Schematic: Unified Shared Cluster Architecture ── */}
          <ScrollReveal delayMs={80}>
            <div className="mt-8 p-4 sm:p-6 md:p-8 bg-canvas-elevated border border-hairline-light rounded-sm shadow-subtle hover:shadow-card transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-hairline-light gap-2">
              <div className="flex items-center gap-2">
                <SystemStatusIndicator status="active" label="VFS_UNIFIED" size="sm" />
                <span className="font-mono text-xs font-semibold text-ink-primary">
                  UNIFIED SHARED NAMESPACE: /mnt/shared
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-ink-tertiary">
                <TechnicalLabel variant="bracket" size="xs">TOPOLOGY_COHERENT</TechnicalLabel>
                <span>3 COMPUTE NODES · 1 POSIX VFS</span>
              </div>
            </div>

            {/* 3 Server Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <ServerNode
                name="node-01"
                type="gpu"
                status="active"
                hardware="8× H100 GPU"
                mountPoint="/mnt/shared"
                throughput="2.4 GB/s"
                compact={true}
              />
              <ServerNode
                name="node-02"
                type="gpu"
                status="active"
                hardware="8× H100 GPU"
                mountPoint="/mnt/shared"
                throughput="2.4 GB/s"
                compact={true}
              />
              <ServerNode
                name="node-03"
                type="worker"
                status="active"
                hardware="128 vCPU Worker"
                mountPoint="/mnt/shared"
                throughput="1.8 GB/s"
                compact={true}
              />
            </div>

            {/* Data Paths connecting Compute to Japolic Cache */}
            <div className="py-2">
              <DataPath
                label="Direct POSIX VFS Bus"
                sublabel="zero-copy memory mapping"
                protocol="LOCAL NVMe BUS"
                throughput="6.6 GB/s AGGREGATE"
              />
            </div>

            {/* Shared Japolic Storage Node */}
            <div className="mt-4">
              <StorageNode
                name="Japolic Coherent Storage Fabric (Node-Local NVMe + Shared VFS)"
                tier="nvme"
                capacity="11.5 TB Total Cluster NVMe"
                usedPercent={38}
                latency="140 µs"
                hitRatio="99.7%"
                highlight={true}
              />
            </div>
          </div>
        </ScrollReveal>

          {/* Section Footnote */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-ink-tertiary">
            <span className="tracking-wide">SPEC: CACHE-COHERENT REPLICATION // ZERO-STAGING PIPELINE // POSIX VFS</span>
            <a
              href="#capabilities"
              className="inline-flex items-center gap-1.5 text-olive hover:text-olive-light transition-colors font-medium tracking-wide"
            >
              Explore capabilities <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};
