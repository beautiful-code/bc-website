import Link from "next/link";
import Image from "next/image";
import CategoryIcon from "@/components/CategoryIcon";
import Logo from "@/components/Logo";
import Copyright from "@/components/Copyright";
import { appliedAIAreas, productEngineeringAreas } from "@/lib/expertise";
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
          <div className="max-w-4xl mx-auto">
            <h2
              className="flex items-center gap-1 text-xl sm:text-3xl tracking-wider uppercase mt-6 sm:mt-2 mb-8 text-left px-4"
              style={{ color: "var(--color-bc-red)" }}
            >
              <Image
                src="/icons/chevron.svg"
                alt=""
                width={20}
                height={20}
                className="w-8 h-8"
              />
              <span>WHAT WE ARE WIRED FOR</span>
            </h2>

            {/* Row 1: Applied AI - Label Left, Items Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-8 mb-4 sm:mb-8 px-8">
              <div className="flex items-center pl-4">
                <h3 className="text-lg sm:text-3xl font-semibold sm:font-bold uppercase text-[var(--color-bc-purple)]">
                  APPLIED AI
                </h3>
              </div>
              <div className="space-y-2">
                {appliedAIAreas.map((area) => (
                  <Link key={area.slug} href={`/expertise/${area.slug}`}>
                    <div className="flex items-center space-x-4 cursor-pointer transition-all duration-300 hover:bg-[var(--color-bc-beige)] group py-3 px-4 rounded">
                      <div className="flex-shrink-0">
                        <CategoryIcon
                          slug={area.slug}
                          name={area.name}
                          type="expertise"
                          className="w-8 h-8"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg sm:text-xl transition-colors duration-300 text-[var(--color-bc-text-black)] group-hover:text-[var(--color-bc-red)]">
                          {area.name}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Row 2: Product Engineering - Items Left, Label Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-4 sm:mb-8 mt-8 px-8">
              <div className="flex items-center justify-start pl-4 sm:hidden">
                <h3 className="text-lg sm:text-2xl font-bold uppercase text-[var(--color-bc-purple)]">
                  PRODUCT ENGINEERING
                </h3>
              </div>

              <div className="space-y-2">
                {productEngineeringAreas.map((area) => (
                  <Link key={area.slug} href={`/expertise/${area.slug}`}>
                    <div className="flex items-center space-x-4 cursor-pointer transition-all duration-300 hover:bg-[var(--color-bc-beige)] group py-3 px-4 rounded">
                      <div className="flex-shrink-0">
                        <CategoryIcon
                          slug={area.slug}
                          name={area.name}
                          type="expertise"
                          className="w-8 h-8"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg sm:text-xl transition-colors duration-300 text-[var(--color-bc-text-black)] group-hover:text-[var(--color-bc-red)]">
                          {area.name}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="hidden sm:flex items-center justify-start pl-4">
                <h3 className="text-lg sm:text-3xl font-bold uppercase text-[var(--color-bc-purple)]">
                  PRODUCT ENGINEERING
                </h3>
              </div>
            </div>

            {/* Additional Links Section */}
            <div className="mt-8">
              {SHOW_PRINCIPLES && (
                <Link
                  href="/principles"
                  className=""
                  aria-label="Explore our engineering principles"
                >
                  <div className="flex items-center justify-between gap-4 pl-4 pr-2 py-4 hover:bg-[var(--color-bc-beige)] group mb-2 rounded ">
                    <div >
                      <h2 className="text-lg sm:text-3xl tracking-wider uppercase text-left flex items-center gap-1">
                        <Image
                          src="/icons/chevron.svg"
                          alt=""
                          width={20}
                          height={20}
                          className="w-8 h-8"
                        />
                        <span className="font-semibold text-lg sm:text-2xl transition-colors duration-300 text-[var(--color-bc-text-black)] group-hover:text-[var(--color-bc-red)]">
                          OUR ENGINEERING PRINCIPLES
                        </span>
                      </h2>
                    </div>
                  </div>
                </Link>
              )}

              <Link
                href="/leadership"
                className=""
                aria-label="Meet our leadership team"
              >
                <div className="flex items-center justify-between gap-4 pl-4 pr-2 py-4 hover:bg-[var(--color-bc-beige)] group mb-2 rounded ">
                  <div>
                    <h2 className="text-lg sm:text-3xl tracking-wider uppercase text-left flex items-center gap-1">
                      <Image
                        src="/icons/chevron.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="w-8 h-8"
                      />
                      <span className="font-semibold text-lg sm:text-2xl transition-colors duration-300 text-[var(--color-bc-text-black)] group-hover:text-[var(--color-bc-red)]">
                        LEADERSHIP
                      </span>
                    </h2>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <Copyright />
        </div>
      </div>
    </div>
  );
}
