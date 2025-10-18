import React from 'react';
import { clsx } from 'clsx';

export interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  onClick?: () => void;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  hover = true,
  onClick,
}) => {
  const baseClasses = 'rounded-2xl border transition-all duration-200';

  const variantClasses = {
    default: 'bg-white border-gray-200 shadow-sm',
    dark: 'bg-gray-900 text-white border-gray-800 shadow-sm',
    glass: 'bg-white/80 backdrop-blur-md border-white/20 shadow-sm',
  };

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const hoverClasses = hover
    ? 'hover:shadow-md hover:border-gray-300 cursor-pointer'
    : '';

  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    hoverClasses,
    className
  );

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};