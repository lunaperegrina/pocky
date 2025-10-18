import React from 'react';
import { clsx } from 'clsx';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

export interface SocialLinkProps {
  platform: string;
  username: string;
  url: string;
  icon?: string;
  displayName?: string;
  variant?: 'default' | 'dark' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  showExternalIcon?: boolean;
  className?: string;
  onClick?: () => void;
}

const platformConfig = {
  github: {
    icon: '💻',
    color: 'bg-gray-600',
    hoverColor: 'hover:bg-gray-700',
  },
  linkedin: {
    icon: '💼',
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
  },
  twitter: {
    icon: '🐦',
    color: 'bg-sky-500',
    hoverColor: 'hover:bg-sky-600',
  },
  instagram: {
    icon: '📸',
    color: 'bg-pink-600',
    hoverColor: 'hover:bg-pink-700',
  },
  youtube: {
    icon: '📺',
    color: 'bg-red-600',
    hoverColor: 'hover:bg-red-700',
  },
  website: {
    icon: '🌐',
    color: 'bg-green-600',
    hoverColor: 'hover:bg-green-700',
  },
  email: {
    icon: '✉️',
    color: 'bg-indigo-600',
    hoverColor: 'hover:bg-indigo-700',
  },
};

export const SocialLink: React.FC<SocialLinkProps> = ({
  platform,
  username,
  url,
  icon,
  displayName,
  variant = 'default',
  size = 'md',
  showExternalIcon = true,
  className,
  onClick,
}) => {
  const config = platformConfig[platform as keyof typeof platformConfig] || platformConfig.website;
  const displayIcon = icon || config.icon;
  const displayTitle = displayName || platform.charAt(0).toUpperCase() + platform.slice(1);

  const baseClasses = 'flex items-center gap-3 rounded-xl transition-all duration-200';

  const variantClasses = {
    default: 'bg-gray-50 hover:bg-gray-100',
    dark: 'bg-gray-800 hover:bg-gray-700 text-white',
    minimal: 'hover:bg-gray-50',
  };

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5',
  };

  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button
      className={classes}
      onClick={handleClick}
      title={`${displayTitle}: ${username}`}
    >
      <div className={clsx('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', config.color)}>
        <span className="text-white text-lg">{displayIcon}</span>
      </div>
      <div className="flex-1 text-left">
        <p className="font-medium">{displayTitle}</p>
        <p className="text-sm text-gray-500">{username}</p>
      </div>
      {showExternalIcon && (
        <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
      )}
    </button>
  );
};