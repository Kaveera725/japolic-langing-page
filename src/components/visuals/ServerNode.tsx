import React from 'react';
import { Cpu, HardDrive } from 'lucide-react';

export interface ServerNodeProps {
  id?: string;
  name?: string;
  type?: 'gpu' | 'cpu' | 'worker' | 'master';
  status?: 'active' | 'idle' | 'syncing' | 'offline';
  hardware?: string;
  mountPoint?: string;
  throughput?: string;
  theme?: 'light' | 'dark';
  compact?: boolean;
  selected?: boolean;
  className?: string;
}

export const ServerNode: React.FC<ServerNodeProps> = ({
  id = 'srv-01',
  name = 'node-01',
  type = 'gpu',
  status = 'active',
  hardware = '8× H100 GPU · 512GB',
  mountPoint = '/mnt/shared',
  throughput = '2.4 GB/s',
  theme = 'light',
  compact = false,
  selected = false,
  className = '',
}) => {
  const isDark = theme === 'dark';

  const statusLed = {
    active: 'bg-olive shadow-[0_0_6px_rgba(63,87,68,0.5)]',
    idle: 'bg-amber',
    syncing: 'bg-olive animate-pulse',
    offline: 'bg-rust',
  }[status];

  return (
    <div
      id={id}
      className={`rounded-xs border transition-all duration-200 select-none ${
        isDark
          ? selected
            ? 'bg-canvas-dark-card border-olive ring-1 ring-olive/30 shadow-subtle'
            : 'bg-canvas-dark-card border-hairline-dark hover:border-[#38342E]'
          : selected
          ? 'bg-canvas-elevated border-olive ring-1 ring-olive/30 shadow-subtle'
          : 'bg-canvas-elevated border-hairline-light hover:border-hairline-strong'
      } ${compact ? 'p-2.5' : 'p-3.5 sm:p-4'} ${className}`}
    >
      {/* Node Header Bar */}
      <div className="flex items-center justify-between gap-2 border-b border-hairline-light/40 dark:border-hairline-dark/60 pb-2 mb-2.5">
        <div className="flex items-center gap-2">
          {/* Hardware LED */}
          <span className="relative flex h-2 w-2">
            {status === 'active' && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-olive opacity-40" />
            )}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${statusLed}`} />
          </span>

          <span
            className={`font-mono text-xs font-semibold tracking-tight ${
              isDark ? 'text-ink-inverse' : 'text-ink-primary'
            }`}
          >
            {name}
          </span>

          <span
            className={`font-mono text-[9px] px-1 py-0.2 rounded-xs uppercase tracking-wider ${
              isDark
                ? 'bg-canvas-dark-subtle text-ink-inverse-mute'
                : 'bg-canvas-subtle text-ink-tertiary'
            }`}
          >
            {type}
          </span>
        </div>

        <span
          className={`font-mono text-[10px] tracking-wider uppercase font-medium ${
            status === 'active'
              ? isDark
                ? 'text-olive-light'
                : 'text-olive'
              : isDark
              ? 'text-ink-inverse-mute'
              : 'text-ink-muted'
          }`}
        >
          {status}
        </span>
      </div>

      {/* Node Body Details */}
      <div className="space-y-1.5 font-mono text-[11px]">
        {/* Hardware spec */}
        <div
          className={`flex items-center gap-1.5 truncate ${
            isDark ? 'text-ink-inverse-sub' : 'text-ink-secondary'
          }`}
        >
          <Cpu size={12} className="flex-shrink-0 text-olive" />
          <span className="truncate">{hardware}</span>
        </div>

        {/* POSIX Mount point */}
        {!compact && mountPoint && (
          <div
            className={`flex items-center justify-between text-[10px] pt-1.5 border-t ${
              isDark
                ? 'border-hairline-dark text-ink-inverse-mute'
                : 'border-hairline-light text-ink-tertiary'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <HardDrive size={11} className="text-olive" />
              <span className="font-semibold text-olive">{mountPoint}</span>
            </div>
            {throughput && <span>{throughput}</span>}
          </div>
        )}
      </div>
    </div>
  );
};
