import Image from "next/image";
import Link from "next/link";
import React from "react";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/articles";
import ExpertiseIcon from "@/components/ExpertiseIcon";
import MenuPage from "@/components/MenuPage";
import Breadcrumb from "@/components/ui/breadcrumb";
import { getHomeBreadcrumb } from "@/lib/breadcrumb-utils";
import { getAuthor } from "@/lib/authors";
import { formatDate } from "@/lib/date-utils";
import { getTechIconPathBySlug, getTechBySlug } from "@/lib/tech-icons";
import { getExpertiseBySlug } from "@/lib/expertise";
import "../../../styles/layout.scss";
import "../../../styles/markdown-content.scss";

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

  const expertiseArea = getExpertiseBySlug(article.expertise);

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
    <MenuPage activeSlug={article.expertise}>
      <div className="px-4 sm:px-16">
        {/* Breadcrumb - Desktop only */}
        <div className="hidden sm:block mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Mobile Header - Icon and Title */}
        <div className="block sm:hidden mt-2 mb-4">
          <div className="flex items-center space-x-3 mb-2">
            {expertiseArea && (
              <ExpertiseIcon
                slug={expertiseArea.slug}
                name={expertiseArea.name}
                className="w-6 h-6"
                isActive={true}
              />
            )}
            <h1
              className="text-lg"
              style={{ color: "var(--color-bc-text-black)" }}
            >
              {expertiseArea?.name || "Article"}
            </h1>
          </div>
        </div>

        {/* Article Header */}
        <div className="mb-4">
          <h1
            className="text-xl sm:text-3xl font-medium mb-4 font-[family-name:var(--font-nunito-sans)]"
            style={{ color: "var(--color-bc-text-black)" }}
          >
            {article.title}
          </h1>

          {/* Author Info and Tech Icons */}
          <div className="flex items-center justify-between mb-4">
            {/* Author Info */}
            <div className="flex items-center space-x-3">
              {author && (
                <>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                    <Image
                      src={`/authors/${author.imageFile}`}
                      alt={author.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className="text-sm sm:font-medium font-[family-name:var(--font-nunito-sans)]"
                      style={{ color: "var(--color-bc-text-black)" }}
                    >
                      {author.name}
                    </span>
                    <span
                      className="text-xs sm:text-sm"
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
              {article.tech.map((techSlug, index) => {
                const techInfo = getTechBySlug(techSlug);
                const iconPath = getTechIconPathBySlug(techSlug);
                const techName = techInfo?.name || techSlug;

                return (
                  <div
                    key={index}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden"
                  >
                    <Image
                      src={iconPath}
                      alt={techName}
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        {article.keytakeaway && (
          <div className="mb-8">
            <div className="border border-black rounded-2xl p-4 sm:p-6 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <h3
                className="text-base sm:text-lg font-medium mb-3 font-[family-name:var(--font-nunito-sans)]"
                style={{ color: "var(--color-bc-text-gray)" }}
              >
                Key Takeaway
              </h3>
              <p
                className="text-lg sm:text-xl leading-relaxed font-[family-name:var(--font-nunito-sans)]"
                style={{ color: "var(--color-bc-text-black)" }}
              >
                &ldquo;{article.keytakeaway}&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="markdown-content max-w-none mb-12">
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
    </MenuPage>
  );
}
