---
title: "The Hidden Cost of Federated Queries Between BigQuery and Cloud SQL"
expertise: data-engineering
slug: the-hidden-cost-of-federated-queries-between-bigquery-and-cloud-sql
tech:
  - bigquery
  - mysql
date: 2025-10-12
author: BeautifulCode
keytakeaway: "Federated queries between BigQuery and Cloud SQL are best reserved for small, real-time lookups; materialize larger datasets into BigQuery to avoid compounding network, compute, and cost overhead on every scan."
---

### The Compute Boundary Bottleneck

Federated queries between BigQuery and Cloud SQL introduce a fundamental constraint: data must cross the compute boundary. When BigQuery federates to Cloud SQL, it pulls rows over a connection with finite throughput. This means parallelism is capped by Cloud SQL's CPU, IO capacity, and connection limits, not by BigQuery's distributed slots. Even when both services are colocated in the same region, you reduce latency but the throughput ceiling remains. The network hop becomes the primary bottleneck, especially for wide scans or large result sets.

### Limited Predicate Pushdown

Predicate pushdown means filtering happens at the source before data crosses the network. BigQuery can push simple filters like "WHERE status = 'active'" to Cloud SQL, so only matching rows transfer. But this optimization fails with complex logic. A query with subqueries or window functions forces BigQuery to pull the entire table first, then filter afterward. The hidden cost: your WHERE clause looks efficient in SQL, but Cloud SQL is still doing a full table scan and shipping millions of rows across the network before BigQuery applies your actual filter.

**Artifact: When Predicate Pushdown Fails**

| Query Pattern                         | Pushdown Behavior     | What Actually Happens                            |
| ------------------------------------- | --------------------- | ------------------------------------------------ |
| Simple WHERE on indexed column        | Pushed to Cloud SQL   | Cloud SQL filters first, minimal transfer        |
| Complex JOIN with subqueries          | Not pushed, full scan | All rows transferred, then joined in BigQuery    |
| Aggregations with CASE expressions    | Partially pushed      | Some filtering at source, rest after transfer    |
| Window functions over federated table | Not pushed            | Entire table transferred for BigQuery to process |

### Cost Compounding on Re-Scans

Every federated query incurs dual costs: BigQuery charges for bytes processed during analysis, while Cloud SQL burns CPU, IO, and network resources. For repeated analytics workloads, this compounds quickly. The better pattern is to extract data once into a BigQuery staging table or use incremental loads, then query locally. This shifts the cost from per-query network transfer to one-time ingestion, letting BigQuery's columnar storage and slot-based execution handle subsequent queries efficiently.

### Applied Insight: Use Federation Surgically

Reserve federated queries for light, real-time lookups like reference tables under a few GB or one-off validation checks. Avoid using federation for heavy joins or aggregations where BigQuery's distributed engine should do the work. For consistency, define clear cutoffs like "as of hh:mm UTC" and prefer read replicas for BI workloads to avoid isolation mismatches. Implement least-privilege connections, enforce query guards with LIMIT during development, and monitor both Cloud SQL CPU/IO and BigQuery bytes scanned to prevent noisy-neighbor incidents and surprise bills.
