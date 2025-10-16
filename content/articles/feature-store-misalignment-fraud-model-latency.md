---
title: "Feature Store Misalignment: Why Our 50ms Fraud Model Became 500ms in Production"
expertise: ai-applied-ml
slug: feature-store-misalignment-fraud-model-latency
tech: ["redis", "python", "aws"]
date: 2025-10-14
author: BeautifulCode
keytakeaway: "Real-time ML model latency is dominated by feature retrieval, not inference; environment parity between training and production feature stores is essential to maintain SLAs."
---

### The Latency Gap

A fraud detection model that performed under 50ms during testing experienced a 10x latency increase in production, with p99 reaching 500ms. The model inference itself wasn't the bottleneck. The culprit was a single real-time feature "user_transaction_count_last_hour" that behaved differently across environments. While the model's computational cost remained constant, the feature retrieval layer introduced unexpected I/O overhead that only surfaced under production load.

### Environment Parity Breakdown

The data science team built their training pipeline using Redis as a feature cache, optimized for sub-millisecond lookups. Production services, however, were configured to query the transactional database directly for the same feature. This architectural divergence created a massive I/O bottleneck.

**Training vs Production Feature Retrieval:**

| Environment | Data Source | Latency | Impact |
|-------------|-------------|---------|---------|
| Training/Testing | Redis cache | <5ms | Model runs in 50ms |
| Production | Transactional DB | 400-450ms | API p99 hits 500ms |
| Root Cause | Missing Redis config | N/A | 10x latency spike |

The transactional database wasn't built for high-frequency reads. Each fraud check triggered a complex aggregation query scanning recent transaction logs, turning what should be a cache hit into an expensive table scan.

### Redis as Feature Store

Implementing Redis in production restored expected performance. Real-time aggregated features like transaction counts are pre-computed and stored in Redis with TTL-based expiration. The fraud detection service queries Redis first, falling back to the database only on cache misses. This pattern reduced feature retrieval from 400ms to under 5ms, bringing total API latency back to the expected 50-60ms range.

The key was establishing a unified feature serving layer. Both training and inference environments now pull from the same Redis instance, ensuring environment parity. Features are written to Redis via a streaming pipeline that processes transaction events in near real-time, maintaining freshness while avoiding database load.

### Applied Insight

When deploying ML models with real-time features, infrastructure parity between training and production is critical. Always profile feature retrieval separately from model inference, and establish a dedicated feature store for high-frequency aggregations. If training uses cached features, production must too, otherwise latency SLAs will break under load regardless of model performance.