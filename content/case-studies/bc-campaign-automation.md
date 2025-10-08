---
slug: "bc-campaign-automation"
title: "Efficiency Unleashed: Automating Campaign Setup Across Multiple Ad Platforms"
industry: "Ad-Tech "
heroImage: "/case-studies/bc-campaign-automation/hero-image.jpg"
problemStatement: "Previous campaign setup relied on manual Excel templates—high manpower, time-consuming, error-prone, and lacked scalability for a larger number of campaigns."
clientInfo: "A $25M ARR travel marketing platform that provides data-driven solutions for travel brands, specializing in digital advertising to optimize campaigns and enhance customer engagement."
clientImage: "/case-studies/bc-campaign-automation/client-logo.png"
outcomes:
  - outcome: "Automated campaign setup across Google, Facebook, Xandr, and other ad platforms via APIs"
    icon: "/case-studies/bc-campaign-automation/outcome-automation.svg"
  - outcome: "Reduced manual input and errors by replacing spreadsheets with a rules-driven setup flow"
    icon: "/case-studies/bc-campaign-automation/outcome-quality.svg"
  - outcome: "Enabled scalable handling of a larger number of campaigns"
    icon: "/case-studies/bc-campaign-automation/outcome-scale.svg"
expertises: ["backend-engineering", "frontend-engineering", "data-engineering"]
technologies:
  - tech: "python"
    purpose: "Built the micro-service and rule engine, enabling scalability and multiple integrations"
  - tech: "react"
    purpose: "Single-page app for UI-rich configuration of rules and strategies"
  - tech: "postgresql"
    purpose: "Primary datastore leveraging robustness and data integrity features"
  - tech: "googlecloud"
    purpose: "Cloud infrastructure for hosting services"
testimonial:
  quote: ""
  author: ""
  authorImage: "/case-studies/bc-campaign-automation/client-author.jpg"
---

A $25M ARR travel marketing platform provides data-driven solutions for businesses in the travel industry. Specializing in digital advertising, it helps optimize campaigns and enhance customer engagement for travel brands.

### Problem Statement

Our client assists travel businesses in connecting with their audiences through advertising campaigns. The previous campaign setup process, which relied on manual input using Excel templates, faced several key challenges

- High manpower requirement: Involvement of many team members  
- Time-consuming: Extensive time needed due to manual operations  
- Error-prone: Increased likelihood of mistakes  
- Lack of scalability: Difficulty in handling larger number of campaigns.

### Client Info

A 25M ARR travel marketing platform provides data-driven solutions for businesses in the travel industry. Specializing in digital advertising, it helps optimize campaigns and enhance customer engagement for travel brands.

### How did BeautifulCode do it?

The initial hurdle involved comprehending the intricacies of the Ad-Tech domain. A significant amount of time was spent in collaborating with Business Analysts to grasp the nuances including aspects such as Bids, Targeting, Viewability, Ad Frequency, Campaign Goals, Budget, Margins, and the overall Campaign life cycle.

The source data for campaign setup from different systems had been examined. Integrations for the CRM system (Salesforce), the warehouse (BQ), and various internal systems had been built to fetch data for campaign setup.

### Campaign setup solution Architecture

A micro-service Campaign Setup service was developed to generate campaign setup data by amalgamating inputs from the rule engine and source data. The generated campaign setup data was utilized to setup campaigns across various Ad Platforms (e.g., Google, Facebook, Xandr, etc.) through APIs.

### Rule Engine & Setup Strategies Framework & React App

The architecture was initially developed, encompassing a Rule engine, a UI application and a micro-service.

The rule engine was designed to automatically determine campaign setup strategies based on goals, budget, etc. Stakeholders could express rules in a straightforward JSON format, enabling easy creation, updating, or deletion of rules and providing flexibility in changing strategy selections.

The UI rich front-end app, built with React was primarily designed for two purposes:

- Configuring rules through a user-friendly interface  
- Configuring strategies.

This allowed stakeholders to manage both aspects without further involvement from the engineering team.


### Conclusion

We successfully automated the campaign setup process with a client-centric approach, demonstrating expertise in requirements gathering, innovative brainstorming, and efficient system implementation. Our ability to minimise client input and time investment while delivering a high-quality, tailored solution showcases our proficiency in software development and problem-solving.
