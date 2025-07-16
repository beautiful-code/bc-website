import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
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
    // Check if principles directory exists
    if (!fs.existsSync(principlesDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(principlesDirectory);
    const markdownFiles = fileNames.filter((name) => name.endsWith(".md"));

    const principles: PrincipleMetadata[] = [];

    for (const fileName of markdownFiles) {
      const fullPath = path.join(principlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      // Filter by category
      if (data.category === categorySlug) {
        principles.push({
          title: data.title,
          category: data.category,
          slug: data.slug || fileName.replace(".md", ""),
        });
      }
    }

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
    if (!fs.existsSync(principlesDirectory)) {
      return null;
    }

    const fileNames = fs.readdirSync(principlesDirectory);
    const markdownFiles = fileNames.filter((name) => name.endsWith(".md"));

    for (const fileName of markdownFiles) {
      const fullPath = path.join(principlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const fileSlug = data.slug || fileName.replace(".md", "");
      if (fileSlug === slug) {
        // Convert markdown to HTML with syntax highlighting
        const processedContent = await remark()
          .use(remarkGfm)
          .use(remarkRehype, { allowDangerousHtml: true })
          .use(rehypeHighlight)
          .use(rehypeStringify, { allowDangerousHtml: true })
          .process(content);

        return {
          title: data.title,
          category: data.category,
          slug: fileSlug,
          content: processedContent.toString(),
        };
      }
    }

    return null;
  } catch (error) {
    console.error("Error loading principle:", error);
    return null;
  }
}

export async function getAllPrinciples(): Promise<PrincipleMetadata[]> {
  try {
    if (!fs.existsSync(principlesDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(principlesDirectory);
    const markdownFiles = fileNames.filter((name) => name.endsWith(".md"));

    const principles: PrincipleMetadata[] = [];

    for (const fileName of markdownFiles) {
      const fullPath = path.join(principlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      principles.push({
        title: data.title,
        category: data.category,
        slug: data.slug || fileName.replace(".md", ""),
      });
    }

    // Sort by title
    return principles.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error("Error loading principles:", error);
    return [];
  }
}
