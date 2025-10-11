---
title: "Service-Account-Per-Pipeline: Confining Blast Radius in GCP Data Workloads"
expertise: data-engineering
slug: "service-account-per-pipeline-confining-blast-radius-in-gcp-data-workloads"
tech: ["googlecloud"]
date: "2025-10-13"
author: "BeautifulCode"
keytakeaway: "Treating each pipeline as its own identity with dataset-scoped roles transforms IAM from a convenience layer into a containment system that limits damage, surfaces misconfigurations, and keeps privilege grants explicit and auditable."
---

### Identity as Blast Radius Boundary

In GCP data platforms, the Service Account is the unit of compromise. A single shared identity across pipelines means one credential leak exposes every dataset that identity touches. Running each pipeline under its own Service Account confines damage to that single workflow. Workload Identity Federation eliminates long-lived JSON keys, binding ephemeral tokens to Kubernetes pods or GitHub Actions jobs. If a pipeline is compromised, the attacker sees only what that specific SA can reach, not the entire data warehouse.

### Dataset-Scoped Role Assignment

Project-level grants like `bigquery.admin` hand out sweeping powers that few pipelines actually need. Instead, assign predefined roles at the dataset boundary. A read-only analytics job receives `bigquery.dataViewer` on the curated dataset; a staging ETL gets `bigquery.dataEditor` only on its staging dataset. This pattern prevents a compromised staging pipeline from corrupting production tables or reading sensitive PII datasets it has no business touching.

**Artifact: Minimal Role Matrix**

| Pipeline Stage | Dataset      | Role                          | Justification                 |
| -------------- | ------------ | ----------------------------- | ----------------------------- |
| Ingestion      | `raw_events` | `bigquery.dataEditor`         | Append-only writes            |
| Transformation | `staging`    | `bigquery.dataEditor`         | MERGE/UPDATE operations       |
| Analytics      | `curated`    | `bigquery.dataViewer`         | Read-only reporting           |
| Break-glass    | All datasets | `bigquery.admin` (time-boxed) | Emergency fixes with approval |

### Narrow Capabilities for Write Paths

Granting `bigquery.dataEditor` at the project level gives every table permission the pipeline doesn't need. Use the BigQuery Storage Write API with dataset-scoped credentials for streaming inserts. For batch merges, a dedicated job-runner SA executes parameterized `MERGE` statements but cannot CREATE or DROP tables. This pattern separates data movement from schema mutation, reducing the risk of accidental or malicious schema changes during routine ETL runs.

### Auditable Access by Design

Attach labels like `pipeline_id` and `env` to Service Accounts and datasets using Terraform. Query Cloud Audit Logs to track which SA accessed which dataset. Use `INFORMATION_SCHEMA.SCHEMATA_OPTIONS` and `DATASET_OPTIONS` to verify labels match expected pipeline boundaries. A weekly Airflow DAG flags any SA with project-level grants or unexpected cross-dataset access, surfacing privilege creep before it becomes a security incident. Time-boxed IAM Conditions on break-glass roles ensure elevated access expires automatically.
