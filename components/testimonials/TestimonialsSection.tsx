'use client';

import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    quote: 'StellarSpend helped me track my spending for the first time. No bank account needed, just my wallet.',
    author: 'Maria Santos',
    role: 'Small Business Owner',
    avatarSrc: '/images/avatars/maria.svg',
  },
  {
    quote: 'The low transaction fees mean I can actually afford to manage my money. This is a game changer.',
    author: 'James Chen',
    role: 'Freelance Developer',
    avatarSrc: '/images/avatars/james.svg',
  },
  {
    quote: 'Finally, a financial tool that respects my privacy and doesn\'t require endless paperwork.',
    author: 'Aisha Mohammed',
    role: 'Student',
    avatarSrc: '/images/avatars/aisha.svg',
  },
];

export default function TestimonialsSection() {
  return (
    <section
      className="relative w-full py-24 px-6"
      aria-label="User testimonials"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-white text-4xl md:text-5xl mb-4 tracking-tight">
            Trusted by <span className="text-[#e8b84b]">thousands</span>
          </h2>
          <p className="text-[#7a8aaa] text-lg max-w-2xl mx-auto">
            See what our users are saying about their experience with StellarSpend.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.author} {...testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
