# BeautifulCode Website

A modern, responsive website for BeautifulCode product engineering services firm.

## Tech Stack

- **Next.js 15.3.5** - React framework with app directory
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN UI** - Beautiful, accessible UI components
- **Vercel** - Deployment platform (planned)

## Project Structure

```
bc-website/
├── src/
│   ├── app/
│   │   ├── page.tsx        # Homepage
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   └── ui/             # ShadCN UI components
│   └── lib/
│       └── utils.ts        # Utility functions
├── content/
│   ├── expertise/          # Expertise area markdown files
│   └── articles/           # Article markdown files
└── public/                 # Static assets
```

## Pages

### 1. Home Page

- Two-column layout: logo on left, expertise areas on right
- Responsive design with mobile-first approach
- Built with ShadCN Card components

### 2. Expertise Page (Coming Soon)

- Same layout as home with navigation sidebar
- Recent articles for each expertise area
- Load more functionality

### 3. Article Page (Coming Soon)

- Individual article display
- Author info, technologies, key takeaways
- Markdown content rendering

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

Articles and expertise areas are managed through markdown files in the `content/` directory:

- `content/expertise/` - Expertise area descriptions
- `content/articles/` - Individual articles

## Features

- ✅ Responsive design
- ✅ TypeScript support
- ✅ ShadCN UI components
- ✅ Tailwind CSS styling
- ✅ SEO-friendly with Next.js SSG
- ⏳ Markdown content support (planned)
- ⏳ Dynamic routing (planned)
- ⏳ Article pagination (planned)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

The website is now ready for incremental development!
