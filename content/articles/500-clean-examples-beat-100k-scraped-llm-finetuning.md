---
title: "Why 500 Clean Examples Beat 100K Scraped Ones in LLM Fine-Tuning"
expertise: fine-tuning
slug: 500-clean-examples-beat-100k-scraped-llm-finetuning
tech: [pytorch, openai, huggingface]
date: 2025-10-28
author: BeautifulCode
keytakeaway: "In LLM fine-tuning, 500 expert-verified examples deliver better production results than 100K noisy samples because training amplifies data quality issues into persistent model errors that are expensive to fix."
---

### The Curation Bottleneck

Fine-tuning Large Language Models (LLMs) reveals a counterintuitive reality: training compute is cheap, but expert human time is not. While cloud providers make GPU access increasingly affordable, the real constraint emerges during dataset preparation. A single domain expert spending 40 hours curating 500 examples with precise labels, edge cases, and consistent formatting typically costs more than the entire training run. This inverts the traditional machine learning cost model where compute dominated project budgets.

### The Quality-Quantity Trade-off

When comparing dataset strategies, the differences become clear:

| Dataset Type | Volume Characteristics | Signal-to-Noise Ratio | Common Issues |
|--------------|------------------------|----------------------|---------------|
| Scraped web data | High volume, minimal filtering | Low | Inconsistent formatting, mislabeled examples |
| Auto-generated synthetic | Medium to high volume | Medium | Distribution mismatch, lacks edge cases |
| Human-curated | Low to medium volume | High | Time-intensive, expensive |
| Expert-verified | Low volume, selective | Very high | Scalability constraints |

Noise compounds during backpropagation: mislabeled examples teach the model incorrect patterns that persist across epochs. A manually-verified dataset at a fraction of the size consistently outperforms large noisy datasets because every example reinforces correct behavior.

### The Amplification Effect

Garbage-in, garbage-out manifests differently in neural networks than traditional software. A noisy training example doesn't just add randomness; it actively teaches wrong associations. With 100K scraped examples at even 5% error rate, you're training on 5,000 incorrect patterns. The model learns to reproduce formatting inconsistencies, factual errors, and ambiguous labels. During inference, these learned mistakes surface as hallucinations, off-topic responses, or confidence in incorrect outputs. The cost of fixing a production model trained on bad data often exceeds 10x the original training investment.

### Applied Insight

Prioritize manual verification over dataset size for specialized domains. Start with 200-500 pristine examples covering core use cases and edge cases. Use synthetic data generation only after establishing a verified baseline, and always route synthetic examples through human review. Budget 60-70% of your fine-tuning project timeline for data curation, not model training. For production systems, expert-verified small datasets consistently outperform large noisy ones by double-digit percentage points.