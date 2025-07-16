import path from "path";
import { processMarkdown } from "./utils/markdown-processor";
import {
  loadMarkdownFiles,
  loadMarkdownFileBySlug,
  loadMarkdownFilesByField,
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
