import path from "path";
import { processMarkdown } from "./utils/markdown-processor";
import {
  loadMarkdownFiles,
  loadMarkdownFileBySlug,
  loadMarkdownFilesByArrayField,
} from "./utils/file-loader";

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
    const files = await loadMarkdownFilesByArrayField(
      caseStudiesDirectory,
      "expertises",
      expertiseSlug
    );

    const caseStudies: CaseStudyMetadata[] = files.map((file) => ({
      slug: file.data.slug as string,
      title: file.data.title as string,
      industry: file.data.industry as string,
      heroImage: file.data.heroImage as string,
      problemStatement: file.data.problemStatement as string,
      clientInfo: file.data.clientInfo as string,
      clientImage: file.data.clientImage as string,
      outcomes: (file.data.outcomes as CaseStudyOutcome[]) || [],
      expertises: (file.data.expertises as string[]) || [],
      technologies: (file.data.technologies as CaseStudyTechnology[]) || [],
      testimonial: file.data.testimonial as CaseStudyTestimonial,
    }));

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
    const file = await loadMarkdownFileBySlug(caseStudiesDirectory, slug);

    if (!file) {
      return null;
    }

    // Convert markdown to HTML with syntax highlighting
    const processedContent = await processMarkdown(file.content);

    return {
      slug: file.data.slug as string,
      title: file.data.title as string,
      industry: file.data.industry as string,
      heroImage: file.data.heroImage as string,
      problemStatement: file.data.problemStatement as string,
      clientInfo: file.data.clientInfo as string,
      clientImage: file.data.clientImage as string,
      outcomes: (file.data.outcomes as CaseStudyOutcome[]) || [],
      expertises: (file.data.expertises as string[]) || [],
      technologies: (file.data.technologies as CaseStudyTechnology[]) || [],
      testimonial: file.data.testimonial as CaseStudyTestimonial,
      content: processedContent,
    };
  } catch (error) {
    console.error("Error loading case study:", error);
    return null;
  }
}

export async function getAllCaseStudies(): Promise<CaseStudyMetadata[]> {
  try {
    const files = await loadMarkdownFiles(caseStudiesDirectory);

    const caseStudies: CaseStudyMetadata[] = files.map((file) => ({
      slug: file.data.slug as string,
      title: file.data.title as string,
      industry: file.data.industry as string,
      heroImage: file.data.heroImage as string,
      problemStatement: file.data.problemStatement as string,
      clientInfo: file.data.clientInfo as string,
      clientImage: file.data.clientImage as string,
      outcomes: (file.data.outcomes as CaseStudyOutcome[]) || [],
      expertises: (file.data.expertises as string[]) || [],
      technologies: (file.data.technologies as CaseStudyTechnology[]) || [],
      testimonial: file.data.testimonial as CaseStudyTestimonial,
    }));

    // Sort by title for now
    return caseStudies.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error("Error loading case studies:", error);
    return [];
  }
}
