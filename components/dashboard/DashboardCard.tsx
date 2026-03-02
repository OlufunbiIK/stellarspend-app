'use client';

import Image from 'next/image';

interface DashboardCardProps {
  title: string;
  value: string;
  change: string;
  iconSrc?: string;
  trend?: 'up' | 'down' | 'neutral';
}

/**
 * Dashboard card component with optimized icon images
 * Demonstrates proper Image usage for small icons and graphics
 */
export default function DashboardCard({
  title,
  value,
  change,
  iconSrc,
  trend = 'neutral',
}: DashboardCardProps) {
  const trendColor = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-[#7a8aaa]',
  }[trend];

  return (
    <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#e8b84b]/20 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[#7a8aaa] text-sm mb-1">{title}</p>
          <p className="text-white text-3xl font-bold">{value}</p>
        </div>
        
        {iconSrc && (
          <div className="relative w-12 h-12 rounded-lg bg-[#e8b84b]/10 flex items-center justify-center">
            <Image
              src={iconSrc}
              alt={`${title} icon`}
              width={24}
              height={24}
              className="object-contain"
              loading="lazy"
            />
          </div>
        )}
      </div>
      
      <p className={`text-sm ${trendColor}`}>
        {change}
      </p>
    </div>
  );
}
