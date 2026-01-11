import Link from "next/link";
import CategoryIcon from "@/components/CategoryIcon";
import { appliedAIAreas, productEngineeringAreas } from "@/lib/expertise";
import { SHOW_PRINCIPLES } from "@/lib/config";

interface NavigationalSidebarProps {
  activeSlug?: string;
}

export default function NavigationalSidebar({
  activeSlug,
}: NavigationalSidebarProps) {
  return (
    <div className="mt-6">
      <h2
        className="text-lg sm:text-xl tracking-wider uppercase mb-6 text-left px-4 sm:px-6 flex items-center gap-2"
        style={{ color: "var(--color-bc-red)" }}
      >
        <span>{">"}</span>
        <span>WHAT WE ARE WIRED FOR</span>
      </h2>

      {/* Product Engineering Section */}
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-bold uppercase mb-4 px-4 sm:px-6 text-[var(--color-bc-purple)]">
          PRODUCT ENGINEERING
        </h3>
        <div className="space-y-2">
          {productEngineeringAreas.map((area) => {
            const isActive = area.slug === activeSlug;
            return (
              <Link key={area.slug} href={`/expertise/${area.slug}`}>
                <div
                  className={`flex items-center space-x-4 cursor-pointer transition-all duration-300 py-3 px-4 sm:px-6 group ${
                    isActive
                      ? "bg-white text-[var(--color-bc-red)]"
                      : "hover:bg-white/50 text-[var(--color-bc-text-black)] hover:text-[var(--color-bc-red)]"
                  }`}
                >
                  <div className="flex-shrink-0">
                    <CategoryIcon
                      slug={area.slug}
                      name={area.name}
                      type="expertise"
                      className="w-6 h-6 sm:w-7 sm:h-7"
                      isActive={isActive}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm sm:text-base">{area.name}</h4>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Applied AI Section */}
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-bold uppercase mb-4 px-4 sm:px-6 text-[var(--color-bc-purple)]">
          APPLIED AI
        </h3>
        <div className="space-y-2">
          {appliedAIAreas.map((area) => {
            const isActive = area.slug === activeSlug;
            return (
              <Link key={area.slug} href={`/expertise/${area.slug}`}>
                <div
                  className={`flex items-center space-x-4 cursor-pointer transition-all duration-300 py-3 px-4 sm:px-6 group ${
                    isActive
                      ? "bg-white text-[var(--color-bc-red)]"
                      : "hover:bg-white/50 text-[var(--color-bc-text-black)] hover:text-[var(--color-bc-red)]"
                  }`}
                >
                  <div className="flex-shrink-0">
                    <CategoryIcon
                      slug={area.slug}
                      name={area.name}
                      type="expertise"
                      className="w-6 h-6 sm:w-7 sm:h-7"
                      isActive={isActive}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm sm:text-base">{area.name}</h4>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Links */}
      <div className="mt-2 space-y-1">
        {SHOW_PRINCIPLES && (
          <Link href="/principles">
            <div
              className={`px-4 sm:px-6 py-2 cursor-pointer uppercase tracking-wider text-sm sm:text-lg transition-colors duration-300 ${
                activeSlug === "principles"
                  ? "text-[var(--color-bc-red)]"
                  : "text-[var(--color-bc-text-black)] hover:text-[var(--color-bc-red)]"
              }`}
            >
              OUR ENGINEERING PRINCIPLES
            </div>
          </Link>
        )}

        <Link href="/leadership">
          <div
            className={`px-4 sm:px-6 py-2 cursor-pointer uppercase tracking-wider text-sm sm:text-lg transition-colors duration-300 ${
              activeSlug === "leadership"
                ? "text-[var(--color-bc-red)]"
                : "text-[var(--color-bc-text-black)] hover:text-[var(--color-bc-red)]"
            }`}
          >
            LEADERSHIP
          </div>
        </Link>
      </div>
    </div>
  );
}
