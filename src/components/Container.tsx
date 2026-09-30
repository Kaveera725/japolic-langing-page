import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav' | 'main';
  size?: 'default' | 'narrow' | 'readable';
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  as: Component = 'div',
  size = 'default',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    default: 'max-w-layout',
    narrow: 'max-w-narrow',
    readable: 'max-w-readable',
  }[size];

  return (
    <Component
      className={`mx-auto w-full px-5 sm:px-8 lg:px-10 ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
