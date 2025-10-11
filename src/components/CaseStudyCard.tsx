import Link from "next/link";
import Image from "next/image";

interface CaseStudyCardProps {
  title: string;
  slug: string;
  industry: string;
  heroImage: string;
}

export default function CaseStudyCard({
  title,
  slug,
  industry,
  heroImage,
}: CaseStudyCardProps) {
  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <Link href={`/case-studies/${slug}`}>
        <div className="flex items-center justify-between space-x-6 group cursor-pointer">
          <div className="flex-1">
            <div className="mb-2">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--color-bc-text-gray)" }}
              >
                {industry}
              </span>
            </div>
            <h3
              className="text-md sm:text-xl font-medium group-hover:text-[var(--color-bc-red)] transition-colors duration-300"
              style={{ color: "var(--color-bc-text-black)" }}
            >
              {title}
            </h3>
          </div>
          <div className="flex-shrink-0">
            <Image
              src={heroImage}
              alt={title}
              width={120}
              height={80}
              className="rounded-lg object-cover w-[120px] h-[80px] sm:w-[160px]  border border-gray-200"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
