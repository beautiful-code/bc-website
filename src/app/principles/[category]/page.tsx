import Link from "next/link";
import CategoryIcon from "@/components/CategoryIcon";
import MenuPage from "@/components/MenuPage";
import Breadcrumb from "@/components/ui/breadcrumb";
import {
  getPrincipleBySlug as getPrincipleCategoryBySlug,
  getPrinciplesByCategory,
} from "@/lib/principle";
import { getHomeBreadcrumb } from "@/lib/breadcrumb-utils";
import React from "react";
import "../../../styles/layout.scss";

export default async function PrincipleCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const currentCategory = getPrincipleCategoryBySlug(category);

  if (!currentCategory) {
    return <div>Principle category not found</div>;
  }

  // Load principles from markdown files
  const principles = await getPrinciplesByCategory(category);

  const breadcrumbItems = [
    getHomeBreadcrumb(),
    {
      label: currentCategory.name,
      href: undefined, // Current page, no link
      icon: React.createElement(CategoryIcon, {
        slug: currentCategory.slug,
        name: currentCategory.name,
        type: "principle",
        isActive: true,
        className: "w-6 h-6",
      }),
    },
  ];

  return (
    <MenuPage activeSlug={category}>
      <div className="px-4 sm:px-16">
        {/* Breadcrumb - Desktop only */}
        <div className="hidden sm:block mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Mobile Header - Icon and Category Name */}
        <div className="block sm:hidden mt-2 mb-4">
          <div className="flex items-center space-x-3">
            <CategoryIcon
              slug={category}
              name={currentCategory.name}
              type="principle"
              className="w-6 h-6"
              isActive={true}
            />
            <h1
              className="text-lg"
              style={{ color: "var(--color-bc-text-black)" }}
            >
              {currentCategory.name}
            </h1>
          </div>
        </div>

        {/* Principles Section */}
        <div className="mb-8">
          <h2
            className="text-md sm:text-2xl mb-2 sm:mb-6"
            style={{ color: "var(--color-bc-red)" }}
          >
            Principles
          </h2>
          {principles.length > 0 ? (
            <div className="space-y-6">
              {principles.map((principle) => (
                <Link
                  key={principle.slug}
                  href={`/principles/${category}/${principle.slug}`}
                >
                  <div className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-300 cursor-pointer">
                    <h3
                      className="text-lg sm:text-xl font-medium font-[family-name:var(--font-nunito-sans)]"
                      style={{ color: "var(--color-bc-text-black)" }}
                    >
                      {principle.title}
                    </h3>
                  </div>
                </Link>
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
    </MenuPage>
  );
}
