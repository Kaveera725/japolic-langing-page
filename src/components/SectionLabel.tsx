import React from 'react';

interface SectionLabelProps {
  label: string;
  dot?: boolean;
  variant?: 'light' | 'dark' | 'olive';
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  label,
  dot = false,
  variant = 'olive',
  className = '',
}) => {
  const variantStyles = {
    olive: 'text-olive border-olive/30 bg-olive-wash/60',
    dark: 'text-ink-inverse-sub border-white/15 bg-white/5',
    light: 'text-ink-secondary border-hairline-strong bg-canvas-subtle',
  }[variant];

  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 font-mono text-[11px] font-medium tracking-wider uppercase rounded-xs border ${variantStyles} ${className}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            variant === 'olive' ? 'bg-olive' : 'bg-current'
          }`}
        />
      )}
      <span>{label}</span>
    </div>
  );
};
