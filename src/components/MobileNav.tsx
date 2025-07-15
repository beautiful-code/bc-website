"use client";

import { useState } from "react";
import Image from "next/image";
import NavigationalSidebar from "./NavigationalSidebar";
import Logo from "./Logo";

interface MobileNavProps {
  activeSlug: string;
}

export default function MobileNav({ activeSlug }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleMenu}
        className="sm:hidden fixed top-5 right-4 z-50 p-2 bg-transparent"
        aria-label="Toggle navigation menu"
      >
        <Image
          src={isOpen ? "/icons/cancel.svg" : "/icons/menu.svg"}
          alt={isOpen ? "Close Menu" : "Menu"}
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </button>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="sm:hidden fixed inset-y-0 left-0 w-80 bg-[var(--color-bc-beige)] shadow-lg transform transition-transform duration-300 ease-in-out z-40">
          <div className="sideColumn font-[family-name:var(--font-jetbrains-mono)] h-full">
            <div className="max-w-lg p-4">
              <NavigationalSidebar activeSlug={activeSlug} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
