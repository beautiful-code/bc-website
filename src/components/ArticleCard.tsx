import Link from "next/link";
import { getTechIconPathBySlug, getTechBySlug } from "@/lib/tech";
import TechIcon from "@/components/TechIcon";

interface ArticleCardProps {
  title: string;
  slug: string;
  tech: string[];
}

export default function ArticleCard({ title, slug, tech }: ArticleCardProps) {
  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <Link href={`/articles/${slug}`} className="inline">
        <h3
          className="text-md sm:text-xl font-medium hover:text-[var(--color-bc-red)] cursor-pointer transition-colors duration-300 inline leading-relaxed"
          style={{ color: "var(--color-bc-text-black)" }}
        >
          {title}{" "}
        </h3>
      </Link>
      <div className="inline-flex items-center space-x-2 ml-2 align-middle">
        {tech.slice(0, 2).map((techSlug, index) => {
          const techInfo = getTechBySlug(techSlug);
          const iconPath = getTechIconPathBySlug(techSlug);
          const techName = techInfo?.name || techSlug;

          return (
            <TechIcon
              key={index}
              iconPath={iconPath}
              techName={techName}
              size="small"
              showTooltip={true}
              className="inline-block align-middle -translate-y-[2px]"
            />
          );
        })}
      </div>
    </div>
  );
}
