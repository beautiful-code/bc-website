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
