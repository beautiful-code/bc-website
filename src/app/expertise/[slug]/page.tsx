import ArticleCard from "@/components/ArticleCard";
import NavigationalSidebar from "@/components/NavigationalSidebar";
import Breadcrumb from "@/components/ui/breadcrumb";
import { getExpertiseBreadcrumbs } from "@/lib/breadcrumb-utils";
import { getArticlesByExpertise } from "@/lib/articles";
import { getExpertiseBySlug } from "@/lib/expertise";
import "../../../styles/layout.scss";

export default async function ExpertisePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const currentExpertise = getExpertiseBySlug(slug);

  if (!currentExpertise) {
    return <div>Expertise area not found</div>;
  }

  // Load articles from markdown files
  const articles = await getArticlesByExpertise(slug);

  return (
    <div className="min-h-screen bg-white">
      <div className="two-column-layout">
        {/* Side Column - Navigation */}
        <NavigationalSidebar activeSlug={slug} />

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
                      tech={article.tech}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    <span className="font-bold">Coming soon</span>
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
