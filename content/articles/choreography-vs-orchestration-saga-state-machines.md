---
title: "Choreography vs Orchestration: Designing Resilient Saga State Machines"
expertise: "backend-engineering"
slug: choreography-vs-orchestration-saga-state-machines
tech: []
date: 2025-09-30
author: BeautifulCode
keytakeaway: Orchestration with idempotent steps and explicit compensation logic provides the reliability needed for complex distributed transactions, while choreography trades visibility for loose coupling in simpler domains.
---

### The Problem with Distributed Transactions

Traditional ACID transactions work great in monoliths, but microservices break this model. When a single business operation spans multiple services, you can't rely on a database-level transaction. A payment processing flow might hit the payment service, inventory service, and notification service. If the inventory service fails after the payment succeeds, you're left with an inconsistent state. Sagas solve this by breaking long-running transactions into smaller, independent steps, each with its own compensating action. Instead of rolling back atomically, you unwind completed steps when a failure occurs.

### Two Coordination Patterns

Sagas coordinate across services using one of two approaches. Choreography uses events to loosely couple services, each service listens for events and publishes new ones in response. Orchestration uses a central coordinator that explicitly tells each service what to do and manages the workflow.

| Aspect | Choreography | Orchestration |
|--------|-------------|---------------|
| Coordination | Event-driven, decoupled | Central orchestrator service |
| Complexity | Simple per-service logic | Complex orchestrator logic |
| Failure Visibility | Events might get lost | Clear state machine visibility |
| Testing | Difficult across services | Easier to test state flows |
| Latency | Higher due to event async | Lower with direct calls |
| Debugging | Hard to trace flow | Easier with centralized logs |

Choreography works well for simple flows with few services. Orchestration scales better for complex workflows where you need explicit state tracking and clear compensation chains. Most production systems use orchestration because the cost of a bug is higher than the cost of maintaining a central coordinator.

### Compensation Logic and Idempotency

Compensating actions must undo the effects of previous steps. If a payment was captured, you refund it. If inventory was reserved, you release it. The tricky part is idempotency. Network failures might cause a step to retry multiple times, and each retry must produce the same result. A payment capture that runs twice should only charge once. This means every saga step needs a way to detect if it already ran and return the same response.

Design compensation transactions to be idempotent by using unique identifiers (idempotency keys) and storing results. When a step retries, you check if the same key already exists and return the cached result instead of re-executing. This prevents double-charging, double-booking, or other duplicate effects. Compensation actions themselves must also be idempotent. Refunding the same payment twice should succeed both times without creating two negative charges.

### Applied Insight

State machine design determines whether your saga can handle all failure scenarios. Map out every possible path through your steps and explicitly define what happens at each failure point. Which steps are compensatable and which are not? A payment capture might be reversible, but emailing a customer confirmation might not require compensation (it's informational). 

Use orchestration when you need strong consistency guarantees, explicit state visibility, and complex multi-step flows. Use choreography when services are truly independent and the failure domain is small. Always test compensation paths as thoroughly as happy paths. Most saga bugs surface during network failures or cascading compensation chains, not during normal execution. Start with orchestration if you're uncertain. It's easier to refactor later than to debug mysterious state inconsistencies in production.