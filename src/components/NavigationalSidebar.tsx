import Link from "next/link";
import CategoryIcon from "@/components/CategoryIcon";
import { expertiseAreas } from "@/lib/expertise";
import { principlesCategories } from "@/lib/principle-category";
import { SHOW_PRINCIPLES } from "@/lib/config";

interface NavigationalSidebarProps {
  activeSlug?: string;
}

export default function NavigationalSidebar({
  activeSlug,
}: NavigationalSidebarProps) {
  return (
    <div className="mt-8">
      <h2
        className="text-lgsm:text-xl tracking-wider uppercase mb-6 text-left px-4 sm:px-8"
        style={{ color: "var(--color-bc-text-gray)" }}
      >
        WHAT WE ARE WIRED FOR
      </h2>
      <div className="space-y-2">
        {expertiseAreas.map((area) => {
          const isActive = area.slug === activeSlug;
          return (
            <Link key={area.slug} href={`/expertise/${area.slug}`}>
              <div
                className={`flex items-center space-x-4 cursor-pointer transition-all duration-300 py-3 px-4 sm:px-8 group ${
                  isActive
                    ? "bg-white text-[var(--color-bc-red)]"
                    : "hover:bg-white/50 text-[var(--color-bc-text-black)] hover:text-[var(--color-bc-red)] rounded-lg"
                }`}
              >
                <div className="flex-shrink-0">
                  <CategoryIcon
                    slug={area.slug}
                    name={area.name}
                    type="expertise"
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    isActive={isActive}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-md sm:text-lg sm:font-medium">
                    {area.name}
                  </h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {SHOW_PRINCIPLES && (
        <div className="mt-12">
          <h2
            className="text-lgsm:text-xl tracking-wider uppercase mb-6 text-left px-4 sm:px-8"
            style={{ color: "var(--color-bc-text-gray)" }}
          >
            OUR PRINCIPLES
          </h2>
          <div className="space-y-2">
            {principlesCategories.map((category) => {
              const isActive = category.slug === activeSlug;
              return (
                <Link key={category.slug} href={`/principles/${category.slug}`}>
                  <div
                    className={`flex items-center space-x-4 cursor-pointer transition-all duration-300 py-3 px-4 sm:px-8 group ${
                      isActive
                        ? "bg-white text-[var(--color-bc-red)]"
                        : "hover:bg-white/50 text-[var(--color-bc-text-black)] hover:text-[var(--color-bc-red)] rounded-lg"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <CategoryIcon
                        slug={category.slug}
                        name={category.name}
                        type="principle"
                        className="w-6 h-6 sm:w-8 sm:h-8"
                        isActive={isActive}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-md sm:text-lg sm:font-medium">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
