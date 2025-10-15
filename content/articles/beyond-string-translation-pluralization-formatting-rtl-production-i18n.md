---
title: "Beyond String Translation: Pluralization, Formatting, and RTL in Production I18n"
expertise: frontend-engineering
slug: beyond-string-translation-pluralization-formatting-rtl-production-i18n
tech: [react, typescript, tailwind]
date: 2025-10-10
author: BeautifulCode
keytakeaway: "Production internationalization requires ICU MessageFormat for plurals, memoized Intl formatters for locale-aware numbers and dates, logical CSS properties for RTL layouts, and testing with actual target locale content to catch BiDi and formatting edge cases."
---

### Pluralization Beyond English: ICU MessageFormat vs Naive Ternaries

Most engineers start internationalization (i18n) with simple ternaries like `count === 1 ? 'item' : 'items'` which works for English but breaks in 75% of world languages. Arabic has six plural categories (zero, one, two, few, many, other), Polish uses complex last-digit rules, and Japanese has no pluralization at all. International Components for Unicode (ICU) MessageFormat solves this with locale-aware syntax: `{count, plural, =0 {no items} one {# item} other {# items}}`. Libraries like `react-intl` and `i18next` implement ICU or compatible formats, but the critical failure point is translator handoff. Giving translators key-value JSON without plural context produces broken translations because they cannot see the grammatical structure. The translation workflow must expose ICU syntax or provide specialized tooling that makes plural categories visible.

### Locale-Aware Formatting: The Intl API and Performance Traps

```javascript
// Broken: assumes USD and English conventions
const bad = `$${price.toFixed(2)}`; 

// Correct: locale-aware formatting with memoization
const formatters = new Map();
const getCurrencyFormatter = (locale, currency) => {
  const key = `${locale}-${currency}`;
  if (!formatters.has(key)) {
    formatters.set(key, new Intl.NumberFormat(locale, { 
      style: 'currency', 
      currency 
    }));
  }
  return formatters.get(key);
};

// Usage in react-intl
import { FormattedNumber, FormattedMessage } from 'react-intl';

<FormattedNumber 
  value={1234.56} 
  style="currency" 
  currency="EUR" 
/> // Outputs: "1.234,56 €" for de-DE

<FormattedMessage 
  id="items.count"
  defaultMessage="{count, plural, =0 {no items} one {# item} other {# items}}"
  values={{ count: itemCount }}
/>
```

Writing `toFixed` for currency or manual string concatenation for dates assumes English conventions. German uses commas for decimals and suffix notation, Arabic uses different numerals, and Japanese groups by 10,000s not 1,000s. The browser `Intl` API handles numbers, dates, and currencies correctly, but creating new `Intl` formatters is expensive. Production code must memoize formatters or use libraries that cache internally. Date libraries like `date-fns` require explicit locale module imports. Testing i18n properly means running your application in target locales with real data, not just translating string keys.

### Right-to-Left Layouts: Logical Properties and Bidirectional Algorithm Gotchas

Flipping layouts for Arabic or Hebrew requires more than `direction: rtl`. Physical CSS properties like `margin-left` must become logical properties like `margin-inline-start` so they adapt to text direction. Icons need rotation flips (arrows point opposite), and absolute positioning, transforms, and animations require manual adjustments. Tailwind provides Right-to-Left (RTL) modifiers like `rtl:ml-4` and `ltr:mr-4`, but this only handles spacing. The Unicode Bidirectional (BiDi) algorithm automatically manages mixed-direction text (English words within Arabic sentences), but manual overrides using `unicode-bidi` or directional marks (Left-to-Right Mark `LRM`, Right-to-Left Mark `RLM`) create subtle rendering bugs. Most RTL issues only surface when testing with actual RTL content because Latin placeholder text does not trigger BiDi edge cases or reveal layout problems.

### Applied Insight: I18n Testing and Workflow Design

Internationalization failures occur at three points: implementation (naive string handling), translation workflow (missing context for translators), and testing (not running actual target locales). Production i18n requires ICU-compatible libraries, memoized `Intl` formatters, logical CSS properties for RTL, and a translation workflow that exposes grammatical context. Testing must include running the application in target locales with real content, especially RTL languages and complex plural forms. String translation is the easiest part; formatting, pluralization, and layout are where most implementations break.