import React from 'react';

export interface ConnectionLineProps {
  orientation?: 'horizontal' | 'vertical';
  length?: string | number;
  flowDirection?: 'forward' | 'backward' | 'bidirectional' | 'none';
  variant?: 'solid' | 'dashed' | 'dotted';
  theme?: 'light' | 'dark';
  label?: string;
  sublabel?: string;
  markerStart?: 'circle' | 'square' | 'none';
  markerEnd?: 'circle' | 'arrow' | 'none';
  active?: boolean;
  className?: string;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({
  orientation = 'horizontal',
  length = '100%',
  flowDirection = 'forward',
  variant = 'solid',
  theme = 'light',
  label,
  sublabel,
  markerStart = 'circle',
  markerEnd = 'arrow',
  active = true,
  className = '',
}) => {
  const isDark = theme === 'dark';
  const isHorizontal = orientation === 'horizontal';

  const strokeColor = active
    ? isDark
      ? '#526F58'
      : '#3F5744'
    : isDark
    ? '#2C2925'
    : '#DDD7CB';

  const dotFill = active
    ? isDark
      ? '#526F58'
      : '#3F5744'
    : isDark
    ? '#706B62'
    : '#A49E93';

  return (
    <div
      className={`relative flex items-center justify-center select-none ${
        isHorizontal ? 'flex-row' : 'flex-col'
      } ${className}`}
      style={{
        width: isHorizontal ? (typeof length === 'number' ? `${length}px` : length) : 'auto',
        height: !isHorizontal ? (typeof length === 'number' ? `${length}px` : length) : 'auto',
      }}
    >
      {/* SVG Canvas for the connector line */}
      <svg
        className={`overflow-visible ${isHorizontal ? 'w-full h-4' : 'w-4 h-full'}`}
        viewBox={isHorizontal ? '0 0 100 16' : '0 0 16 100'}
        preserveAspectRatio="none"
      >
        <defs>
          <marker
            id={`arrow-end-${theme}-${active ? 'act' : 'inact'}`}
            markerWidth="6"
            markerHeight="6"
            refX="4"
            refY="3"
            orient="auto"
          >
            <path d="M 0 0 L 4 3 L 0 6" fill="none" stroke={strokeColor} strokeWidth="1.2" />
          </marker>
        </defs>

        {/* Main Line */}
        <line
          x1={isHorizontal ? '8' : '8'}
          y1={isHorizontal ? '8' : '8'}
          x2={isHorizontal ? '92' : '8'}
          y2={isHorizontal ? '8' : '92'}
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeDasharray={
            active && flowDirection !== 'none'
              ? '6 4'
              : variant === 'dashed'
              ? '4 3'
              : variant === 'dotted'
              ? '2 3'
              : undefined
          }
          className={
            active && flowDirection !== 'none'
              ? 'animate-flow-dash transition-all duration-300'
              : ''
          }
          markerEnd={markerEnd === 'arrow' ? `url(#arrow-end-${theme}-${active ? 'act' : 'inact'})` : undefined}
        />

        {/* Start Marker */}
        {markerStart === 'circle' && (
          <circle cx="8" cy="8" r="2.5" fill={dotFill} />
        )}
        {markerStart === 'square' && (
          <rect x="5.5" y="5.5" width="5" height="5" fill={dotFill} />
        )}

        {/* End Marker if circle */}
        {markerEnd === 'circle' && (
          <circle
            cx={isHorizontal ? '92' : '8'}
            cy={isHorizontal ? '8' : '92'}
            r="2.5"
            fill={dotFill}
          />
        )}
      </svg>

      {/* Center Label Badge */}
      {(label || sublabel) && (
        <div
          className={`absolute z-10 px-2 py-0.5 rounded-xs border font-mono text-[9px] uppercase tracking-wider flex items-center gap-1.5 shadow-xs whitespace-nowrap ${
            isDark
              ? 'bg-canvas-dark border-hairline-dark text-ink-inverse-sub'
              : 'bg-canvas-elevated border-hairline-light text-ink-secondary'
          }`}
        >
          {active && <span className="h-1 w-1 rounded-full bg-olive animate-pulse" />}
          <span>{label}</span>
          {sublabel && (
            <span className={isDark ? 'text-ink-inverse-mute' : 'text-ink-tertiary'}>
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
