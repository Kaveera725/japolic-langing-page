import React from 'react';
import { Database, Zap } from 'lucide-react';

export interface StorageNodeProps {
  name?: string;
  tier?: 'nvme' | 'memory' | 'ssd' | 'hybrid';
  capacity?: string;
  usedPercent?: number;
  latency?: string;
  hitRatio?: string;
  theme?: 'light' | 'dark';
  highlight?: boolean;
  className?: string;
}

export const StorageNode: React.FC<StorageNodeProps> = ({
  name = 'Japolic NVMe Tier',
  tier = 'nvme',
  capacity = '3.84 TB / node',
  usedPercent = 42,
  latency = '140 µs',
  hitRatio = '99.4%',
  theme = 'light',
  highlight = false,
  className = '',
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`rounded-xs border transition-all duration-200 select-none p-3.5 sm:p-4 ${
        isDark
          ? highlight
            ? 'bg-canvas-dark-card border-olive ring-1 ring-olive/40 shadow-subtle'
            : 'bg-canvas-dark-card border-hairline-dark'
          : highlight
          ? 'bg-canvas-elevated border-olive ring-1 ring-olive/30 shadow-subtle'
          : 'bg-canvas-elevated border-hairline-light'
      } ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-hairline-light/50 dark:border-hairline-dark/70 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Database size={13} className="text-olive" />
          <span
            className={`font-mono text-xs font-semibold tracking-tight ${
              isDark ? 'text-ink-inverse' : 'text-ink-primary'
            }`}
          >
            {name}
          </span>
        </div>

        <span
          className={`font-mono text-[9px] px-1.5 py-0.5 rounded-xs uppercase tracking-wider font-medium ${
            isDark
              ? 'bg-olive-dim/40 text-olive-light border border-olive/30'
              : 'bg-olive-wash text-olive border border-olive/20'
          }`}
        >
          {tier.toUpperCase()} CACHE
        </span>
      </div>

      {/* Latency & Hit Ratio Telemetry */}
      <div className="grid grid-cols-2 gap-2 mb-3 font-mono text-[11px]">
        <div
          className={`p-1.5 rounded-xs border ${
            isDark
              ? 'bg-canvas-dark-subtle border-hairline-dark'
              : 'bg-canvas-subtle border-hairline-light'
          }`}
        >
          <div className="text-[9px] text-ink-tertiary flex items-center gap-1">
            <Zap size={10} className="text-olive" />
            <span>LATENCY</span>
          </div>
          <span className="font-semibold text-olive">{latency}</span>
        </div>

        <div
          className={`p-1.5 rounded-xs border ${
            isDark
              ? 'bg-canvas-dark-subtle border-hairline-dark'
              : 'bg-canvas-subtle border-hairline-light'
          }`}
        >
          <div className="text-[9px] text-ink-tertiary">CACHE HIT</div>
          <span className="font-semibold text-olive">{hitRatio}</span>
        </div>
      </div>

      {/* Capacity Bar & Disk Blocks Indicator */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-mono">
          <span className={isDark ? 'text-ink-inverse-mute' : 'text-ink-tertiary'}>
            ALLOCATED {capacity}
          </span>
          <span className="font-medium text-olive">{usedPercent}%</span>
        </div>

        {/* Early-computing segmented block track */}
        <div className="flex gap-1 h-2">
          {Array.from({ length: 12 }).map((_, i) => {
            const isFilled = i < Math.round((usedPercent / 100) * 12);
            return (
              <div
                key={i}
                className={`flex-1 rounded-[1px] transition-colors ${
                  isFilled
                    ? 'bg-olive'
                    : isDark
                    ? 'bg-canvas-dark-subtle border border-hairline-dark'
                    : 'bg-canvas-sunken/60 border border-hairline-light'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
