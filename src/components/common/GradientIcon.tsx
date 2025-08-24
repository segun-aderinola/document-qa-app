import React from 'react';
import { LucideIcon } from 'lucide-react';

interface GradientIconProps {
  icon: LucideIcon;
  size?: number | string; // Accept both number and string
  className?: string;
}

export function GradientIcon({ icon: Icon, size = 24, className = '' }: GradientIconProps) {
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
  
  // Handle both number and string sizes
  const iconSize = typeof size === 'string' ? size : `${size}px`;
  const numericSize = typeof size === 'number' ? size : 24;
  
  return (
    <div className={className}>
      <svg 
        width={iconSize} 
        height={iconSize} 
        viewBox={`0 0 ${numericSize} ${numericSize}`} 
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6A11CB" />
            <stop offset="100%" stopColor="#2575FC" />
          </linearGradient>
        </defs>
        <Icon 
          size={numericSize} 
          stroke={`url(#${gradientId})`} 
          fill="none"
          style={{ 
            width: iconSize, 
            height: iconSize,
            stroke: `url(#${gradientId})`,
            strokeWidth: 2
          }} 
        />
      </svg>
    </div>
  );
}