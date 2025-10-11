---
title: "Schema-Driven AI Documentation for BigQuery: Keeping Data Catalogs Honest in CI/CD"
expertise: data-engineering
slug: schema-driven-ai-documentation-bigquery
tech: [bigquery]
date: 2025-10-13
author: BeautifulCode
keytakeaway: "Treating schema metadata as the source of truth and enforcing documentation updates in CI transforms data catalogs from stale wikis into living contracts that stay synchronized with production reality."
---

### Metadata as Ground Truth, Not Memory

Traditional data documentation dies in wikis because engineers write descriptions from memory after building pipelines. The better approach treats BigQuery "INFORMATION_SCHEMA" as the source of truth. By querying table and column metadata, sampling actual values, and parsing upstream SQL from dbt or Dataform, an LLM can draft realistic table purposes, column descriptions with units, business rules, and common join patterns. Engineers review these AI-generated docs and commit them alongside code, ensuring documentation reflects what actually exists in the warehouse rather than what someone remembered building three months ago.

### CI-Enforced Documentation with Schema Diff Analysis

**Artifact: CI Documentation Check Flow**

```text
1. On PR creation → Compare target branch schema to current HEAD
2. Detect new tables, columns, or type changes
3. For each delta → LLM suggests description + dbt test candidates
4. If owner doesn't approve/update → Build fails with suggested edits
5. Post-merge → Sync approved docs to Data Catalog + dbt docs site
```

Making documentation a build gate transforms it from optional housekeeping into enforced discipline. When a PR introduces schema changes, the CI job surfaces missing or stale field descriptions and proposes dbt tests like "accepted_values" or "not_null" constraints based on sampled data. The build won't pass until owners explicitly approve or refine the suggestions, which means docs and tests evolve in lockstep with schema.

### Single Source of Truth with Policy Tag Automation

Once approved, descriptions are pushed back to BigQuery Data Catalog or dbt docs as the canonical reference. The system scans column names and sample values to suggest policy tags for sensitive data like emails, PAN-like patterns, or PII markers, so governance becomes automatic rather than manual tagging. BI tools like Looker or Tableau read these descriptions via native connectors, eliminating the copy-paste drift that happens when analysts maintain their own field glossaries.

### Continuous Validation Against Production Reality

Documentation becomes unreliable the moment warehouse reality diverges from written claims. A nightly Airflow job queries actual column distributions and compares them to documented constraints. If docs claim a field is never null but live data shows fifteen percent nulls, or if cardinality jumps from hundreds to millions, the job auto-generates a PR with updated descriptions and highlights every downstream dbt model affected by the drift.

The same system embeds query examples directly in catalog entries, but unlike generic "SELECT star" snippets, these are templated from the table's actual partition and cluster configuration. An analyst copying an example for "events" automatically gets "WHERE event_date = CURRENT_DATE()" because the job reads the partition column from table metadata. Row-level security policies are respected too. Examples filter to only the regions or tenants the current user can access, so copied queries never fail with permission errors or scan terabytes unintentionally.
