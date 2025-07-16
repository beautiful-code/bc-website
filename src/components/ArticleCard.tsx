import Image from "next/image";
import Link from "next/link";
import { getTechIconPathBySlug, getTechBySlug } from "@/lib/tech-icons";
import { formatDate } from "@/lib/date-utils";

interface ArticleCardProps {
  title: string;
  date: string;
  slug: string;
  tech: string[];
}

export default function ArticleCard({
  title,
  date,
  slug,
  tech,
}: ArticleCardProps) {
  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <div>
        <Link href={`/articles/${slug}`}>
          <h3
            className="text-md sm:text-xl font-medium mb-2 hover:text-[var(--color-bc-red)] cursor-pointer transition-colors duration-300"
            style={{ color: "var(--color-bc-text-black)" }}
          >
            {title}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {tech.map((techSlug, index) => {
              const techInfo = getTechBySlug(techSlug);
              const iconPath = getTechIconPathBySlug(techSlug);
              const techName = techInfo?.name || techSlug;

              return (
                <div
                  key={index}
                  className="w-5 h-5 sm:w-6 sm:h-6 overflow-hidden"
                >
                  <Image
                    src={iconPath}
                    alt={techName}
                    width={24}
                    height={24}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
          </div>
          <span
            className="text-sm font-medium"
            style={{ color: "var(--color-bc-text-gray)" }}
          >
            {formatDate(date)}
          </span>
        </div>
      </div>
    </div>
  );
}
