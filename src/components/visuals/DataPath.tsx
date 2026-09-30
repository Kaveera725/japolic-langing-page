import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

export interface DataPathProps {
  label: string;
  sublabel?: string;
  throughput?: string;
  protocol?: string;
  direction?: 'horizontal' | 'vertical';
  flowActive?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
}

export const DataPath: React.FC<DataPathProps> = ({
  label,
  sublabel,
  throughput,
  protocol = 'POSIX VFS',
  direction = 'horizontal',
  flowActive = true,
  theme = 'light',
  className = '',
}) => {
  const isDark = theme === 'dark';
  const isHorizontal = direction === 'horizontal';

  return (
    <div
      className={`relative flex items-center justify-between select-none ${
        isHorizontal ? 'flex-row w-full py-2' : 'flex-col h-full px-2'
      } ${className}`}
    >
      {/* Visual Bus Line with animated data pulse */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
          isHorizontal ? 'flex-row' : 'flex-col'
        }`}
      >
        <div
          className={`${
            isHorizontal
              ? 'w-full h-px bg-hairline-strong dark:bg-hairline-dark'
              : 'h-full w-px bg-hairline-strong dark:bg-hairline-dark'
          } relative overflow-hidden`}
        >
          {flowActive && (
            <div
              className={`absolute bg-olive ${
                isHorizontal
                  ? 'h-full w-12 animate-marquee'
                  : 'w-full h-12 animate-pulse'
              }`}
            />
          )}
        </div>
      </div>

      {/* High-Density Engineering Data Badge */}
      <div
        className={`relative z-10 px-3 py-1.5 rounded-xs border font-mono text-[10px] uppercase tracking-wider flex items-center gap-2 shadow-xs ${
          isDark
            ? 'bg-canvas-dark border-hairline-dark text-ink-inverse-sub'
            : 'bg-canvas-elevated border-hairline-light text-ink-secondary'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-olive animate-pulse" />
          <span className="font-semibold text-olive">{protocol}</span>
        </div>

        <div className="h-2.5 w-px bg-hairline-light dark:bg-hairline-dark" />

        <div className="flex items-center gap-1">
          <span>{label}</span>
          {sublabel && (
            <span className={isDark ? 'text-ink-inverse-mute' : 'text-ink-tertiary'}>
              ({sublabel})
            </span>
          )}
        </div>

        {throughput && (
          <>
            <div className="h-2.5 w-px bg-hairline-light dark:bg-hairline-dark" />
            <span className="text-olive font-semibold">{throughput}</span>
          </>
        )}

        {isHorizontal ? (
          <ArrowRight size={11} className="text-olive flex-shrink-0" />
        ) : (
          <ArrowDown size={11} className="text-olive flex-shrink-0" />
        )}
      </div>
    </div>
  );
};
