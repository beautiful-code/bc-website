import Image from "next/image";

interface ArticleCardProps {
  title: string;
  date: string;
}

export default function ArticleCard({ title, date }: ArticleCardProps) {
  return (
    <div className="font-[family-name:var(--font-nunito-sans)]">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3
            className="text-xl font-medium mb-2 hover:text-[var(--color-bc-red)] cursor-pointer transition-colors duration-300"
            style={{ color: "var(--color-bc-text-black)" }}
          >
            {title}
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-full overflow-hidden">
                <Image
                  src="/icons/tech/js.svg"
                  alt="JavaScript"
                  width={20}
                  height={20}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-5 h-5 rounded-full overflow-hidden">
                <Image
                  src="/icons/tech/nextjs.svg"
                  alt="Next.js"
                  width={20}
                  height={20}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="ml-4 flex-shrink-0">
          <span
            className="text-sm font-medium"
            style={{ color: "var(--color-bc-text-gray)" }}
          >
            {date}
          </span>
        </div>
      </div>
    </div>
  );
}
