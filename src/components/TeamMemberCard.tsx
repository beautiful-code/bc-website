import Image from "next/image";
import Link from "next/link";

interface TeamMemberCardProps {
  name: string;
  title: string;
  linkedin: string;
  image: string;
  focus: string;
}

export default function TeamMemberCard({
  name,
  title,
  linkedin,
  image,
  focus,
}: TeamMemberCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 mt-2">
          <div className="flex items-center gap-2 mb-2">
            <Link
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-bold text-gray-800 transition-colors"
            >
              <h3>{name}</h3>
            </Link>
            <Link
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Link>
          </div>
          <p className="text-gray-600 text-lg mb-3">{title}</p>
        </div>
        <div className="relative w-32 h-32 ml-4">
          <Image
            src={image}
            alt={`${name} profile picture`}
            fill
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      {focus && (
        <p className="text-base font-[family-name:var(--font-nunito-sans)]">
          <span className="font-semibold text-red-600">Applied AI Focus:</span>{" "}
          <span className="text-gray-700">{focus}</span>
        </p>
      )}
    </div>
  );
}
