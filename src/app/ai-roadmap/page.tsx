import Image from "next/image";
import MenuPage from "@/components/MenuPage";
import Breadcrumb from "@/components/ui/breadcrumb";
import { getHomeBreadcrumb } from "@/lib/breadcrumb-utils";
import "../../styles/layout.scss";
import "../../styles/markdown-content.scss";

export default async function AIRoadmapPage() {
  const breadcrumbItems = [
    getHomeBreadcrumb(),
    {
      label: "Our Applied AI Roadmap",
      href: undefined,
    },
  ];

  return (
    <MenuPage activeSlug="ai-roadmap">
      <div className="px-4 sm:px-16">
        <div className="hidden sm:block mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-medium uppercase text-red-600 mb-4">
            Our Applied AI Roadmap
          </h1>
          <p className="text-base text-[var(--color-bc-text-gray)] mb-6">
          This document outlines the <strong>systematic, engineering-first process</strong> required for all Applied GenAI projects. Its purpose is to ensure solutions are well-defined, validated, and built to <strong>production-grade architectural standards</strong>.
          </p>
        </div>

        {/* Artifact Image */}
        <div className="mb-12 flex justify-center">
          <Image
            src="/ai-roadmap/AI_roadmap_artifact.svg"
            alt="Our Applied AI Roadmap Artifact"
            width={1700}
            height={2200}
            className="w-full h-auto max-w-5xl"
            priority
          />
        </div>
      </div>
    </MenuPage>
  );
}

