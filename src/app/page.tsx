import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  // Placeholder expertise areas
  const expertiseAreas = [
    { name: "Frontend Engineering", slug: "frontend-engineering" },
    { name: "Backend Engineering", slug: "backend-engineering" },
    { name: "DevOps & Infrastructure", slug: "devops" },
    { name: "Mobile Development", slug: "mobile" },
    { name: "Data Engineering", slug: "data-engineering" },
    { name: "AI & Machine Learning", slug: "ai-ml" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 min-h-screen">
          {/* Left column - Company logo */}
          <div className="md:col-span-1 flex items-center justify-center">
            <Card className="w-full max-w-sm">
              <CardContent className="p-8 text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">BC</span>
                  </div>
                  <h1 className="text-2xl font-bold text-foreground">
                    BeautifulCode
                  </h1>
                  <p className="text-sm text-muted-foreground mt-2">
                    Product Engineering Services
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Expertise areas */}
          <div className="md:col-span-3">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold mb-2 text-foreground">
                Our Expertise
              </h2>
              <p className="text-muted-foreground mb-8">
                We specialize in multiple areas of product engineering with deep
                technical expertise.
              </p>

              <div className="space-y-6">
                {expertiseAreas.map((area, index) => (
                  <div key={area.slug}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {area.name}
                        </h3>
                        <p className="text-muted-foreground">
                          Coming soon - Articles and insights on{" "}
                          {area.name.toLowerCase()}
                        </p>
                      </CardContent>
                    </Card>
                    {index < expertiseAreas.length - 1 && (
                      <Separator className="my-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
