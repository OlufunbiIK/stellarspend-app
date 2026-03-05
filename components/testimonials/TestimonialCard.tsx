'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatarSrc: string;
  index: number;
}

export default function TestimonialCard({
  quote,
  author,
  role,
  avatarSrc,
  index,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#e8b84b]/20 transition-all duration-300"
    >
      {/* Quote */}
      <p className="text-[#e8edf8] text-base leading-relaxed mb-6 italic">
        "{quote}"
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#e8b84b]/20">
          <Image
            src={avatarSrc}
            alt={`${author} avatar`}
            fill
            sizes="48px"
            className="object-cover"
            priority={index === 0}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiMxYTFhMmUiLz48L3N2Zz4="
          />
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{author}</p>
          <p className="text-[var(--color-text-secondary)] text-xs">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}
