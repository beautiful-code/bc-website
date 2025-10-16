---
slug: "agentic-ai-for-sem-keyword-generation-for-adtech"
title: "Agentic AI for SEM Keyword Generation for AdTech"
industry: "Technology"
heroImage: "/case-studies/agentic-ai-for-sem-keyword-generation-for-adtech/agentic-ai-for-sem-keyword-generation-for-adtech.svg"
problemStatement: "The agency's growth had hit a wall. Their existing keyword tools were creating more work than they saved, forcing their best analysts to manually fix low-quality outputs instead of focusing on strategy. This massive inefficiency was eroding their profit margins on each account and physically limiting how many new clients they could successfully onboard."
clientInfo: "A large performance marketing agency specializing in the hospitality industry. Their business model relies on efficiently managing SEM campaigns for hundreds of hotel clients, where profitability is directly tied to operational speed and campaign effectiveness."
# clientImage: "/case-studies/agentic-ai-for-sem-keyword-generation-for-adtech/client-logo.svg"
outcomes:
  - outcome: "Significant improvement in keyword performance and click-through rates."
    icon: "/icons/outcome/outcome-click.svg"
  - outcome: "Reduced cost-per-acquisition (CPA) by minimizing wasted ad spend."
    icon: "/icons/outcome/outcome-savings.svg"
  - outcome: "Increased SEM analyst productivity."
    icon: "/icons/outcome/outcome-growth.svg"
expertises: ["ai-applied-ml", "data-engineering"]
technologies:
  - tech: "python"
    purpose: "Core AI and data automation components"
  - tech: "langchain"
    purpose: "GenAI orchestration and automation"
# testimonial:
#   quote: "N/A"
#   author: "Client Representative"
#   authorImage: "/case-studies/agentic-ai-for-sem-keyword-generation-for-adtech/client-author.svg"
---

### How did BeautifulCode do it?

After a deep dive into the problem, we recognized that effective keyword generation required more than just automation; it needed expertise, context, and a nuanced understanding of search intent. We moved beyond simple scripts and architected a complex, multi-agent system designed to replicate and scale the strategic thinking of an expert SEM analyst.

<figure>
  <img src="/case-studies/agentic-ai-for-sem-keyword-generation-for-adtech/agentic-ai-for-sem-keyword-generation-for-adtech.png" alt="" />
  <figcaption>
    Agentic AI for SEM Keyword Generation for AdTech
  </figcaption>
</figure>

Our solution is a sophisticated pipeline where multiple AI agents collaborate to research, generate, critique, and refine keywords:

### The Detailing Agent: Building Context

The process begins with our "Detailing Agent." When an analyst provides a hotel name, this agent uses a Google Search tool to conduct comprehensive research. It analyzes and extracts crucial details like the hotel's specific facilities, unique selling points, value proposition, and the profile of an ideal customer. This rich context forms the foundation for all subsequent steps.

### Parallel Expert Agents: Specialized Generation

The detailed information is then passed to a parallel processing workflow to generate both "Phrase Match" and "Exact Match" keywords simultaneously. Each parallel track is managed by a dedicated "Expert Agent" (e.g., a "Phrase Match Expert"). These agents are armed with two key assets: the detailed hotel information from the first step and a deep knowledge base of best practices for their specific keyword type. They also use the search tool to find timely information about local events or conferences happening near the hotel.

### The Refinement Loop: Autonomous Quality Control

The initial keyword lists from the expert agents are fed into a powerful "Refinement Loop." This loop consists of two collaborating agents:

- **The Critic Agent**: This agent analyzes the generated keywords, ranking them based on criteria like search intent, relevance, and adherence to best practices. It then provides specific, actionable feedback for improvement.
- **The Refinement Agent**: This agent takes the critic's feedback and intelligently rewrites and improves the keywords.

This loop runs iteratively up to three times or until the Critic Agent is fully satisfied with the quality of the keywords, whichever comes first.

### Final Analyst Review

The final, highly-refined keyword lists are then presented to the human SEM analysts for their expert review and final approval, ensuring a perfect blend of AI-driven scale and human strategic oversight.
