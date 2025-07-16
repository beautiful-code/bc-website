import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface MarkdownFile {
  data: Record<string, unknown>;
  content: string;
  fileName: string;
  fullPath: string;
}

/**
 * Load all markdown files from a directory
 * @param directory - Path to the directory containing markdown files
 * @returns Promise<MarkdownFile[]> - Array of parsed markdown files
 */
export async function loadMarkdownFiles(
  directory: string
): Promise<MarkdownFile[]> {
  try {
    // Check if directory exists
    if (!fs.existsSync(directory)) {
      return [];
    }

    const fileNames = fs.readdirSync(directory);
    const markdownFiles = fileNames.filter((name) => name.endsWith(".md"));

    const files: MarkdownFile[] = [];

    for (const fileName of markdownFiles) {
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      files.push({
        data,
        content,
        fileName,
        fullPath,
      });
    }

    return files;
  } catch (error) {
    console.error(`Error loading markdown files from ${directory}:`, error);
    return [];
  }
}

/**
 * Load a single markdown file by slug
 * @param directory - Path to the directory containing markdown files
 * @param slug - The slug to search for
 * @returns Promise<MarkdownFile | null> - The matching file or null
 */
export async function loadMarkdownFileBySlug(
  directory: string,
  slug: string
): Promise<MarkdownFile | null> {
  try {
    const files = await loadMarkdownFiles(directory);

    for (const file of files) {
      const fileSlug = file.data.slug || file.fileName.replace(".md", "");
      if (fileSlug === slug) {
        return file;
      }
    }

    return null;
  } catch (error) {
    console.error(
      `Error loading markdown file with slug ${slug} from ${directory}:`,
      error
    );
    return null;
  }
}

/**
 * Load markdown files filtered by a specific field value
 * @param directory - Path to the directory containing markdown files
 * @param field - The field name to filter by
 * @param value - The value to match
 * @returns Promise<MarkdownFile[]> - Array of matching files
 */
export async function loadMarkdownFilesByField(
  directory: string,
  field: string,
  value: string
): Promise<MarkdownFile[]> {
  try {
    const files = await loadMarkdownFiles(directory);
    return files.filter((file) => file.data[field] === value);
  } catch (error) {
    console.error(
      `Error loading markdown files by field ${field}=${value} from ${directory}:`,
      error
    );
    return [];
  }
}

/**
 * Load markdown files filtered by a field that contains an array
 * @param directory - Path to the directory containing markdown files
 * @param field - The field name to filter by (should be an array)
 * @param value - The value to check if it exists in the array
 * @returns Promise<MarkdownFile[]> - Array of matching files
 */
export async function loadMarkdownFilesByArrayField(
  directory: string,
  field: string,
  value: string
): Promise<MarkdownFile[]> {
  try {
    const files = await loadMarkdownFiles(directory);
    return files.filter(
      (file) =>
        file.data[field] &&
        Array.isArray(file.data[field]) &&
        file.data[field].includes(value)
    );
  } catch (error) {
    console.error(
      `Error loading markdown files by array field ${field} containing ${value} from ${directory}:`,
      error
    );
    return [];
  }
}
