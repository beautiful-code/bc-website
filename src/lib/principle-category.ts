export interface PrincipleCategory {
  name: string;
  slug: string;
  description: string;
  iconSlug: string;
  principleSlugs: string[];
}

export const principlesCategories: PrincipleCategory[] = [
  {
    slug: "code-quality-maintainability",
    name: "Code Quality & Maintainability",
    description:
      "Clarity and consistency keep production calm and shipping predictable.",
    iconSlug: "code-quality-maintainability",
    principleSlugs: [
      "one-function-one-job",
      "name-things-clearly",
      "duplicate-logic-is-a-liability",
      "readable-code-over-clever-code",
      "ai-is-confident-but-not-necessarily-correct",
    ],
  },
  {
    slug: "ownership",
    name: "Ownership",
    description:
      "We deliver outcomes by treating quality, communication, and alignment as part of the job.",
    iconSlug: "ownership",
    principleSlugs: [
      "design-the-api-before-you-code",
      "quality-isnt-someone-elses-job",
      "focus-on-the-root-cause-not-blame",
    ],
  },
  {
    slug: "testing-debugging",
    name: "Testing & Debugging",
    description:
      "Disciplined validation keeps regressions out and confidence high under pressure.",
    iconSlug: "testing-debugging",
    principleSlugs: [
      "reproduce-the-bug-before-you-fix-it",
      "every-bug-deserves-a-test",
      "when-the-logic-gets-tricky-lead-with-a-test",
    ],
  },
  {
    slug: "security-access-control",
    name: "Security & Access Control",
    description:
      "Tight controls and safe defaults protect teams, customers, and infrastructure.",
    iconSlug: "security-access-control",
    principleSlugs: [
      "minimal-permissions-maximum-safety",
      "all-external-data-is-untrusted",
      "never-share-secrets-over-insecure-channels",
    ],
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
