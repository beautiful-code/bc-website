export interface Tech {
  name: string;
  slug: string;
}

export const techStack: Tech[] = [
  { name: "Airflow", slug: "airflow" },
  { name: "Angular", slug: "angular" },
  { name: "Anthropic", slug: "anthropic" },
  { name: "AWS", slug: "aws" },
  { name: "Azure", slug: "azure" },
  { name: "BigQuery", slug: "bigquery" },
  { name: "Bootstrap", slug: "bootstrap" },
  { name: "C++", slug: "c++" },
  { name: "CircleCI", slug: "circleci" },
  { name: "Claude", slug: "claude" },
  { name: "Chart.js", slug: "chartjs" },
  { name: "Databricks", slug: "databricks" },
  { name: "DeepSeek", slug: "deepseek" },
  { name: "Django", slug: "django" },
  { name: "Docker", slug: "docker" },
  { name: ".NET", slug: "dotnet" },
  { name: "Express.js", slug: "expressjs" },
  { name: "FastAPI", slug: "fastapi" },
  { name: "Flask", slug: "flask" },
  { name: "GitHub Actions", slug: "githubactions" },
  { name: "Go", slug: "go" },
  { name: "Golang", slug: "golang" },
  { name: "Google Cloud", slug: "googlecloud" },
  { name: "Grafana", slug: "grafana" },
  { name: "GraphQL", slug: "graphql" },
  { name: "gRPC", slug: "grpc" },
  { name: "HTML", slug: "html" },
  { name: "Hugging Face", slug: "huggingface" },
  { name: "Java", slug: "java" },
  { name: "Jenkins", slug: "jenkins" },
  { name: "JavaScript", slug: "js" },
  { name: "Kafka", slug: "kafka" },
  { name: "Kubernetes", slug: "kubernetes" },
  { name: "LangChain", slug: "langchain" },
  { name: "LangGraph", slug: "langgraph" },
  { name: "Laravel", slug: "laravel" },
  { name: "Leaflet.js", slug: "leaflet" },
  { name: "Material UI", slug: "material_ui" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Monte Carlo", slug: "montecarlo" },
  { name: "MySQL", slug: "mysql" },
  { name: "Next.js", slug: "nextjs" },
  { name: "Node.js", slug: "nodejs" },
  { name: "OpenAI", slug: "openai" },
  { name: "PHP", slug: "php" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Python", slug: "python" },
  { name: "PyTorch", slug: "pytorch" },
  { name: "Radix UI", slug: "radix" },
  { name: "React", slug: "react" },
  { name: "Redis", slug: "redis" },
  { name: "Redshift", slug: "redshift" },
  { name: "Redux", slug: "redux" },
  { name: "Ruby", slug: "ruby" },
  { name: "Ruby on Rails", slug: "rubyonrails" },
  { name: "shadcn/ui", slug: "shadcnui" },
  { name: "Spring Boot", slug: "springboot" },
  { name: "SQLite", slug: "sqlite" },
  { name: "Supabase", slug: "supabase" },
  { name: "Svelte", slug: "svelte" },
  { name: "Tailwind CSS", slug: "tailwind" },
  { name: "TensorFlow", slug: "tensorflow" },
  { name: "Terraform", slug: "terraform" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Vite", slug: "vite" },
  { name: "Vue", slug: "vue" },
  { name: "Webpack", slug: "webpack" },
];

export function getTechBySlug(slug: string): Tech | null {
  return techStack.find((tech) => tech.slug === slug) || null;
}

export function getTechByName(name: string): Tech | null {
  return techStack.find((tech) => tech.name === name) || null;
}

export function getTechIconPath(techString: string): string {
  return `/icons/tech/${techString}.png`;
}

export function getTechIconPaths(techStrings: string[]): string[] {
  return techStrings.map((tech) => getTechIconPath(tech));
}

export function getTechIconPathBySlug(slug: string): string {
  const tech = getTechBySlug(slug);
  return tech ? getTechIconPath(slug) : "/icons/tech/generic.png";
}

export function getTechIconPathByName(name: string): string {
  const tech = getTechByName(name);
  return tech ? getTechIconPath(tech.slug) : "/icons/tech/generic.png";
}

export function getGenericIconPath(): string {
  return "/icons/tech/generic.png";
}
