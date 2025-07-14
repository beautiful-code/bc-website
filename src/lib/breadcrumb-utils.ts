import { BreadcrumbItem } from "@/components/ui/breadcrumb";

// Helper function to generate home breadcrumb
export const getHomeBreadcrumb = (): BreadcrumbItem => ({
  label: "Home",
  href: "/",
});

// Helper function to generate expertise page breadcrumbs
export const getExpertiseBreadcrumbs = (
  expertiseName: string,
  expertiseSlug?: string
): BreadcrumbItem[] => [
  getHomeBreadcrumb(),
  {
    label: expertiseName,
    href: expertiseSlug ? `/expertise/${expertiseSlug}` : undefined,
  },
];

// Helper function for article page breadcrumbs (future use)
export const getArticleBreadcrumbs = (
  articleTitle: string,
  expertiseName: string,
  expertiseSlug: string
): BreadcrumbItem[] => [
  getHomeBreadcrumb(),
  {
    label: expertiseName,
    href: `/expertise/${expertiseSlug}`,
  },
  {
    label: articleTitle,
  },
];
