import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import ExpertiseIcon from "@/components/ExpertiseIcon";
import React from "react";
import Image from "next/image";

// Helper function to generate home breadcrumb
export const getHomeBreadcrumb = (): BreadcrumbItem => ({
  label: "",
  href: "/",
  icon: React.createElement(Image, {
    src: "/bc-lines.svg",
    alt: "Home",
    width: 24,
    height: 24,
    className: "w-6 h-6",
  }),
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
      className: "w-6 h-6",
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
      className: "w-6 h-6",
    }),
  },
  {
    label: articleTitle,
  },
];
