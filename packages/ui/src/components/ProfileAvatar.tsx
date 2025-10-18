import React from 'react';
import { clsx } from 'clsx';

export interface ProfileAvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'circle' | 'square';
  className?: string;
  fallback?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  variant = 'circle',
  className,
  fallback,
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-20 h-20 text-2xl',
    '2xl': 'w-32 h-32 text-4xl',
  };

  const variantClasses = {
    circle: 'rounded-full',
    square: 'rounded-xl',
  };

  const classes = clsx(
    'flex items-center justify-center bg-gray-200 text-gray-600 font-medium flex-shrink-0',
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const displayText = fallback || (name ? getInitials(name) : '?');

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name || 'Avatar'}
        className={clsx(classes, 'object-cover')}
        onError={(e) => {
          // Fallback to text if image fails to load
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextElementSibling?.classList.remove('hidden');
        }}
      />
    );
  }

  return (
    <div className={classes}>
      {displayText}
    </div>
  );
};