---
title: "Two-Phase LLM Planning: Building Reliable AI Workflow Generators with Structured Outputs"
expertise: ai-applied-ml
slug: two-phase-llm-planning-structured-outputs
tech: [adk, gemini]
date: 2025-08-04
author: BeautifulCode
keytakeaway: "Reliable LLM workflow generation requires hierarchical planning architecture, strict schema enforcement with Pydantic, human approval gates, and context-rich prompts over brute-force model scaling."
---

### Hierarchical Decomposition Beats Single-Pass Generation

Building an AI system that generates executable workflows revealed that complex planning tasks require architectural separation. A single LLM call attempting both high-level design and low-level parameter generation produces inconsistent outputs. The solution: split the process into abstract planning (workflow structure and step logic) and concrete building (parameter values and configurations). Each phase uses dedicated LLM calls with phase-specific prompts, allowing the model to focus on one level of abstraction at a time. This architectural pattern mirrors how human engineers work, first sketching the overall approach before filling in implementation details.

### Enforcing Schema Compliance with Pydantic

Unpredictable LLM responses break production systems. Pydantic models combined with "JsonOutputParser" enforce strict output schemas, transforming free-form text into validated structured data. The model outputs must conform to predefined Python classes that specify required fields, types, and constraints.

```python
class AbstractPlanPydantic(BaseModel):
    step_description: str = Field(description="A description of step that a business user would understand to complete the task without any domain terminology")
    domain_step_description: str = Field(description="A description of the step in domain terminology. It should contain all the details required to create the step in workflow builder")
    app: str = Field(description="The name of the app that is performing the action")
    action: str = Field(description="If it is an action then the name of the action that is being performed")
    trigger: str = Field(description="If it is a trigger then the name of the trigger that is being performed")

class AbstractPlanOutput(BaseModel):
    thought_process: str = Field(description="Thought process of the Meta-Agent to come up with the abstract plan")
    reason: str = Field(description="Reason if it is not possible to build a workflow with the possible_actions and what are the possible actions that are unavailable to complete the task")
    abstract_plan: List[AbstractPlanPydantic]
```

This approach eliminates parsing failures and provides immediate validation errors when LLM outputs deviate from expected formats. Temperature is set to 0 for deterministic behavior in production environments.

### User Approval Gates Between Planning Phases

The system surfaces the abstract plan for user approval before generating concrete parameters. This checkpoint catches logical errors before executing the more expensive concrete building phase. Each step includes a "thought_process" field that explains the LLM's reasoning, making the plan's logic inspectable. Users can reject or request modifications, which feed back into the next LLM call as additional context. This pattern prevents the system from confidently executing flawed workflows while keeping the approval overhead minimal, since users validate structure once rather than reviewing every parameter value.

### Applied Insight: Context Engineering Over Model Size

Model selection matters less than context window management. The system injects dynamically generated documentation (available apps, actions, triggers) directly into prompts alongside few-shot examples. Documentation classes serialize domain knowledge into structured text that LLMs can parse. Each prompt includes concrete examples demonstrating the exact output format expected. This setup allows "gpt-4o-mini" to handle most planning tasks, reserving "gpt-4o" for complex multi-step reasoning. LangSmith observability wrapping showed that well-structured prompts with domain context consistently produce better results than larger models with generic instructions.