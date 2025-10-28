---
title: "Hierarchical Agent Design Patterns for Domain-Specific Keyword Generation"
expertise: agentic-systems
slug: hierarchical-agent-design-patterns-for-domain-specific-keyword-generation
tech: [adk, gemini, litellm]
date: 2025-09-04
author: BeautifulCode
keytakeaway: "Hierarchical multi-agent architectures with structured prompts and domain-specific critic loops outperform monolithic LLM calls for complex, constraint-heavy generation tasks."
---

### Agent Composition Over Monolithic Prompts

Building a domain-specific keyword generator for hospitality SEM (Search Engine Marketing) campaigns revealed that monolithic LLM calls struggle with multi-constraint optimization. Instead of cramming all logic into one prompt, Google's ADK (Agent Development Kit) enabled hierarchical decomposition using three core patterns: "ParallelAgent" for concurrent execution of independent workflows, "SequentialAgent" for ordered task chains, and "LoopAgent" for iterative refinement. The root agent coordinates specialized child agents through the "output_key" mechanism, propagating state across the hierarchy while maintaining modularity. This architecture makes complex workflows maintainable and debuggable compared to single-call approaches.

### Pattern Mapping

| Pattern | Use Case | Execution Model |
|---------|----------|-----------------|
| ParallelAgent | Exact match and phrase match pipelines | Concurrent, independent |
| SequentialAgent | Expert → Critic → Refiner flow | Ordered, state-passing |
| LoopAgent | Quality improvement cycles | Iterative with exit conditions |

The Expert-Critic-Refiner pattern emerged as particularly effective: the expert generates candidates, the critic evaluates against domain constraints, and the refiner incorporates feedback. Intelligent termination via "exit_loop()" prevents wasteful iterations when quality thresholds are met.

### Prompt Structure for Chain-of-Thought

Structured prompts with explicit sections outperformed freeform instructions. Each agent prompt includes Context for domain grounding, Task definition, Instructions with step-by-step logic, Constraints like excluded terms and length limits, Good vs Bad examples to reduce hallucinations, and Output Format specification. Requiring strategic analysis before keyword generation through chain-of-thought prompting improved relevance by forcing the model to articulate reasoning. Dynamic context injection using session state variables enabled personalization without rebuilding prompts.

### Production Integration Patterns

Real-world deployment required three integration layers. First, LangchainTool wrapper connected external APIs like Tavily search for real-time event research, injecting fresh context into keyword strategies. Second, LiteLLM proxy provided multi-model support across providers without code changes. Third, async event streaming via Runner handled real-time agent responses while maintaining session-based architecture for multi-turn conversations. This setup proved essential for maintaining context across agent executions and enabling progressive disclosure of results.