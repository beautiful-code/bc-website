---
title: "Micro-Frontend Communication: Event-Driven vs Shared State vs BFF Trade-offs"
expertise: "frontend-engineering"
slug: "micro-frontend-communication-event-driven-vs-shared-state-vs-bff-tradeoffs"
tech: ["rxjs", "redux"]
date: "2025-10-13"
author: "BeautifulCode"
keytakeaway: "Micro-frontend communication trades independence for visibility: event-driven patterns hide data flow, shared state forces coordinated deployments, and per-team BFFs multiply infrastructure costs."
---

### The Debugging Cost of Event-Driven Decoupling

When you split a monolithic frontend into independent micro-frontends, each team-owned application needs to communicate without creating tight coupling. A shopping cart module must notify the header when items change, and the checkout flow needs access to authentication state. Traditional approaches like direct function imports defeat the purpose of micro-frontends by creating dependencies between codebases. The fundamental tension: how do you let applications talk to each other while keeping them truly independent? Three patterns emerge, each trading different aspects of simplicity for autonomy.

### Event Versioning and Consumer Contracts

Changing event payloads breaks consumers silently. When checkout changes "cart:updated" to include new fields or restructure data, all listening modules must adapt simultaneously. This recreates the API contract problem that micro-frontends aimed to solve. The solution requires explicit versioning like "cart:updated:v2" with parallel support for older versions during migration periods. Teams must maintain event registries documenting payload schemas, effectively building an internal event API specification that needs governance and documentation.

**Event Communication Patterns**

```javascript
// Pattern 1: CustomEvent with versioning
window.dispatchEvent(new CustomEvent('cart:updated:v2', {
  detail: { items: [], total: 0, currency: 'USD' }
}))

// Pattern 2: Shared event bus
window.eventBus.emit('cart:updated', payload)

// Pattern 3: URL-based state (looser coupling)
// Embed state in query params
history.pushState(null, '', '?cartTotal=150')
// Other apps listen to popstate events
```

**Communication Approach Trade-offs**

| Approach | Coupling | Debugging | Deployment | Type Safety |
|----------|----------|-----------|------------|-------------|
| Event-Driven | Loose | Runtime logs required, invisible data flow | Independent | Lost at runtime |
| Shared State Store | Tight | IDE navigation works | Coordinated releases | Strong with TypeScript |
| Per-Team BFF | Loose | Clear API boundaries | Independent | Strong with schemas |

### Shared State Stores Create Runtime Dependencies

Using a shared Zustand or Redux store from a common package introduces implicit coupling. When the authentication store interface changes, all micro-frontends must redeploy in lockstep. Version mismatches create runtime failures: App A on userStore v1.0 and App B on userStore v2.0 both update the same state object with incompatible shapes, causing synchronization bugs. The store becomes a coordination point requiring release orchestration. Browser-based alternatives like localStorage with StorageEvents or IndexedDB provide looser coupling since each app reads independently, but sacrifice type safety and real-time reactivity compared to in-memory stores.

### BFF Per Team: Autonomy Versus Infrastructure Multiplication

Giving each micro-frontend team their own Backend-for-Frontend maximizes autonomy. The checkout team controls data aggregation, caching strategies, and API contracts without coordinating with other teams. But infrastructure scales linearly: N teams require N GraphQL gateways, N authentication middleware implementations, N API key rotations, and N monitoring setups. Operational complexity multiplies while creating inconsistent API patterns across the product. A shared BFF reduces duplication but becomes a bottleneck requiring cross-team governance, coordinated deployments, and feature request prioritization across multiple consumers.