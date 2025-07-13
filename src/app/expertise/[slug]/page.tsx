import Image from "next/image";
import Link from "next/link";
import ExpertiseIcon from "@/components/ExpertiseIcon";
import ArticleCard from "@/components/ArticleCard";
import "../../../styles/layout.scss";

// Mock article data
const mockArticles = {
  "ai-applied-ml": [
    {
      title:
        "Managing Asynchronous Background Jobs with Google Cloud Tasks in Cloud-Native Applications",
      date: "6 Jun, 25",
      tags: ["Cloud", "Tasks"],
    },
    {
      title:
        "Real-Time Ride-Sharing Platform Architecture: Getting a Driver to Your Door in < 1 Minute",
      date: "5 Jun, 25",
      tags: ["Architecture"],
    },
    {
      title: "Ad-Impression Tracking Pipeline: From Pixel to Dashboard",
      date: "4 Jun, 25",
      tags: ["Pipeline", "Analytics"],
    },
    {
      title: "Real-Time Anomaly Detection in Streaming Data Pipelines",
      date: "2 Jun, 25",
      tags: ["Streaming", "ML", "Monitoring"],
    },
    {
      title:
        "Self-Supervised Representation Learning for Medical Imaging: Reducing Annotation Burden",
      date: "1 Jun, 25",
      tags: ["ML", "Healthcare"],
    },
    {
      title: "MLOps at Scale: Continuous Delivery for Machine Learning Systems",
      date: "1 Jun, 25",
      tags: ["MLOps", "CI/CD"],
    },
  ],
  "frontend-engineering": [
    {
      title:
        "Building Scalable React Applications with Modern State Management",
      date: "5 Jun, 25",
      tags: ["React", "State"],
    },
    {
      title:
        "Performance Optimization in Next.js: From First Paint to Interaction",
      date: "3 Jun, 25",
      tags: ["Next.js", "Performance"],
    },
    {
      title: "Design Systems at Scale: Building Consistent UIs Across Teams",
      date: "1 Jun, 25",
      tags: ["Design", "Systems"],
    },
  ],
  "backend-engineering": [
    {
      title: "Microservices Architecture: Event-Driven Communication Patterns",
      date: "4 Jun, 25",
      tags: ["Microservices", "Events"],
    },
    {
      title: "API Gateway Patterns for Distributed Systems",
      date: "2 Jun, 25",
      tags: ["API", "Gateway"],
    },
    {
      title: "Database Sharding Strategies for High-Volume Applications",
      date: "1 Jun, 25",
      tags: ["Database", "Scaling"],
    },
  ],
  "infrastructure-reliability": [
    {
      title: "Kubernetes Deployment Strategies for Zero-Downtime Releases",
      date: "3 Jun, 25",
      tags: ["Kubernetes", "Deployment"],
    },
    {
      title: "Observability in Distributed Systems: Metrics, Logs, and Traces",
      date: "2 Jun, 25",
      tags: ["Observability", "Monitoring"],
    },
    {
      title: "Chaos Engineering: Building Resilient Systems",
      date: "1 Jun, 25",
      tags: ["Chaos", "Resilience"],
    },
  ],
  "data-engineering": [
    {
      title: "Building Real-Time Data Pipelines with Apache Kafka",
      date: "4 Jun, 25",
      tags: ["Kafka", "Streaming"],
    },
    {
      title: "Data Lake Architecture: From Ingestion to Analytics",
      date: "2 Jun, 25",
      tags: ["Data Lake", "Analytics"],
    },
    {
      title: "ETL vs ELT: Modern Data Processing Patterns",
      date: "1 Jun, 25",
      tags: ["ETL", "Processing"],
    },
  ],
  "software-maintenance": [
    {
      title: "Legacy Code Modernization: Strategies for Gradual Migration",
      date: "3 Jun, 25",
      tags: ["Legacy", "Migration"],
    },
    {
      title: "Technical Debt Management: Balancing Speed and Quality",
      date: "2 Jun, 25",
      tags: ["Technical Debt", "Quality"],
    },
    {
      title: "Refactoring at Scale: Tools and Techniques",
      date: "1 Jun, 25",
      tags: ["Refactoring", "Tools"],
    },
  ],
};

const expertiseAreas = [
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

export default async function ExpertisePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const currentExpertise = expertiseAreas.find((area) => area.slug === slug);
  const articles = mockArticles[slug as keyof typeof mockArticles] || [];

  if (!currentExpertise) {
    return <div>Expertise area not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="two-column-layout">
        {/* Side Column - Navigation */}
        <div className="sideColumn font-[family-name:var(--font-jetbrains-mono)]">
          <div className="max-w-lg ">
            <Link href="/">
              <Image
                src="/BCLogo.svg"
                alt="BeautifulCode Logo"
                width={300}
                height={58}
                priority
                className="mt-8 mb-12 cursor-pointer px-8"
              />
            </Link>

            <div className="mt-8">
              <h2
                className="text-xl tracking-wider uppercase mb-6 text-left px-8"
                style={{ color: "var(--color-bc-text-gray)" }}
              >
                WHAT WE ARE WIRED FOR
              </h2>
              <div className="space-y-2">
                {expertiseAreas.map((area) => {
                  const isActive = area.slug === slug;
                  return (
                    <Link key={area.slug} href={`/expertise/${area.slug}`}>
                      <div
                        className={`flex items-center space-x-4 cursor-pointer transition-all duration-300 py-3 px-8 group ${
                          isActive
                            ? "bg-white text-[var(--color-bc-red)]  "
                            : "hover:bg-white/50 text-[var(--color-bc-text-black)] hover:text-[var(--color-bc-red)] rounded-lg"
                        }`}
                      >
                        <div className="flex-shrink-0">
                          <ExpertiseIcon
                            slug={area.slug}
                            name={area.name}
                            className="w-8 h-8"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">{area.name}</h3>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Column - Articles */}
        <div className="mainColumn font-[family-name:var(--font-jetbrains-mono)]">
          <div className="max-w-4xl mx-auto px-8">
            <div className="mb-8">
              <h1
                className="text-3xl font-bold mb-2"
                style={{ color: "var(--color-bc-text-black)" }}
              >
                {currentExpertise.name}
              </h1>
            </div>

            <div className="mb-8">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "var(--color-bc-text-black)" }}
              >
                Recent Articles
              </h2>
              <div className="space-y-6">
                {articles.map((article, index) => (
                  <ArticleCard
                    key={index}
                    title={article.title}
                    date={article.date}
                    tags={article.tags}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
