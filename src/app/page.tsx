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
          <div className="logo-container">
            <h1 className="logo-title">
              <span className="logo-accent">///</span> BeautifulCode
            </h1>
            <p className="logo-tagline">Engineers Who Care About Engineering</p>
          </div>
        </div>

        <div className="mainColumn">
          <h2 className="section-header">WHAT WE ARE WIRED FOR</h2>
          <div className="expertise-list">
            {expertiseAreas.map((area) => {
              const IconComponent = area.icon;
              return (
                <div key={area.slug} className="expertise-item">
                  <div className="expertise-icon">
                    <IconComponent />
                  </div>
                  <div className="expertise-content">
                    <h3 className="expertise-title">{area.name}</h3>
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
