---
title: "Stage-Hash-MERGE: Building Rerun-Safe ETL Pipelines on BigQuery"
expertise: data-engineering
slug: "stage-hash-merge-building-rerun-safe-etl-pipelines-on-bigquery"
tech: ["bigquery", "airflow"]
date: "2025-10-13"
author: "BeautifulCode"
keytakeaway: "Idempotent ETL on Google Cloud Platform (GCP) requires staging with deterministic hashes, overlapping watermarks committed only after successful publish, file generation tracking via manifests, range-driven task design, and validation guardrails before production writes, making arbitrary reruns and backfills safe by construction."
---

### The Idempotency Problem in Production ETL

Production data pipelines fail: network hiccups, API timeouts, downstream schema changes. The real test of pipeline maturity isn't whether failures happen, but whether reruns produce correct results without duplicates or gaps. Traditional append-only patterns break down fast: a retry doubles your metrics, a backfill triples revenue totals, and debugging becomes archaeology. The core challenge is making arbitrary reruns safe while maintaining data freshness and correctness guarantees across partially completed loads.

### The Stage-Hash-MERGE Pattern

Idempotent loads require three architectural decisions working together. First, land all raw data into staging tables with a deterministic `natural_key` (business key like `user_id + event_timestamp`). Second, compute a row-level `_hash` field using Secure Hash Algorithm 256-bit (SHA256) of normalized, sorted field values: this becomes your change detection mechanism. Third, publish via a single `MERGE` statement that updates when hashes differ, inserts when keys are new, and ignores exact duplicates.

#### Artifact: Core MERGE Logic

```sql
MERGE `project.dataset.prod_table` AS target
USING (
  SELECT
    natural_key,
    field_a,
    field_b,
    TO_HEX(SHA256(CONCAT(
      COALESCE(CAST(field_a AS STRING), ''),
      '|',
      COALESCE(CAST(field_b AS STRING), '')
    ))) AS _hash
  FROM `project.dataset.staging_table`
) AS source
ON target.natural_key = source.natural_key
WHEN MATCHED AND target._hash != source._hash THEN
  UPDATE SET field_a = source.field_a, field_b = source.field_b, _hash = source._hash
WHEN NOT MATCHED THEN
  INSERT (natural_key, field_a, field_b, _hash)
  VALUES (natural_key, field_a, field_b, _hash);
```

This pattern makes reruns harmless: same input produces same hash, triggering no update. Partial failures leave staging intact for safe retry without touching prod.

### Watermarks with Overlap and File Generation Tracking

Incremental loads need watermark state, but naive implementations create gaps during failures. Store `last_successful_watermark` in a metadata table per source-entity pair, but always extract with an overlap window (e.g., `WHERE updated_at >= watermark - 5 minutes`). Downstream deduplication by natural key handles the overlap. Only advance the watermark after the `MERGE` succeeds: this transaction ordering prevents lost data.

For file-based loads from Google Cloud Storage (GCS), enable object versioning and maintain a `load_manifest` table tracking `(bucket, object, generation, crc32c_checksum)`. Skip any generation already recorded. Verify the CRC32C checksum before load and compute row hashes inside BigQuery: this prevents accidental double-processing even if the same file appears twice with different generations. The manifest becomes your source of truth for "already processed."

### Range-Driven DAGs and Pre-Publish Guardrails

Composer Directed Acyclic Graphs (DAGs) should partition work by time or key ranges rather than attempting full-table loads. Each task handles one range: read → stage → MERGE. Retries re-execute only the failed range without affecting other ranges or creating duplicates. Backfills become "enqueue date ranges" rather than separate codepaths, and the same idempotency guarantees apply.

Before every MERGE into production, run lightweight validation: row count comparisons against source, distinct key counts, critical field nullability checks, and a reconciliation query (sum or checksum of numeric fields). These tests run in staging. If they fail, route to a dead letter queue and alert, but leave prod untouched. Reruns simply fix staging and retry the guardrails. This fail-fast pattern combined with hash-based MERGE logic ensures consistency even through chaos.
