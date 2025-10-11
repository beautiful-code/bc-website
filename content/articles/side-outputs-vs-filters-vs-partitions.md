---
title: "Side Outputs vs. Filters vs. Partitions: Choosing the Right Branching Primitive in Apache Beam"
expertise: data-engineering
slug: side-outputs-vs-filters-vs-partitions
tech: [apache-beam, googlecloud]
date: 2025-10-11
author: BeautifulCode
keytakeaway: "Choose side outputs for overlapping logic, filters for simple conditions, and partitions for mutually exclusive routing—then isolate hot branches into separate stages to avoid Dataflow autoscaling bottlenecks."
---

### Understanding Side Outputs as Parallel Branches

Side outputs in Apache Beam are not separate pipelines but parallel branches within a single pipeline graph. When a "DoFn" emits multiple "PCollections" using "TupleTag" (Java/Go) or tagged outputs via "ParDo" (Python), each branch inherits the same windowing and triggering semantics. This means event-time behavior remains consistent across all branches, eliminating the need to manage separate pipelines for related processing logic. The pipeline graph treats these as concurrent outputs from the same transform, ensuring unified execution.

### Branching Primitives: Intent-Driven Selection

```python
# Side output for overlapping logic
class SplitPayments(beam.DoFn):
    def process(self, element):
        yield element  # main output
        if element['amount'] > 1000:
            yield pvalue.TaggedOutput('fraud', element)
        if element['country'] == 'US':
            yield pvalue.TaggedOutput('domestic', element)

# Filter for yes/no branching
high_value = payments | beam.Filter(lambda x: x['amount'] > 1000)

# Partition for mutually exclusive routing
def partition_fn(element, num_partitions):
    return 0 if element['type'] == 'card' else 1

card, bank = payments | beam.Partition(partition_fn, 2)
```

Use "TupleTag" and "ParDo" when a single element needs to route to multiple branches with overlapping conditions. Use "Filter" when you need simple yes/no branching per condition. Use "Partition" when categories are mutually exclusive and you want exactly one destination per element. Choosing the wrong primitive leads to redundant processing or missed routing logic.

### Managing Hot Branches on Dataflow

When one side output processes significantly more data or runs heavier logic than others, it creates a hot branch. Since Dataflow autoscales per transform stage rather than per individual branch, a bottlenecked side output forces the entire stage to scale up, wasting resources on idle branches. For example, if a fraud detection branch processes 90% of events while an analytics branch handles only 10%, workers spend most of their time on fraud logic. To fix this, split the heavy branch into its own "ParDo" stage so Dataflow can scale it independently. If the problem is data skew within a branch, add a "Reshuffle" to redistribute keys evenly across workers.

### Applied Insight: When to Branch and When to Separate

Use side outputs when branches need to stay synchronized with the same event-time semantics and you want unified pipeline observability. A fraud detection branch and an analytics branch processing the same payment events benefit from shared windowing and metrics. Avoid branching when one output requires significantly different processing complexity or throughput—if your fraud branch needs real-time scoring with external API calls while analytics is simple aggregation, the performance mismatch will bottleneck the stage. In those cases, write to an intermediate sink like Pub/Sub and run a separate pipeline. Enforce schemas early using "Row" types so "BigQueryIO" catches type errors at build time, not during a production run at 3am.