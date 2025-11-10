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
        className="text-base sm:text-lg tracking-wider uppercase mb-4 text-left px-4 flex items-center gap-1"
        style={{ color: "var(--color-bc-red)" }}
      >
        <Image
          src="/icons/chevron.svg"
          alt=""
          width={20}
          height={20}
          className="w-5 h-5"
        />
        <span>WHAT WE ARE WIRED FOR</span>
      </h2>

      {/* Applied AI Section */}
      <div className="mb-4">
        <h3 className="text-base sm:text-lg font-semibold uppercase mb-2 px-4 sm:px-9 text-[var(--color-bc-purple)]">
          APPLIED AI
        </h3>
        <div className="space-y-1">
          {appliedAIAreas.map((area) => {
            const isActive = area.slug === activeSlug;
            return (
              <Link key={area.slug} href={`/expertise/${area.slug}`}>
                <div
                  className={`flex items-center space-x-3 cursor-pointer transition-all duration-300 py-2.5 px-4 sm:px-9 group ${
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
                      className="w-5 h-5"
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

      {/* Applied AI Framework Highlighted Link */}
      <Link href="/ai-framework">
        <div className={`mb-6 py-3 px-3 sm:px-3 cursor-pointer transition-colors duration-300 flex items-center gap-1 ${
          activeSlug === "ai-framework"
          ? "text-[var(--color-bc-red)]"
          : "text-[var(--color-bc-text-black)] hover:text-[var(--color-bc-red)]"
        }`}>
          <Image
            src="/icons/chevron.svg"
            alt=""
            width={20}
            height={20}
            className="w-5 h-5"
          />
          <span className={`text-sm sm:text-base uppercase tracking-wide transition-colors duration-300 ${
            activeSlug === "ai-framework"
              ? "text-[var(--color-bc-red)]"
              : "text-[var(--color-bc-text-black)] hover:text-[var(--color-bc-red)]"
          }`}>
            APPLIED AI FRAMEWORK
          </span>
        </div>
      </Link>

      {/* Product Engineering Section */}
      <div className="mb-6">
        <h3 className="text-base sm:text-lg font-semibold uppercase mb-2 px-4 sm:px-9 text-[var(--color-bc-purple)]">
          PRODUCT ENGINEERING
        </h3>
        <div className="space-y-1">
          {productEngineeringAreas.map((area) => {
            const isActive = area.slug === activeSlug;
            return (
              <Link key={area.slug} href={`/expertise/${area.slug}`}>
                <div
                  className={`flex items-center space-x-3 cursor-pointer transition-all duration-300 py-2.5 px-4 sm:px-9 group ${
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
                      className="w-5 h-5"
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
      {SHOW_PRINCIPLES && (
        <Link href="/principles">
          <div className={`py-3 px-3 sm:px-3 cursor-pointer transition-colors duration-300 flex items-center gap-1 ${
            activeSlug === "principles"
              ? "text-[var(--color-bc-red)]"
              : "text-[var(--color-bc-text-black)] hover:text-[var(--color-bc-red)]"
          }`}>
            <Image
              src="/icons/chevron.svg"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span className="text-sm sm:text-base uppercase tracking-wide">
              OUR ENGINEERING PRINCIPLES
            </span>
          </div>
        </Link>
      )}

      {SHOW_PRINCIPLES && (
        <Link href="/leadership">
          <div className={`py-3 px-3 sm:px-3 cursor-pointer transition-colors duration-300 flex items-center gap-1 ${
            activeSlug === "leadership"
              ? "text-[var(--color-bc-red)]"
              : "text-[var(--color-bc-text-black)] hover:text-[var(--color-bc-red)]"
          }`}>
            <Image
              src="/icons/chevron.svg"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span className="text-sm sm:text-base uppercase tracking-wide">
              LEADERSHIP
            </span>
          </div>
        </Link>
      )}
    </div>
  );
}
