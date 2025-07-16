import path from "path";
import { processMarkdown } from "./utils/markdown-processor";
import {
  loadMarkdownFiles,
  loadMarkdownFileBySlug,
  loadMarkdownFilesByField,
} from "./utils/file-loader";

export interface Article {
  title: string;
  date: string;
  expertise: string;
  slug: string;
  author: string;
  tech: string[];
  keytakeaway: string;
  content: string;
}

export interface ArticleMetadata {
  title: string;
  date: string;
  expertise: string;
  slug: string;
  author: string;
  tech: string[];
  keytakeaway: string;
}

const articlesDirectory = path.join(process.cwd(), "content/articles");

export async function getArticlesByExpertise(
  expertiseSlug: string
): Promise<ArticleMetadata[]> {
  try {
    const files = await loadMarkdownFilesByField(
      articlesDirectory,
      "expertise",
      expertiseSlug
    );

    const articles: ArticleMetadata[] = files.map((file) => ({
      title: file.data.title as string,
      date: file.data.date as string,
      expertise: file.data.expertise as string,
      slug: file.data.slug as string,
      author: file.data.author as string,
      tech: (file.data.tech as string[]) || [],
      keytakeaway: file.data.keytakeaway as string,
    }));

    // Sort by date (newest first)
    return articles.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error loading articles:", error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const file = await loadMarkdownFileBySlug(articlesDirectory, slug);

    if (!file) {
      return null;
    }

    // Convert markdown to HTML with syntax highlighting
    const processedContent = await processMarkdown(file.content);

    return {
      title: file.data.title as string,
      date: file.data.date as string,
      expertise: file.data.expertise as string,
      slug: file.data.slug as string,
      author: file.data.author as string,
      tech: (file.data.tech as string[]) || [],
      keytakeaway: file.data.keytakeaway as string,
      content: processedContent,
    };
  } catch (error) {
    console.error("Error loading article:", error);
    return null;
  }
}

export async function getAllArticles(): Promise<ArticleMetadata[]> {
  try {
    const files = await loadMarkdownFiles(articlesDirectory);

    const articles: ArticleMetadata[] = files.map((file) => ({
      title: file.data.title as string,
      date: file.data.date as string,
      expertise: file.data.expertise as string,
      slug: file.data.slug as string,
      author: file.data.author as string,
      tech: (file.data.tech as string[]) || [],
      keytakeaway: file.data.keytakeaway as string,
    }));

    // Sort by date (newest first)
    return articles.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error loading articles:", error);
    return [];
  }
}
