import path from "path";
import { processMarkdown } from "./utils/markdown-processor";
import {
  loadMarkdownFiles,
  loadMarkdownFileBySlug,
  loadMarkdownFilesByField,
  type MarkdownFile,
} from "./utils/file-loader";
import {
  principlesCategories,
  getPrincipleBySlug,
  getPrincipleByName,
  type PrincipleCategory,
} from "./principle-category";

export interface Principle {
  title: string;
  category: string;
  slug: string;
  content: string;
}

export interface PrincipleMetadata {
  title: string;
  category: string;
  slug: string;
}

export interface PrincipleSummary extends PrincipleMetadata {
  summary: string;
}

const principlesDirectory = path.join(process.cwd(), "content/principles");

// Re-export for backward compatibility
export {
  principlesCategories,
  getPrincipleBySlug,
  getPrincipleByName,
  type PrincipleCategory,
};

export async function getPrinciplesByCategory(
  categorySlug: string
): Promise<PrincipleMetadata[]> {
  try {
    const files = await loadMarkdownFilesByField(
      principlesDirectory,
      "category",
      categorySlug
    );

    const categoryConfig = getPrincipleBySlug(categorySlug);
    const desiredOrder = categoryConfig?.principleSlugs ?? [];
    const orderMap = new Map<string, number>();
    desiredOrder.forEach((slug, index) => {
      orderMap.set(slug, index);
    });

    const principles: PrincipleMetadata[] = files.map((file) => ({
      title: file.data.title as string,
      category: file.data.category as string,
      slug: (file.data.slug as string) || file.fileName.replace(".md", ""),
    }));

    if (desiredOrder.length) {
      principles.sort((a, b) => {
        const aIndex = orderMap.has(a.slug)
          ? orderMap.get(a.slug) ?? Number.MAX_SAFE_INTEGER
          : Number.MAX_SAFE_INTEGER;
        const bIndex = orderMap.has(b.slug)
          ? orderMap.get(b.slug) ?? Number.MAX_SAFE_INTEGER
          : Number.MAX_SAFE_INTEGER;

        if (aIndex !== bIndex) {
          return aIndex - bIndex;
        }
        return a.title.localeCompare(b.title);
      });
    } else {
      principles.sort((a, b) => a.title.localeCompare(b.title));
    }

    return principles;
  } catch (error) {
    console.error("Error loading principles:", error);
    return [];
  }
}

export async function getPrincipleContentBySlug(
  slug: string
): Promise<Principle | null> {
  try {
    const file = await loadMarkdownFileBySlug(principlesDirectory, slug);

    if (!file) {
      return null;
    }

    // Convert markdown to HTML with syntax highlighting
    const processedContent = await processMarkdown(file.content);

    return {
      title: file.data.title as string,
      category: file.data.category as string,
      slug: (file.data.slug as string) || file.fileName.replace(".md", ""),
      content: processedContent,
    };
  } catch (error) {
    console.error("Error loading principle:", error);
    return null;
  }
}

export async function getAllPrinciples(): Promise<PrincipleMetadata[]> {
  try {
    const files = await loadMarkdownFiles(principlesDirectory);

    const principles: PrincipleMetadata[] = files.map((file) => ({
      title: file.data.title as string,
      category: file.data.category as string,
      slug: (file.data.slug as string) || file.fileName.replace(".md", ""),
    }));

    // Sort by title
    return principles.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error("Error loading principles:", error);
    return [];
  }
}

function extractSummary(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  let inFigure = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      continue;
    }
    if (line.startsWith("<figure")) {
      inFigure = true;
      continue;
    }
    if (inFigure) {
      if (line.includes("</figure>")) {
        inFigure = false;
      }
      continue;
    }
    if (line.startsWith("![")) {
      continue;
    }

    let cleaned = line;
    if (cleaned.startsWith("_") && cleaned.endsWith("_")) {
      cleaned = cleaned.slice(1, -1);
    }
    if (cleaned.startsWith("**") && cleaned.endsWith("**")) {
      cleaned = cleaned.slice(2, -2);
    }
    cleaned = cleaned
      .replace(/[*`_]+/g, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();

    if (cleaned) {
      return cleaned;
    }
  }

  return "";
}

export async function getPrincipleSummariesBySlugs(
  slugs: string[]
): Promise<PrincipleSummary[]> {
  const files = await loadMarkdownFiles(principlesDirectory);
  const fileMap = new Map<string, MarkdownFile>();

  for (const file of files) {
    const slug = (file.data.slug as string) || file.fileName.replace(".md", "");
    fileMap.set(slug, file);
  }

  const summaries: PrincipleSummary[] = [];

  for (const slug of slugs) {
    const file = fileMap.get(slug);

    if (!file) {
      console.warn(`Principle with slug "${slug}" not found.`);
      continue;
    }

    const summaryField = file.data.summary as string | undefined;
    const summary = summaryField || extractSummary(file.content);

    summaries.push({
      title: file.data.title as string,
      category: file.data.category as string,
      slug,
      summary,
    });
  }

  return summaries;
}
