"use client";

import Image from "next/image";

interface TechIconProps {
  iconPath: string;
  techName: string;
  size?: "small" | "medium";
  showTooltip?: boolean;
  className?: string;
}

export default function TechIcon({
  iconPath,
  techName,
  size = "medium",
  showTooltip = false,
  className = "",
}: TechIconProps) {
  const sizeClasses =
    size === "small" ? "w-5 h-5 sm:w-6 sm:h-6" : "w-6 h-6 sm:w-8 sm:h-8";

  const dimension = size === "small" ? 24 : 32;

  return (
    <div
      className={`${sizeClasses} overflow-hidden ${
        showTooltip ? "relative group cursor-pointer" : ""
      } ${className}`}
      title={showTooltip ? techName : undefined}
    >
      <Image
        src={iconPath}
        alt={techName}
        width={dimension}
        height={dimension}
        onError={(e) => {
          e.currentTarget.src = "/icons/tech/generic.svg";
        }}
        className="w-full h-full object-cover"
      />
      {showTooltip && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          {techName}
        </span>
      )}
    </div>
  );
}
