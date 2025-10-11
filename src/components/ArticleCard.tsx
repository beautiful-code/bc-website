import Image from "next/image";
import Link from "next/link";
import { getTechIconPathBySlug, getTechBySlug } from "@/lib/tech";

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
            <div
              key={index}
              className="w-5 h-5 sm:w-6 sm:h-6 overflow-hidden inline-block align-middle relative group cursor-pointer -translate-y-[2px]"
              title={techName}
            >
              <Image
                src={iconPath}
                alt={techName}
                width={24}
                height={24}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {techName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
