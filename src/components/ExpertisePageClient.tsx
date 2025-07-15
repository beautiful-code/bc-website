"use client";

import { useState, ReactNode } from "react";
import NavigationalSidebar from "./NavigationalSidebar";
import Logo from "./Logo";
import MobileNav from "./MobileNav";

interface ExpertisePageClientProps {
  slug: string;
  children: ReactNode;
}

export default function ExpertisePageClient({
  slug,
  children,
}: ExpertisePageClientProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      <MobileNav isOpen={isNavOpen} onToggle={toggleNav} />
      <div className="two-column-layout">
        {/* Side Column - Navigation */}
        <div className="sideColumn font-[family-name:var(--font-jetbrains-mono)]">
          <div className="max-w-lg">
            <Logo />
            <div className={`${isNavOpen ? "block" : "hidden"} sm:block`}>
              <NavigationalSidebar activeSlug={slug} />
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
