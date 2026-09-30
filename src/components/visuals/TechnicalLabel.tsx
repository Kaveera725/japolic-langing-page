import React from 'react';

export interface TechnicalLabelProps {
  children: React.ReactNode;
  variant?: 'outline' | 'solid' | 'bracket' | 'olive' | 'amber';
  theme?: 'light' | 'dark';
  size?: 'xs' | 'sm' | 'md';
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const TechnicalLabel: React.FC<TechnicalLabelProps> = ({
  children,
  variant = 'outline',
  theme = 'light',
  size = 'sm',
  prefix,
  suffix,
  className = '',
}) => {
  const isDark = theme === 'dark';

  const sizeClasses = {
    xs: 'text-[9px] px-1.5 py-0.5',
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-[11px] px-2.5 py-1',
  }[size];

  const variantClasses = {
    outline: isDark
      ? 'border border-hairline-dark bg-canvas-dark-card text-ink-inverse-sub'
      : 'border border-hairline-light bg-canvas-elevated text-ink-secondary',
    solid: isDark
      ? 'bg-canvas-dark-subtle text-ink-inverse'
      : 'bg-canvas-subtle text-ink-primary',
    bracket: isDark
      ? 'bg-transparent text-ink-inverse-mute font-mono'
      : 'bg-transparent text-ink-tertiary font-mono',
    olive: isDark
      ? 'border border-olive/40 bg-olive-dim/40 text-olive-light'
      : 'border border-olive/30 bg-olive-wash text-olive',
    amber: isDark
      ? 'border border-amber/40 bg-amber/10 text-amber'
      : 'border border-amber/30 bg-amber-wash text-amber',
  }[variant];

  if (variant === 'bracket') {
    return (
      <span className={`font-mono inline-flex items-center tracking-wider ${sizeClasses} ${className}`}>
        <span className="text-olive select-none mr-0.5">[</span>
        <span className={isDark ? 'text-ink-inverse' : 'text-ink-primary'}>{children}</span>
        <span className="text-olive select-none ml-0.5">]</span>
      </span>
    );
  }

  return (
    <span
      className={`font-mono rounded-xs inline-flex items-center gap-1.5 tracking-wider uppercase font-medium ${sizeClasses} ${variantClasses} ${className}`}
    >
      {prefix && <span className="opacity-60 font-normal">{prefix}</span>}
      <span>{children}</span>
      {suffix && <span className="opacity-60 font-normal">{suffix}</span>}
    </span>
  );
};
