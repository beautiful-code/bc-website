import Logo from "@/components/Logo";
import Link from "next/link";
import Image from "next/image";

export default function AdTechCapabilitiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full">
        {/* Header with Logo */}
        {/* <header className="w-full py-6 px-4 sm:px-8 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <Logo className="mt-0 mb-0" />
          </div>
        </header> */}

        {/* Main Content - Full Width, Centered */}
        <main className="w-full font-[family-name:var(--font-jetbrains-mono)]">
          <div className="w-full flex justify-center items-center py-2 px-2">
            {/* SVG Poster - Responsive */}
            <div className="w-full max-w-full">
              <Image
                src="/adtech-capabilities.svg"
                alt="AdTech Capabilities"
                width={1399}
                height={985}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </main>

        {/* Footer */}
        {/* <footer className="w-full py-8 px-4 sm:px-8 border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p
                className="text-sm"
                style={{ color: "var(--color-bc-text-gray)" }}
              >
                © {new Date().getFullYear()} BeautifulCode
              </p>
              <Link
                href="/"
                className="text-sm hover:text-[var(--color-bc-red)] transition-colors duration-300"
                style={{ color: "var(--color-bc-text-gray)" }}
              >
                Back to Home
              </Link>
            </div>
          </div>
        </footer> */}
      </div>
    </div>
  );
}

