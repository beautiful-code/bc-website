---
title: "Silent Pipeline Failures: Detecting Zero-Row Publishes on GCP"
expertise-area: "Data Engineering"
slug: "silent-pipeline-failures-detecting-zero-row-publishes-gcp"
techtags: ["bigquery", "airflow", "kafka", "googlecloud", "dataform"]
date: "2025-10-09"
author: "BeautifulCode"
keytakeaway: "Monitoring task execution status is insufficient for data pipelines; layer heartbeat rows, freshness SLIs, volume bands, DLQ backlog alerts, and synthetic canaries to detect zero-row publishes before they become business incidents."
---

### The Problem: Success Status Masks Data Loss

When scheduled queries and Dataform jobs report "success" but publish zero rows, traditional task monitoring fails completely. Status checks validate execution completion, not data arrival. This creates a blind spot where pipelines run on schedule, logs show green, but downstream tables stop updating. The gap between task success and data delivery becomes invisible until business users notice stale dashboards hours or days later.

This failure mode is particularly insidious in event-driven architectures. A misconfigured filter, an upstream schema change, or a permissions issue can cause complete data loss while every monitoring dashboard shows healthy systems. The pipeline executes flawlessly, it just processes nothing.

### Heartbeat Rows: Per-Window Execution Markers

Every data pipeline should write a heartbeat record at window completion, independent of whether business data arrived. The heartbeat schema captures essential metadata: `dataset_name`, `window_start`, `window_end`, `rows_processed`, and `max_event_timestamp`. This creates an audit trail that survives even when the primary data flow stops.

**Artifact: Heartbeat Table Schema**

```sql
CREATE TABLE pipeline_heartbeats (
  dataset STRING NOT NULL,
  window_start TIMESTAMP NOT NULL,
  window_end TIMESTAMP NOT NULL,
  rows_processed INT64 NOT NULL,
  max_event_ts TIMESTAMP,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
);

-- Alert query runs every 15 minutes
SELECT dataset, window_end
FROM pipeline_heartbeats
WHERE window_end < TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 90 MINUTE)
  AND published_at IS NULL;
```

Alert on missing heartbeat rows, not task failures. If a hourly window closes without its heartbeat appearing within 90 minutes, the pipeline stopped publishing, regardless of what the scheduler reports. This shifts monitoring from "did the job run?" to "did data land?"

### Freshness and Volume: Dual Detection Layers

Freshness SLIs track `MAX(event_timestamp)` per table and page when lag exceeds the ingestion cadence. For an hourly pipeline, staleness beyond 90 minutes indicates upstream stalls. This catches scenarios where data stops flowing but no errors surface, like network partitions, API rate limits, or silent permission failures.

Volume band monitoring compares observed rows and bytes against baseline ranges for each time window. Establish acceptable bands (e.g., 70-130% of historical average) and alert on breaches. A sudden drop to zero rows triggers immediately, but gradual underloads become visible too. Volume bands detect partial failures where some data arrives but most is missing.

Dead letter queues capture malformed records that fail parsing or schema validation. Route these to a dedicated DLQ topic or table, then alert when backlog sustains above zero for more than 10 minutes. Without DLQ monitoring, schema mismatches cause silent data loss. Records disappear without trace because they never reach the target table.

### Applied Insight: Synthetic Canaries as Ground Truth

Deploy one synthetic canary record per hour through the entire pipeline. Inject a known-good event with a unique identifier, then assert its appearance in the final sink within the expected latency window. Missing canaries surface broken data paths even when all other metrics look healthy, such as renamed topics, revoked permissions, or misconfigured routing rules.

Combine heartbeats, freshness tracking, volume bands, DLQ monitoring, and synthetic canaries into a layered detection system. No single signal catches every failure mode, but together they create comprehensive coverage. When task status shows success but data stops flowing, these mechanisms page immediately instead of waiting for user reports.