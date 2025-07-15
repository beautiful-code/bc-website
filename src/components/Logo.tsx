import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export default function Logo({
  className = "mt-8 mb-8 cursor-pointer px-8 mx-auto sm:mx-0",
}: LogoProps) {
  return (
    <div className="text-center sm:text-left">
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
    </div>
  );
}
