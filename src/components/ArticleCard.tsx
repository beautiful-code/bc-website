import Image from "next/image";
import Link from "next/link";
import { getTechIconPaths } from "@/lib/tech-icons";
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
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Link href={`/articles/${slug}`}>
            <h3
              className="text-xl font-medium mb-2 hover:text-[var(--color-bc-red)] cursor-pointer transition-colors duration-300"
              style={{ color: "var(--color-bc-text-black)" }}
            >
              {title}
            </h3>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {getTechIconPaths(tech).map((iconPath, index) => {
                const techName = tech[index];
                return (
                  <div
                    key={index}
                    className="w-5 h-5 rounded-full overflow-hidden"
                  >
                    <Image
                      src={iconPath}
                      alt={techName}
                      width={20}
                      height={20}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="ml-4 flex-shrink-0">
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
