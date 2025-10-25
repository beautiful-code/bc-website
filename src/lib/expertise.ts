export interface ExpertiseArea {
  name: string;
  slug: string;
}

export const productEngineeringExpertiseAreas: ExpertiseArea[] = [
  {
    name: "Frontend Engineering",
    slug: "frontend-engineering",
  },
  {
    name: "Backend Engineering",
    slug: "backend-engineering",
  },
  {
    name: "Infrastructure & Reliability",
    slug: "infrastructure-reliability",
  },
  {
    name: "Data Engineering",
    slug: "data-engineering",
  },
];

export const aiExpertiseAreas: ExpertiseArea[] = [
  {
    name: "Agentic Systems",
    slug: "agentic-systems",
  },
  {
    name: "RAG Solutions",
    slug: "rag-solutions",
  },
  {
    name: "Evaluation",
    slug: "evaluation",
  },
  {
    name: "Fine Tuning",
    slug: "fine-tuning",
  },
  {
    name: "MLOps",
    slug: "machine-learning-ops",
  },
];

export const expertiseAreas: ExpertiseArea[] = [...aiExpertiseAreas, ...productEngineeringExpertiseAreas];

export function getExpertiseBySlug(slug: string): ExpertiseArea | null {
  return expertiseAreas.find((area) => area.slug === slug) || null;
}

export function getExpertiseByName(name: string): ExpertiseArea | null {
  return expertiseAreas.find((area) => area.name === name) || null;
}
