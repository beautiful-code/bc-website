import Image from "next/image";
import Link from "next/link";
import path from "path";
import { promises as fs } from "fs";
import { notFound } from "next/navigation";
import {
  getPrincipleBySlug as getPrincipleCategoryBySlug,
  getPrincipleContentBySlug,
} from "@/lib/principle";
import MenuPage from "@/components/MenuPage";
import Breadcrumb from "@/components/ui/breadcrumb";
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

  // Discover scene images (scene_01.png, scene_02.png, ...) from public/principles/<slug>
  async function getSceneImagesForSlug(principleSlug: string): Promise<string[]> {
    try {
      const dir = path.join(process.cwd(), "public", "principles", principleSlug);
      const files = await fs.readdir(dir);
      const sceneFiles = files
        .filter((name) => /^scene_\d+\.(png|jpe?g|webp|gif|svg)$/i.test(name))
        .sort((a, b) => {
          const aNum = parseInt(a.match(/\d+/)?.[0] ?? "0", 10);
          const bNum = parseInt(b.match(/\d+/)?.[0] ?? "0", 10);
          return aNum - bNum;
        })
        .map((name) => `/principles/${principleSlug}/${name}`);
      return sceneFiles;
    } catch {
      return [];
    }
  }

  const sceneImages = await getSceneImagesForSlug(principle.slug);

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

        {/* Comic Strip (scenes) */}
        {sceneImages.length > 0 && (
          <div className="mb-8">
            {/* Mobile: 2x2 grid, center each image, cap height 300px */}
            <div className="grid grid-cols-2 gap-2 sm:hidden">
              {sceneImages.map((src, index) => (
                <div key={index} className="flex items-center justify-center">
                  <Image
                    src={src}
                    alt={`Scene ${index + 1}`}
                    width={600}
                    height={600}
                    className="w-auto h-auto max-h-[300px] object-contain rounded"
                  />
                </div>
              ))}
            </div>
            {/* Tablet/Desktop: centered horizontal strip with optional scroll, cap height 300px */}
            <div className="hidden sm:block w-full">
              <div className="w-full overflow-x-auto">
                <div className="inline-flex items-center justify-center gap-3 w-max mx-auto">
                  {sceneImages.map((src, index) => (
                    <div key={index} className="flex items-center justify-center">
                      <Image
                        src={src}
                        alt={`Scene ${index + 1}`}
                        width={600}
                        height={600}
                        className="w-auto h-auto max-h-[300px] object-contain rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Principle Content */}
        <div className="markdown-content max-w-none mb-12">
          <div
            className={`font-[family-name:var(--font-nunito-sans)] leading-relaxed ${
              sceneImages.length > 0 ? "has-comic-strip" : ""
            }`}
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
