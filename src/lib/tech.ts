export interface Tech {
  name: string;
  slug: string;
}

export const techStack: Tech[] = [
  { name: "ADK", slug: "adk" },
  { name: "Airflow", slug: "airflow" },
  { name: "Angular", slug: "angular" },
  { name: "Anthropic", slug: "anthropic" },
  { name: "Apache Beam", slug: "apache-beam" },
  { name: "API", slug: "api" },
  { name: "API Design", slug: "api-design" },
  { name: "Authorization", slug: "authorization" },
  { name: "AWS", slug: "aws" },
  { name: "Azure", slug: "azure" },
  { name: "BigQuery", slug: "bigquery" },
  { name: "Bing", slug: "bing" },
  { name: "Brakeman", slug: "brakeman" },
  { name: "Bootstrap", slug: "bootstrap" },
  { name: "C++", slug: "c++" },
  { name: "CASL", slug: "casl" },
  { name: "Chart.js", slug: "chartjs" },
  { name: "Chrome DevTools", slug: "chrome-devtools" },
  { name: "CircleCI", slug: "circleci" },
  { name: "Claude", slug: "claude" },
  { name: "Cloud DNS", slug: "cloudDNS" },
  { name: "Cloud Storage", slug: "cloudstorage" },
  { name: "Container Analysis", slug: "dockercontainer" },
  { name: "CrewAI", slug: "crewai" },
  { name: "CSS", slug: "css" },
  { name: "D3.js", slug: "d3js" },
  { name: "DASK", slug: "dask" },
  { name: "Database", slug: "database" },
  { name: "Databricks", slug: "databricks" },
  { name: "Debugging", slug: "debugging" },
  { name: "DeepEval", slug: "deepeval" },
  { name: "DeepSeek", slug: "deepseek" },
  { name: "Django", slug: "django" },
  { name: "Docker", slug: "docker" },
  { name: ".NET", slug: "dotnet" },
  { name: "Express.js", slug: "expressjs" },
  { name: "FastAPI", slug: "fastapi" },
  { name: "Flask", slug: "flask" },
  { name: "Firebase", slug: "firebase" },
  { name: "Gemini", slug: "gemini" },
  { name: "GitHub Actions", slug: "githubactions" },
  { name: "Git", slug: "git" },
  { name: "GKE", slug: "gke" },
  { name: "Go", slug: "go" },
  { name: "Golang", slug: "golang" },
  { name: "Google Ads", slug: "googleads" },
  { name: "Google Cloud", slug: "googlecloud" },
  { name: "Google Cloud Appengine", slug: "googlecloudappengine" },
  { name: "Google Cloud Armor", slug: "cloudarmor" },
  { name: "Google Cloud Firewall", slug: "cloudfirewall" },
  { name: "Google Cloud Functions", slug: "googlecloudfunctions" },
  { name: "Google Cloud Key Management", slug: "cloudkey" },
  { name: "Google Cloud Logging", slug: "cloudlog" },
  { name: "Google Cloud Run", slug: "cloudrun" },
  { name: "Google Cloud Run", slug: "googlecloudrun" },
  { name: "Google Cloud Schedule", slug: "googlecloudschedule" },
  { name: "Google Cloud Scheduler", slug: "googlecloudscheduler" },
  { name: "Google Kubernetes Engine", slug: "kubernetes" },
  { name: "Google reCAPTCHA", slug: "googlerecaptcha" },
  { name: "Grafana", slug: "grafana" },
  { name: "Graph Database", slug: "graphdb" },
  { name: "GraphQL", slug: "graphql" },
  { name: "gRPC", slug: "grpc" },
  { name: "Hasura Engine", slug: "hasuraengine" },
  { name: "Hasura Cloud", slug: "hasuracloud" },
  { name: "Heap", slug: "heap" },
  { name: "Helm Charts", slug: "helmcharts" },
  { name: "HTML", slug: "html" },
  { name: "Hugging Face", slug: "huggingface" },
  { name: "Iframe", slug: "iframe" },
  { name: "Istio", slug: "istio" },
  { name: "Java", slug: "java" },
  { name: "Jenkins", slug: "jenkins" },
  { name: "JavaScript", slug: "js" },
  { name: "Jest", slug: "jest" },
  { name: "JWT", slug: "jwt" },
  { name: "Kafka", slug: "kafka" },
  { name: "Kubernetes", slug: "kubernetes" },
  { name: "LangChain", slug: "langchain" },
  { name: "LangGraph", slug: "langgraph" },
  { name: "LangSmith", slug: "langsmith" },
  { name: "Laravel", slug: "laravel" },
  { name: "Leaflet.js", slug: "leaflet" },
  { name: "LiteLLM", slug: "litellm" },
  { name: "LlamaIndex", slug: "llamaindex" },
  { name: "Material UI", slug: "material_ui" },
  { name: "Meta", slug: "meta" },
  { name: "Microservices", slug: "microservices" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Monte Carlo", slug: "montecarlo" },
  { name: "MySQL", slug: "mysql" },
  { name: "Neo4j", slug: "neo4j" },
  { name: "Next.js", slug: "nextjs" },
  { name: "Node.js", slug: "nodejs" },
  { name: "OpenAI", slug: "openai" },
  { name: "Pandas", slug: "pandas" },
  { name: "Performance", slug: "performance" },
  { name: "PHP", slug: "php" },
  { name: "Pinecone", slug: "pinecone" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "PubSub", slug: "pubsub" },
  { name: "Python", slug: "python" },
  { name: "PyTorch", slug: "pytorch" },
  { name: "RabbitMQ", slug: "rabbitmq" },
  { name: "Radix UI", slug: "radix" },
  { name: "React", slug: "react" },
  { name: "React Testing Library", slug: "reacttestinglibrary" },
  { name: "Redis", slug: "redis" },
  { name: "Redshift", slug: "redshift" },
  { name: "Redux", slug: "redux" },
  { name: "Rollup", slug: "rollup" },
  { name: "Ruby", slug: "ruby" },
  { name: "Ruby on Rails", slug: "rubyonrails" },
  { name: "RxJs", slug: "rxjs" },
  { name: "Salesforce", slug: "salesforce" },
  { name: "Selenium", slug: "selenium" },
  { name: "shadcn/ui", slug: "shadcnui" },
  { name: "SQL", slug: "sql" },
  { name: "Stackdriver", slug: "stackdriver" },
  { name: "Spring Boot", slug: "springboot" },
  { name: "SQLite", slug: "sqlite" },
  { name: "State Management", slug: "statemanagement" },
  { name: "Supabase", slug: "supabase" },
  { name: "Svelte", slug: "svelte" },
  { name: "Tailwind CSS", slug: "tailwind" },
  { name: "TaskGen", slug: "taskgen" },
  { name: "Tavily", slug: "tavily" },
  { name: "TensorFlow", slug: "tensorflow" },
  { name: "Terraform", slug: "terraform" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Vertex AI", slug: "vertexai" },
  { name: "Vite", slug: "vite" },
  { name: "Vue", slug: "vue" },
  { name: "Webpack", slug: "webpack" },
  { name: "Xander", slug: "xander" },
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
  const tech = getTechBySlug(slug);
  return tech ? getTechIconPath(slug) : "/icons/tech/generic.svg";
}

export function getTechIconPathByName(name: string): string {
  const tech = getTechByName(name);
  return tech ? getTechIconPath(tech.slug) : "/icons/tech/generic.svg";
}

export function getGenericIconPath(): string {
  return "/icons/tech/generic.svg";
}
