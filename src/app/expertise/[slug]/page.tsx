import ArticleCard from "@/components/ArticleCard";
import NavigationalSidebar from "@/components/NavigationalSidebar";
import Logo from "@/components/Logo";
import ExpertiseIcon from "@/components/ExpertiseIcon";
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
        <div className="sideColumn font-[family-name:var(--font-jetbrains-mono)]">
          <div className="max-w-lg">
            <Logo />
            <div className="hidden sm:block">
              <NavigationalSidebar activeSlug={slug} />
            </div>
          </div>
        </div>

        {/* Main Column - Articles */}
        <div className="mainColumn font-[family-name:var(--font-jetbrains-mono)]">
          <div className="px-4 sm:px-16">
            {/* Breadcrumb - Desktop only */}
            <div className="hidden sm:block mb-8">
              <Breadcrumb
                items={getExpertiseBreadcrumbs(currentExpertise.name, slug)}
              />
            </div>

            {/* Mobile Header - Icon and Expertise Name */}
            <div className="block sm:hidden mt-2 mb-4">
              <div className="flex items-center space-x-3">
                <ExpertiseIcon
                  slug={slug}
                  name={currentExpertise.name}
                  className="w-6 h-6"
                  isActive={true}
                />
                <h1
                  className="text-lg "
                  style={{ color: "var(--color-bc-text-black)" }}
                >
                  {currentExpertise.name}
                </h1>
              </div>
            </div>

            <div className="mb-8">
              <h2
                className="text-md sm:text-2xl mb-2 sm:mb-6"
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
