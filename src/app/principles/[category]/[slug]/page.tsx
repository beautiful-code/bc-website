import Link from "next/link";
import React from "react";
import { notFound } from "next/navigation";
import {
  getPrincipleBySlug as getPrincipleCategoryBySlug,
  getPrincipleContentBySlug,
} from "@/lib/principle";
import MenuPage from "@/components/MenuPage";
import Breadcrumb from "@/components/ui/breadcrumb";
import CategoryIcon from "@/components/CategoryIcon";
import { getHomeBreadcrumb } from "@/lib/breadcrumb-utils";
import "../../../../styles/layout.scss";
import "../../../../styles/markdown-content.scss";

export default async function PrinciplePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const principle = await getPrincipleContentBySlug(slug);

  if (!principle) {
    notFound();
  }

  const categoryInfo = getPrincipleCategoryBySlug(category);

  const breadcrumbItems = [
    getHomeBreadcrumb(),
    ...(categoryInfo
      ? [
          {
            label: categoryInfo.name,
            href: `/principles/${categoryInfo.slug}`,
            icon: React.createElement(CategoryIcon, {
              slug: categoryInfo.slug,
              name: categoryInfo.name,
              type: "principle",
              isActive: true,
              className: "w-6 h-6",
            }),
          },
        ]
      : []),
    {
      label: "Principle",
      href: undefined, // Current page, no link
    },
  ];

  return (
    <MenuPage activeSlug={category}>
      <div className="px-4 sm:px-16">
        {/* Breadcrumb - Desktop only */}
        <div className="hidden sm:block mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Mobile Header - Icon and Title */}
        <div className="block sm:hidden mt-2 mb-4">
          <div className="flex items-center space-x-3 mb-2">
            {categoryInfo && (
              <CategoryIcon
                slug={categoryInfo.slug}
                name={categoryInfo.name}
                type="principle"
                className="w-6 h-6"
                isActive={true}
              />
            )}
            <h1
              className="text-lg"
              style={{ color: "var(--color-bc-text-black)" }}
            >
              {categoryInfo?.name || "Principle"}
            </h1>
          </div>
        </div>

        {/* Principle Header */}
        <div className="mb-8">
          <h1
            className="text-xl sm:text-3xl font-medium mb-8 font-[family-name:var(--font-nunito-sans)]"
            style={{ color: "var(--color-bc-text-black)" }}
          >
            {principle.title}
          </h1>
        </div>

        {/* Principle Content */}
        <div className="markdown-content max-w-none mb-12">
          <div
            className="font-[family-name:var(--font-nunito-sans)] leading-relaxed"
            style={{ color: "var(--color-bc-text-black)" }}
            dangerouslySetInnerHTML={{ __html: principle.content }}
          />
        </div>

        {/* Back to Category Link */}
        {categoryInfo && (
          <div className="pt-8 border-t border-gray-200">
            <Link
              href={`/principles/${categoryInfo.slug}`}
              className="inline-flex items-center space-x-2 text-sm hover:text-[var(--color-bc-red)] transition-colors duration-300"
              style={{ color: "var(--color-bc-text-gray)" }}
            >
              <span>←</span>
              <span>Back to {categoryInfo.name}</span>
            </Link>
          </div>
        )}
      </div>
    </MenuPage>
  );
}
