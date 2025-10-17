import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import rehypeTableLinkIcons from "./rehype-table-link-icons";

/**
 * Process markdown content to HTML with syntax highlighting
 * @param content - Raw markdown content
 * @returns Promise<string> - Processed HTML content
 */
export async function processMarkdown(content: string): Promise<string> {
  try {
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeHighlight)
      .use(rehypeTableLinkIcons)
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content);

    return processedContent.toString();
  } catch (error) {
    console.error("Error processing markdown:", error);
    throw new Error("Failed to process markdown content");
  }
}
