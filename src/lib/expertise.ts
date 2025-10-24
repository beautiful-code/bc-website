export interface ExpertiseArea {
  name: string;
  slug: string;
  category: "ai" | "product";
}

export const expertiseAreas: ExpertiseArea[] = [
  // AI Expertise
  {
    name: "Agentic Systems",
    slug: "agentic-systems",
    category: "ai",
  },
  {
    name: "RAG Solutions",
    slug: "rag-solutions",
    category: "ai",
  },
  {
    name: "Evaluation",
    slug: "evaluation",
    category: "ai",
  },
  {
    name: "Fine Tuning",
    slug: "fine-tuning",
    category: "ai",
  },
  {
    name: "Machine Learning Ops",
    slug: "machine-learning-ops",
    category: "ai",
  },
  // Product Engineering
  {
    name: "Frontend Engineering",
    slug: "frontend-engineering",
    category: "product",
  },
  {
    name: "Backend Engineering",
    slug: "backend-engineering",
    category: "product",
  },
  {
    name: "Infrastructure & Reliability",
    slug: "infrastructure-reliability",
    category: "product",
  },
  {
    name: "Data Engineering",
    slug: "data-engineering",
    category: "product",
  },
];

export function getExpertiseBySlug(slug: string): ExpertiseArea | null {
  return expertiseAreas.find((area) => area.slug === slug) || null;
}

export function getExpertiseByName(name: string): ExpertiseArea | null {
  return expertiseAreas.find((area) => area.name === name) || null;
}
