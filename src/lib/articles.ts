import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

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
    // Check if articles directory exists
    if (!fs.existsSync(articlesDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(articlesDirectory);
    const markdownFiles = fileNames.filter((name) => name.endsWith(".md"));

    const articles: ArticleMetadata[] = [];

    for (const fileName of markdownFiles) {
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      // Filter by expertise
      if (data.expertise === expertiseSlug) {
        articles.push({
          title: data.title,
          date: data.date,
          expertise: data.expertise,
          slug: data.slug,
          author: data.author,
          tech: data.tech || [],
          keytakeaway: data.keytakeaway,
        });
      }
    }

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
    if (!fs.existsSync(articlesDirectory)) {
      return null;
    }

    const fileNames = fs.readdirSync(articlesDirectory);
    const markdownFiles = fileNames.filter((name) => name.endsWith(".md"));

    for (const fileName of markdownFiles) {
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      if (data.slug === slug) {
        // Convert markdown to HTML with syntax highlighting
        const processedContent = await remark()
          .use(remarkRehype, { allowDangerousHtml: true })
          .use(rehypeHighlight)
          .use(rehypeStringify, { allowDangerousHtml: true })
          .process(content);

        return {
          title: data.title,
          date: data.date,
          expertise: data.expertise,
          slug: data.slug,
          author: data.author,
          tech: data.tech || [],
          keytakeaway: data.keytakeaway,
          content: processedContent.toString(),
        };
      }
    }

    return null;
  } catch (error) {
    console.error("Error loading article:", error);
    return null;
  }
}

export async function getAllArticles(): Promise<ArticleMetadata[]> {
  try {
    if (!fs.existsSync(articlesDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(articlesDirectory);
    const markdownFiles = fileNames.filter((name) => name.endsWith(".md"));

    const articles: ArticleMetadata[] = [];

    for (const fileName of markdownFiles) {
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      articles.push({
        title: data.title,
        date: data.date,
        expertise: data.expertise,
        slug: data.slug,
        author: data.author,
        tech: data.tech || [],
        keytakeaway: data.keytakeaway,
      });
    }

    // Sort by date (newest first)
    return articles.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error loading articles:", error);
    return [];
  }
}
