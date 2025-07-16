import Image from "next/image";
import React from "react";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug } from "@/lib/case-study";
import MenuPage from "@/components/MenuPage";
import Breadcrumb from "@/components/ui/breadcrumb";
import CategoryIcon from "@/components/CategoryIcon";
import { getTechIconPathBySlug, getTechBySlug } from "@/lib/tech";
import { getHomeBreadcrumb } from "@/lib/breadcrumb-utils";
import { getExpertiseBySlug } from "@/lib/expertise";
import "../../../styles/layout.scss";
import "../../../styles/markdown-content.scss";
import Link from "next/link";

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  // Get the first expertise area for breadcrumb
  const firstExpertise =
    caseStudy.expertises.length > 0
      ? getExpertiseBySlug(caseStudy.expertises[0])
      : null;

  const breadcrumbItems = [
    getHomeBreadcrumb(),
    ...(firstExpertise
      ? [
          {
            label: firstExpertise.name,
            href: `/expertise/${firstExpertise.slug}`,
            icon: React.createElement(CategoryIcon, {
              slug: firstExpertise.slug,
              name: firstExpertise.name,
              type: "expertise",
              isActive: true,
              className: "w-6 h-6",
            }),
          },
        ]
      : []),
    {
      label: "Case Study",
      href: undefined, // Current section, no link
    },
  ];

  return (
    <MenuPage activeSlug={caseStudy.expertises[0] || ""}>
      <div className="px-4 sm:px-16">
        {/* Breadcrumb - Desktop only */}
        <div className="hidden sm:block mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Mobile Header */}
        <div className="block sm:hidden mt-2 mb-4">
          <div className="flex items-center space-x-3 mb-2">
            <Link
              href={firstExpertise ? `/expertise/${firstExpertise.slug}` : "/"}
              className="inline-flex items-center space-x-2 text-sm hover:text-[var(--color-bc-red)] transition-colors duration-300"
              style={{ color: "var(--color-bc-text-gray)" }}
            >
              <span>←</span>
              <span>Back</span>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        {caseStudy.heroImage && (
          <div className="mb-8">
            <Image
              src={caseStudy.heroImage}
              alt={caseStudy.title}
              width={800}
              height={400}
              className="w-full h-[200px] sm:h-[400px] object-cover rounded-lg"
            />
          </div>
        )}

        {/* Case Study Header */}
        <div className="mb-8">
          <div className="mb-4">
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-bc-text-gray)" }}
            >
              {caseStudy.industry}
            </span>
          </div>
          <h1
            className="text-xl sm:text-3xl font-medium mb-8 font-[family-name:var(--font-nunito-sans)]"
            style={{ color: "var(--color-bc-text-black)" }}
          >
            {caseStudy.title}
          </h1>

          {/* Problem Statement and Client Info - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Problem Statement */}
            <div>
              <h2
                className="text-xl sm:text-2xl font-normal mb-6 font-[family-name:var(--font-nunito-sans)]"
                style={{ color: "var(--color-bc-red)" }}
              >
                Problem Statement
              </h2>
              <blockquote
                className="text-lg sm:text-xl leading-relaxed font-[family-name:var(--font-nunito-sans)]"
                style={{ color: "var(--color-bc-text-black)" }}
              >
                &ldquo;{caseStudy.problemStatement}&rdquo;
              </blockquote>
            </div>

            {/* Client Info */}
            <div>
              <div className="bg-gray-100 rounded-lg px-6 py-4 ">
                {/* Header Row - Title and Image */}
                <div className="flex items-center justify-between">
                  <h2
                    className="text-xl sm:text-2xl font-normal font-[family-name:var(--font-nunito-sans)]"
                    style={{ color: "var(--color-bc-text-black)" }}
                  >
                    Client Info
                  </h2>
                  {caseStudy.clientImage && (
                    <Image
                      src={caseStudy.clientImage}
                      alt="Client logo"
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  )}
                </div>

                {/* Content Row */}
                <div>
                  <p
                    className="text-lg sm:text-xl leading-relaxed font-[family-name:var(--font-nunito-sans)]"
                    style={{ color: "var(--color-bc-text-black)" }}
                  >
                    {caseStudy.clientInfo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Outcomes */}
        {caseStudy.outcomes.length > 0 && (
          <div className="mb-8">
            <h2
              className="text-xl sm:text-2xl font-normal mb-4 font-[family-name:var(--font-nunito-sans)]"
              style={{ color: "var(--color-bc-red)" }}
            >
              Outcomes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {caseStudy.outcomes.map((outcome, index) => (
                <div
                  key={index}
                  className="border border-black rounded-lg p-4 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    {outcome.icon && (
                      <Image
                        src={outcome.icon}
                        alt="Outcome icon"
                        width={64}
                        height={64}
                      />
                    )}
                  </div>
                  <p
                    className="text-lg sm:text-xl font-medium font-[family-name:var(--font-nunito-sans)]"
                    style={{ color: "var(--color-bc-text-black)" }}
                  >
                    {outcome.outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Case Study Content */}
        <div className="markdown-content max-w-none mb-12">
          <div
            className="font-[family-name:var(--font-nunito-sans)] leading-relaxed"
            style={{ color: "var(--color-bc-text-black)" }}
            dangerouslySetInnerHTML={{ __html: caseStudy.content }}
          />
        </div>

        {/* Technologies */}
        {caseStudy.technologies.length > 0 && (
          <div className="mb-8">
            <h2
              className="text-xl sm:text-2xl font-normal mb-6 font-[family-name:var(--font-nunito-sans)]"
              style={{ color: "var(--color-bc-red)" }}
            >
              Technologies Used
            </h2>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
              {caseStudy.technologies.map((tech, index) => {
                const techInfo = getTechBySlug(tech.tech);
                const iconPath = getTechIconPathBySlug(tech.tech);
                const techName = techInfo?.name || tech.tech;

                return (
                  <div
                    key={index}
                    className="inline-flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg bg-white hover:shadow-sm transition-shadow duration-200"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 overflow-hidden flex-shrink-0">
                      <Image
                        src={iconPath}
                        alt={techName}
                        width={24}
                        height={24}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span
                      className="text-md font-[family-name:var(--font-nunito-sans)]"
                      style={{ color: "var(--color-bc-text-black)" }}
                    >
                      {techName} for {tech.purpose}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Customer Testimonial */}
        {caseStudy.testimonial && (
          <div className="mb-8">
            <h2
              className="text-xl sm:text-2xl font-normal mb-6 font-[family-name:var(--font-nunito-sans)]"
              style={{ color: "var(--color-bc-red)" }}
            >
              Customer Testimonial
            </h2>
            <div className="border border-gray-300 rounded-lg p-6 bg-white">
              {/* Testimonial Quote */}
              <blockquote
                className="text-lg sm:text-xl leading-relaxed font-[family-name:var(--font-nunito-sans)] mb-6"
                style={{ color: "var(--color-bc-text-black)" }}
              >
                &ldquo;{caseStudy.testimonial.quote}&rdquo;
              </blockquote>

              {/* Author Attribution */}
              <div className="flex items-center space-x-3">
                {caseStudy.testimonial.authorImage && (
                  <Image
                    src={caseStudy.testimonial.authorImage}
                    alt={caseStudy.testimonial.author}
                    width={80}
                    height={80}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
                  />
                )}
                <p
                  className="text-base sm:text-lg font-[family-name:var(--font-nunito-sans)]"
                  style={{ color: "var(--color-bc-text-black)" }}
                >
                  {caseStudy.testimonial.author}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </MenuPage>
  );
}
