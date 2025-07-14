interface ArticleCardProps {
  title: string;
  date: string;
  tags: string[];
}

export default function ArticleCard({ title, date, tags }: ArticleCardProps) {
  return (
    <div className="border-b border-gray-200 pb-6 font-[family-name:var(--font-nunito-sans)]">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3
            className="text-lg font-medium mb-2 hover:text-[var(--color-bc-red)] cursor-pointer transition-colors duration-300"
            style={{ color: "var(--color-bc-text-black)" }}
          >
            {title}
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full border text-xs font-medium"
                  style={{
                    borderColor: "var(--color-bc-text-gray)",
                    color: "var(--color-bc-text-gray)",
                  }}
                >
                  {tag.charAt(0).toUpperCase()}
                </span>
              ))}
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
