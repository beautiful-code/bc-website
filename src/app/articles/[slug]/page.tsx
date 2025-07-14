import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/articles";
import Breadcrumb from "@/components/ui/breadcrumb";
import "../../../styles/layout.scss";

const expertiseAreas = [
  { name: "Frontend Engineering", slug: "frontend-engineering" },
  { name: "Backend Engineering", slug: "backend-engineering" },
  { name: "AI & Applied ML", slug: "ai-applied-ml" },
  { name: "Infrastructure & Reliability", slug: "infrastructure-reliability" },
  { name: "Data Engineering", slug: "data-engineering" },
  { name: "Software Maintenance", slug: "software-maintenance" },
];

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const expertiseArea = expertiseAreas.find(
    (area) => area.slug === article.expertise
  );

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Expertise", href: "/expertise" },
    ...(expertiseArea
      ? [
          {
            label: expertiseArea.name,
            href: `/expertise/${expertiseArea.slug}`,
          },
        ]
      : []),
    { label: article.title },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Article Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <Link href="/">
              <Image
                src="/BCLogo.svg"
                alt="BeautifulCode Logo"
                width={200}
                height={40}
                className="cursor-pointer"
              />
            </Link>
          </div>

          <h1
            className="text-4xl font-bold mb-4 font-[family-name:var(--font-jetbrains-mono)]"
            style={{ color: "var(--color-bc-text-black)" }}
          >
            {article.title}
          </h1>

          <div className="flex items-center space-x-6 text-sm">
            <span
              className="font-medium"
              style={{ color: "var(--color-bc-text-gray)" }}
            >
              {article.date}
            </span>
            {expertiseArea && (
              <Link
                href={`/expertise/${expertiseArea.slug}`}
                className="hover:text-[var(--color-bc-red)] transition-colors duration-300"
                style={{ color: "var(--color-bc-text-gray)" }}
              >
                {expertiseArea.name}
              </Link>
            )}
            {article.tags.length > 0 && (
              <div className="flex items-center space-x-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Article Content */}
        <div className="article-content max-w-none">
          <div
            className="font-[family-name:var(--font-nunito-sans)] leading-relaxed"
            style={{ color: "var(--color-bc-text-black)" }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Back to Expertise Link */}
        {expertiseArea && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href={`/expertise/${expertiseArea.slug}`}
              className="inline-flex items-center space-x-2 text-sm hover:text-[var(--color-bc-red)] transition-colors duration-300"
              style={{ color: "var(--color-bc-text-gray)" }}
            >
              <span>←</span>
              <span>Back to {expertiseArea.name}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
