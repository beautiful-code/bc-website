export interface PrincipleCategory {
  name: string;
  slug: string;
}

export const principlesCategories: PrincipleCategory[] = [
  {
    name: "Software Design",
    slug: "software-design",
  },
  {
    name: "Coding & Development",
    slug: "coding-development",
  },
  {
    name: "System Architecture",
    slug: "system-architecture",
  },
  {
    name: "Quality Assurance",
    slug: "quality-assurance",
  },
  {
    name: "Performance Optimization",
    slug: "performance-optimization",
  },
  {
    name: "Security Best Practices",
    slug: "security-best-practices",
  },
];

export function getPrincipleBySlug(slug: string): PrincipleCategory | null {
  return (
    principlesCategories.find((category) => category.slug === slug) || null
  );
}

export function getPrincipleByName(name: string): PrincipleCategory | null {
  return (
    principlesCategories.find((category) => category.name === name) || null
  );
}
