import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'inverse' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  icon,
  iconPosition = 'right',
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'group inline-flex items-center justify-center font-sans font-medium transition-all duration-150 ease-out border rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none tracking-tight interactive-button';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  }[size];

  const variantStyles = {
    primary:
      'bg-olive border-[#2F4233] text-white hover:bg-olive-light shadow-subtle hover:shadow-card active:bg-olive-dim',
    secondary:
      'bg-transparent border-hairline-strong text-ink-primary hover:bg-canvas-subtle hover:border-ink-secondary',
    inverse:
      'bg-white/5 border-white/20 text-ink-inverse hover:bg-white/10 hover:border-white/40',
    ghost:
      'bg-transparent border-transparent text-ink-secondary hover:text-ink-primary hover:bg-canvas-subtle',
  }[variant];

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="inline-flex shrink-0 transition-transform duration-150 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="inline-flex shrink-0 transition-transform duration-150 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
};
