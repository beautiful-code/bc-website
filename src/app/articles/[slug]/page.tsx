import Image from "next/image";
import Link from "next/link";
import React from "react";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/articles";
import ExpertiseIcon from "@/components/ExpertiseIcon";
import Breadcrumb from "@/components/ui/breadcrumb";
import { getHomeBreadcrumb } from "@/lib/breadcrumb-utils";
import { getAuthor } from "@/lib/authors";
import { formatDate } from "@/lib/date-utils";
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

  const author = getAuthor(article.author);

  const breadcrumbItems = [
    getHomeBreadcrumb(),
    ...(expertiseArea
      ? [
          {
            label: expertiseArea.name,
            href: `/expertise/${expertiseArea.slug}`,
            icon: React.createElement(ExpertiseIcon, {
              slug: expertiseArea.slug,
              name: expertiseArea.name,
              isActive: true,
              className: "w-6 h-6",
            }),
          },
          {
            label: "Articles",
            href: undefined, // Current section, no link
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="two-column-layout">
        {/* Side Column - Navigation */}
        <div className="sideColumn font-[family-name:var(--font-jetbrains-mono)]">
          <div className="max-w-lg">
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
                  const isActive = area.slug === article.expertise;
                  return (
                    <Link key={area.slug} href={`/expertise/${area.slug}`}>
                      <div
                        className={`flex items-center space-x-4 cursor-pointer transition-all duration-300 py-3 px-8 group ${
                          isActive
                            ? "bg-white text-[var(--color-bc-red)]"
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

        {/* Main Column - Article Content */}
        <div className="mainColumn font-[family-name:var(--font-jetbrains-mono)]">
          <div className="px-16">
            {/* Breadcrumb */}
            <div className="mb-8">
              <Breadcrumb items={breadcrumbItems} />
            </div>

            {/* Article Header */}
            <div className="mb-12">
              <h1
                className="text-3xl font-medium mb-4 font-[family-name:var(--font-nunito-sans)]"
                style={{ color: "var(--color-bc-text-black)" }}
              >
                {article.title}
              </h1>

              {/* Author Info and Tech Icons */}
              <div className="flex items-center justify-between mb-8">
                {/* Author Info */}
                <div className="flex items-center space-x-3">
                  {author && (
                    <>
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={author.profilePicUrl}
                          alt={author.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span
                          className="font-medium font-[family-name:var(--font-nunito-sans)]"
                          style={{ color: "var(--color-bc-text-black)" }}
                        >
                          {author.name}
                        </span>
                        <span
                          className="text-sm"
                          style={{ color: "var(--color-bc-text-gray)" }}
                        >
                          {formatDate(article.date)}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Tech Icons */}
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src="/icons/tech/js.svg"
                      alt="TypeScript"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src="/icons/tech/nextjs.svg"
                      alt="Next.js"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">WA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="article-content max-w-none mb-12">
              <div
                className="font-[family-name:var(--font-nunito-sans)] leading-relaxed"
                style={{ color: "var(--color-bc-text-black)" }}
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            {/* Back to Expertise Link */}
            {expertiseArea && (
              <div className="pt-8 border-t border-gray-200">
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
      </div>
    </div>
  );
}
