import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MenuPage from "@/components/MenuPage";
import Breadcrumb from "@/components/ui/breadcrumb";
import { getHomeBreadcrumb } from "@/lib/breadcrumb-utils";
import { processMarkdown } from "@/lib/utils/markdown-processor";
import "../../styles/layout.scss";
import "../../styles/markdown-content.scss";

export default async function AIRoadmapPage() {
  const breadcrumbItems = [
    getHomeBreadcrumb(),
    {
      label: "Our Applied AI Roadmap",
      href: undefined,
    },
  ];

  // Load the AI roadmap markdown file
  const filePath = path.join(process.cwd(), "content/ai-roadmap.md");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content } = matter(fileContents);

  // Process the markdown content to HTML
  const processedContent = await processMarkdown(content);

  return (
    <MenuPage activeSlug="ai-roadmap">
      <div className="px-4 sm:px-16">
        <div className="hidden sm:block mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-red-600 mb-6">
            Our Applied AI Roadmap
          </h1>
        </div>

        {/* Content */}
        <div className="markdown-content max-w-none mb-12">
          <div
            className="font-[family-name:var(--font-nunito-sans)] leading-relaxed"
            style={{ color: "var(--color-bc-text-black)" }}
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        </div>
      </div>
    </MenuPage>
  );
}

