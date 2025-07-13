import {
  Monitor,
  Server,
  Brain,
  Shield,
  Database,
  Settings,
} from "lucide-react";
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
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              <span className="text-red-500">///</span> BeautifulCode
            </h1>
            <p className="text-lg text-slate-600 font-medium">
              Engineers Who Care About Engineering
            </p>
          </div>
        </div>

        <div className="mainColumn font-[family-name:var(--font-jetbrains-mono)]">
          <h2 className="text-red-500 text-2xl font-bold tracking-wider uppercase mb-12 text-center lg:text-left">
            WHAT WE ARE WIRED FOR
          </h2>
          <div className="space-y-8">
            {expertiseAreas.map((area) => {
              const IconComponent = area.icon;
              return (
                <div key={area.slug} className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-slate-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-slate-900">
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
  );
}
