'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  index: number;
}

// Shimmer effect for loading placeholder
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#1a1a2e" offset="20%" />
      <stop stop-color="#2a2a3e" offset="50%" />
      <stop stop-color="#1a1a2e" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#1a1a2e" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export default function FeatureCard({
  title,
  description,
  imageSrc,
  imageAlt,
  index,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 hover:border-[#e8b84b]/30 transition-all duration-300">
        {/* Feature Image */}
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-[#e8b84b]/10 to-[#4aa9e8]/10">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(400, 300))}`}
          />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-[#7a8aaa] text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
