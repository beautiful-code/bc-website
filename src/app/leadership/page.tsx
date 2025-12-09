import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MenuPage from "@/components/MenuPage";
import Breadcrumb from "@/components/ui/breadcrumb";
import TeamMemberCard from "@/components/TeamMemberCard";
import { getHomeBreadcrumb } from "@/lib/breadcrumb-utils";
import "../../styles/layout.scss";

interface TeamMember {
  name: string;
  title: string;
  linkedin: string;
  image: string;
  focus: string;
}

export default async function LeadershipPage() {
  const breadcrumbItems = [
    getHomeBreadcrumb(),
    {
      label: "Leadership",
      href: undefined,
    },
  ];

  // Load the leadership markdown file
  const filePath = path.join(
    process.cwd(),
    "content/bc-leadership-page-withoutai.md"
  );
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content } = matter(fileContents);

  // Parse team members from markdown content
  const teamMembers: TeamMember[] = [];
  const lines = content.split("\n");
  let currentMember: Partial<TeamMember> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("### ") && line !== "### The Team") {
      // Save previous member if exists
      if (currentMember.name) {
        teamMembers.push(currentMember as TeamMember);
      }

      // Start new member
      currentMember = {
        name: line.replace("### ", ""),
        image: `/images/team/${line
          .replace("### ", "")
          .toLowerCase()
          .replace(/\s+/g, "")}.jpg`, // Default image path
      };
    } else if (line.startsWith("**") && line.endsWith("**")) {
      currentMember.title = line.replace(/\*\*/g, "");
    } else if (line.startsWith("[LinkedIn]")) {
      const linkedinMatch = line.match(/\[LinkedIn\]\((.*?)\)/);
      if (linkedinMatch) {
        currentMember.linkedin = linkedinMatch[1];
      }
    } else if (line.startsWith("**Applied Focus:**")) {
      currentMember.focus = line.replace("**Applied Focus:**", "").trim();
    }
  }

  // Add the last member
  if (currentMember.name) {
    teamMembers.push(currentMember as TeamMember);
  }

  // Get the intro text
  const introMatch = content.match(/# Leadership\n\n(.*?)\n\n---/);
  const introText = introMatch ? introMatch[1] : "";

  return (
    <MenuPage activeSlug="leadership">
      <div className="px-4 sm:px-16">
        <div className="hidden sm:block mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-lg sm:text-2xl text-red-600 my-6">LEADERSHIP</h1>
          <p className="text-sm sm:text-lg text-gray-700 leading-relaxed max-w-4xl">
            {introText}
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={index}
                name={member.name}
                title={member.title}
                linkedin={member.linkedin}
                image={member.image}
                focus={member.focus}
              />
            ))}
          </div>
        </div>
      </div>
    </MenuPage>
  );
}
