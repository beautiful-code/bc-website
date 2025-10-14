---
slug: "scaling-sem-search-engine-marketing-ads-generation-using-genai"
title: "Scaling SEM (Search Engine Marketing) Ads Generation using GenAI"
industry: "Technology"
heroImage: "/case-studies/scaling-sem-search-engine-marketing-ads-generation-using-genai/hero-image.svg"
problemStatement: "The bottleneck to the client's growth was the time spent by Business Analysts manually creating high-quality SEM ads."
clientInfo: "A client specialised in managing Search Engine Marketing (SEM) campaigns for tourist attractions."
# clientImage: "/case-studies/scaling-sem-search-engine-marketing-ads-generation-using-genai/client-logo.svg"
outcomes:
  - outcome: "Reduced time to create SEM Ads by 97%"
    icon: "/icons/outcome/outcome-down.svg"
  - outcome: "Click-Through Rate (CTR) of the SEM Ads increased by 37%"
    icon: "/icons/outcome/outcome-click.svg"
expertises: ["ai-applied-ml", "data-engineering"]
technologies:
  - tech: "python"
    purpose: "Core scripting and data integration"
  - tech: "langchain"
    purpose: "Agent orchestration and prompt pipelines"
  - tech: "langsmith"
    purpose: "Prompt evaluation and tracing"
  - tech: "streamlit"
    purpose: "Rapid prototyping UI for analysts"
  - tech: "gemini"
    purpose: "LLM for content and copy generation"
  - tech: "serper"
    purpose: "Search API to fetch attraction data"
  - tech: "fastapi"
    purpose: "Production API endpoints"
# testimonial:
#   quote: "N/A"
#   author: "Client Representative"
#   authorImage: "/case-studies/scaling-sem-search-engine-marketing-ads-generation-using-genai/client-author.svg"
---

### How did BeautifulCode do it?

BeautifulCode started by shadowing the client's Business Analysts to deeply understand the creative and strategic process that went into creating a successful SEM ad. We identified that the core challenge was codifying their domain expertise and automating the research and generation process. To address this, we developed a human-in-the-loop AI agent to act as a powerful assistant for the analysts.

<figure>
  <img src="/case-studies/scaling-sem-search-engine-marketing-ads-generation-using-genai/ScalingSEM_artifact.png" alt="" />
  <figcaption>
    Scaling SEM (Search Engine Marketing) Ads Generation using GenAI
  </figcaption>
</figure>

Our solution streamlined the entire ad creation workflow into a simple, interactive application:

### Capturing Domain Knowledge

We collaborated closely with the analysts to distill their expert insights on ad copy, keyword strategy, and calls-to-action into a comprehensive, sophisticated prompt that would guide the AI's creative process.

### Building an Empowered AI Agent

We constructed a single, powerful agent using LangChain. This agent was armed with our expertly crafted prompt and equipped with specialized tools: the Serper Search API for real-time web research and a custom Python tool to integrate directly with the Demand-Side Platform (DSP) API. The entire experience was delivered through a user-friendly Streamlit web application.

### Automated Research and Ad Generation

When an analyst entered the name of a tourist attraction into the app, the agent immediately used the Serper tool to search the web for current details, highlights, and unique selling points about the property. It then synthesized these search results with the best practices embedded in its core prompt to generate a variety of high-quality SEM ad options, which were instantly displayed to the user.

### Analyst-in-the-Loop for Approval

The Business Analyst could then review the AI-generated ads, selecting the most promising options with a single click. Once they gave their final approval, the agent automatically used its "Create in DSP" tool to push the ads live, completing the process seamlessly.

### Continuous Improvement via Feedback

To ensure the agent grew smarter over time, we implemented a feedback loop. We collected data on the ads that analysts rejected and used this information to continuously refine and improve the master prompt, making the agent's future suggestions even more accurate and effective.
