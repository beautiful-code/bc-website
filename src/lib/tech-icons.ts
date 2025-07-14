export function getTechIconPath(techString: string): string {
  return `/icons/tech/${techString}.svg`;
}

export function getTechIconPaths(techStrings: string[]): string[] {
  return techStrings.map((tech) => getTechIconPath(tech));
}
