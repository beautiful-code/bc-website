---
title: "Pre-Calculating Rolling Aggregates: Moving Real-Time Features from SQL to Stream Processing"
expertise: ai-applied-ml
slug: pre-calculating-rolling-aggregates
tech:
  - kafka
  - redis
  - python
date: 2025-10-14
author: BeautifulCode
keytakeaway: "Real-time ML features that rely on query-time aggregation will create latency bottlenecks; pre-calculating rolling windows through stream processing and serving from fast key-value stores keeps inference latency low while managing infrastructure costs predictably."
---

### The Latency Cost of Real-Time Queries

A machine learning model required a seemingly simple feature: the count of items a user viewed in the last 5 minutes. The initial approach used a direct "COUNT(*)" query against a live database table with a timestamp filter. This pattern worked in development, but production revealed the problem. Each prediction request triggered this query, and the database struggled with the rapid, repetitive lookups. A single feature calculation added 300ms of latency to the API endpoint, immediately violating the SLA and making the model unusable in production.

The root issue was architectural. Relational databases optimize for consistency and complex queries, not sub-millisecond point lookups on time-windowed aggregates. Even with proper indexing, scanning recent records and aggregating on every request creates query contention under load.

### Stream Processing Architecture

**Pattern: Pre-Calculate → Store → Serve**

```
User Events → Kafka Topic → Flink Job → Redis
                              ↓
                    Rolling Window Aggregation
                    (5-minute tumbling window)
                              ↓
                    Key: user_id
                    Value: view_count
                              ↓
                    TTL: 6 minutes
```

The solution separated feature calculation from feature serving. A Flink stream processing job consumed user view events from Kafka, maintained rolling 5-minute windows per user, and wrote the aggregated counts to Redis with a short TTL. The API endpoint switched from querying the database to a simple Redis GET operation, dropping latency from 300ms to under 5ms.

### Infrastructure Trade-Offs

This architecture introduced new operational complexity. The system now required Kafka for event streaming, Flink for stateful stream processing, and Redis for low-latency storage. Each component needed monitoring, scaling strategies, and failure handling. Stream processing added eventual consistency—there's a small delay between an event occurring and the aggregate updating. For most ML use cases, this staleness is acceptable, but it requires setting clear expectations with model owners.

The cost analysis favored this approach. The database CPU utilization dropped significantly, avoiding expensive vertical scaling. Redis memory costs were predictable and relatively low since only active users needed entries. The Flink job scaled horizontally based on event throughput.

### Applied Insight

Before implementing any real-time feature, ask two questions: "Can this be pre-calculated?" and "What is the latency budget?" Most ML features don't need instant recalculation on every prediction. Time-windowed aggregates, user profiles, and behavioral counts can be updated asynchronously through stream processing. Reserve synchronous database queries for features that genuinely require real-time consistency. This design pattern applies broadly—any rolling aggregate, session metric, or temporal feature benefits from pre-calculation over query-time computation.