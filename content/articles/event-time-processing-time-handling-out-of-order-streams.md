---
title: "Event Time ≠ Processing Time: Handling Out-of-Order Streams"
expertise: data-engineering
slug: event-time-processing-time-handling-out-of-order-streams
tech: [kafka, airflow, bigquery]
date: 2025-10-11
author: BeautifulCode
keytakeaway: "Event time windowing with watermarks and allowed lateness ensures correctness in out-of-order streams, but requires finite lateness bounds and sink-level deduplication to avoid unbounded state and duplicate writes."
---

### Why Event Timestamps Beat Arrival Time

Streaming systems receive data out of order. A transaction logged at 10:00 AM might arrive at 10:05 AM due to network delays, mobile offline periods, or backfill jobs. If you window by arrival time, that transaction lands in the wrong bucket. Event time windowing uses the timestamp embedded in the record itself, ensuring aggregations like "total sales in the last 5 minutes" reflect when events actually occurred, not when your pipeline happened to see them. This preserves correctness even when infrastructure is slow or records travel through multiple hops before reaching your stream processor.

### Watermarks Track Stream Completeness

A watermark is the system's best estimate of event-time progress. It answers "have I seen all events up to timestamp T?" Beam and Dataflow advance the watermark as they process records, signaling when a time window is likely complete. Results finalize only after the watermark passes the window's end. This means your pipeline's notion of completeness depends on watermark advancement, not CPU speed or throughput. Slow upstream sources or bursty traffic can stall the watermark, delaying window closure and downstream results.

```python
# Beam event-time windowing with watermark-driven triggers
(
    events
    | "Parse timestamps" >> beam.Map(lambda x: beam.window.TimestampedValue(x, x['event_ts']))
    | "Window into 5min" >> beam.WindowInto(
        beam.window.FixedWindows(5 * 60),
        trigger=AfterWatermark(early=AfterProcessingTime(60)),
        allowed_lateness=300,
        accumulation_mode=AccumulationMode.ACCUMULATING
    )
    | "Aggregate" >> beam.CombinePerKey(sum)
)
```

*Watermark-based triggers emit results when the watermark passes, with early firings every 60 seconds and a 5-minute allowed lateness window.*

### Allowed Lateness and Triggers Balance Speed vs Accuracy

Late events arriving after the watermark still belong to their original window. Allowed lateness defines a grace period (records within this threshold update their window even after closure). Triggers control when results emit: you can fire early for low-latency dashboards, then refine as late data trickles in. Accumulating mode includes prior results in each pane (useful for cumulative metrics), while discarding mode emits deltas (better for idempotent sinks like deduplicating databases). Choose based on whether your downstream system handles updates or expects independent records.

### Applied Insight: Guardrails for Production Streams

Set finite allowed lateness to prevent unbounded state growth (monitor state bytes and backlog metrics in Dataflow). Use deterministic keys and insert IDs (like BigQuery "insertId") to dedupe late duplicates at the sink, or implement stateful "DoFns" for deduplication logic. Route extremely late data to a side output or dead letter queue for auditing rather than silently dropping it. This gives you visibility into outliers and prevents data loss while keeping your main pipeline healthy.