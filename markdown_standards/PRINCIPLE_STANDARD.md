# Markdown Standard for BC Website Principles

This document outlines the markdown standards and requirements for principles generated for the BC Website. All generated principles must follow these specifications to ensure proper rendering and consistency.

## File Structure

### Principle Files

- Principles must be placed in: `content/principles/`
- File naming: `{slug}.md` (e.g., `clean-code-practices.md`)

### Image Assets

- Images must be organized in: `public/principles/{slug}/`
- Example structure:

```
public/principles/
├── clean-code-practices/
│   ├── comic.png
│   └── code-example.png
├── software-design/
│   ├── architecture-diagram.png
│   └── design-pattern.png
└── coding-development/
    ├── best-practices.png
    └── workflow-diagram.png
```

## Frontmatter Requirements

Every principle must include the following frontmatter at the top of the file:

```yaml
---
title: "Principle Title"
category: "category-slug"
slug: "principle-slug"
---
```

### Frontmatter Field Specifications

| Field      | Type   | Required | Description                       | Example                        |
| ---------- | ------ | -------- | --------------------------------- | ------------------------------ |
| `title`    | String | ✅       | Principle title                   | `"Write Clean, Readable Code"` |
| `category` | String | ✅       | Principle category slug           | `"coding-development"`         |
| `slug`     | String | ✅       | URL-friendly principle identifier | `"clean-code-practices"`       |

### Valid Category Values

- `"software-design"` - Software Design principles
- `"coding-development"` - Coding & Development principles

## Content Structure

### Introduction Image

Every principle should start with an introductory image that represents the concept:

```markdown
![Principle Title](/principles/{slug}/comic.png)
```

### Headings

- **ONLY use h3 headings (`###`)** in principle content
- Do not use h1 (`#`) or h2 (`##`) headings
- Headings will automatically be styled with brand colors

```markdown
### Deeper Understanding

### How to put it into practice?
```

### Recommended Section Structure

Principles should follow a consistent structure with two main sections:

1. **Deeper Understanding** - Explains the concept and why it matters
2. **How to put it into practice?** - Provides practical guidance and examples

## Images and Figures

### Image Organization

- Store all principle images in: `public/principles/{slug}/`
- Use descriptive filenames: `comic.png`, `example-diagram.png`

### Figure Implementation

Images must always be wrapped in `<figure>` tags with `<figcaption>`:

```html
<figure>
  <img src="/principles/{slug}/image-name.jpg" alt="Descriptive alt text" />
  <figcaption>Caption text describing the image content</figcaption>
</figure>
```

### Example

```html
<figure>
  <img
    src="/principles/clean-code-practices/code-example.png"
    alt="Clean code example showing good vs bad practices"
  />
  <figcaption>
    Comparison of clean vs messy code demonstrating readability improvements
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
// Good example
const meaningfulName = (value) => value * 2;
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

### Code Examples Best Practices

- Always show both "bad" and "good" examples when demonstrating principles
- Use clear, concise examples that illustrate the point
- Include comments to explain the reasoning

````markdown
```javascript
// Bad - unclear naming
const d = new Date();
const fn = (x) => x * 2;

// Good - meaningful names
const currentDate = new Date();
const doubleValue = (value) => value * 2;
```
````

````

### Inline Code

Use backticks for inline code references:

```markdown
Use `useState` for local component state and `useEffect` for side effects.
````

## Validation Checklist

Before submitting a principle, ensure it meets all requirements:

- [ ] Frontmatter includes all required fields with valid values
- [ ] Only h3 headings are used in content
- [ ] Introduction image is included at the top
- [ ] Content follows the two-section structure (Deeper Understanding + How to put it into practice?)
- [ ] Code examples include both good and bad practices
- [ ] All images are properly wrapped in `<figure>` tags with `<figcaption>`
- [ ] Code blocks specify the correct language for syntax highlighting
- [ ] Content is practical and actionable
- [ ] Writing style is clear and instructional
- [ ] Principle appears correctly in the category page
- [ ] All links and images work properly

## How to add a new principle?

### Step 1: Create the Markdown File

1. Create a new markdown file in `content/principles/` with the naming convention `{slug}.md`
2. Use a descriptive, URL-friendly slug (e.g., `test-driven-development.md`, `microservices-architecture.md`)

### Step 2: Add Frontmatter

Add the required frontmatter at the top of the file:

```yaml
---
title: "Your Principle Title"
category: "category-slug"
slug: "your-principle-slug"
---
```

### Step 3: Create Image Directory

1. Create a directory in `public/principles/{slug}/` for your principle's images
2. Add an introductory image (e.g., `comic.png`, `illustration.png`) that represents the concept
3. Reference this image at the top of your content:

```markdown
![Principle Title](/principles/{slug}/comic.png)
```

### Step 4: Write Content

Follow the two-section structure:

1. **Deeper Understanding** - Explain the concept and why it matters
2. **How to put it into practice?** - Provide practical guidance with examples

Use only h3 headings (`###`) and include code examples showing both good and bad practices.

### Step 5: Add to Principle Categories (if needed)

If you're creating a principle for a new category:

1. Update `src/lib/principle-category.ts` to include the new category
2. Add the category to the `principlesCategories` array
3. Ensure the category slug matches what you used in the frontmatter

### Step 6: Test and Validate

1. Run the development server to ensure the principle renders correctly
2. Check that the principle appears in the correct category page
3. Verify all images load properly
4. Review the content against the validation checklist above
