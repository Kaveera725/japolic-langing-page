import React from 'react';

export const TechnicalDiagram: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`relative w-full rounded-md border border-hairline-dark bg-canvas-dark-card p-4 sm:p-6 shadow-terminal overflow-hidden text-ink-inverse ${className}`}
    >
      {/* Schematic Header Bar */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-hairline-dark text-xs font-mono text-ink-inverse-mute">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-olive animate-pulse" />
          <span className="tracking-wider uppercase">ARCH-TOPOLOGY // v0.9-VFS</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px]">
          <span>PROTOCOL: POSIX / VFS</span>
          <span>LATENCY: BUS-RATE</span>
        </div>
      </div>

      {/* Responsive SVG Schematic */}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 860 300"
          className="w-full min-w-[700px] h-auto font-mono text-xs select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Grid Pattern */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#22201D" strokeWidth="0.5" />
            </pattern>
            <linearGradient id="busGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3F5744" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#526F58" stopOpacity="1" />
              <stop offset="100%" stopColor="#3F5744" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <rect width="860" height="300" fill="url(#grid)" opacity="0.6" />

          {/* LEFT: COMPUTE NODES */}
          <g transform="translate(30, 30)">
            <rect x="0" y="0" width="180" height="240" rx="4" fill="#161513" stroke="#2C2925" strokeWidth="1" />
            <text x="16" y="28" fill="#787268" fontSize="10" letterSpacing="0.08em">COMPUTE CLUSTER</text>
            <text x="16" y="44" fill="#F7F5F0" fontSize="12" fontWeight="600">Distributed Workers</text>

            {/* Node 1 */}
            <g transform="translate(14, 60)">
              <rect width="152" height="46" rx="2" fill="#1E1C19" stroke="#33302B" strokeWidth="1" />
              <circle cx="12" cy="18" r="3" fill="#3F5744" />
              <text x="22" y="21" fill="#F7F5F0" fontSize="11">node-01 [H100 GPU]</text>
              <text x="22" y="36" fill="#787268" fontSize="10">Mount: /mnt/shared</text>
            </g>

            {/* Node 2 */}
            <g transform="translate(14, 116)">
              <rect width="152" height="46" rx="2" fill="#1E1C19" stroke="#33302B" strokeWidth="1" />
              <circle cx="12" cy="18" r="3" fill="#3F5744" />
              <text x="22" y="21" fill="#F7F5F0" fontSize="11">node-02 [H100 GPU]</text>
              <text x="22" y="36" fill="#787268" fontSize="10">Mount: /mnt/shared</text>
            </g>

            {/* Node 3 */}
            <g transform="translate(14, 172)">
              <rect width="152" height="46" rx="2" fill="#1E1C19" stroke="#33302B" strokeWidth="1" />
              <circle cx="12" cy="18" r="3" fill="#787268" />
              <text x="22" y="21" fill="#F7F5F0" fontSize="11">node-03 [Worker vCPU]</text>
              <text x="22" y="36" fill="#787268" fontSize="10">Mount: /mnt/shared</text>
            </g>
          </g>

          {/* INTERCONNECT BUS (Left to Center) */}
          <path d="M 210 113 L 330 113" stroke="#3F5744" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 210 169 L 330 169" stroke="#3F5744" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 210 225 L 330 200" stroke="#526F58" strokeWidth="1.5" />
          <text x="235" y="100" fill="#8FA893" fontSize="10">POSIX VFS I/O</text>

          {/* CENTER: JAPOLIC DISTRIBUTED FILE SYSTEM ENGINE */}
          <g transform="translate(330, 20)">
            <rect x="0" y="0" width="230" height="260" rx="4" fill="#1A1815" stroke="#3F5744" strokeWidth="1.5" />
            <rect x="0" y="0" width="230" height="32" rx="4" fill="#253328" />
            <text x="16" y="20" fill="#E8ECE7" fontSize="11" fontWeight="600">JAPOLIC STORAGE ENGINE</text>

            {/* Hot Cache Layer */}
            <g transform="translate(16, 46)">
              <rect width="198" height="58" rx="2" fill="#161513" stroke="#3F5744" strokeWidth="1" />
              <text x="12" y="20" fill="#526F58" fontSize="10" fontWeight="600">L1: COHERENT NVMe/RAM CACHE</text>
              <text x="12" y="36" fill="#F7F5F0" fontSize="11">Sub-millisecond Read Path</text>
              <text x="12" y="49" fill="#787268" fontSize="10">Direct bus transfer (bypass network)</text>
            </g>

            {/* Metadata & Lock Coordinator */}
            <g transform="translate(16, 114)">
              <rect width="198" height="54" rx="2" fill="#161513" stroke="#33302B" strokeWidth="1" />
              <text x="12" y="20" fill="#DDD7CB" fontSize="10" fontWeight="600">DISTRIBUTED METADATA</text>
              <text x="12" y="36" fill="#B8B2A6" fontSize="11">Conflict-Free Multi-Writer Sync</text>
              <text x="12" y="47" fill="#787268" fontSize="9">Zero NFS lock contention</text>
            </g>

            {/* Continuous Tiering Engine */}
            <g transform="translate(16, 178)">
              <rect width="198" height="66" rx="2" fill="#161513" stroke="#33302B" strokeWidth="1" />
              <text x="12" y="19" fill="#C49F72" fontSize="10" fontWeight="600">DATA TIERING ENGINE</text>
              <text x="12" y="35" fill="#B8B2A6" fontSize="11">Automated LRU Flush / Prefetch</text>
              <text x="12" y="52" fill="#787268" fontSize="10">Active: Fast Tier | Cold: Object</text>
            </g>
          </g>

          {/* INTERCONNECT BUS (Center to Right) */}
          <path d="M 560 210 L 660 210" stroke="#C49F72" strokeWidth="2" strokeDasharray="6 4" />
          <text x="575" y="198" fill="#C49F72" fontSize="10">Async Object Sync</text>

          {/* RIGHT: S3 & COMMODITY OBJECT STORAGE */}
          <g transform="translate(660, 40)">
            <rect x="0" y="0" width="170" height="220" rx="4" fill="#161513" stroke="#2C2925" strokeWidth="1" />
            <text x="16" y="28" fill="#787268" fontSize="10" letterSpacing="0.08em">PERSISTENCE TIER</text>
            <text x="16" y="44" fill="#F7F5F0" fontSize="12" fontWeight="600">Object Storage (S3)</text>

            <g transform="translate(14, 60)">
              <rect width="142" height="42" rx="2" fill="#1E1C19" stroke="#33302B" strokeWidth="1" />
              <text x="12" y="20" fill="#DDD7CB" fontSize="11">AWS S3 Buckets</text>
              <text x="12" y="34" fill="#787268" fontSize="10">Standard object pricing</text>
            </g>

            <g transform="translate(14, 110)">
              <rect width="142" height="42" rx="2" fill="#1E1C19" stroke="#33302B" strokeWidth="1" />
              <text x="12" y="20" fill="#DDD7CB" fontSize="11">Cloudflare R2</text>
              <text x="12" y="34" fill="#787268" fontSize="10">Zero egress penalty</text>
            </g>

            <g transform="translate(14, 160)">
              <rect width="142" height="42" rx="2" fill="#1E1C19" stroke="#33302B" strokeWidth="1" />
              <text x="12" y="20" fill="#DDD7CB" fontSize="11">MinIO / Ceph</text>
              <text x="12" y="34" fill="#787268" fontSize="10">On-premise appliances</text>
            </g>
          </g>
        </svg>
      </div>

      {/* Schematic Footer / Operational Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 mt-4 border-t border-hairline-dark text-xs font-mono">
        <div>
          <div className="text-ink-inverse-mute text-[10px] uppercase">Mount Protocol</div>
          <div className="text-ink-inverse font-medium">POSIX / Standard VFS</div>
        </div>
        <div>
          <div className="text-ink-inverse-mute text-[10px] uppercase">Read Path</div>
          <div className="text-olive-light font-medium">Local-Bus NVMe / RAM</div>
        </div>
        <div>
          <div className="text-ink-inverse-mute text-[10px] uppercase">Durability Tier</div>
          <div className="text-ink-inverse font-medium">Native S3 / MinIO API</div>
        </div>
        <div>
          <div className="text-ink-inverse-mute text-[10px] uppercase">Re-architecture</div>
          <div className="text-ink-inverse font-medium">Zero Code Changes</div>
        </div>
      </div>
    </div>
  );
};
