import Image from "next/image";

interface ExpertiseIconProps {
  slug: string;
  name: string;
  className?: string;
  isActive?: boolean;
}

export default function ExpertiseIcon({
  slug,
  name,
  className = "",
  isActive = false,
}: ExpertiseIconProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Default icon */}
      <Image
        src={`/icons/expertise/${slug}.svg`}
        alt={`${name} icon`}
        width={48}
        height={48}
        className={`transition-opacity duration-300 ${
          isActive ? "opacity-0" : "group-hover:opacity-0"
        }`}
      />

      {/* Hover icon */}
      <Image
        src={`/icons/expertise/${slug}-hover.svg`}
        alt={`${name} hover icon`}
        width={48}
        height={48}
        className={`absolute inset-0 transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />
    </div>
  );
}
