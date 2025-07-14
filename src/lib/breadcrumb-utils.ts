import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import ExpertiseIcon from "@/components/ExpertiseIcon";
import React from "react";

// Helper function to generate home breadcrumb
export const getHomeBreadcrumb = (): BreadcrumbItem => ({
  label: "Home",
  href: "/",
});

// Helper function to generate expertise page breadcrumbs
export const getExpertiseBreadcrumbs = (
  expertiseName: string,
  expertiseSlug: string
): BreadcrumbItem[] => [
  getHomeBreadcrumb(),
  {
    label: expertiseName,
    href: undefined, // Current page, no link
    icon: React.createElement(ExpertiseIcon, {
      slug: expertiseSlug,
      name: expertiseName,
      isActive: true,
      className: "w-5 h-5",
    }),
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
    icon: React.createElement(ExpertiseIcon, {
      slug: expertiseSlug,
      name: expertiseName,
      isActive: true,
      className: "w-5 h-5",
    }),
  },
  {
    label: articleTitle,
  },
];
