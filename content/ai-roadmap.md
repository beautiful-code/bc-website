

This document outlines the **systematic, engineering-first process** required for all Applied GenAI projects. Its purpose is to ensure solutions are well-defined, validated, and built to **production-grade architectural standards**.

We separate the process into **four distinct phases**. A project cannot move to the next phase until the criteria and artifacts for the current phase are met and approved.

---

## Phase 1: Problem-Space Deconstruction

**Objective:** To identify and define a high-value, technically feasible business problem before any implementation begins.

### 1.1: Workflow Analysis
- Deconstruct the target business flow into its discrete steps.

- **Artifact:** A documented flow diagram identifying all inputs, outputs, data sources, and human-in-the-loop (HITL) decision points.

### 1.2: Opportunity Identification & Baseline
- Analyze the workflow map to find areas of high-leverage (bottlenecks).

- **Mandate:** The current process must be measured to establish a baseline. This includes:
  - **Performance Baseline:** e.g., “Time to answer customer query: 15 minutes P90”
  - **Quality Baseline:** e.g., “Error rate for data entry: 8%”
  - **Cost Baseline:** e.g., “Cost per query: $2.50 in human-hours”

### 1.3: Risk & Determinism Classification
- This is a **mandatory classification step** for all potential use cases.

- **Level 1 – High Tolerance / Creative** (e.g., “draft 10 marketing emails”)
  - **Procedure:** Cleared for GenAI prototyping.
- **Level 2 – Low Tolerance / Factual** (e.g., “query internal sales data”, “get current inventory list”)
  - **Procedure:** Cleared for prototyping. The solution must include **strong guardrails.**
  - **Non-Negotiable Standards:**
    - **Solution Path:** Typically involves RAG (for grounding in unstructured data) or Prompt Engineering with deterministic tools (for structured data).
    - **HITL Default:** A Human-in-the-Loop pattern for review or approval is the default. Removal requires formal justification.
    - **Traceable Grounding:** All factual claims must be traceable to their source documents. Citation mechanisms are mandatory.
- **Level 3 – Zero Tolerance / Deterministic**(e.g., “process a payment”)
  - **Procedure:** Rejected as a GenAI problem. Must be solved with deterministic tools.

---

## Phase 2: Rapid Validation & KPI Definition

**Objective:** Validate the primary hypothesis from Phase 1 with minimal resources and establish formal success criteria.

### 2.1: Initial Prototype Construction
Build the simplest possible solution (default: Prompt Engineering) to test the core hypothesis.

### 2.2: Stakeholder Review & KPI Definition
- Demo the prototype to primary stakeholders.
- **Mandate:** Based on this review, the project's formal Key Performance Indicators (KPIs) must be defined and agreed upon. These must be measurable and include:
  - **Quality & Accuracy:** e.g., “Factual accuracy > 98%”
  - **Latency:** e.g., “P95 response time < 3 seconds”
  - **Cost:** e.g., “Cost-per-query < $0.02”
  - **Adoption:** e.g., “HITL approval rate > 90%”

---

## Phase 3: Architectural Selection & Escalation

**Objective:** To select the simplest, most robust architecture that meets KPIs. Escalation to a more complex architecture is only authorized when a simpler path is proven insufficient.

### 3.1: Baseline – Prompt Engineering
- **Procedure:** All tasks must first be attempted with a well-structured prompt. The solution must be proven to fail KPI targets at this level before escalating.

### 3.2: Escalation Path for Knowledge – RAG (Retrieval-Augmented Generation)
- **Criterion:** IF the solution (from 3.1) fails KPIs due to a lack of internal, proprietary, or real-time information.

- **Architectural Standards:** The implementation plan must address the following:
  - **Chunking Strategy:** Mandate testing and justification for the chosen chunking strategy (e.g., fixed-size vs. semantic vs. agentic).
  - **Retrieval Strategy:** A baseline vector search is required. For Level 2 problems, investigation of hybrid search and/or re-rankers is mandatory.
  - **Data Freshness:** A data indexing and refresh plan is mandatory (e.g., "max 24h stale data" via batch pipeline, or an event-driven update mechanism).

### 3.3: Escalation Path for Style – Fine-Tuning (FT)
- **Criterion:** IF the solution (from 3.1) fails KPIs due to specific style, tone, or format requirements that prompt engineering cannot reliably produce.
- **Procedure:** Escalate to fine-tuning. (Note: This is an architectural path; the primary policy on when to use FT vs. larger models is in 4.3).

### 3.4: Escalation Path for Complexity – Workflows & Agents
- **Criterion (Workflows):** If the system must execute a fixed sequence of steps using AI 
- **Procedure:** Build a static, directed workflow.
- **Criterion (Agents):** If a static workflow is insufficient and the system must dynamically choose the order of execution or select from a variety of tools to accomplish a complex goal. 
- **Procedure:** Escalate the workflow to an agentic system.

---

## Phase 4: Production-Grade Engineering & MLOps

**Objective:** To move a validated prototype into a robust, scalable, observable, and cost-effective production service.

### 4.1: Standards for Agentic Systems
- **Policy:** An agent's job is reasoning and tool use. All tasks that can be solved deterministically (e.g., get_inventory_count()) must be built as stable, well-documented tools first.

### 4.2: Standards for Evaluation & Refinement
- **4.2.1: Manual Test Set Curation** A "golden set" of test cases (e.g., 50 difficult user queries, 20 edge cases) must be manually curated and version-controlled.

- **4.2.2: Automated Evaluation Pipeline** An evaluation pipeline is mandatory. It must automatically test every new version against the golden set and must include:
  - **Model-Based Evals:** Use a superior LLM (e.g., GPT-4o) to grade outputs for abstract qualities (e.g., relevance, faithfulness, coherence).
  - **Heuristic Evals:** Implement rule-based checks for:
    - PII Detection
    - Toxicity / Brand Safety
    - Format Compliance (e.g., JSON validity, citation correctness)
    - Refusal Detection (e.g., “As an AI…” responses)

### 4.3: Policy on Fine-Tuning
- Fine-tuning is an optimization tool, not a primary solution.
- **Accuracy-Based:** Authorized only if advanced prompt engineering and RAG fail to meet accuracy KPIs.
- **Optimization-Based:** Authorized if a large model meets KPIs but is too slow or expensive. Its outputs may be used to fine-tune a smaller, faster model.

### 4.4: Standards for Performance & Cost
- **4.4.1 Caching:** Prompt caching (semantic or exact) must be implemented for common, repeatable queries.
- **4.4.2 Context Management:**  A robust context-handling system (e.g., sliding windows, summarization) must be engineered for multi-step conversations.
- **4.4.3 Cost & Token Tracking:**  Every production LLM call must log prompt_tokens, completion_tokens, and total_cost.
- **4.4.4 Latency Tracking:** End-to-end (e2e) and time-to-first-token (TTFT) latencies must be logged for all production calls.

### 4.5: Production Monitoring & Observability
 - **4.5.1 Logging:** A sample of production traffic (including prompts, full responses, and retrieved RAG chunks, with PII scrubbed) must be logged for analysis.
 - **4.5.2 Alerting:** : Alerts must be configured for spikes in:
  - API Error Rates (4xx/5xx)  
  - Cost-per-Query
  - P95 Latency
  - PII / Toxicity Detection
  - Hallucination Markers

### 4.6: Feedback & Retraining Loop
- **4.6.1 User Feedback Mechanism:** A simple user feedback mechanism (e.g., thumbs up/down) is mandatory for all interactive applications.

- **4.6.2 Triage Process:** A formal process must exist for closing the loop:
Feedback Received -> Triage -> Root Cause Analysis -> Add to Golden Set -> Implement Fix -> Validate in Eval Pipeline -> Redeploy.

