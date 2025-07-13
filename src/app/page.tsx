import {
  Monitor,
  Server,
  Brain,
  Shield,
  Database,
  Settings,
} from "lucide-react";
import Image from "next/image";
import "../styles/layout.scss";

export default function Home() {
  // Expertise areas matching the mock
  const expertiseAreas = [
    {
      name: "Frontend Engineering",
      slug: "frontend-engineering",
      icon: Monitor,
    },
    {
      name: "Backend Engineering",
      slug: "backend-engineering",
      icon: Server,
    },
    {
      name: "AI & Applied ML",
      slug: "ai-applied-ml",
      icon: Brain,
    },
    {
      name: "Infrastructure & Reliability",
      slug: "infrastructure-reliability",
      icon: Shield,
    },
    {
      name: "Data Engineering",
      slug: "data-engineering",
      icon: Database,
    },
    {
      name: "Software Maintenance",
      slug: "software-maintenance",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="two-column-layout">
        <div className="sideColumn">
          <div className="max-w-sm">
            <Image
              src="/BCLogo.svg"
              alt="BeautifulCode Logo"
              width={250}
              height={48}
              priority
              className="mb-4 mx-auto"
            />
            <p
              className="text-lg font-normal tracking-wide font-[family-name:var(--font-jetbrains-mono)] text-center"
              style={{ color: "var(--color-bc-text-gray)" }}
            >
              Engineers Who Care About Engineering
            </p>
          </div>
        </div>

        <div className="mainColumn font-[family-name:var(--font-jetbrains-mono)]">
          <div className="max-w-md mx-auto">
            <h2
              className="text-3xl font-bold tracking-wider uppercase mb-16 text-left"
              style={{ color: "var(--color-bc-red)" }}
            >
              WHAT WE ARE WIRED FOR
            </h2>
            <div className="space-y-8">
              {expertiseAreas.map((area) => {
                const IconComponent = area.icon;
                return (
                  <div
                    key={area.slug}
                    className="flex items-center space-x-6 rounded-lg cursor-pointer transition-all duration-300  group"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-48 h-48 text-slate-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl transition-colors duration-300 text-[var(--color-bc-text-black)] group-hover:text-[var(--color-bc-red)]">
                        {area.name}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
