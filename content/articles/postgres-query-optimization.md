---
title: "Index Selectivity vs Covering Indexes: Tuning PostgreSQL Query Plans for Online Transaction Processing(OLTP) Workloads"
expertise: "backend-engineering"
slug: index-selectivity-vs-covering-indexes
tech: []
date: 2025-09-18
author: BeautifulCode
keytakeaway: "Effective PostgreSQL optimization requires understanding how index selectivity and covering indexes influence planner decisions, then validating assumptions with EXPLAIN ANALYZE to ensure estimated costs align with actual execution under production load patterns."
---

### Understanding Query Execution Plans Beyond EXPLAIN

Query execution plans expose the database planner's decision-making process, revealing whether sequential scans or index lookups dominate your query path. The planner evaluates cost estimates based on table statistics, but these estimates can diverge significantly from reality when data distributions are skewed or statistics are stale. Understanding the difference between Seq Scan, Index Scan, Index Only Scan, and Bitmap Heap Scan becomes critical when queries start degrading under load.

EXPLAIN ANALYZE bridges the gap between estimated and actual execution times, exposing planner miscalculations that lead to poor join strategies or incorrect index selection. When the estimated row count differs dramatically from actual rows returned, the planner may choose nested loops over hash joins, resulting in exponential performance degradation. This visibility allows engineers to pinpoint where autovacuum frequency or statistics targets need adjustment.

### Query Plan Patterns and Index Strategy

Different query patterns demand different indexing approaches. The artifact below shows when each strategy applies:

**Index Strategy Decision Matrix**

| Query Pattern | Index Type | Reason | Trade-off |
|--------------|------------|--------|-----------|
| SELECT specific columns WHERE condition | Covering Index | Eliminates heap access entirely | Larger index size, slower writes |
| SELECT * WHERE high-selectivity condition | B-tree Index | Fast lookup for selective queries | Ineffective for low-selectivity |
| SELECT WHERE condition1 AND condition2 | Composite Index | Supports multiple filter conditions | Column order matters critically |
| SELECT COUNT(*) WHERE condition | Index Only Scan | Visibility map enables heap bypass | Requires regular VACUUM |

Covering indexes shine when query throughput matters more than write performance. By including all SELECT columns in the index, PostgreSQL performs Index Only Scans that never touch the heap, cutting I/O dramatically. However, this comes at the cost of index bloat and slower INSERT/UPDATE operations, making it unsuitable for write-heavy tables.

### Index Selectivity and Planner Behavior

Index selectivity determines whether PostgreSQL uses an index at all. Calculated as distinct values divided by total rows, selectivity below 5-10% often triggers sequential scans because the planner estimates that reading scattered heap pages costs more than scanning the entire table. This explains why indexes on boolean columns or low-cardinality enums frequently get ignored, even when they exist.

The planner uses pg_statistic to estimate selectivity, but default statistics targets capture only 100 distinct values. For high-cardinality columns with skewed distributions, increasing the statistics target to 1000 or more provides better histogram data, leading to more accurate join order selection and index usage. Running ANALYZE after bulk operations ensures the planner has fresh data for cost estimation.

### Applied Insight: Connection Pooling and Query Performance

Connection pooling reduces the overhead of connection establishment but introduces resource contention when pool size exceeds available database connections. A pool sized too small creates queuing delays during traffic spikes, while oversized pools exhaust PostgreSQL's max_connections limit, causing connection failures. The optimal pool size typically equals (core_count × 2) + effective_spindle_count for disk-bound workloads.

Monitoring active connections versus idle connections reveals whether pool size aligns with actual concurrency needs. When query execution plans show good index usage but response times degrade under load, the bottleneck often sits at connection pooling misconfiguration rather than query structure. Tuning pool size alongside query optimization delivers compounding performance gains for OLTP systems.