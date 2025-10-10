---
title: "Design the API before you code"
category: "ownership"
slug: "design-the-api-before-you-code"
summary: "Finalize and align on the API structure with all dependent teams before writing any business logic"
---
![Design the API before you code](/principles/design-the-api-before-you-code/comic.png)

### Explanation in layman terms

Imagine you are part of a team building a new house. You have plumbers, electricians, carpenters, and the client who will live in it. What's the very first thing you do? You don't just start laying bricks and hope for the best.

First, an architect creates a detailed blueprint. This blueprint is the single source of truth. It defines:

* The exact dimensions of every room (the *response structure*).  
* Where every door and window is located (the *endpoint paths*).  
* Where the electrical outlets and water pipes will go (the *request/response fields*).

Everyone involved--the client, the construction crew, the plumbers, the electricians--must review and sign off on this blueprint before any work begins.

The API Contract is the blueprint for your software. By getting everyone to agree on it first, you ensure that the frontend team (designing the furniture), the backend team (building the house), and any other connected services (the utility companies) are all working from the same plan. This prevents disastrous situations, like building a beautiful kitchen only to find out the plumbing was planned for the wrong wall.

### Gain Deeper Understanding

| Actions | What you'll learn |
| :---- | :---- |
| Listen to this [Podcast](https://youtu.be/39sPgJAqO8s?si=6Z55SV2jTk7TUBcW&t=495) with James Higginbotham from 8:22 mins to 13:13mins | How API design facilitates communication between different stakeholders |
| Watch this [talk](https://youtu.be/aAb7hSCtvGw?si=eINd8FPsokdxU9Uv&t=122) from Joshua Bloch from 2:02 mins to 3:26 mins | The role an API plays in a software and why the design matters. |
| Read the article "[Understanding  the API-First Approach to Building Products"](https://swagger.io/resources/articles/adopting-an-api-first-approach/) by Janet Wagner | How agreeing on an API contract enables parallel development and reduces the risk of failure in design. |
| Read the section "Comparing Design-first and Code-first" in the [article](https://arc.net/l/quote/umiwkrly) | Why prioritizing design before implementation, a counter-intuitive concept, leads to a shorter delivery cycle than a code-first approach. |

### Put it into practice?

| Scenario | What to do |
| :---- | :---- |
| When you're starting a new feature | Schedule a meeting with all the consumers to agree on the API endpoints, payloads, and error handling before writing code. |
| When an API change is proposed | Ensure that all affected teams review and agree on the new API design before making changes. |
