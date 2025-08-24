import React from 'react';
import { LucideIcon } from 'lucide-react';

interface GradientIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
}

export function GradientIcon({ icon: Icon, size = 24, className = '' }: GradientIconProps) {
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={className}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6A11CB" />
            <stop offset="100%" stopColor="#2575FC" />
          </linearGradient>
        </defs>
        <Icon 
          size={size} 
          stroke={`url(#${gradientId})`} 
          fill="none"
          style={{ 
            width: size, 
            height: size,
            stroke: `url(#${gradientId})`,
            strokeWidth: 2
          }} 
        />
      </svg>
    </div>
  );
}