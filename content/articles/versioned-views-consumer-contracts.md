---
title: "Versioned Views as Consumer Contracts: Safe Schema Evolution in Production Pipelines"
expertise: data-engineering
slug: "versioned-views-consumer-contracts"
tech: ["sql"]
date: "2025-10-14"
author: "BeautifulCode"
keytakeaway: "Versioned views decouple storage evolution from consumer contracts, making additive changes instant safe and breaking changes manageable through controlled dual run windows enforced by CI."
---

### The Problem: Raw Tables Break Consumer Trust

When downstream consumers query tables directly, every schema change becomes a coordination nightmare. A single column rename can break dashboards, ETL jobs, and ML pipelines simultaneously. Teams end up either freezing schemas entirely or forcing synchronized deployments across dozens of services. The real issue is exposing mutable storage as the interface instead of treating it as an implementation detail that can safely evolve underneath a stable contract.

### The Pattern: Base Tables Behind Versioned Views

Land all incoming data into a mutable base table where the physical schema can evolve freely. Then publish immutable versioned views like "events_v1" and "events_v2" as the actual consumer interface. Each view exposes only the columns and types that version promised, acting as a compatibility layer. New columns appear in the base immediately but remain invisible to v1 consumers until explicitly surfaced in v2.

**Versioned View Strategy:**

| Change Type         | Base Table Action           | View Strategy                        | Consumer Impact                      |
| ------------------- | --------------------------- | ------------------------------------ | ------------------------------------ |
| Add nullable column | Add to base, backfill nulls | Ship v2 with new field               | v1 unaffected, v2 adopts on schedule |
| Rename column       | Add new, dual-write both    | v2 maps new name, v1 keeps old       | Zero downtime, dual-run period       |
| Type change         | Add typed column alongside  | v2 exposes new type                  | v1 continues with old type           |
| Remove column       | Stop writing, keep in base  | Omit from v2, sunset v1 after cutoff | Track usage, announce deprecation    |

This approach turns additive changes into instant safe operations while giving breaking changes a controlled migration window.

### Enforce Compatibility in CI Before Production

Store schemas in a typed format like Avro or Protobuf in version control and run compatibility checks on every pull request. Block merges that attempt to remove fields, change types, or rename columns without following the dual-run pattern. Also compile and execute v1 queries against the current base schema as an integration test. If existing consumer queries would break, the CI pipeline should fail immediately. This catches breaking changes at code review time instead of discovering them through production alerts.

### Applied Insight: Automate the Migration Playbook

Standardize schema evolution with a five-step playbook: schema PR with compatibility check, base table DDL migration, backfill job for new columns, v2 view release, and adoption tracking dashboard. When adoption hits your threshold (typically 90%), announce the v1 sunset date and remove it after usage drops to zero. Rollback is trivial: redirect consumers to the previous view version without touching the base table. This turns schema evolution from a risky manual process into a repeatable, low risk operation.
