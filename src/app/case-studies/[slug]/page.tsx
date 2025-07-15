import Image from "next/image";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug } from "@/lib/case-studies";
import MenuPage from "@/components/MenuPage";
import Breadcrumb from "@/components/ui/breadcrumb";
import { getHomeBreadcrumb } from "@/lib/breadcrumb-utils";
import "../../../styles/layout.scss";
import "../../../styles/markdown-content.scss";

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

  const breadcrumbItems = [
    getHomeBreadcrumb(),
    {
      label: "Case Studies",
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
            <h1
              className="text-lg"
              style={{ color: "var(--color-bc-text-black)" }}
            >
              Case Study
            </h1>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Problem Statement */}
            <div>
              <h2
                className="text-lg font-bold mb-4 font-[family-name:var(--font-nunito-sans)]"
                style={{ color: "var(--color-bc-red)" }}
              >
                Problem Statement
              </h2>
              <blockquote
                className="text-base leading-relaxed font-[family-name:var(--font-nunito-sans)]"
                style={{ color: "var(--color-bc-text-black)" }}
              >
                &ldquo;{caseStudy.problemStatement}&rdquo;
              </blockquote>
            </div>

            {/* Client Info */}
            <div>
              <h2
                className="text-lg font-bold mb-4 font-[family-name:var(--font-nunito-sans)]"
                style={{ color: "var(--color-bc-text-black)" }}
              >
                Client Info
              </h2>
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <p
                    className="text-base leading-relaxed font-[family-name:var(--font-nunito-sans)]"
                    style={{ color: "var(--color-bc-text-black)" }}
                  >
                    {caseStudy.clientInfo}
                  </p>
                </div>
                {caseStudy.clientImage && (
                  <div className="flex-shrink-0">
                    <Image
                      src={caseStudy.clientImage}
                      alt="Client logo"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Outcomes */}
        {caseStudy.outcomes.length > 0 && (
          <div className="mb-8">
            <h2
              className="text-xl font-bold mb-4 font-[family-name:var(--font-nunito-sans)]"
              style={{ color: "var(--color-bc-red)" }}
            >
              Key Outcomes
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
                        width={24}
                        height={24}
                      />
                    )}
                  </div>
                  <p
                    className="font-medium font-[family-name:var(--font-nunito-sans)]"
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
              className="text-xl font-bold mb-4 font-[family-name:var(--font-nunito-sans)]"
              style={{ color: "var(--color-bc-red)" }}
            >
              Technologies Used
            </h2>
            <div className="space-y-3">
              {caseStudy.technologies.map((tech, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <span
                    className="font-medium font-[family-name:var(--font-nunito-sans)]"
                    style={{ color: "var(--color-bc-text-black)" }}
                  >
                    {tech.tech}:
                  </span>
                  <span
                    className="font-[family-name:var(--font-nunito-sans)]"
                    style={{ color: "var(--color-bc-text-gray)" }}
                  >
                    {tech.purpose}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonial */}
        {caseStudy.testimonial && (
          <div className="mb-8">
            <div className="border border-black rounded-2xl p-6 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <blockquote
                className="text-lg sm:text-xl italic mb-4 font-[family-name:var(--font-nunito-sans)]"
                style={{ color: "var(--color-bc-text-black)" }}
              >
                &ldquo;{caseStudy.testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center space-x-3">
                {caseStudy.testimonial.authorImage && (
                  <Image
                    src={caseStudy.testimonial.authorImage}
                    alt={caseStudy.testimonial.author}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                )}
                <div>
                  <p
                    className="font-medium font-[family-name:var(--font-nunito-sans)]"
                    style={{ color: "var(--color-bc-text-black)" }}
                  >
                    {caseStudy.testimonial.author}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MenuPage>
  );
}
