---
title: "Tailwind CSS Anti-patterns: @apply, Arbitrary Values, and Variant Composition"
expertise: frontend-engineering
slug: tailwind-css-antipatterns-apply-arbitrary-values-variant-composition
tech: [tailwind, react, typescript]
date: 2025-10-10
author: BeautifulCode
keytakeaway: "Tailwind's power comes from atomic utilities and component-level abstraction; avoid @apply, minimize arbitrary values through theme extension, and use merge utilities for reliable variant composition."
---

### The @apply Directive Defeats Atomic CSS

The "@apply" directive appears convenient for extracting repeated utility combinations into custom CSS classes, but it fundamentally undermines Tailwind's architecture. When you define a button class using "@apply bg-blue-500 px-4 py-2 rounded", the compiler generates a new CSS rule with all those properties duplicated. Instead of browsers reusing the atomic "bg-blue-500" utility across multiple elements, each "@apply" usage creates separate CSS output. This bloats your stylesheet and defeats the purpose of atomic CSS, where a single utility class is shared across thousands of DOM nodes. The bundle size grows linearly with "@apply" usage rather than staying constant with atomic utilities.

Tailwind's intended reuse mechanism is component abstraction at the framework level, not CSS level. Extract a React component, Vue component, or template partial rather than creating CSS classes. This keeps your styling atomic while enabling reuse through your component system.

### Arbitrary Values Signal Design System Gaps

**Artifact: Common Arbitrary Value Patterns**

```typescript
// Anti-pattern: One-off arbitrary values
<div className="top-[117px] left-[23px]" />
<span className="text-[#1da1f2] text-[13.5px]" />
<button className="shadow-[0_8px_16px_rgba(0,0,0,0.15)]" />

// Better: Extend theme with semantic tokens
// tailwind.config.js
theme: {
  extend: {
    spacing: {
      'header-offset': '117px',
      'sidebar-indent': '23px'
    },
    colors: {
      'twitter-blue': '#1da1f2'
    },
    fontSize: {
      'small-caption': '13.5px'
    }
  }
}

// Usage with semantic tokens
<div className="top-header-offset left-sidebar-indent" />
<span className="text-twitter-blue text-small-caption" />
```

When arbitrary values like "top-[117px]" or "text-[#1da1f2]" appear repeatedly in your codebase, they indicate incomplete design tokens. These magic numbers create maintenance debt since updating the value requires finding every occurrence. They also break design consistency since similar values like "[118px]" and "[117px]" might coexist without anyone noticing. The solution is extending your "tailwind.config.js" theme with proper semantic tokens that give these values meaningful names tied to your design system.

### Variant Composition Requires Merge Utilities

Naively concatenating className strings causes specificity conflicts. When you write "bg-blue-500" followed by conditionally adding "bg-red-500", CSS specificity rules don't guarantee the second class overrides the first, since both have equal specificity and order depends on CSS source order, not DOM order. This creates unpredictable rendering where variant props fail to override base styles.

Using "tailwind-merge" with "clsx" solves this by intelligently merging conflicting utilities. The library understands Tailwind's class structure and ensures "bg-red-500" properly overrides "bg-blue-500", making component variants reliable. This pattern is essential for building reusable components where props conditionally modify appearance without fighting CSS specificity.

### Applied Insight: Component-First, Theme-Second

Avoid "@apply" entirely and extract React components for reuse. When you reach for arbitrary values more than once, stop and extend your theme configuration with semantic tokens. Always use "tailwind-merge" when building component variants that accept className props, as naive string concatenation creates subtle bugs. These patterns keep your Tailwind usage atomic, maintainable, and aligned with the framework's design philosophy.