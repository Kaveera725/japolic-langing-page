import React from 'react';
import { SystemStatusIndicator, TechnicalLabel } from './visuals';

export const TechnicalDiagram: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`rounded-md border border-hairline-dark bg-canvas-dark-card overflow-hidden shadow-terminal ${className}`}
    >
      {/* ── Instrument Title Bar ── */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-hairline-dark bg-[#1A1815]">
        <div className="flex items-center gap-2">
          <SystemStatusIndicator
            status="active"
            label="NOMINAL"
            sublabel="// ARCH-TOPOLOGY JAPOLIC VFS v0.9"
            theme="dark"
            size="sm"
          />
        </div>
        <div className="hidden sm:flex items-center gap-3 font-mono text-[10px]">
          <TechnicalLabel variant="outline" theme="dark" size="xs">
            POSIX/VFS
          </TechnicalLabel>
          <TechnicalLabel variant="bracket" theme="dark" size="xs">
            CACHE_COHERENT
          </TechnicalLabel>
        </div>
      </div>

      {/* ── Mobile Architecture View (Dedicated vertical engineering stack for screens < sm) ── */}
      <div className="sm:hidden p-3.5 space-y-2.5 bg-[#161513]">
        {/* Tier 1: Compute Cluster */}
        <div className="p-3 bg-[#1E1C19] border border-hairline-dark rounded-xs">
          <div className="flex items-center justify-between font-mono text-[10px] text-ink-inverse-mute mb-2">
            <span>// COMPUTE CLUSTER</span>
            <span className="text-olive-light font-medium">2 NODES ACTIVE</span>
          </div>
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between p-2 bg-[#141311] border border-hairline-dark rounded-xs">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-olive animate-pulse" />
                <span className="text-ink-inverse font-semibold">node-01</span>
                <span className="text-[10px] text-ink-inverse-sub">H100 GPU</span>
              </div>
              <span className="text-[10px] text-olive-light font-mono">/mnt/shared</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-[#141311] border border-hairline-dark rounded-xs">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                <span className="text-ink-inverse font-semibold">node-02</span>
                <span className="text-[10px] text-ink-inverse-sub">H100 GPU</span>
              </div>
              <span className="text-[10px] text-olive-light font-mono">/mnt/shared</span>
            </div>
          </div>
        </div>

        {/* Bus Flow Indicator */}
        <div className="flex items-center justify-center gap-2 py-0.5 font-mono text-[10px] text-olive-light">
          <div className="h-3 w-px bg-olive/50" />
          <span className="bg-[#1E1C19] px-2.5 py-0.5 border border-olive/30 rounded-xs tracking-wider">
            POSIX VFS DIRECT BUS ↓
          </span>
          <div className="h-3 w-px bg-olive/50" />
        </div>

        {/* Tier 2: Japolic Core Engine */}
        <div className="p-3.5 bg-[#1A1815] border border-olive/40 rounded-xs shadow-subtle">
          <div className="flex items-center justify-between font-mono text-[11px] font-semibold text-olive-light mb-2.5 pb-1.5 border-b border-hairline-dark">
            <span>▸ JAPOLIC FILE SYSTEM ENGINE</span>
            <span className="text-[10px] text-ink-inverse-mute">v0.9.4</span>
          </div>

          <div className="grid grid-cols-1 gap-2 font-mono text-xs">
            <div className="p-2.5 bg-[#161513] border-l-2 border-l-olive border border-hairline-dark rounded-xs">
              <div className="text-[10px] text-olive font-semibold tracking-wider">COHERENT CACHE</div>
              <div className="text-ink-inverse text-xs font-medium mt-0.5">NVMe / RAM Hot Tier</div>
              <div className="text-[10px] text-ink-inverse-mute mt-0.5">Sub-ms read · Direct bus transfer</div>
            </div>

            <div className="p-2.5 bg-[#161513] border-l-2 border-l-[#787268] border border-hairline-dark rounded-xs">
              <div className="text-[10px] text-ink-inverse-sub font-semibold tracking-wider">METADATA COORDINATOR</div>
              <div className="text-ink-inverse text-xs font-medium mt-0.5">Distributed Lock-Free Sync</div>
              <div className="text-[10px] text-ink-inverse-mute mt-0.5">Multi-writer · Zero NFS contention</div>
            </div>
          </div>

          <div className="mt-2.5 p-1.5 bg-[#141311] border border-hairline-dark rounded-xs font-mono text-[9px] text-ink-inverse-mute flex items-center justify-between">
            <span>AUTO TIERING ENGINE</span>
            <span className="text-olive-light font-medium">LRU EVICTION ACTIVE</span>
          </div>
        </div>

        {/* Sync Flow Indicator */}
        <div className="flex items-center justify-center gap-2 py-0.5 font-mono text-[10px] text-amber">
          <div className="h-3 w-px bg-amber/50" />
          <span className="bg-[#1E1C19] px-2.5 py-0.5 border border-amber/30 rounded-xs tracking-wider">
            ASYNC S3 OBJECT SYNC ↓
          </span>
          <div className="h-3 w-px bg-amber/50" />
        </div>

        {/* Tier 3: Persistence Layer */}
        <div className="p-3 bg-[#1E1C19] border border-hairline-dark rounded-xs">
          <div className="flex items-center justify-between font-mono text-[10px] text-ink-inverse-mute mb-2">
            <span>// COMMODITY OBJECT STORAGE</span>
            <span className="text-ink-inverse-sub">S3 COMPATIBLE</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 font-mono text-center">
            <div className="p-2 bg-[#141311] border border-hairline-dark rounded-xs">
              <div className="text-xs text-ink-inverse font-medium">AWS S3</div>
              <div className="text-[9px] text-ink-inverse-mute mt-0.5">Standard</div>
            </div>
            <div className="p-2 bg-[#141311] border border-hairline-dark rounded-xs">
              <div className="text-xs text-ink-inverse font-medium">R2</div>
              <div className="text-[9px] text-ink-inverse-mute mt-0.5">0$ Egress</div>
            </div>
            <div className="p-2 bg-[#141311] border border-hairline-dark rounded-xs">
              <div className="text-xs text-ink-inverse font-medium">MinIO</div>
              <div className="text-[9px] text-ink-inverse-mute mt-0.5">On-Prem</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop SVG Engineering Schematic (sm and above) ── */}
      <div className="hidden sm:block w-full overflow-x-auto p-3 sm:p-5">
        <svg
          viewBox="0 0 880 430"
          className="w-full min-w-[680px] h-auto select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Japolic system architecture diagram showing compute nodes connected through the Japolic file system to S3-compatible object storage"
        >
          {/* ── Definitions: Grid, Gradients, Markers ── */}
          <defs>
            <pattern id="schematicGrid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#22201D" strokeWidth="0.5" />
            </pattern>
            <radialGradient id="japolicGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3F5744" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#3F5744" stopOpacity="0" />
            </radialGradient>
            <marker id="arrowDown" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M 0 0 L 3 3 L 6 0" fill="none" stroke="#3F5744" strokeWidth="1" />
            </marker>
          </defs>

          {/* Background Grid */}
          <rect width="880" height="430" fill="url(#schematicGrid)" opacity="0.5" />

          {/* Glow behind Japolic box */}
          <ellipse cx="440" cy="220" rx="360" ry="110" fill="url(#japolicGlow)" />

          {/* ================================================================
              ROW 1: COMPUTE CLUSTER NODES
              ================================================================ */}
          <g aria-label="Compute cluster nodes">
            {/* Section label */}
            <text x="62" y="10" fill="#4D4842" fontSize="9" fontFamily="monospace" letterSpacing="0.1em">COMPUTE CLUSTER</text>

            {/* Node 01 */}
            <g transform="translate(70, 18)">
              <rect width="200" height="54" rx="2" fill="#1E1C19" stroke="#33302B" strokeWidth="1" />
              <circle cx="16" cy="20" r="3.5" fill="#3F5744" />
              <text x="28" y="23" fill="#F7F5F0" fontSize="12" fontFamily="monospace" fontWeight="600">node-01</text>
              <text x="100" y="23" fill="#526F58" fontSize="10" fontFamily="monospace">ACTIVE</text>
              <text x="28" y="40" fill="#706B62" fontSize="10" fontFamily="monospace">H100 GPU · /mnt/shared</text>
            </g>

            {/* Node 02 */}
            <g transform="translate(340, 18)">
              <rect width="200" height="54" rx="2" fill="#1E1C19" stroke="#33302B" strokeWidth="1" />
              <circle cx="16" cy="20" r="3.5" fill="#3F5744" />
              <text x="28" y="23" fill="#F7F5F0" fontSize="12" fontFamily="monospace" fontWeight="600">node-02</text>
              <text x="100" y="23" fill="#526F58" fontSize="10" fontFamily="monospace">ACTIVE</text>
              <text x="28" y="40" fill="#706B62" fontSize="10" fontFamily="monospace">H100 GPU · /mnt/shared</text>
            </g>

            {/* Node 03 */}
            <g transform="translate(610, 18)">
              <rect width="200" height="54" rx="2" fill="#1E1C19" stroke="#33302B" strokeWidth="1" />
              <circle cx="16" cy="20" r="3.5" fill="#787268" />
              <text x="28" y="23" fill="#F7F5F0" fontSize="12" fontFamily="monospace" fontWeight="600">node-03</text>
              <text x="100" y="23" fill="#706B62" fontSize="10" fontFamily="monospace">IDLE</text>
              <text x="28" y="40" fill="#706B62" fontSize="10" fontFamily="monospace">vCPU Worker · /mnt/shared</text>
            </g>
          </g>

          {/* ================================================================
              CONNECTION ZONE 1: POSIX VFS BUS
              ================================================================ */}
          <g aria-label="POSIX VFS interconnect bus">
            {/* Vertical drops from nodes to bus bar */}
            <line x1="170" y1="72" x2="170" y2="94" stroke="#3F5744" strokeWidth="1.5" />
            <line x1="440" y1="72" x2="440" y2="94" stroke="#3F5744" strokeWidth="1.5" />
            <line x1="710" y1="72" x2="710" y2="94" stroke="#526F58" strokeWidth="1" strokeDasharray="4 3" />

            {/* Horizontal bus bar */}
            <line x1="170" y1="94" x2="710" y2="94" stroke="#3F5744" strokeWidth="1.5">
              <animate attributeName="strokeDashoffset" values="0;-16" dur="3s" repeatCount="indefinite" />
            </line>

            {/* Junction dots */}
            <circle cx="170" cy="94" r="3" fill="#3F5744">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="440" cy="94" r="3" fill="#3F5744">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="0.3s" repeatCount="indefinite" />
            </circle>
            <circle cx="710" cy="94" r="3" fill="#526F58">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite" />
            </circle>

            {/* Bus label */}
            <rect x="318" y="101" width="244" height="17" rx="1" fill="#161513" />
            <text x="440" y="113" fill="#526F58" fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="0.08em">POSIX VFS / FILE INTERFACE</text>

            {/* RW indicators */}
            <text x="195" y="88" fill="#3F5744" fontSize="8" fontFamily="monospace" letterSpacing="0.05em">R/W ↓</text>
            <text x="465" y="88" fill="#3F5744" fontSize="8" fontFamily="monospace" letterSpacing="0.05em">R/W ↓</text>

            {/* Central drop from bus to Japolic */}
            <line x1="440" y1="94" x2="440" y2="148" stroke="#3F5744" strokeWidth="1.5" strokeDasharray="6 4">
              <animate attributeName="strokeDashoffset" values="0;-20" dur="2s" repeatCount="indefinite" />
            </line>

            {/* Entry arrow */}
            <polygon points="440,148 436,139 444,139" fill="#3F5744" />
          </g>

          {/* ================================================================
              ROW 2: JAPOLIC FILE SYSTEM ENGINE
              ================================================================ */}
          <g aria-label="Japolic File System Engine">
            {/* Main container */}
            <rect x="110" y="148" width="660" height="155" rx="3" fill="#1A1815" stroke="#3F5744" strokeWidth="1.5" />

            {/* Header bar */}
            <rect x="110" y="148" width="660" height="28" rx="3" fill="#253328" />
            {/* Close bottom corners of header */}
            <rect x="110" y="164" width="660" height="12" fill="#253328" />
            <line x1="110" y1="176" x2="770" y2="176" stroke="#3F5744" strokeWidth="0.5" strokeOpacity="0.4" />

            {/* Header text */}
            <text x="132" y="167" fill="#E8ECE7" fontSize="11" fontFamily="monospace" fontWeight="600" letterSpacing="0.06em">
              ▸ JAPOLIC FILE SYSTEM ENGINE
            </text>
            <text x="720" y="167" fill="#526F58" fontSize="9" fontFamily="monospace" textAnchor="end">v0.9.4</text>

            {/* Sub-module 1: Coherent Cache */}
            <g transform="translate(130, 186)">
              <rect width="280" height="70" rx="2" fill="#161513" stroke="#33302B" strokeWidth="1" />
              <line x1="0" y1="0" x2="0" y2="70" stroke="#3F5744" strokeWidth="2" />
              <text x="14" y="20" fill="#3F5744" fontSize="9" fontFamily="monospace" fontWeight="600" letterSpacing="0.08em">COHERENT CACHE</text>
              <text x="14" y="38" fill="#F7F5F0" fontSize="11" fontFamily="monospace">NVMe / RAM Hot Tier</text>
              <text x="14" y="56" fill="#706B62" fontSize="10" fontFamily="monospace">Sub-ms read · Direct bus transfer</text>
            </g>

            {/* Sub-module 2: Metadata Coordinator */}
            <g transform="translate(440, 186)">
              <rect width="300" height="70" rx="2" fill="#161513" stroke="#33302B" strokeWidth="1" />
              <line x1="0" y1="0" x2="0" y2="70" stroke="#787268" strokeWidth="2" />
              <text x="14" y="20" fill="#B8B2A6" fontSize="9" fontFamily="monospace" fontWeight="600" letterSpacing="0.08em">METADATA COORDINATOR</text>
              <text x="14" y="38" fill="#F7F5F0" fontSize="11" fontFamily="monospace">Distributed Lock-Free Sync</text>
              <text x="14" y="56" fill="#706B62" fontSize="10" fontFamily="monospace">Multi-writer · Zero NFS contention</text>
            </g>

            {/* Sub-module 3: Tiering bar */}
            <g transform="translate(130, 268)">
              <rect width="610" height="24" rx="2" fill="#161513" stroke="#272420" strokeWidth="1" />
              <text x="14" y="16" fill="#706B62" fontSize="9" fontFamily="monospace" letterSpacing="0.05em">
                TIERING ENGINE · AUTO LRU EVICTION · CONTINUOUS PREFETCH · HOT↔COLD LIFECYCLE
              </text>
            </g>
          </g>

          {/* ================================================================
              CONNECTION ZONE 2: ASYNC OBJECT SYNC
              ================================================================ */}
          <g aria-label="Asynchronous object synchronization path">
            {/* Exit arrow from Japolic */}
            <polygon points="440,303 436,312 444,312" fill="#A36A26" opacity="0.8" />

            {/* Vertical drop */}
            <line x1="440" y1="303" x2="440" y2="366" stroke="#A36A26" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7">
              <animate attributeName="strokeDashoffset" values="0;-20" dur="2.5s" repeatCount="indefinite" />
            </line>

            {/* Sync label */}
            <rect x="300" y="322" width="280" height="17" rx="1" fill="#161513" />
            <text x="440" y="334" fill="#A36A26" fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="0.08em" opacity="0.9">ASYNC OBJECT SYNCHRONIZATION</text>

            {/* Directional indicator */}
            <text x="460" y="358" fill="#706B62" fontSize="8" fontFamily="monospace">WRITE ↓</text>

            {/* Fan-out lines to storage nodes */}
            <line x1="440" y1="358" x2="170" y2="366" stroke="#A36A26" strokeWidth="1" opacity="0.4" strokeDasharray="3 3" />
            <line x1="440" y1="358" x2="440" y2="366" stroke="#A36A26" strokeWidth="1" opacity="0.5" />
            <line x1="440" y1="358" x2="710" y2="366" stroke="#A36A26" strokeWidth="1" opacity="0.4" strokeDasharray="3 3" />

            {/* Junction dot */}
            <circle cx="440" cy="358" r="2.5" fill="#A36A26" opacity="0.7">
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* ================================================================
              ROW 3: S3-COMPATIBLE OBJECT STORAGE
              ================================================================ */}
          <g aria-label="S3-compatible object storage backends">
            {/* Section label */}
            <text x="62" y="382" fill="#4D4842" fontSize="9" fontFamily="monospace" letterSpacing="0.1em">PERSISTENCE TIER</text>

            {/* Storage 1: AWS S3 */}
            <g transform="translate(70, 366)">
              <rect width="200" height="50" rx="2" fill="#1E1C19" stroke="#33302B" strokeWidth="1" />
              <text x="16" y="22" fill="#DDD7CB" fontSize="12" fontFamily="monospace" fontWeight="500">AWS S3</text>
              <text x="16" y="38" fill="#706B62" fontSize="10" fontFamily="monospace">Standard object pricing</text>
            </g>

            {/* Storage 2: Cloudflare R2 */}
            <g transform="translate(340, 366)">
              <rect width="200" height="50" rx="2" fill="#1E1C19" stroke="#33302B" strokeWidth="1" />
              <text x="16" y="22" fill="#DDD7CB" fontSize="12" fontFamily="monospace" fontWeight="500">Cloudflare R2</text>
              <text x="16" y="38" fill="#706B62" fontSize="10" fontFamily="monospace">Zero egress charges</text>
            </g>

            {/* Storage 3: MinIO / Ceph */}
            <g transform="translate(610, 366)">
              <rect width="200" height="50" rx="2" fill="#1E1C19" stroke="#33302B" strokeWidth="1" />
              <text x="16" y="22" fill="#DDD7CB" fontSize="12" fontFamily="monospace" fontWeight="500">MinIO / Ceph</text>
              <text x="16" y="38" fill="#706B62" fontSize="10" fontFamily="monospace">On-premise appliance</text>
            </g>
          </g>
        </svg>
      </div>

      {/* ── Footer Metrics Bar ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-hairline-dark border-t border-hairline-dark">
        {[
          { label: 'Mount Interface', value: 'POSIX / Standard VFS' },
          { label: 'Read Path', value: 'Local-Bus NVMe/RAM', accent: true },
          { label: 'Durability', value: 'S3-Compatible Object' },
          { label: 'Code Changes', value: 'Zero Re-architecture' },
        ].map((stat) => (
          <div key={stat.label} className="bg-canvas-dark-card px-4 py-3">
            <div className="font-mono text-[10px] uppercase tracking-wider text-ink-inverse-mute mb-1">{stat.label}</div>
            <div className={`font-mono text-xs font-medium ${stat.accent ? 'text-olive-light' : 'text-ink-inverse'}`}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
