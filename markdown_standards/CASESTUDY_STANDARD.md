# Markdown Standard for BC Website Case Studies

This document outlines the markdown standards and requirements for case studies generated for the BC Website. All generated case studies must follow these specifications to ensure proper rendering and consistency.

## File Structure

### Case Study Files

- Case studies must be placed in: `content/case-studies/`
- File naming: `{slug}.md` (e.g., `ecommerce-platform-modernization.md`)

### Image Assets

- Images must be organized in: `public/case-studies/{slug}/`
- Example structure:

```
public/case-studies/
├── ecommerce-platform-modernization/
│   ├── client-logo.png
│   ├── architecture-diagram.jpg
│   ├── performance-results.png
│   └── author-headshot.jpg
├── ai-recommendation-engine/
│   ├── client-logo.svg
│   ├── ml-pipeline.png
│   └── outcomes/
│       ├── conversion-icon.svg
│       └── revenue-icon.svg
└── mobile-app-redesign/
    ├── before-after.jpg
    └── user-testing-results.png
```

## Frontmatter Requirements

Every case study must include the following frontmatter at the top of the file:

```yaml
---
slug: "case-study-slug"
title: "Case Study Title"
industry: "Industry sector"
heroImage: "/case-studies/{slug}/hero-image.jpg"
problemStatement: "Brief description of the client's challenge or problem."
clientInfo: "Client company name and brief description"
clientImage: "/case-studies/{slug}/client-logo.png"
outcomes:
  - outcome: "Specific measurable outcome achieved"
    icon: "/case-studies/{slug}/outcome-icon.svg"
  - outcome: "Another quantifiable result"
    icon: "/case-studies/{slug}/another-icon.svg"
expertises: ["expertise-1", "expertise-2"]
technologies:
  - tech: "technology-name"
    purpose: "How this technology was used in the project"
  - tech: "another-technology"
    purpose: "Purpose of this technology in the solution"
testimonial:
  quote: "Client testimonial quote highlighting the project success"
  author: "Client Name, Title"
  authorImage: "/case-studies/{slug}/client-author.jpg"
---
```

### Frontmatter Field Specifications

| Field              | Type   | Required | Description                        | Example                                        |
| ------------------ | ------ | -------- | ---------------------------------- | ---------------------------------------------- |
| `slug`             | String | ✅       | URL-friendly case study identifier | `"ecommerce-platform-modernization"`           |
| `title`            | String | ✅       | Case study title                   | `"E-commerce Platform Modernization"`          |
| `industry`         | String | ✅       | Client's industry sector           | `"E-commerce"` or `"Healthcare"`               |
| `heroImage`        | String | ✅       | Main hero image for case study     | `"/case-studies/slug/hero-image.jpg"`          |
| `problemStatement` | String | ✅       | Brief problem description          | `"Legacy system causing performance..."`       |
| `clientInfo`       | String | ✅       | Client name and description        | `"TechCorp - Leading SaaS provider"`           |
| `clientImage`      | String | ✅       | Path to client logo/image          | `"/case-studies/slug/client-logo.png"`         |
| `outcomes`         | Array  | ✅       | Array of outcome objects           | See outcomes structure below                   |
| `expertises`       | Array  | ✅       | Array of expertise area slugs      | `["frontend-engineering", "data-engineering"]` |
| `technologies`     | Array  | ✅       | Array of technology objects        | See technologies structure below               |
| `testimonial`      | Object | ✅       | Client testimonial object          | See testimonial structure below                |

### Outcomes Structure

Each outcome object must contain:

```yaml
outcomes:
  - outcome: "50% improvement in page load times"
    icon: "/case-studies/{slug}/performance-icon.svg"
  - outcome: "2x increase in user engagement"
    icon: "/case-studies/{slug}/engagement-icon.svg"
  - outcome: "$1M additional revenue in first quarter"
    icon: "/case-studies/{slug}/revenue-icon.svg"
```

| Field     | Type   | Required | Description                     |
| --------- | ------ | -------- | ------------------------------- |
| `outcome` | String | ✅       | Specific measurable achievement |
| `icon`    | String | ✅       | Path to outcome icon file       |

### Technologies Structure

Each technology object must contain:

```yaml
technologies:
  - tech: "nextjs"
    purpose: "Frontend framework for server-side rendering"
  - tech: "aws"
    purpose: "Cloud infrastructure and deployment platform"
  - tech: "postgresql"
    purpose: "Primary database for user and transaction data"
```

| Field     | Type   | Required | Description                                 |
| --------- | ------ | -------- | ------------------------------------------- |
| `tech`    | String | ✅       | Standard technology name (see valid values) |
| `purpose` | String | ✅       | How technology was used in project          |

### Testimonial Structure

The testimonial object must contain:

```yaml
testimonial:
  quote: "BC's team delivered exceptional results that transformed our business operations."
  author: "Jane Smith, CTO"
  authorImage: "/case-studies/{slug}/jane-smith.jpg"
```

| Field         | Type   | Required | Description                  |
| ------------- | ------ | -------- | ---------------------------- |
| `quote`       | String | ✅       | Client testimonial text      |
| `author`      | String | ✅       | Author name and title        |
| `authorImage` | String | ✅       | Path to author profile image |

### Valid Expertise Values

- `"frontend-engineering"`
- `"backend-engineering"`
- `"ai-applied-ml"`
- `"infrastructure-reliability"`
- `"data-engineering"`
- `"software-maintenance"`

### Valid Technology Values

- `"js"` - JavaScript
- `"nextjs"` - Next.js
- `"react"` - React
- `"typescript"` - TypeScript
- `"nodejs"` - Node.js
- `"python"` - Python
- `"aws"` - Amazon Web Services
- `"postgresql"` - PostgreSQL
- `"mongodb"` - MongoDB
- `"docker"` - Docker
- `"kubernetes"` - Kubernetes
- (Additional values can be added as needed)

## Content Structure

### Headings

- **ONLY use h3 headings (`###`)** in case study content
- Do not use h1 (`#`) or h2 (`##`) headings
- Headings will automatically be styled with brand colors

```markdown
### How did BC do it?

### Conclusion
```

## Images and Figures

### Image Organization

- Store all case study images in: `public/case-studies/{slug}/`
- Use descriptive filenames: `architecture-diagram.png`, `performance-results.jpg`

### Figure Implementation

Images must always be wrapped in `<figure>` tags with `<figcaption>`:

```html
<figure>
  <img src="/case-studies/{slug}/image-name.jpg" alt="Descriptive alt text" />
  <figcaption>Caption text describing the image content</figcaption>
</figure>
```

### Example

```html
<figure>
  <img
    src="/case-studies/ecommerce-modernization/architecture-diagram.png"
    alt="Modernized e-commerce platform architecture"
  />
  <figcaption>
    New microservices architecture showing improved scalability and performance
  </figcaption>
</figure>
```

## Code Blocks

### Syntax Highlighting

Code blocks support syntax highlighting for technical implementation details:

````markdown
```javascript
// Example implementation snippet
const optimizeQuery = async (query) => {
  return await database.query(query, { cache: true });
};
```

```yaml
# Example configuration
services:
  web:
    build: .
    ports:
      - "3000:3000"
```
````

## Tables and Metrics

Tables are excellent for presenting comparative data and metrics:

```markdown
### Performance Improvements

| Metric            | Before | After  | Improvement |
| ----------------- | ------ | ------ | ----------- |
| Page Load Time    | 3.2s   | 1.1s   | 66%         |
| Server Response   | 800ms  | 200ms  | 75%         |
| User Satisfaction | 6.2/10 | 9.1/10 | 47%         |
```

## Asset Requirements

### Client Images

- Client logos should be high-resolution (minimum 200x200px)
- Prefer SVG format for logos when available
- PNG with transparent background for non-SVG logos

### Outcome Icons

- Use consistent icon style across all outcomes
- SVG format preferred for scalability
- Icons should be 24x24px or 32x32px minimum

### Author Images

- Professional headshots recommended
- Square aspect ratio (1:1)
- Minimum 150x150px resolution
- JPG or PNG format

## Example Case Study Structure

````markdown
---
slug: "ecommerce-platform-modernization"
title: "E-commerce Platform Modernization"
industry: "E-commerce"
heroImage: "/case-studies/ecommerce-platform-modernization/hero-image.jpg"
problemStatement: "Legacy monolithic architecture causing performance bottlenecks and limiting scalability for growing user base."
clientInfo: "TechCorp - Leading B2B SaaS provider with 50,000+ daily active users"
clientImage: "/case-studies/ecommerce-platform-modernization/techcorp-logo.png"
outcomes:
  - outcome: "66% reduction in page load times"
    icon: "/case-studies/ecommerce-platform-modernization/speed-icon.svg"
  - outcome: "99.9% uptime achieved"
    icon: "/case-studies/ecommerce-platform-modernization/uptime-icon.svg"
  - outcome: "$2M annual cost savings"
    icon: "/case-studies/ecommerce-platform-modernization/savings-icon.svg"
expertises: ["backend-engineering", "infrastructure-reliability"]
technologies:
  - tech: "nodejs"
    purpose: "Microservices backend development"
  - tech: "aws"
    purpose: "Cloud infrastructure and auto-scaling"
  - tech: "postgresql"
    purpose: "Primary database with read replicas"
testimonial:
  quote: "BC transformed our infrastructure and delivered results beyond our expectations. The new system handles 10x the load with improved reliability."
  author: "Sarah Johnson, CTO at TechCorp"
  authorImage: "/case-studies/ecommerce-platform-modernization/sarah-johnson.jpg"
---

TechCorp approached BC with a critical challenge: their legacy e-commerce platform was struggling to handle growing traffic and needed a complete modernization to support their business expansion.

### The Challenge

The existing monolithic architecture was creating significant bottlenecks...

<figure>
  <img src="/case-studies/ecommerce-platform-modernization/legacy-architecture.png" alt="Legacy monolithic architecture diagram" />
  <figcaption>
    Original monolithic architecture showing performance bottlenecks
  </figcaption>
</figure>

### Our Approach

We designed a comprehensive modernization strategy...

### Technical Implementation

The solution involved migrating to a microservices architecture...

```javascript
// Example implementation
const orderService = {
  async processOrder(orderData) {
    return await this.validateAndProcess(orderData);
  },
};
```

### Results and Impact

The modernized platform delivered exceptional results...

| Metric           | Before | After  | Improvement |
| ---------------- | ------ | ------ | ----------- |
| Response Time    | 2.8s   | 0.95s  | 66%         |
| Concurrent Users | 1,000  | 10,000 | 900%        |
| System Uptime    | 97.2%  | 99.9%  | 2.7%        |
````

## Validation Checklist

Before publishing, ensure your case study meets these requirements:

- [ ] All required frontmatter fields are present and correctly formatted
- [ ] Hero image exists at specified path
- [ ] Client image exists at specified path
- [ ] All outcome icons exist at specified paths
- [ ] Author image exists at specified path
- [ ] All expertise values are from the valid list
- [ ] All technology values are from the valid list
- [ ] Only h3 headings are used in content
- [ ] All images are wrapped in `<figure>` tags with `<figcaption>`
- [ ] Code blocks specify language for syntax highlighting
- [ ] All file paths use forward slashes and start with `/`
