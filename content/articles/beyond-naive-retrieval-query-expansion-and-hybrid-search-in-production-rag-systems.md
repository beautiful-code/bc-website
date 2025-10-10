---
title: "Beyond Naive Retrieval: Query Expansion and Hybrid Search in Production RAG Systems"
expertise: ai-applied-ml
slug: beyond-naive-retrieval-query-expansion-and-hybrid-search-in-production-rag-systems
tech: [openai, langchain, huggingface]
date: 2025-10-10
author: BeautifulCode
keytakeaway: "Production RAG systems require layered retrieval strategies where query expansion improves recall, hybrid search handles both semantic and exact matches, and re-ranking ensures relevant context reaches the LLM."
---

### The Query Problem in RAG

User queries in production RAG systems are typically short and underspecified. A query like "performance issues" could mean system latency, model inference speed, or memory bottlenecks. This ambiguity creates a mismatch between the query embedding and relevant document embeddings, leading to poor retrieval recall. The core challenge is bridging the gap between what users type and what the retrieval system needs to find the right context.

### Query Expansion Techniques

**Artifact: Code Snippet**

```python
# Query expansion: generate variations
expanded_queries = llm.generate([
    f"Rephrase: {user_query}",
    f"Generate 3 related questions: {user_query}"
])

# HyDE: generate hypothetical answer
hypothetical_answer = llm.generate(
    f"Write a detailed answer to: {user_query}"
)

# Hybrid search: combine vector + keyword
all_queries = expanded_queries + [hypothetical_answer]
vector_results = vector_store.search_batch(
    [embed(q) for q in all_queries], top_k=50
)
bm25_results = bm25_index.search(user_query, top_k=50)
merged_results = reciprocal_rank_fusion(vector_results, bm25_results)

# Re-ranking with cross-encoder
reranked_scores = cross_encoder.score([
    (user_query, doc.text) for doc in merged_results[:50]
])
final_results = sort_by_score(merged_results[:50], reranked_scores)[:10]
```

**Description:** This pipeline combines all three strategies. Query expansion generates multiple query variations and a hypothetical answer via HyDE. All expanded queries are embedded and searched in batch. Hybrid search merges vector results with BM25 keyword results using reciprocal rank fusion. Finally, a cross-encoder re-ranks the top candidates by evaluating query-document pairs jointly for more accurate relevance scoring before passing context to the LLM.

### Hybrid Search: Combining Semantic and Keyword Retrieval

Pure vector search fails on queries with specific terminology, product codes, or exact phrases. Hybrid search combines semantic search with keyword-based methods like BM25. Semantic search captures conceptual similarity while BM25 ensures exact term matches aren't missed. The results from both methods are typically merged using reciprocal rank fusion, which handles the different score scales gracefully. This dual approach is particularly critical in technical domains where jargon and precise terminology matter.

### Re-Ranking to Fix "Lost in the Middle"

Retrieval often returns relevant documents buried in the results, a problem known as "lost in the middle." Re-ranking introduces a two-stage process: fetch a broader set of candidates with fast retrieval, then apply a slower, more accurate cross-encoder model to re-score and reorder them. Cross-encoders evaluate query-document pairs jointly, producing more nuanced relevance scores than bi-encoders used in initial retrieval. This ensures the LLM receives the most relevant context at the top, significantly improving answer quality without sacrificing initial retrieval speed.