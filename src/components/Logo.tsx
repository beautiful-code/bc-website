import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export default function Logo({
  className = "mt-8 mb-12 cursor-pointer px-8",
}: LogoProps) {
  return (
    <Link href="/">
      <Image
        src="/BCLogo.svg"
        alt="BeautifulCode Logo"
        width={300}
        height={58}
        priority
        className={className}
      />
    </Link>
  );
}
