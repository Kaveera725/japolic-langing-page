import React from 'react';

export interface SystemStatusIndicatorProps {
  status?: 'nominal' | 'active' | 'synced' | 'warning' | 'offline';
  label?: string;
  sublabel?: string;
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md';
  pulse?: boolean;
  className?: string;
}

export const SystemStatusIndicator: React.FC<SystemStatusIndicatorProps> = ({
  status = 'nominal',
  label,
  sublabel,
  theme = 'light',
  size = 'md',
  pulse = true,
  className = '',
}) => {
  const isDark = theme === 'dark';

  const statusColors = {
    nominal: {
      dot: 'bg-olive',
      pulse: 'bg-olive',
      text: isDark ? 'text-olive-light' : 'text-olive',
      border: isDark ? 'border-olive/30' : 'border-olive/20',
      bg: isDark ? 'bg-olive-dim/40' : 'bg-olive-wash',
    },
    active: {
      dot: 'bg-olive',
      pulse: 'bg-olive',
      text: isDark ? 'text-olive-light' : 'text-olive',
      border: isDark ? 'border-olive/40' : 'border-olive/30',
      bg: isDark ? 'bg-olive-dim/60' : 'bg-olive-wash',
    },
    synced: {
      dot: 'bg-olive',
      pulse: 'bg-olive',
      text: isDark ? 'text-[#8DA392]' : 'text-olive',
      border: isDark ? 'border-white/10' : 'border-hairline-light',
      bg: isDark ? 'bg-canvas-dark-subtle' : 'bg-canvas-subtle',
    },
    warning: {
      dot: 'bg-amber',
      pulse: 'bg-amber',
      text: 'text-amber',
      border: isDark ? 'border-amber/30' : 'border-amber/20',
      bg: isDark ? 'bg-amber/10' : 'bg-amber-wash',
    },
    offline: {
      dot: 'bg-rust',
      pulse: 'bg-rust',
      text: 'text-rust',
      border: isDark ? 'border-rust/30' : 'border-rust/20',
      bg: isDark ? 'bg-rust/10' : 'bg-rust-wash',
    },
  }[status];

  const dotSize = size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2';

  return (
    <div
      className={`inline-flex items-center gap-2 font-mono ${
        size === 'sm' ? 'text-[10px]' : 'text-[11px]'
      } ${className}`}
    >
      <div
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs border ${statusColors.border} ${statusColors.bg}`}
      >
        <span className="relative flex items-center justify-center">
          {pulse && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusColors.pulse}`}
            />
          )}
          <span className={`relative inline-flex rounded-full ${dotSize} ${statusColors.dot}`} />
        </span>
        <span className={`font-semibold tracking-wider uppercase ${statusColors.text}`}>
          {label || status}
        </span>
      </div>

      {sublabel && (
        <span
          className={`tracking-wide ${
            isDark ? 'text-ink-inverse-mute' : 'text-ink-tertiary'
          }`}
        >
          {sublabel}
        </span>
      )}
    </div>
  );
};
