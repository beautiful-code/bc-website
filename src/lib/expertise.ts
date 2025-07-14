export interface ExpertiseArea {
  name: string;
  slug: string;
}

export const expertiseAreas: ExpertiseArea[] = [
  {
    name: "Frontend Engineering",
    slug: "frontend-engineering",
  },
  {
    name: "Backend Engineering",
    slug: "backend-engineering",
  },
  {
    name: "AI & Applied ML",
    slug: "ai-applied-ml",
  },
  {
    name: "Infrastructure & Reliability",
    slug: "infrastructure-reliability",
  },
  {
    name: "Data Engineering",
    slug: "data-engineering",
  },
  {
    name: "Software Maintenance",
    slug: "software-maintenance",
  },
];

export function getExpertiseBySlug(slug: string): ExpertiseArea | null {
  return expertiseAreas.find((area) => area.slug === slug) || null;
}

export function getExpertiseByName(name: string): ExpertiseArea | null {
  return expertiseAreas.find((area) => area.name === name) || null;
}
