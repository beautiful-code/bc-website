import Link from "next/link";
import Image from "next/image";
import CategoryIcon from "@/components/CategoryIcon";
import { aiExpertiseAreas, productEngineeringExpertiseAreas } from "@/lib/expertise";
import { SHOW_PRINCIPLES } from "@/lib/config";

interface NavigationalSidebarProps {
  activeSlug?: string;
}

export default function NavigationalSidebar({
  activeSlug,
}: NavigationalSidebarProps) {
  return (
    <div className="mt-8">
      {/* AI Expertise Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 px-4 py-3 ">
        <Image src="/icons/chevron.svg" alt="chevron" width={32} height={32} className="flex-shrink-0" />
          <h2 className="text-lg font-medium tracking-wider uppercase" style={{ color: "#e01236" }}>
            OUR APPLIED AI EXPERTISE
          </h2>
        </div>
        <div className="space-y-2">
          {aiExpertiseAreas.map((area) => {
            const isActive = area.slug === activeSlug;
            return (
              <Link key={area.slug} href={`/expertise/${area.slug}`}>
                <div
                  className={`flex items-center gap-2 cursor-pointer transition-all duration-300 py-3 px-4 group ${
                    isActive
                      ? "bg-white text-[#e01236]"
                      : "hover:bg-[#fafafa] text-[#171717] hover:text-[#e01236] rounded-lg"
                  }`}
                >
                  <div className="flex-shrink-0">
                    <CategoryIcon
                      slug={area.slug}
                      name={area.name}
                      type="expertise"
                      className="w-6 h-6"
                      isActive={isActive}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-normal">
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
        <div className="flex items-center gap-2 px-4 py-3">
          <Image src="/icons/chevron.svg" alt="chevron" width={32} height={32} className="flex-shrink-0" />
          <h2 className="text-lg font-medium tracking-wider uppercase" style={{ color: "#e01236" }}>
            OUR PRODUCT ENGINEERING BACKBONE
          </h2>
        </div>
        <div className="space-y-2">
          {productEngineeringExpertiseAreas.map((area) => {
            const isActive = area.slug === activeSlug;
            return (
              <Link key={area.slug} href={`/expertise/${area.slug}`}>
                <div
                  className={`flex items-center gap-2 cursor-pointer transition-all duration-300 py-3 px-4 group ${
                    isActive
                      ? "bg-white text-[#e01236]"
                      : "hover:bg-[#fafafa] text-[#171717] hover:text-[#e01236] rounded-lg"
                  }`}
                >
                  <div className="flex-shrink-0">
                    <CategoryIcon
                      slug={area.slug}
                      name={area.name}
                      type="expertise"
                      className="w-6 h-6"
                      isActive={isActive}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-normal">
                      {area.name}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Engineering Principles Section */}
      {SHOW_PRINCIPLES && (
        <div className="mt-12">
          <Link href="/principles">
            <div className="flex items-center gap-3 px-4 py-3 cursor-pointer uppercase tracking-wider text-lg transition-colors duration-300 hover:bg-[#fafafa] text-[#4f4f4f] hover:text-[#e01236] rounded-lg">
              <Image src="/icons/chevron.svg" alt="chevron" width={32} height={32} className="flex-shrink-0" />
              <span className="font-medium">READ OUR ENGINEERING PRINCIPLES</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
