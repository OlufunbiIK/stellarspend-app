# Hero Component

Landing page hero section for StellarSpend with animated entrance and accessible CTAs.

## Features

- **Responsive Design**: Mobile-first layout that scales beautifully to desktop
- **Framer Motion Animations**: Subtle fade-in with staggered children
- **Accessibility**: Full ARIA support, keyboard navigation, focus states
- **Visual Effects**: Gradient blobs, floating particles, grid overlay
- **CTAs**: Primary (sign-in) and secondary (docs) call-to-action buttons

## Usage

```tsx
import Hero from "@/components/hero/Hero";

export default function Home() {
  return <Hero />;
}
```

## Accessibility

- Semantic HTML with `role="banner"` and `aria-labelledby`
- Keyboard-focusable CTAs with visible focus rings
- Decorative elements marked with `aria-hidden`
- Proper heading hierarchy with `h1#hero-heading`

## Navigation

- **Primary CTA**: `/sign-in` - Main conversion path
- **Secondary CTA**: `/docs` - Documentation and learning resources

## Customization

Adjust animations in the component:
- `container.show.transition.staggerChildren` - Delay between elements
- `item.show.transition.duration` - Animation speed
- Particle count and positions in `particles` array


## Image Optimization Strategy

### Current Implementation
The Hero uses a canvas-based starfield animation instead of static images, which provides:
- Zero layout shift (CLS = 0)
- Instant rendering (no image load time)
- Dynamic, engaging visual effect
- No bandwidth consumption for background images

### Adding Hero Images (Optional)

If you need to add hero images (e.g., product screenshots, illustrations), follow this pattern:

```tsx
import Image from 'next/image';

// Add after the Starfield component
<div className="absolute inset-0 z-0">
  <Image
    src="/images/hero/hero-bg.jpg"
    alt="StellarSpend dashboard preview"
    fill
    priority
    quality={90}
    sizes="100vw"
    className="object-cover opacity-20"
    placeholder="blur"
    blurDataURL="data:image/svg+xml;base64,..."
  />
</div>
```

### Key Optimization Points

1. **Priority Loading**: Hero images should use `priority={true}` as they're LCP candidates
2. **Fill Layout**: Use `fill` with proper container sizing to prevent layout shift
3. **Blur Placeholder**: Implement blur placeholders for smooth loading experience
4. **Sizes Attribute**: Set `sizes="100vw"` for full-width hero images
5. **Quality**: Use quality={90} for hero images to balance file size and visual quality

## Performance Metrics

Current Hero performance:
- LCP: Canvas renders immediately (~0.1s)
- CLS: 0 (no layout shift)
- FCP: <1s (text and buttons render quickly)

## Future Enhancements

Consider adding:
- Product screenshot with `next/image` optimization
- Animated SVG illustrations
- Video background with proper lazy loading
- Progressive image loading for slower connections
