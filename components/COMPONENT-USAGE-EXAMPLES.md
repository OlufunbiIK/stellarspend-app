# Component Usage Examples

## Image Optimization Components

### 1. FeatureCard

Use for feature sections with images.

```tsx
import FeatureCard from '@/components/features/FeatureCard';

<FeatureCard
  title="Real-time Tracking"
  description="Monitor transactions instantly"
  imageSrc="/images/features/tracking.jpg"
  imageAlt="Transaction tracking dashboard"
  index={0}
/>
```

**Key Features:**
- Responsive image with `fill` layout
- Blur placeholder for smooth loading
- Hover scale animation
- Optimized for Core Web Vitals

---

### 2. TestimonialCard

Use for user testimonials with avatars.

```tsx
import TestimonialCard from '@/components/testimonials/TestimonialCard';

<TestimonialCard
  quote="This app changed my financial life!"
  author="John Doe"
  role="Freelancer"
  avatarSrc="/images/avatars/john.jpg"
  index={0}
/>
```

**Key Features:**
- Fixed-size avatar (48x48)
- Priority loading for first testimonial
- Circular blur placeholder
- Accessible markup

---

### 3. OptimizedImage

Use for any static image that needs optimization.

```tsx
import OptimizedImage from '@/components/common/OptimizedImage';

<OptimizedImage
  src="/images/logo.png"
  alt="Company logo"
  width={200}
  height={50}
  priority={true}
  className="my-custom-class"
  sizes="(max-width: 768px) 100vw, 200px"
/>
```

**Key Features:**
- Shimmer loading effect
- Automatic blur placeholder
- Consistent quality (90%)
- Reusable across the app

---

### 4. DashboardCard

Use for dashboard metrics with icons.

```tsx
import DashboardCard from '@/components/dashboard/DashboardCard';

<DashboardCard
  title="Total Balance"
  value="1,234 XLM"
  change="+12.5% from last month"
  iconSrc="/images/icons/wallet.svg"
  trend="up"
/>
```

**Key Features:**
- Optimized icon images
- Lazy loading
- Trend indicators
- Responsive design

---

## Section Components

### 5. FeaturesSection

Complete features section with grid layout.

```tsx
import FeaturesSection from '@/components/features/FeaturesSection';

// In your page
<FeaturesSection />
```

**Customization:**
Edit the `features` array in `FeaturesSection.tsx`:
```tsx
const features = [
  {
    title: 'Your Feature',
    description: 'Feature description',
    imageSrc: '/images/features/your-image.jpg',
    imageAlt: 'Alt text',
  },
  // Add more features...
];
```

---

### 6. TestimonialsSection

Complete testimonials section with grid layout.

```tsx
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';

// In your page
<TestimonialsSection />
```

**Customization:**
Edit the `testimonials` array in `TestimonialsSection.tsx`:
```tsx
const testimonials = [
  {
    quote: 'Your testimonial quote',
    author: 'Author Name',
    role: 'Their Role',
    avatarSrc: '/images/avatars/author.jpg',
  },
  // Add more testimonials...
];
```

---

## Direct Next.js Image Usage

For custom implementations, use Next.js Image directly:

### Responsive Image (Fill Layout)

```tsx
import Image from 'next/image';

<div className="relative w-full h-64">
  <Image
    src="/images/hero-bg.jpg"
    alt="Hero background"
    fill
    priority
    sizes="100vw"
    className="object-cover"
    placeholder="blur"
    blurDataURL="data:image/svg+xml;base64,..."
  />
</div>
```

### Fixed Size Image

```tsx
import Image from 'next/image';

<Image
  src="/images/logo.png"
  alt="Logo"
  width={150}
  height={40}
  priority={true}
/>
```

### External Image

```tsx
import Image from 'next/image';

<Image
  src="https://images.unsplash.com/photo-123"
  alt="External image"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 800px"
/>
```

**Note:** Ensure domain is in `next.config.ts` `remotePatterns`.

---

## Best Practices

### 1. Always Set Alt Text
```tsx
// ✅ Good
<Image src="/img.jpg" alt="User dashboard showing budget overview" />

// ❌ Bad
<Image src="/img.jpg" alt="" />
```

### 2. Use Priority for LCP Images
```tsx
// ✅ Good - Hero image above fold
<Image src="/hero.jpg" alt="Hero" priority />

// ❌ Bad - Image below fold with priority
<Image src="/footer.jpg" alt="Footer" priority />
```

### 3. Specify Sizes for Responsive Images
```tsx
// ✅ Good
<Image 
  src="/img.jpg" 
  fill 
  sizes="(max-width: 768px) 100vw, 50vw" 
/>

// ❌ Bad - Missing sizes
<Image src="/img.jpg" fill />
```

### 4. Use Blur Placeholders
```tsx
// ✅ Good
<Image 
  src="/img.jpg" 
  placeholder="blur"
  blurDataURL="data:image/svg+xml;base64,..."
/>

// ⚠️ Okay but not optimal
<Image src="/img.jpg" />
```

### 5. Proper Container Sizing
```tsx
// ✅ Good - Container has defined size
<div className="relative w-full h-64">
  <Image src="/img.jpg" fill />
</div>

// ❌ Bad - Container has no size
<div className="relative">
  <Image src="/img.jpg" fill />
</div>
```

---

## Performance Checklist

When adding images, verify:
- [ ] Alt text is descriptive and meaningful
- [ ] Width and height are specified (or container sized for `fill`)
- [ ] `priority` is set for above-fold images only
- [ ] `sizes` attribute is specified for responsive images
- [ ] Blur placeholder is implemented
- [ ] External domains are in `next.config.ts`
- [ ] Images are optimized before upload (compressed, correct format)
- [ ] No layout shift when image loads

---

## Common Patterns

### Hero Section with Background Image
```tsx
<section className="relative h-screen">
  <Image
    src="/hero-bg.jpg"
    alt="Hero background"
    fill
    priority
    quality={90}
    sizes="100vw"
    className="object-cover"
  />
  <div className="relative z-10">
    {/* Hero content */}
  </div>
</section>
```

### Product Grid
```tsx
<div className="grid grid-cols-3 gap-4">
  {products.map((product, i) => (
    <div key={product.id} className="relative aspect-square">
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover rounded-lg"
        priority={i < 3}
      />
    </div>
  ))}
</div>
```

### Avatar with Fallback
```tsx
<div className="relative w-12 h-12 rounded-full overflow-hidden">
  <Image
    src={user.avatar || '/images/default-avatar.jpg'}
    alt={`${user.name} avatar`}
    fill
    sizes="48px"
    className="object-cover"
  />
</div>
```
