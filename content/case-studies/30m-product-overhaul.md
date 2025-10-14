---
slug: "30m-product-overhaul"
title: "Enabling Future Success: Building a unified product to meet future business demands"
industry: "Ad-Tech / Travel Marketing"
heroImage: "/case-studies/30m-product-overhaul/heroimage.jpg"
problemStatement: |
  "The client was developing a new-generation travel marketing platform to keep pace with the Ad-Tech industry's dynamic nature. The primary objectives of this application were

  - Easily manage various business offerings to accelerate time to market and facilitate experimentation
  - Improve operational efficiency by replacing outdated legacy applications.

clientInfo: "A 30M ARR travel marketing platform provides data-driven solutions for businesses in the travel industry. Specializing in digital advertising, it helps optimize campaigns and enhance customer engagement for travel brands."
# clientImage: "/case-studies/30m-product-overhaul/client-logo.png"
outcomes:
  - outcome: "60% savings in Cloud Infra costs"
    icon: "/icons/outcome/outcome-savings.svg"
  - outcome: "Developer count cut down by 50%"
    icon: "/icons/outcome/outcome-team.png"
  - outcome: "Accelerated product launches from 2 months to 2 weeks"
    icon: "/icons/outcome/outcome-speed.svg"
expertises: ["backend-engineering", "frontend-engineering", "cloud-devops"]
technologies:
  - tech: "golang"
    purpose: "its concurrency and efficiency"
  - tech: "react"
    purpose: "component-based structure"
  - tech: "grpc"
    purpose: "communication "
  - tech: "hasuraengine"
    purpose: "ability to quickly provide ready-to-use GraphQL APIs"
  - tech: "postgresql"
    purpose: "for advanced data integrity feature"
  - tech: "firebase"
    purpose: "authentication service"
  - tech: "googlerecaptcha"
    purpose: "to prevent bots from accessing"
  - tech: "heap"
    purpose: "automatically track all user activities"
  - tech: "selenium"
    purpose: "automated testing suite "
  - tech: "jenkins"
    purpose: "pipelines to automate the build, and deployment"
  - tech: "googlecloud"
    purpose: "infrastructure partner "
  - tech: "stackdriver"
    purpose: "monitoring system up time and performance"
# testimonial:
#   quote: ""
#   author: ""
#   authorImage: "/case-studies/30m-product-overhaul/client-author.jpg"
---

### How did BeautifulCode do it?

### Why a new Travel Marketing Platform was needed?

The client had multiple applications to support different business offerings. The existing suite had the following challenges/issues

- Users faced low productivity due to using different applications for different tasks. For example, they set up campaigns in one application and then had to switch to another application to check the performance, causing inefficiency
- Overlapping features in multiple applications required a larger team of engineers for development and maintenance. This resulted in increased engineering costs
- Business data (ex: target audience segments) was present in an external CRM system. To meet new business requirements, it was becoming increasingly difficult to customize the business data. Furthermore, integrating this data with the internal systems was not flexible
- Enhancement or addition of features required updating multiple systems which was time consuming and a complex change
- Standardizing Tech stack - The legacy applications, built using various frameworks and languages, led to the need for more developers, increased maintenance, and multiple development processes, which in turn raised overall costs.

### New platform - Desired capabilities

The new platform was designed not only to fill the gaps in the existing applications suite but also to introduce more capabilities in the product and technology areas. Some of them were

- **Single platform** - One-stop shop with a single UI for internal users and customers to support all the operations covering customer onboarding, reconciliation workflow, analyze reports, etc.,
- **Future Ready** - Ability to easily integrate and adopt new offerings such as re-targeting using cookie-less approaches
- **Enhanced Reporting** - Offer new charts and dashboards, with more analytics reporting capabilities
- Integrations with the Ad platforms (eg: Google, Meta) to launch/manage campaigns with less operational overhead
- Automation of important workflows like Contract management, Account Management etc.,

The BeautifulCode team invested significant time understanding the existing business processes and collaborated with Product Managers to design the architecture of the new platform. Here are some technical aspects

- **Microservices Architecture** – This selection was based on two key reasons:

  - To reuse existing services, allowing for their gradual deprecation and replacement
  - To enable parallel development by different teams on various services

- **Standardized Tech Stac**

  - **Backend:** GoLang was selected for backend development due to its concurrency and efficiency
  - The front-end Single Page Application (SPA) was developed using React for its component-based structure and efficient rendering via virtual DOM. JSX was chosen for its strong static typing, enhancing error detection during compile time
  - **gRPC** was chosen as our communication protocol because of its high performance and the type safety provided by protocol buffers.
  - **Hasura** was selected for its ability to quickly provide ready-to-use GraphQL APIs that connect to databases and micro-services. This choice speeds up development by minimizing the need for extensive coding
  - **PostgreSQL** for its robustness and advanced data integrity feature

- **Authentication & Authorization** – An SSO (Single Sign-On) system was developed to manage login for frontend and access for backend applications. Firebase was used as the authentication service for its easy integration, along with JWT (JSON Web Tokens) to ensure safe and secure information exchange.

- **Leveraging 3rd Party Frameworks**

  - Google reCAPTCHA was integrated to prevent bots from accessing and interacting with the websit
  - Heap was integrated into the application to automatically track all user activities, such as clicks and form submission

- **Automated Testing** – A Selenium-based automated testing suite was implemented to address the regression issues during the development of new features

- **CI/CD** – CI/CD pipelines were implemented (in Jenkins) to automate the build, and deployment processes to ensure the code changes are quickly and consistently integrated into the system

- **Cloud Infrastructure** – GCP was chosen as the cloud infrastructure partner for its capabilities in auto-scalability, security, and easy integration

- **Monitoring & Alerting** – Stackdriver and Datadog were integrated for monitoring system up time and performance. Integrations were built to slack and email to send alerts in case of any issues. These integrations helped reducing the time required for defect discovery and facilitating quick resolutions.

### Conclusion

The BeautifulCode team's development of the new platform successfully resolved the challenges of the client's previous systems. This unified platform boosted productivity, cut engineering costs, and simplified the data management. The platform is a significant advancement in optimizing & streamlining the business operations and also standardizing the technology stack.
