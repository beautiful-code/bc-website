import Image from "next/image";
import Link from "next/link";
import MenuPage from "@/components/MenuPage";
import Breadcrumb from "@/components/ui/breadcrumb";
import { getHomeBreadcrumb } from "@/lib/breadcrumb-utils";
import { getPrincipleSummariesBySlugs, principlesCategories } from "@/lib/principle";
import "../../styles/layout.scss";

export default async function PrinciplesIndexPage() {
  const breadcrumbItems = [
    getHomeBreadcrumb(),
    {
      label: "Our Engineering Principles",
      href: undefined,
    },
  ];

  const groups = await Promise.all(
    principlesCategories.map(async (group) => {
      const principles = await getPrincipleSummariesBySlugs(group.principleSlugs);
      return {
        ...group,
        principles,
      };
    })
  );

  return (
    <MenuPage activeSlug="principles">
      <div className="px-4 sm:px-16">
        <div className="hidden sm:block mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <section className="mb-10 sm:mb-12">
          <div className="border border-black rounded-2xl bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] p-4 sm:p-6">
            <h1
              className="text-xl sm:text-3xl font-medium mb-4 font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-wide"
              style={{ color: "var(--color-bc-red)" }}
            >
              Why Principles Matter?
            </h1>
            <div className="space-y-3 text-sm sm:text-base font-[family-name:var(--font-nunito-sans)]" style={{ color: "var(--color-bc-text-black)" }}>
              <p>
                Principles are our strong beliefs that guide how we build, ship, and communicate.
              </p>
              <p>
                Every company has a language. It is the vocabulary for how people think, build, and collaborate. Our engineering principles shape that language at BeautifulCode.
              </p>
             
            </div>
          </div>
        </section>

        <div className="space-y-12">
          {groups.map((group) => {
            const iconSrc = `/icons/principle/${group.iconSlug}.svg`;
            return (
              <section
                key={group.slug}
                id={group.slug}
                aria-labelledby={`${group.slug}-title`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center justify-center  p-1" aria-hidden="true">
                    <Image
                      src={iconSrc}
                      alt=""
                      width={28}
                      height={28}
                      className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
                    />
                  </span>
                <div>
                  <h2
                    id={`${group.slug}-title`}
                    className="text-lg sm:text-2xl font-medium font-[family-name:var(--font-jetbrains-mono)]"
                    style={{ color: "var(--color-bc-red)" }}
                  >
                    {group.name}
                  </h2>
                 
                </div>
              </div>

              <div className="">
                {group.principles.map((principle) => (
                  <Link
                    href={`/principles/${principle.category}/${principle.slug}`}
                    key={principle.slug}
                    className="text-lg sm:text-xl font-medium font-[family-name:var(--font-nunito-sans)] text-[var(--color-bc-text-black)]"
                  >
                    <div
                      id={principle.slug}
                      className="rounded-sm p-3 sm:p-4 hover:text-[var(--color-bc-red)] bg-white hover:bg-[var(--color-bc-beige)] transition-colors duration-200"
                    >
                      {principle.title}
                      {principle.summary && (
                        <p className="mt-2 text-sm sm:text-base font-[family-name:var(--font-nunito-sans)] text-[var(--color-bc-text-gray)]">
                          {principle.summary}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              </section>
            );
          })}
        </div>
      </div>
    </MenuPage>
  );
}
