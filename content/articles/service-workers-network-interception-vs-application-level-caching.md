---
title: "Service Workers: Network Interception vs. Application-Level Caching Trade-offs"
expertise: frontend-engineering
slug: service-workers-network-interception-vs-application-level-caching
tech: [js, typescript, webpack]
date: 2025-10-13
author: BeautifulCode
keytakeaway: "Service workers enable offline-first web applications through network-level request interception, but production success requires matching cache strategies to resource characteristics and implementing explicit update UX to navigate the complex activation lifecycle."
---

### Request Interception at the Browser Level

Service workers intercept fetch requests before they reach the network layer, unlike "localStorage" or "IndexedDB" which only store data. Running in a separate worker thread, they persist across page reloads and tabs, enabling true offline functionality by returning cached responses, implementing retry logic, or constructing synthetic responses.

```javascript
// Register service worker
navigator.serviceWorker.register('/sw.js').then(reg => {
  console.log('Service worker registered', reg.scope);
});

// Inside sw.js - intercept all fetch requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
```

### Cache Strategy Selection Matrix

Different resource types need different caching approaches. "Cache First" serves cached content instantly, ideal for static assets but risks stale data. "Network First" prioritizes freshness for API calls but adds latency. "Stale While Revalidate" serves cache immediately while fetching updates in background, offering best perceived performance but requiring careful state management.

```javascript
// Cache First - static assets
if (event.request.url.includes('/static/')) {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
}

// Network First - API calls
if (event.request.url.includes('/api/')) {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
}
```

### The Service Worker Lifecycle State Machine

New service workers enter "installed" state but wait until all tabs using the old version close before activating. This waiting period can last days if users keep tabs open. Calling "skipWaiting()" forces immediate activation but creates race conditions where in-flight requests might be handled by the old worker while new page loads use the updated version, causing data schema mismatches.

### Applied Insight: Update UX and Activation Patterns

Production PWAs require explicit update prompts. Detect waiting workers and communicate via "postMessage()" to trigger "skipWaiting()" followed by "clients.claim()" for immediate control.

```javascript
// Detect updates
navigator.serviceWorker.register('/sw.js').then(reg => {
  reg.addEventListener('updatefound', () => {
    const newWorker = reg.installing;
    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        showUpdatePrompt(); // Show banner
      }
    });
  });
});

// Inside sw.js
self.addEventListener('message', event => {
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
```