import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string; // undefined for current page (last item)
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav
      className={`flex items-center space-x-2 text-md ${className}`}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center space-x-2">
            {/* Breadcrumb Item */}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="flex items-center space-x-1 text-[var(--color-bc-text-gray)] transition-colors duration-300"
              >
                {item.icon && (
                  <span className="w-5 h-5 flex items-center justify-center">
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
              </Link>
            ) : (
              <div className="flex items-center space-x-1">
                {item.icon && (
                  <span className="w-5 h-5 flex items-center justify-center">
                    {item.icon}
                  </span>
                )}
                <span
                  className={`text-[var(--color-bc-text-gray)] ${
                    isLast ? "font-medium" : ""
                  }`}
                >
                  {item.label}
                </span>
              </div>
            )}

            {/* Separator */}
            {!isLast && (
              <span className="text-[var(--color-bc-text-gray)]/60 select-none">
                /
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
