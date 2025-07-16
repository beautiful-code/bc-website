import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

export interface CaseStudyOutcome {
  outcome: string;
  icon: string;
}

export interface CaseStudyTechnology {
  tech: string;
  purpose: string;
}

export interface CaseStudyTestimonial {
  quote: string;
  author: string;
  authorImage: string;
}

export interface CaseStudyMetadata {
  slug: string;
  title: string;
  industry: string;
  heroImage: string;
  problemStatement: string;
  clientInfo: string;
  clientImage: string;
  outcomes: CaseStudyOutcome[];
  expertises: string[];
  technologies: CaseStudyTechnology[];
  testimonial: CaseStudyTestimonial;
}

export interface CaseStudy extends CaseStudyMetadata {
  content: string;
}

const caseStudiesDirectory = path.join(process.cwd(), "content/case-studies");

export async function getCaseStudiesByExpertise(
  expertiseSlug: string
): Promise<CaseStudyMetadata[]> {
  try {
    // Check if case studies directory exists
    if (!fs.existsSync(caseStudiesDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(caseStudiesDirectory);
    const markdownFiles = fileNames.filter((name) => name.endsWith(".md"));

    const caseStudies: CaseStudyMetadata[] = [];

    for (const fileName of markdownFiles) {
      const fullPath = path.join(caseStudiesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      // Filter by expertise - case studies can have multiple expertises
      if (data.expertises && data.expertises.includes(expertiseSlug)) {
        caseStudies.push({
          slug: data.slug,
          title: data.title,
          industry: data.industry,
          heroImage: data.heroImage,
          problemStatement: data.problemStatement,
          clientInfo: data.clientInfo,
          clientImage: data.clientImage,
          outcomes: data.outcomes || [],
          expertises: data.expertises || [],
          technologies: data.technologies || [],
          testimonial: data.testimonial,
        });
      }
    }

    // Sort by title for now (can be changed to date if added later)
    return caseStudies.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error("Error loading case studies:", error);
    return [];
  }
}

export async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | null> {
  try {
    if (!fs.existsSync(caseStudiesDirectory)) {
      return null;
    }

    const fileNames = fs.readdirSync(caseStudiesDirectory);
    const markdownFiles = fileNames.filter((name) => name.endsWith(".md"));

    for (const fileName of markdownFiles) {
      const fullPath = path.join(caseStudiesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      if (data.slug === slug) {
        // Convert markdown to HTML with syntax highlighting
        const processedContent = await remark()
          .use(remarkGfm)
          .use(remarkRehype, { allowDangerousHtml: true })
          .use(rehypeHighlight)
          .use(rehypeStringify, { allowDangerousHtml: true })
          .process(content);

        return {
          slug: data.slug,
          title: data.title,
          industry: data.industry,
          heroImage: data.heroImage,
          problemStatement: data.problemStatement,
          clientInfo: data.clientInfo,
          clientImage: data.clientImage,
          outcomes: data.outcomes || [],
          expertises: data.expertises || [],
          technologies: data.technologies || [],
          testimonial: data.testimonial,
          content: processedContent.toString(),
        };
      }
    }

    return null;
  } catch (error) {
    console.error("Error loading case study:", error);
    return null;
  }
}

export async function getAllCaseStudies(): Promise<CaseStudyMetadata[]> {
  try {
    if (!fs.existsSync(caseStudiesDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(caseStudiesDirectory);
    const markdownFiles = fileNames.filter((name) => name.endsWith(".md"));

    const caseStudies: CaseStudyMetadata[] = [];

    for (const fileName of markdownFiles) {
      const fullPath = path.join(caseStudiesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      caseStudies.push({
        slug: data.slug,
        title: data.title,
        industry: data.industry,
        heroImage: data.heroImage,
        problemStatement: data.problemStatement,
        clientInfo: data.clientInfo,
        clientImage: data.clientImage,
        outcomes: data.outcomes || [],
        expertises: data.expertises || [],
        technologies: data.technologies || [],
        testimonial: data.testimonial,
      });
    }

    // Sort by title for now
    return caseStudies.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error("Error loading case studies:", error);
    return [];
  }
}
