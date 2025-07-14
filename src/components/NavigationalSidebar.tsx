import Image from "next/image";
import Link from "next/link";
import ExpertiseIcon from "@/components/ExpertiseIcon";
import { expertiseAreas } from "@/lib/expertise";

interface NavigationalSidebarProps {
  activeSlug?: string;
}

export default function NavigationalSidebar({
  activeSlug,
}: NavigationalSidebarProps) {
  return (
    <div className="sideColumn font-[family-name:var(--font-jetbrains-mono)]">
      <div className="max-w-lg">
        <Link href="/">
          <Image
            src="/BCLogo.svg"
            alt="BeautifulCode Logo"
            width={300}
            height={58}
            priority
            className="mt-8 mb-12 cursor-pointer px-8"
          />
        </Link>

        <div className="mt-8">
          <h2
            className="text-xl tracking-wider uppercase mb-6 text-left px-8"
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
                    className={`flex items-center space-x-4 cursor-pointer transition-all duration-300 py-3 px-8 group ${
                      isActive
                        ? "bg-white text-[var(--color-bc-red)]"
                        : "hover:bg-white/50 text-[var(--color-bc-text-black)] hover:text-[var(--color-bc-red)] rounded-lg"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <ExpertiseIcon
                        slug={area.slug}
                        name={area.name}
                        className="w-8 h-8"
                        isActive={isActive}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">{area.name}</h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
