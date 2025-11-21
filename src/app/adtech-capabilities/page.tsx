import Link from "next/link";
import Image from "next/image";

interface CapabilityBoxProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

function CapabilityBox({ icon, title, description, className = "" }: CapabilityBoxProps) {
  return (
    <div className={`bg-white rounded-lg p-5 flex flex-col gap-3 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.001] hover:-translate-y-1 cursor-pointer ${className}`}>
      <div className="flex items-start gap-2">
        <h3 className="text-lg font-bold leading-6 flex-1 transition-colors duration-300" style={{ color: "#F15671", fontFamily: "var(--font-jetbrains-mono)" }}>
          {title}
        </h3>
        <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center transition-transform duration-300 group-hover:rotate-6">
          <Image 
            src={icon} 
            alt={title} 
            width={28} 
            height={28}
            className="w-full h-full object-contain transition-all duration-300"
          />
        </div>
      </div>
      <p className="text-base leading-snug transition-colors duration-300" style={{ fontFamily: "Nunito Sans, sans-serif", color: "#000000" }}>
        {description}
      </p>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  backgroundColor?: string;
}

function Section({ title, children, backgroundColor = "#F9F9F9" }: SectionProps) {
  return (
    <div 
      className="rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-9"
      style={{ backgroundColor }}
    >
      <div 
        className="flex items-center gap-1.5 px-3 py-3 rounded-xl whitespace-nowrap w-full md:w-[302px] flex-shrink-0"
        // style={{ backgroundColor: "#FAFAFA" }}
      >
        <h2 
          className="text-lg md:text-[22px] font-bold leading-none"
          style={{ color: "#000000", fontFamily: "var(--font-jetbrains-mono)" }}
        >
          {title}
        </h2>
      </div>
      <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-9 w-full items-stretch">
        {children}
      </div>
    </div>
  );
}

export default function AdTechCapabilitiesPage() {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Logo - Top Left */}
      <Link href="/" className="absolute top-4 left-4 md:top-6 md:left-7 z-10">
        <Image
          src="/BCLogo.svg"
          alt="BeautifulCode Logo"
          width={197.71}
          height={37.75}
          className="cursor-pointer hover:opacity-80 transition-opacity w-32 md:w-auto h-auto"
          priority
        />
      </Link>

      {/* Main Content */}
      <main className="w-full px-4 md:px-12 lg:px-20 py-24 " style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
        {/* Title */}
        <h1 
          className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-center mb-6 md:mb-8"
          style={{ color: "#E01236", fontFamily: "var(--font-jetbrains-mono)" }}
        >
          Our AdTech Capabilities
        </h1>

        {/* Sections Container */}
        <div className="flex flex-col gap-4 md:gap-6 max-w-[1259px] mx-auto">
          {/* Integration Layer */}
          <Section title="Integration Layer" backgroundColor="#F9F9F9">
            <CapabilityBox
              icon="/icons/adtech/plug.svg"
              title="Cross-Platform DSP Integration"
              description="Integrations with CM360, DV360, Meta, GoogleAds, etc"
              className="flex-1 border border-transparent"
            />
            <CapabilityBox
              icon="/icons/adtech/high.svg"
              title="High-Throughput Pixel Processing"
              description="Scale real-time pipelines to process 100M+ pixel events daily"
              className="flex-1 border border-transparent"
            />
            <CapabilityBox
              icon="/icons/adtech/machine-learning.svg"
              title="Complex Partner Data Integration"
              description="Engineer format-agnostic pipelines via SFTP, S3, APIs for unified warehousing"
              className="w-full md:w-[267px] border border-transparent"
            />
          </Section>

          {/* Operational Core */}
          <Section title="Operational Core" backgroundColor="#FFFFFF">
            <CapabilityBox
              icon="/icons/adtech/identity.svg"
              title="Identity Graph Management"
              description="Stitch fragmented identities using deterministic and probabilistic matching across devices"
              className="flex-1 border border-[#EDEDED]"
            />
            <CapabilityBox
              icon="/icons/adtech/video-icon.svg"
              title="Unified Creative Management"
              description="Orchestrate creative assets across DSPs through unified workflow systems"
              className="flex-1 border border-[#EDEDED]"
            />
            <CapabilityBox
              icon="/icons/adtech/megaphone.svg"
              title="Unified Campaign Management"
              description="Launch and manage campaigns across multiple DSPs from single interface"
              className="flex-1 border border-[#EDEDED]"
            />
          </Section>

          {/* Intelligence Layer */}
          <Section title="Intelligence Layer" backgroundColor="#F9F9F9">
            <CapabilityBox
              icon="/icons/adtech/security.svg"
              title="Privacy-Safe Audience Activation"
              description="Build hashed-ID pipelines for cookieless targeting with MAID, ID5, UID2.0"
              className="w-full md:w-[267px] border border-transparent"
            />
            <CapabilityBox
              icon="/icons/adtech/ai-bot.svg"
              title="ML-Driven Campaign Optimization"
              description="Automate budget, bid, and impression optimization using ML model pipelines"
              className="flex-1 border border-transparent"
            />
            <CapabilityBox
              icon="/icons/adtech/graph.svg"
              title="Campaign Performance Visualization"
              description="Engineer high-performance AI-powered dashboards for real-time campaign analytics"
              className="w-full md:w-[267px] border border-transparent"
            />
          </Section>

          {/* User Experience Layer */}
          <Section title="User Experience Layer" backgroundColor="#FFFFFF">
            <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-9 justify-center w-full">
              <CapabilityBox
                icon="/icons/adtech/frontend.svg"
                title="Full-Stack Advertiser Portals"
                description="Build self-service apps for performance tracking, bookings, and payments"
                className="w-full md:w-[267px] border border-[#EDEDED]"
              />
              <CapabilityBox
                icon="/icons/adtech/fine-tuning.svg"
                title="AdOps Workflow Builder"
                description="Create configurable workflows to standardize processes and reduce manual effort"
                className="w-full md:w-[267px] border border-[#EDEDED]"
              />
            </div>
          </Section>
        </div>
      </main>
    </div>
  );
}

