import Image from "next/image";

type IconType = "expertise" | "principle";

interface CategoryIconProps {
  slug: string;
  name: string;
  type: IconType;
  className?: string;
  isActive?: boolean;
}

export default function CategoryIcon({
  slug,
  name,
  type,
  className = "",
  isActive = false,
}: CategoryIconProps) {
  const iconPath = `/icons/${type}/${slug}`;

  return (
    <div className={`relative ${className}`}>
      {/* Default icon */}
      <Image
        src={`${iconPath}.svg`}
        alt={`${name} icon`}
        width={32}
        height={32}
        className={`transition-opacity duration-300 ${
          isActive ? "opacity-0" : "group-hover:opacity-0"
        }`}
      />

      {/* Hover icon */}
      <Image
        src={`${iconPath}-hover.svg`}
        alt={`${name} hover icon`}
        width={32}
        height={32}
        className={`absolute inset-0 transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />
    </div>
  );
}
