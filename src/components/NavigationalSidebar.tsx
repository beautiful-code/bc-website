import Link from "next/link";
import Image from "next/image";
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
        className="text-lg sm:text-xl tracking-wider uppercase mb-6 text-left px-2 flex items-center gap-1"
        style={{ color: "var(--color-bc-red)" }}
      >
        <Image
          src="/icons/chevron.svg"
          alt=""
          width={20}
          height={20}
          className="w-6 h-6"
        />
        <span>WHAT WE ARE WIRED FOR</span>
      </h2>

      {/* Applied AI Section */}
      <div className="mb-8">
        <h3 className="text-lg sm:text-xl font-bold uppercase mb-1 pl-8 pr-2 sm:px-8 text-[var(--color-bc-purple)]">
          APPLIED AI
        </h3>
        <div className="space-y-2">
          {appliedAIAreas.map((area) => {
            const isActive = area.slug === activeSlug;
            return (
              <Link key={area.slug} href={`/expertise/${area.slug}`}>
                <div
                  className={`flex items-center space-x-4 cursor-pointer transition-all duration-300 py-2.5 pl-8 pr-2 sm:pl-8 sm:pr-4 group ${
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

      {/* Product Engineering Section */}
      <div className="mb-8">
        <h3 className="text-lg sm:text-xl font-bold uppercase mb-1 pl-8 pr-2 sm:px-8 text-[var(--color-bc-purple)]">
          PRODUCT ENGINEERING
        </h3>
        <div className="space-y-2">
          {productEngineeringAreas.map((area) => {
            const isActive = area.slug === activeSlug;
            return (
              <Link key={area.slug} href={`/expertise/${area.slug}`}>
                <div
                  className={`flex items-center space-x-4 cursor-pointer transition-all duration-300 py-2.5 pl-8 pr-2 sm:pl-8 sm:pr-4 group ${
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
              className={`flex items-center gap-1 px-4 sm:pl-2 sm:pr-4 py-3 cursor-pointer uppercase tracking-wider text-sm sm:text-lg transition-colors duration-300 ${
                activeSlug === "principles"
                  ? "text-[var(--color-bc-red)]"
                  : "text-[var(--color-bc-text-black)] hover:text-[var(--color-bc-red)]"
              }`}
            >
            <Image
              src="/icons/chevron.svg"
              alt=""
              width={20}
              height={20}
              className="w-6 h-6"
            />
            <span>OUR ENGINEERING PRINCIPLES</span>
            </div>
          </Link>
        )}

        <Link href="/leadership">
          <div
            className={`flex items-center gap-1 px-4 sm:pl-2 sm:pr-4 py-3 cursor-pointer uppercase tracking-wider text-sm sm:text-lg transition-colors duration-300 ${
              activeSlug === "leadership"
                ? "text-[var(--color-bc-red)]"
                : "text-[var(--color-bc-text-black)] hover:text-[var(--color-bc-red)]"
            }`}
          >
            <Image
              src="/icons/chevron.svg"
              alt=""
              width={20}
              height={20}
              className="w-6 h-6"
            />
            <span>LEADERSHIP</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
