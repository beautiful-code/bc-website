import Image from "next/image";
import Link from "next/link";
import ExpertiseIcon from "@/components/ExpertiseIcon";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumb from "@/components/ui/breadcrumb";
import { getExpertiseBreadcrumbs } from "@/lib/breadcrumb-utils";
import { getArticlesByExpertise } from "@/lib/articles";
import "../../../styles/layout.scss";

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

  if (!currentExpertise) {
    return <div>Expertise area not found</div>;
  }

  // Load articles from markdown files
  const articles = await getArticlesByExpertise(slug);

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
                            isActive={isActive}
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
          <div className="px-16">
            {/* Breadcrumb */}
            <div className="mb-8">
              <Breadcrumb
                items={getExpertiseBreadcrumbs(currentExpertise.name, slug)}
              />
            </div>

            <div className="mb-8">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "var(--color-bc-red)" }}
              >
                Recent Articles
              </h2>
              {articles.length > 0 ? (
                <div className="space-y-6">
                  {articles.map((article) => (
                    <ArticleCard
                      key={article.slug}
                      title={article.title}
                      date={article.date}
                      slug={article.slug}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No articles available for this expertise area yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
