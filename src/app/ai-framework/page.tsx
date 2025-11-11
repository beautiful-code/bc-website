import Image from "next/image";
import MenuPage from "@/components/MenuPage";
import Breadcrumb from "@/components/ui/breadcrumb";
import { getHomeBreadcrumb } from "@/lib/breadcrumb-utils";
import "../../styles/layout.scss";
import "../../styles/markdown-content.scss";

export default async function AIFrameworkPage() {
  const breadcrumbItems = [
    getHomeBreadcrumb(),
    {
      label: "Our Applied AI Framework",
      href: undefined,
    },
  ];

  return (
    <MenuPage activeSlug="ai-framework">
      <div className="px-4 sm:px-16">
        <div className="hidden sm:block mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-medium uppercase text-red-600 mb-4">
            Our Applied AI Framework
          </h1>
          <p className="text-base text-[var(--color-bc-text-gray)] mb-6">
          This is our Applied AI Framework we use to build reliable AI solutions. It's our systematic process for taking any project from concept to a well-defined, validated, and production-grade system.
          </p>
        </div>

        {/* Artifact Image */}
        <div className="mb-12 flex justify-center">
          <Image
            src="/ai-framework/AI_framework_artifact.svg"
            alt="Our Applied AI Framework Artifact"
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

