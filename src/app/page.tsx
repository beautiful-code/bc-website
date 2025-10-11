import Link from "next/link";
import CategoryIcon from "@/components/CategoryIcon";
import Logo from "@/components/Logo";
import Copyright from "@/components/Copyright";
import { expertiseAreas } from "@/lib/expertise";
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
          <div className="max-w-xl mx-auto">
            <h2
              className="text-lg sm:text-3xl tracking-wider uppercase mt-6 mb-6 text-left px-8"
              style={{ color: "var(--color-bc-red)" }}
            >
              {">"} WHAT WE ARE WIRED FOR
            </h2>
            <div className="expertises ">
              {expertiseAreas.map((area) => {
                return (
                  <Link key={area.slug} href={`/expertise/${area.slug}`}>
                    <div className="flex items-center space-x-6  cursor-pointer transition-all duration-300 hover:bg-[var(--color-bc-beige)] group px-8 py-2 sm:py-4">
                      <div className="flex-shrink-0">
                        <CategoryIcon
                          slug={area.slug}
                          name={area.name}
                          type="expertise"
                          className="w-8 h-8 sm:w-12 sm:h-12"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-2xl transition-colors duration-300 text-[var(--color-bc-text-black)] group-hover:text-[var(--color-bc-red)]">
                          {area.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                );
              })}
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
