import { ReactNode } from "react";
import NavigationalSidebar from "./NavigationalSidebar";
import Logo from "./Logo";
import MobileNav from "./MobileNav";

interface MenuPageProps {
  activeSlug: string;
  children: ReactNode;
}

export default function MenuPage({ activeSlug, children }: MenuPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="two-column-layout">
        {/* Side Column - Navigation */}
        <div className="sideColumn font-[family-name:var(--font-jetbrains-mono)]">
          <div className="max-w-lg">
            <div className="relative sm:block">
              <Logo />
              <div className="absolute top-0 right-4 sm:hidden">
                <MobileNav activeSlug={activeSlug} />
              </div>
            </div>
            <div className="hidden sm:block">
              <NavigationalSidebar activeSlug={activeSlug} />
            </div>
          </div>
        </div>

        {/* Main Column - Content */}
        <div className="mainColumn font-[family-name:var(--font-jetbrains-mono)]">
          {children}
        </div>
      </div>
    </div>
  );
}
