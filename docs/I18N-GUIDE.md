# Internationalization (i18n) Guide

## Overview

StellarSpend now supports multi-language functionality using `react-i18next` and `i18next`. The application currently supports:
- 🇺🇸 English (en)
- 🇪🇸 Español (es)

## Architecture

### Core Components

1. **I18nProvider** (`components/I18nProvider.tsx`)
   - Wraps the entire application
   - Manages language state and persistence
   - Provides translation context

2. **LanguageSelector** (`components/settings/LanguageSelector.tsx`)
   - Reusable component with two variants:
     - `dropdown`: Compact selector for navbar/sidebar
     - `list`: Full-page selector for settings

3. **Translation Files** (`locales/{lang}/common.json`)
   - JSON-based translations organized by feature
   - Easy to extend with new languages

## Usage

### In Client Components

```tsx
'use client';

import { useI18n } from '@/components/I18nProvider';

export default function MyComponent() {
  const { t, language, changeLanguage } = useI18n();
  
  return (
    <div>
      <h1>{t('dashboard.welcome')}</h1>
      <p>{t('hero.subtitle')}</p>
    </div>
  );
}
```

### Translation Keys Structure

```json
{
  "section": {
    "key": "Translation text",
    "nested": {
      "key": "Nested translation"
    }
  }
}
```

Access with dot notation: `t('section.nested.key')`

### Adding New Languages

1. Create new locale folder: `locales/fr/`
2. Copy and translate `common.json`
3. Update `I18nProvider.tsx`:
   ```ts
   import commonFr from '@/locales/fr/common.json';
   
   resources: {
     en: { translation: commonEn },
     es: { translation: commonEs },
     fr: { translation: commonFr }, // Add here
   }
   ```
4. Add to `LanguageSelector` languages array

### Adding New Translation Keys

1. Add to all locale files (en, es, etc.)
2. Use descriptive key names
3. Group by feature/section
4. Access via `t('section.key')`

## Features

### ✅ Language Persistence

Language preference is automatically saved to localStorage and persists across:
- Page refreshes
- Navigation
- Browser sessions

### ✅ No Reload Required

Language switching happens instantly without page reload using React context.

### ✅ Fallback Support

If a translation is missing, the system falls back to English.

### ✅ Type Safety

All translation keys are validated at runtime.

## File Structure

```
stellarspend-app/
├── locales/
│   ├── en/
│   │   └── common.json
│   └── es/
│       └── common.json
├── components/
│   ├── I18nProvider.tsx
│   └── settings/
│       └── LanguageSelector.tsx
└── app/
    ├── layout.tsx
    └── dashboard/
        ├── layout.tsx
        └── settings/
            └── page.tsx
```

## Testing

### Manual Testing Checklist

- [ ] Navigate to Settings page
- [ ] Switch between English and Spanish
- [ ] Verify UI updates without reload
- [ ] Refresh page and confirm language persists
- [ ] Check mobile sidebar language selector
- [ ] Test dropdown variant in header

### Programmatic Testing

```tsx
// Test language change
const { changeLanguage } = useI18n();
await changeLanguage('es');
expect(language).toBe('es');
```

## Best Practices

1. **Use semantic keys**: `settings.language.title` instead of `title1`
2. **Keep translations organized**: Group by feature/page
3. **Avoid hardcoded strings**: Always use `t()` for user-facing text
4. **Test all languages**: Verify translations display correctly
5. **Consider text length**: Translations may vary in length

## Future Enhancements

- [ ] Add more languages (French, German, etc.)
- [ ] Server-side rendering support with next-i18next
- [ ] RTL language support (Arabic, Hebrew)
- [ ] Dynamic language loading for better performance
- [ ] Language-specific date/number formatting
- [ ] Pluralization support
- [ ] Context-based translations

## Troubleshooting

### Issue: Translations not loading

**Solution**: Ensure I18nProvider wraps your component tree

### Issue: Language doesn't persist

**Solution**: Check localStorage access in browser DevTools

### Issue: Missing translations

**Solution**: Add fallback or ensure all locale files have the key

## Resources

- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Documentation](https://www.i18next.com/)
- [Next.js i18n Guide](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
