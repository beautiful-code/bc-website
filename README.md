# BeautifulCode Website

A modern, content-driven marketing site for BeautifulCode, highlighting the team's product engineering expertise and guiding visitors through services, case studies, and operating principles.

## Tech Stack

- **Next.js 15.3.5** (App Router) – routing, rendering, and data fetching
- **TypeScript 5** – strict typing across components, content loaders, and utilities
- **Tailwind CSS v4 (via PostCSS)** – design system tokens defined in `globals.css`
- **ShadCN UI + Radix primitives** – accessible UI building blocks
- **Sass modules** – bespoke layout and markdown presentation styles
- **Turbopack dev server** – fast DX while iterating on the site

## Project Structure

```
bc-website/
├── src/
│   ├── app/
│   │   ├── page.tsx                     # Homepage with expertise & CTA
│   │   ├── principles/                  # Principles index, category, and detail routes
│   │   ├── expertise/                   # Expertise landing pages
│   │   └── globals.css                  # Tailwind + design tokens
│   ├── components/                      # Shared UI + layout primitives
│   │   ├── MenuPage.tsx                 # Two-column layout wrapper
│   │   └── ui/                          # ShadCN UI components
│   └── lib/
│       ├── principle.ts                 # Markdown loaders & helpers
│       ├── principle-category.ts        # Category metadata, ordering, icons
│       └── utils/                       # File + markdown utilities
├── content/
│   ├── principles/                      # Principle markdown (with summary frontmatter)
│   ├── expertise/                       # Expertise area markdown
│   └── articles/                        # Article markdown
└── public/
    ├── principles/                      # Principle comics & imagery
    ├── icons/                           # Expertise, principle, and tech icons
    └── ...
```

## Pages

### 1. Home Page

- Two-column layout: brand + navigation on the left, content on the right
- Highlights expertise areas with category icons
- Features a primary CTA card (“Our Engineering Principles”) that links to the principles index

### 2. Principles Experience

- Dedicated principles index (`/principles`) grouped by category with descriptive copy
- Category pages aggregate their principles and maintain the two-column layout
- Detail pages pull markdown content, breadcrumbs, and CTA navigation back to the grouped list
- Markdown authors supply a `summary` frontmatter value that feeds the index cards

### 3. Expertise & Article Pages

- Expertise areas and articles are sourced from markdown content
- Article pages render author, technology icons, and syntax-highlighted content
- Expertise pages cross-link to related case studies and articles (in-progress)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Content Management

Articles, principles, and expertise areas are managed through markdown files in the `content/` directory:

- `content/principles/*.md` – principle entries use the following frontmatter:

  ```yaml
  ---
  title: "Readable code > clever code."
  category: "code-quality-maintainability"   # see src/lib/principle-category.ts
  slug: "readable-code-over-clever-code"
  summary: "Write for the next person reading it -- clarity beats cleverness every time."
  ---
  ```

  The first markdown image is treated as the comic; the summary is surfaced on the index cards.

- `content/expertise/*.md` – expertise definitions that power the homepage navigation
- `content/articles/*.md` – long-form articles with frontmatter for title, author, expertise, etc.

## Features

- ✅ Responsive two-column layout with shared MenuPage wrapper
- ✅ Markdown-driven content for expertise, articles, and principles
- ✅ Principles index + category navigation with breadcrumb support
- ✅ First-class icon pipeline (expertise, principle, and technology icons)
- ✅ Tailwind + Sass hybrid styling for bespoke sections
- ⏳ Additional expertise deep-dives and case study wiring
- ⏳ Automated content validation + previews

## Icon Library

All icons live under `public/icons`. Technology icons are organised by slug and can be referenced via `/icons/tech/<slug>.(png|svg)`. The table below captures the current catalogue grouped by capability area.

| Category | Slugs |
| --- | --- |
| **Frontend & UI** | `angular`, `bootstrap`, `html`, `js` (png & svg), `material_ui`, `nextjs` (png & svg), `react`, `redux`, `shadcnui`, `tailwind`, `typescript`, `vite`, `vue`, `svelte`, `webpack`, `radix` |
| **Backend & APIs** | `nodejs`, `expressjs`, `django`, `fastapi`, `flask`, `go`, `golang`, `java`, `springboot`, `laravel`, `php`, `rubyonrails`, `ruby`, `dotnet` |
| **Data Platforms & Storage** | `postgresql`, `mysql`, `sqlite`, `redis`, `mongodb`, `kafka`, `redshift`, `bigquery`, `databricks`, `airflow`, `montecarlo`, `supabase` |
| **DevOps, Cloud & Infra** | `docker`, `kubernetes`, `terraform`, `aws`, `azure`, `googlecloud`, `githubactions`, `circleci`, `jenkins`, `grafana` |
| **AI, ML & LLM Ops** | `openai`, `anthropic`, `claude`, `deepseek`, `huggingface`, `langchain`, `langgraph`, `pytorch`, `tensorflow` |
| **Messaging & Connectivity** | `grpc` |
| **Generic** | `generic.png` (fallback when no specific slug is available) |

Principle category icons live under `public/icons/principle/` (e.g. `code-quality-maintainability.svg`, `testing-debugging.svg`, etc.) and are referenced within `src/lib/principle-category.ts`.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

The website is now ready for incremental development!
