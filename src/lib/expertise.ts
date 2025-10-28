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
    name: "Evaluation",
    slug: "evaluation",
  },
  {
    name: "Fine Tuning",
    slug: "fine-tuning",
  },
  {
    name: "MLOps",
    slug: "mlops",
  },
];

export const productEngineeringAreas: ExpertiseArea[] = [
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

export function getExpertiseBySlug(slug: string): ExpertiseArea | null {
  const appliedAIArea = appliedAIAreas.find((area) => area.slug === slug);
  if (appliedAIArea) {
    return appliedAIArea;
  }
  const productEngineeringArea = productEngineeringAreas.find((area) => area.slug === slug);
  if (productEngineeringArea) {
    return productEngineeringArea;
  }
  return null;
}
