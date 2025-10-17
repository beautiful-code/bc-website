import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPrincipleBySlug as getPrincipleCategoryBySlug,
  getPrincipleContentBySlug,
} from "@/lib/principle";
import MenuPage from "@/components/MenuPage";
import Breadcrumb from "@/components/ui/breadcrumb";
import ComicStrip from "@/components/ComicStrip";
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

  const categoryIcon =
    categoryInfo && (
      <Image
        src={`/icons/principle/${categoryInfo.iconSlug}.svg`}
        alt={`${categoryInfo.name} icon`}
        width={24}
        height={24}
        className="h-6 w-6 object-contain"
      />
    );

  const breadcrumbItems = [
    getHomeBreadcrumb(),
    ...(categoryInfo
      ? [
          {
            label: categoryInfo.name,
            href: `/principles#${principle.slug}`,
            icon: categoryIcon,
          },
        ]
      : []),
    {
      label: principle.title,
      href: undefined, // Current page, no link
    },
  ];

  return (
    <MenuPage activeSlug="principles">
      <div className="px-4 sm:px-16">
        {/* Breadcrumb - Desktop only */}
        <div className="hidden sm:block mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Mobile Header - Icon and Title */}
        <div className="block sm:hidden mt-2 mb-4">
          <div className="flex items-center space-x-3 mb-2">
            {categoryIcon}
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

        {/* Comic Strip */}
        <ComicStrip principleSlug={principle.slug} />

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
              href={`/principles#${principle.slug}`}
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
