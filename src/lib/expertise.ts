export interface ExpertiseArea {
  name: string;
  slug: string;
}

export const appliedAIAreas: ExpertiseArea[] = [
  {
    name: "Agentic Systems",
    slug: "agentic-systems",
  },
  {
    name: "RAG Solutions",
    slug: "rag-solutions",
  },
  {
    name: "Fine Tuning",
    slug: "fine-tuning",
  },
  {
    name: "Evaluation",
    slug: "evaluation",
  },
  {
    name: "MLOps",
    slug: "mlops",
  },
  // {
  //   name: "Prompt & Context Engineering",
  //   slug: "prompt-context-engineering",
  // },
];

export const fullStackAreas: ExpertiseArea[] = [
  {
    name: "Frontend Engineering",
    slug: "frontend-engineering",
  },
  {
    name: "Backend Engineering",
    slug: "backend-engineering",
  },
  // {
  //   name: "Applied AI",
  //   slug: "ai-applied-ml",
  // },
  {
    name: "Infrastructure & Reliability",
    slug: "infrastructure-reliability",
  },
  {
    name: "Data Engineering",
    slug: "data-engineering",
  },
];

export const expertiseAreas = [...appliedAIAreas, ...fullStackAreas];

export function getExpertiseBySlug(slug: string): ExpertiseArea | null {
  return expertiseAreas.find((area) => area.slug === slug) || null;
}

export function getExpertiseByName(name: string): ExpertiseArea | null {
  return expertiseAreas.find((area) => area.name === name) || null;
}
