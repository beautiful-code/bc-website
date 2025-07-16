export interface Tech {
  name: string;
  slug: string;
}

export const techStack: Tech[] = [
  {
    name: "JavaScript",
    slug: "js",
  },
  {
    name: "Next.js",
    slug: "nextjs",
  },
  // Add more tech stack items as needed
  {
    name: "React",
    slug: "react",
  },
  {
    name: "TypeScript",
    slug: "typescript",
  },
  {
    name: "Node.js",
    slug: "nodejs",
  },
  {
    name: "Python",
    slug: "python",
  },
  {
    name: "Django",
    slug: "django",
  },
  {
    name: "PostgreSQL",
    slug: "postgresql",
  },
  {
    name: "MongoDB",
    slug: "mongodb",
  },
  {
    name: "Docker",
    slug: "docker",
  },
  {
    name: "AWS",
    slug: "aws",
  },
  {
    name: "Git",
    slug: "git",
  },
];

export function getTechBySlug(slug: string): Tech | null {
  return techStack.find((tech) => tech.slug === slug) || null;
}

export function getTechByName(name: string): Tech | null {
  return techStack.find((tech) => tech.name === name) || null;
}

export function getTechIconPath(techString: string): string {
  return `/icons/tech/${techString}.svg`;
}

export function getTechIconPaths(techStrings: string[]): string[] {
  return techStrings.map((tech) => getTechIconPath(tech));
}

export function getTechIconPathBySlug(slug: string): string {
  return getTechIconPath(slug);
}

export function getTechIconPathByName(name: string): string {
  const tech = getTechByName(name);
  return tech ? getTechIconPath(tech.slug) : "";
}
