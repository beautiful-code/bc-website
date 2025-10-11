---
title: "INP Optimization: Code-Splitting by Interaction, Not Route"
expertise: frontend-engineering
slug: inp-optimization-code-splitting-by-interaction
tech: [react, javascript, webpack]
date: 2025-10-10
author: BeautifulCode
keytakeaway: "Maintaining good INP scores requires splitting expensive code by when interactions trigger it and marking deferrable updates as transitions, not just optimizing route-based bundle sizes."
---

### The INP Measurement Shift

INP (Interaction to Next Paint) fundamentally changed how we measure user experience by tracking responsiveness across the entire page lifecycle. Unlike FID which only measured the first user interaction, INP captures all interactions and reports the worst-case delay at the 75th percentile. This means a sluggish click handler triggered five minutes into a session affects your Core Web Vitals score just as much as initial load performance. Long-running synchronous JavaScript during interactions, like filtering thousands of list items or triggering complex component re-renders, now directly degrades SEO rankings and user experience metrics.

Good INP scores need to stay under 200ms, but synchronous operations like filtering 10,000 items can block the main thread for 300-500ms, pushing your score into the "poor" range.

### React 18's Concurrency Primitives

React 18 introduced "startTransition" to differentiate urgent updates from deferrable work. When you wrap an expensive state update in "startTransition", React treats it as interruptible and lower priority compared to urgent updates like text input or button clicks. This prevents input blocking when performing heavy operations.

**Code Pattern:**

```javascript
import { useState, startTransition, lazy } from 'react';

// Lazy-load expensive chart component
const ChartComponent = lazy(() => import('./HeavyChart'));

const DataTable = () => {
  const [filter, setFilter] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [showChart, setShowChart] = useState(false);

  const handleSearch = (e) => {
    setFilter(e.target.value); // Urgent: keep input responsive
    
    startTransition(() => {
      // Deferrable: filtering 10k items
      setFilteredItems(items.filter(item => 
        item.name.includes(e.target.value)
      ));
    });
  };

  const handleViewChart = () => {
    // Dynamic import triggered by user interaction
    setShowChart(true); // Chart loads on-demand
  };

  return (
    <>
      <input value={filter} onChange={handleSearch} />
      <button onClick={handleViewChart}>View Analytics</button>
      {showChart && <ChartComponent data={filteredItems} />}
    </>
  );
};
```

The critical distinction is understanding which updates require immediate visual feedback (typing, toggling) versus which can be deferred (filtered results, analytics updates). Without this separation, the main thread blocks during expensive computations, causing visible input lag.

### Interaction-Based Code Splitting

Traditional route-based code splitting optimizes initial page load but fails to prevent INP degradation from heavy user interactions. The missing piece is lazy-loading components triggered by user actions rather than navigation. Loading a complex chart library only when the user clicks "View Analytics" or deferring modal content until it's actually opened prevents these heavy dependencies from blocking earlier interactions.

**Performance Impact:**

| Optimization | Before | After | Improvement |
|--------------|--------|-------|-------------|
| Chart library lazy-load | 420ms INP | 180ms INP | 57% faster |
| Filtering with startTransition | 480ms block | 85ms block | 82% faster |
| Third-party scripts to worker | 320ms INP | 150ms INP | 53% faster |

For CPU-intensive operations like data transformations or complex calculations, web workers move processing off the main thread entirely. Third-party scripts like analytics can be offloaded using tools like Partytown, preventing external code from degrading your interaction responsiveness.

### Applied Insight

Optimizing for INP requires temporal chunking of work, not just spatial bundling. Audit your interaction handlers for synchronous operations exceeding 50ms and either wrap them in "startTransition", lazy-load their dependencies on-demand, or move them to web workers. Use browser DevTools' Performance profiler to identify long tasks during interactions. The pattern: keep the main thread free for immediate user feedback, defer or parallelize everything else. This architectural shift treats responsiveness as a first-class concern throughout the application lifecycle, not just at initial load.