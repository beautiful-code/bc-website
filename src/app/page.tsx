import Link from "next/link";
import CategoryIcon from "@/components/CategoryIcon";
import Logo from "@/components/Logo";
import Copyright from "@/components/Copyright";
import { fullStackAreas, appliedAIAreas } from "@/lib/expertise";
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
          <div className="max-w-6xl mx-auto">
            {/* Main Heading */}
            <h1
              className="text-2xl sm:text-4xl tracking-wider uppercase mt-8 mb-12 text-left px-8 font-bold"
              style={{ color: "var(--color-bc-red)" }}
            >
              {">"} What we are wired for
            </h1>

            {/* Two Column Layout */}
            <div className="px-8 mb-12 space-y-8">
              {/* Applied AI Row - Heading Left, Content Right */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Applied AI Heading */}
                <div className="p-6 flex items-center justify-center">
                  <h2
                    className="text-xl sm:text-3xl tracking-widest uppercase font-bold text-center"
                    style={{ color: "var(--color-bc-text-black)" }}
                  >
                    Applied AI
                  </h2>
                </div>

                {/* Applied AI Content */}
                <div className="p-6">
                  <div className="space-y-2">
                    {appliedAIAreas.map((area) => {
                      return (
                        <Link key={area.slug} href={`/expertise/${area.slug}`}>
                          <div className="flex items-center space-x-4 cursor-pointer transition-all duration-300 hover:bg-[var(--color-bc-beige)] group py-3 px-2">
                            <div className="flex-shrink-0">
                              <CategoryIcon
                                slug={'ai-applied-ml'}
                                name={area.name}
                                type="expertise"
                                className="w-8 h-8"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-base sm:text-lg transition-colors duration-300 text-[var(--color-bc-text-black)] group-hover:text-[var(--color-bc-red)]">
                                {area.name}
                              </h3>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Core Engineering Row - Content Left, Heading Right */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Core Engineering Content */}
                <div className="p-6">
                  <div className="space-y-2">
                    {fullStackAreas.map((area) => {
                      return (
                        <Link key={area.slug} href={`/expertise/${area.slug}`}>
                          <div className="flex items-center space-x-4 cursor-pointer transition-all duration-300 hover:bg-[var(--color-bc-beige)] group py-3 px-2">
                            <div className="flex-shrink-0">
                              <CategoryIcon
                                slug={area.slug}
                                name={area.name}
                                type="expertise"
                                className="w-8 h-8"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-base sm:text-lg transition-colors duration-300 text-[var(--color-bc-text-black)] group-hover:text-[var(--color-bc-red)]">
                                {area.name}
                              </h3>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Core Engineering Heading */}
                <div className="p-6 flex items-center justify-center">
                  <h2
                    className="text-xl sm:text-3xl tracking-widest uppercase font-bold text-center"
                    style={{ color: "var(--color-bc-text-black)" }}
                  >
                    Core Engineering
                  </h2>
                </div>
              </div>
            </div>

            {SHOW_PRINCIPLES && (
              <Link
                href="/principles"
                className=""
                aria-label="Explore our engineering principles"
              >
                <div className="flex items-center justify-between mt-2 gap-4 pl-6 pr-2 py-8 hover:bg-[var(--color-bc-beige)] group">
                  <div>
                    <h2 className="text-lg sm:text-3xl tracking-wider uppercase text-left flex items-center gap-4">
                      <span style={{ color: "var(--color-bc-red)" }}>
                        {">"}
                      </span>
                      <span className="font-bold text-2xl transition-colors duration-300 text-[var(--color-bc-text-black)] group-hover:text-[var(--color-bc-red)]">
                        READ OUR ENGINEERING PRINCIPLES
                      </span>
                    </h2>
                  </div>
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
