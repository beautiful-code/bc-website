"use client";

import { useState } from "react";
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
        className="sm:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-md shadow-lg border border-gray-200"
        aria-label="Toggle navigation menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span
            className={`block w-5 h-0.5 bg-gray-800 transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-1" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-800 transition-opacity duration-300 mt-1 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-800 transition-transform duration-300 mt-1 ${
              isOpen ? "-rotate-45 -translate-y-1" : ""
            }`}
          />
        </div>
      </button>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div
          className="sm:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleMenu}
        >
          <div
            className="fixed inset-y-0 left-0 w-80 bg-[var(--color-bc-beige)] shadow-lg transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sideColumn font-[family-name:var(--font-jetbrains-mono)] h-full">
              <div className="max-w-lg p-4">
                <Logo />
                <NavigationalSidebar activeSlug={activeSlug} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
