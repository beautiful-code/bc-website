# Markdown Standard for BC Website Articles

This document outlines the markdown standards and requirements for articles generated for the BC Website. All generated articles must follow these specifications to ensure proper rendering and consistency.

## File Structure

### Article Files

- Articles must be placed in: `content/articles/`
- File naming: `{slug}.md` (e.g., `react-state-management.md`)

### Image Assets

- Images must be organized in: `public/articles/{slug}/`
- Example structure:

```
public/articles/
├── react-state-management/
│   ├── redux.jpeg
│   └── state-flow.png
├── design-systems/
│   ├── component-library.png
│   └── tokens-example.jpg
└── nextjs-performance/
    ├── performance-chart.png
    └── bundle-analysis.jpg
```

## Frontmatter Requirements

Every article must include the following frontmatter at the top of the file:

```yaml
---
title: "Article Title"
date: "YYYY-MM-DD"
expertise: "expertise-slug"
slug: "article-slug"
author: "Author Name"
tech: ["tech1", "tech2"]
keytakeaway: "Single sentence key takeaway that summarizes the main point of the article."
---
```

### Frontmatter Field Specifications

| Field         | Type   | Required | Description                     | Example                                       |
| ------------- | ------ | -------- | ------------------------------- | --------------------------------------------- |
| `title`       | String | ✅       | Article title                   | `"Building Scalable React Applications"`      |
| `date`        | String | ✅       | Publication date (ISO format)   | `"2024-06-05"`                                |
| `expertise`   | String | ✅       | Expertise area slug             | `"frontend-engineering"`                      |
| `slug`        | String | ✅       | URL-friendly article identifier | `"react-state-management"`                    |
| `author`      | String | ✅       | Author name                     | `"Manjunath"`                                 |
| `tech`        | Array  | ✅       | Technology tags                 | `["js", "nextjs"]`                            |
| `keytakeaway` | String | ✅       | Key takeaway summary            | `"Modern React state management is about..."` |

### Valid Expertise Values

- `"frontend-engineering"`
- `"backend-engineering"`
- `"ai-applied-ml"`
- `"infrastructure-reliability"`
- `"data-engineering"`
- `"software-maintenance"`

### Valid Tech Values

- `"js"` - JavaScript
- `"nextjs"` - Next.js
- (Additional values can be added as needed)

## Content Structure

### Headings

- **ONLY use h3 headings (`###`)** in article content
- Do not use h1 (`#`) or h2 (`##`) headings
- Headings will automatically be styled with brand colors

```markdown
### This is a Valid Heading

### Another Section Heading
```

### Key Takeaway Display

The `keytakeaway` from frontmatter is automatically rendered as a styled callout box after the article introduction. No additional markdown is needed.

## Images and Figures

### Image Organization

- Store all article images in: `public/articles/{slug}/`
- Use descriptive filenames: `redux-architecture.jpeg`, `performance-chart.png`

### Figure Implementation

Images must always be wrapped in `<figure>` tags with `<figcaption>`:

```html
<figure>
  <img src="/articles/{slug}/image-name.jpg" alt="Descriptive alt text" />
  <figcaption>Caption text describing the image content</figcaption>
</figure>
```

### Example

```html
<figure>
  <img
    src="/articles/react-state-management/redux.jpeg"
    alt="Redux State Management Architecture"
  />
  <figcaption>
    Redux state management flow showing actions, reducers, and store
    interactions
  </figcaption>
</figure>
```

### Image Requirements

- Always include descriptive `alt` text for accessibility
- Use meaningful `figcaption` text that adds context
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.svg`
- Images will automatically be responsive and styled

## Code Blocks

### Syntax Highlighting

Code blocks support syntax highlighting. Specify the language for proper highlighting:

````markdown
```javascript
const [isOpen, setIsOpen] = useState(false);
```

```typescript
interface User {
  name: string;
  email: string;
}
```

```css
.component {
  display: flex;
  justify-content: center;
}
```
````

### Inline Code

Use backticks for inline code references:

```markdown
Use `useState` for local component state and `useEffect` for side effects.
```

## Tables

Tables use GitHub Flavored Markdown (GFM) syntax:

```markdown
| Column 1 | Column 2 | Column 3  |
| -------- | -------- | --------- |
| Row 1    | Data     | More data |
| Row 2    | Data     | More data |
```

### Table Best Practices

- Keep header text concise but descriptive
- Use consistent formatting within columns
- For longer descriptions, break into multiple lines naturally
- Tables will automatically be styled with alternating row colors

## Raw HTML Support

The markdown processor supports raw HTML when needed:

- Required for `<figure>` and `<figcaption>` tags
- Can be used for complex layouts if necessary
- Always prefer markdown syntax when possible

## Example Article Structure

````markdown
---
title: "Example Article Title"
date: "2024-06-05"
expertise: "frontend-engineering"
slug: "example-article"
author: "Author Name"
tech: ["js", "nextjs"]
keytakeaway: "This is the key takeaway that will be displayed prominently."
---

Brief introduction paragraph that sets the context for the article.

<figure>
  <img src="/articles/example-article/hero-image.jpg" alt="Article hero image" />
  <figcaption>Caption explaining the hero image</figcaption>
</figure>

### First Main Section

Content for the first section with inline `code references` and **bold text**.

```javascript
// Code example with syntax highlighting
const example = "Hello World";
```
````

### Comparison Table

| Feature     | Option A | Option B |
| ----------- | -------- | -------- |
| Performance | High     | Medium   |
| Complexity  | Low      | High     |

### Best Practices

1. First best practice
2. Second best practice
3. Third best practice

### Conclusion

Summary and final thoughts.

```

## Validation Checklist

Before generating articles, ensure:

- ✅ All required frontmatter fields are present and valid
- ✅ Only h3 headings are used in content
- ✅ Images are in `public/articles/{slug}/` directory
- ✅ All images use `<figure>` and `<figcaption>` tags
- ✅ Code blocks specify language for syntax highlighting
- ✅ Tables use proper GFM syntax
- ✅ Article slug matches directory structure
- ✅ Tech array contains valid technology identifiers
- ✅ Key takeaway is a single, clear sentence

## Error Prevention

Common issues to avoid:
- Using h1 or h2 headings (only h3 allowed)
- Missing required frontmatter fields
- Images without figure/figcaption wrappers
- Incorrect image paths (must start with `/articles/{slug}/`)
- Empty or missing alt text on images
- Invalid expertise or tech values in frontmatter
```
