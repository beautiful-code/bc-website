import Link from "next/link";
import Image from "next/image";
import CategoryIcon from "@/components/CategoryIcon";
import Logo from "@/components/Logo";
import Copyright from "@/components/Copyright";
import { aiExpertiseAreas, productEngineeringExpertiseAreas } from "@/lib/expertise";
import { SHOW_PRINCIPLES } from "@/lib/config";
import "../styles/layout.scss";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="two-column-layout">
        <div className="sideColumn !justify-center">
          <div className="max-w-lg">
            <Logo className="mt-4 mb-4 mx-auto cursor-pointer" />
            <p
              className="text-sm sm:text-lg font-normal tracking-wide font-[family-name:var(--font-jetbrains-mono)] text-center mb-4"
              style={{ color: "var(--color-bc-text-gray)" }}
            >
              Engineers Who Care About Engineering
            </p>
          </div>
        </div>

        <div className="mainColumn font-[family-name:var(--font-jetbrains-mono)]">
          <div className="max-w-2xl mx-auto">
            {/* AI Expertise Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 px-8 py-3 ">
                <Image src="/icons/chevron.svg" alt="chevron" width={32} height={32} className="flex-shrink-0" />
                <h2 className="text-xl sm:text-2xl font-medium tracking-wider uppercase" style={{ color: "#e01236" }}>
                  OUR APPLIED AI EXPERTISE
                </h2>
              </div>
              <div className="expertises">
                {aiExpertiseAreas.map((area) => {
                    return (
                      <Link key={area.slug} href={`/expertise/${area.slug}`}>
                        <div className="flex items-center space-x-6 cursor-pointer transition-all duration-300 hover:bg-neutral-100 hover:rounded group px-8 py-2 sm:py-4">
                          <div className="flex-shrink-0">
                            <CategoryIcon
                              slug={area.slug}
                              name={area.name}
                              type="expertise"
                              className="w-6 h-6 sm:w-8 sm:h-8"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg sm:text-xl transition-colors duration-300 text-[var(--color-bc-text-black)] group-hover:text-[var(--color-bc-red)]">
                              {area.name}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>

            {/* Product Engineering Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 px-8 py-3 ">
              <Image src="/icons/chevron.svg" alt="chevron" width={32} height={32} className="flex-shrink-0" />
                <h2 className="text-xl sm:text-2xl font-medium tracking-wider uppercase" style={{ color: "#e01236" }}>
                  OUR PRODUCT ENGINEERING BACKBONE
                </h2>
              </div>
              <div className="expertises">
                {productEngineeringExpertiseAreas.map((area) => {
                    return (
                      <Link key={area.slug} href={`/expertise/${area.slug}`}>
                        <div className="flex items-center space-x-6 cursor-pointer transition-all duration-300 hover:bg-neutral-100 hover:rounded group px-8 py-2 sm:py-4">
                          <div className="flex-shrink-0">
                            <CategoryIcon
                              slug={area.slug}
                              name={area.name}
                              type="expertise"
                              className="w-6 h-6 sm:w-8 sm:h-8"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg sm:text-xl transition-colors duration-300 text-[var(--color-bc-text-black)] group-hover:text-[var(--color-bc-red)]">
                              {area.name}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>

            {SHOW_PRINCIPLES && (
              <Link
                href="/principles"
                className=""
                aria-label="Explore our engineering principles"
              >
                <div className="flex items-center gap-3 px-8 py-4 cursor-pointer uppercase tracking-wider text-lg sm:text-xl transition-colors duration-300 hover:bg-neutral-100 hover:rounded text-[#4f4f4f] hover:text-[var(--color-bc-red)] group">
                <Image src="/icons/chevron.svg" alt="chevron" width={32} height={32} className="flex-shrink-0" />
                  <span className="font-medium text-xl sm:text-2xl">READ OUR ENGINEERING PRINCIPLES</span>
                </div>
              </Link>
            )}
          </div>
          <Copyright />
        </div>
      </div>
    </div>
  );
}
