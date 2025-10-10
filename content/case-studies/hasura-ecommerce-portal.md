---
slug: "hasura-ecommerce-portal"
title: "50% Faster Time to Market: Accelerating E-commerce Portal Development with Hasura"
industry: "E-commerce"
heroImage: "/case-studies/hasura-ecommerce-portal/ecommerportalcoverphoto.jpg"
problemStatement: |
  Our client aimed to quickly launch a merchant portal to make it easier for merchants to sell their products online and to stay competitive. The two main challenges involved speeding up the app's development for a quick market launch, and creating a wide range of APIs that work well for both web and mobile versions, addressing different data needs.
clientInfo: "Our Client, a leading marketplace in the e-commerce sector, offers extensive product range and focuses on digital innovation to enhance the online customer experience."
# clientImage: "/case-studies/hasura-ecommerce-portal/client-logo.png"
outcomes:
  - outcome: "50% Reduction in Development Time"
    icon: "/case-studies/hasura-ecommerce-portal/outcome-time.png"
  - outcome: "30% Savings on Cloud Infrastructure"
    icon: "/case-studies/hasura-ecommerce-portal/outcome-savings.png"
  - outcome: "Supports 1 Million Live Data Connections"
    icon: "/case-studies/hasura-ecommerce-portal/outcome-connections.png"
expertises: ["backend-engineering", "frontend-engineering", "cloud-devops"]
technologies:
  - tech: "react"
    purpose: "the interactive fronten"
  - tech: "hasuraengine"
    purpose: "Instant GraphQL APIs and Unified Backend"
  - tech: "hasuracloud"
    purpose: "enhanced security and scalabilit"
  - tech: "firebase"
    purpose: "user authenticatio"
  - tech: "googlecloud"
    purpose: "email notification trigger"
  - tech: "postgresql"
    purpose: "the database solution"
  - tech: "graphql"
    purpose: "the communication protocol"

---



### How did BeautifulCode do it?

We started by evaluating various backend technologies for the e-commerce merchant platform, ranging from conventional solutions like microservices, monolithic structures to modern cloud-native solutions such as Hasura, PostGraphile.


<figure>
  <img src="/case-studies/hasura-ecommerce-portal/comparison_of_backend_solutions.png" alt="bar chart showing comparison of backend solutions" />
  <figcaption>
    Comparison of Backend Solutions
  </figcaption>
</figure>

In our decision-making, we prioritized criteria such as development speed, support for diverse data needs, scalability potential, and security robustness. Our final decision was to go with Hasura, primarily for its rapid development capabilities. This decision was influenced by Hasura’s ability to provide ready to use GraphQL APIs, its capacity to handle diverse data needs, its robust access control mechanisms, and the comprehensive scalability and security features offered by the Hasura Cloud.


### Leveraging Hasura's Auto-Generated APIs and Authorization

During development, we took advantage of Hasura's auto-generated APIs, which were automatically created from our tables in the underlying PostgreSQL database. This provided us with comprehensive functionalities for sorting, filtering, and associating data. This made our development faster. Hasura let us set specific permissions for insert, select, update, and delete operations. We could control access down to each row and column, making it secure and customized for different user roles on the portal.


### Supporting Custom Business Logic with Remote Schema

Our client used microservices for inventory management and order processing in their customer portal. They wanted to reuse these services for their new merchant portal. We connected these microservices to Hasura using the Remote Schema feature, adding their endpoints into Hasura's GraphQL API. This created a unified backend solution, combining different services into one system for the merchant portal.

### Hasura Event Triggers for Email Notifications

We set up automatic email notifications with Hasura's Event Triggers, which react to certain user events like new sign-ups, orders, or account changes. For example, after a new user signs up, a trigger calls a cloud function set as webhook to send welcome email.








