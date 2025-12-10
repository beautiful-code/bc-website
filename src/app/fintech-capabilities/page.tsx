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
    <div className={`bg-white rounded-lg p-5 flex flex-col gap-3 cursor-default  ${className}`}>
      <div className="flex items-start gap-2">
        <h3 className="md:text-lg text-base font-bold leading-6 flex-1 transition-colors duration-300" style={{ color: "#F15671", fontFamily: "var(--font-jetbrains-mono)" }}>
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
      className="rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-start md:items-start gap-4 md:gap-9"
      style={{ backgroundColor }}
    >
      <div 
        className="flex items-center gap-1.5 px-3 py-8 rounded-xl w-full md:w-[270px] flex-shrink-0"
        // style={{ backgroundColor: "#FAFAFA" }}
      >
        <h2 
          className="text-xl md:text-2xl font-bold leading-tight"
          style={{ color: "#000000", fontFamily: "var(--font-jetbrains-mono)" }}
        >
          {title}
        </h2>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-9 w-full">
        {children}
      </div>
    </div>
  );
}

export default function FinTechCapabilitiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="w-full px-4 md:px-12 py-6 md:py-8" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
        {/* Header Area with Logo */}
        <div className="relative mb-8 md:mb-12">
          {/* Logo - Absolute positioned on left */}
          <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2">
            <Link href="/">
              <Image
                src="/BCLogo.svg"
                alt="BeautifulCode Logo"
                width={197.71}
                height={37.75}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                priority
              />
            </Link>
          </div>
          
          {/* Mobile Logo - Centered */}
          <div className="md:hidden flex justify-center mb-4">
            <Link href="/">
              <Image
                src="/BCLogo.svg"
                alt="BeautifulCode Logo"
                width={197.71}
                height={37.75}
                className="cursor-pointer hover:opacity-80 transition-opacity w-48 h-auto"
                priority
              />
            </Link>
          </div>
          
          {/* Title - Centered */}
          <h1 
            className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-center"
            style={{ color: "#E01236", fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Our FinTech Capabilities
          </h1>
        </div>

        {/* Sections Container */}
        <div className="flex flex-col gap-4 md:gap-1 w-full  mx-auto">
          {/* Payment Processing & Settlement */}
          <Section title="Payment Processing & Settlement" backgroundColor="#F9F9F9">
            <CapabilityBox
              icon="/icons/fintech/creditcard.svg"
              title="Multi-Rail Transaction Processing"
              description="Unified transaction processing for card networks & ACH"
              className="border border-transparent"
            />
            <CapabilityBox
              icon="/icons/fintech/settlement.svg"
              title="Settlement & Funds-Flow Workflows"
              description="Complex funds-flow logic supporting split payments, dynamic fee schedules, and multi-party disbursements."
              className="border border-transparent"
            />
            <CapabilityBox
              icon="/icons/fintech/dispute.svg"
              title="Dispute & Chargeback Lifecycle Management"
              description="End-to-end workflows handling chargeback lifecycle"
              className="border border-transparent"
            />
            <CapabilityBox
              icon="/icons/fintech/shield.svg"
              title="Dynamic Reserve Management"
              description="Handle rolling reserves, fixed holdbacks, and automated release logic."
              className="border border-transparent"
            />
            <CapabilityBox
              icon="/icons/fintech/radar.svg"
              title="Transaction Risk Management"
              description="Rule-driven decision engines that enforce transaction-level risk controls in real time"
              className="border border-transparent"
            />
          </Section>


          {/* Compliance & Integration */}
          <Section title="Compliance & Integration" backgroundColor="#FFFFFF">
            <CapabilityBox
              icon="/icons/fintech/pci.svg"
              title="PCI DSS Level-1 Implementation"
              description="Cloud-native environment that meet PCI DSS Level-1 standard."
              className="border border-[#EDEDED]"
            />
            <CapabilityBox
              icon="/icons/fintech/Key.svg"
              title="Card Holder Data Isolation"
              description="Zero-exposure payment environment using hosted fields/pages and secure vaulting."
              className="border border-[#EDEDED]"
            />
          </Section>


          {/* Platform & Integration */}
          <Section title="Platform & Integration" backgroundColor="#F9F9F9">
            <CapabilityBox
              icon="/icons/fintech/userplus.svg"
              title="Payment Facilitator Onboarding"
              description="Self-Service Onboarding flows for ISVs & Merchants."
              className="border border-transparent"
            />
            <CapabilityBox
              icon="/icons/fintech/agentic-systems-hover.svg"
              title="Automated Underwriting & Risk Evaluation"
              description="Real-time KYC underwriting by integrating with providers such as LexisNexis"
              className="border border-transparent"
            />
            <CapabilityBox
              icon="/icons/fintech/layers.svg"
              title="Multi-Tenant & Hierarchical Platform Modeling"
              description="Scalable PayFac data models that support complex entity hierarchies."
              className="border border-transparent"
            />
          </Section>

          {/* Orchestration & Connectivity */}
          <Section title="Orchestration & Connectivity" backgroundColor="#FFFFFF">
            <CapabilityBox
              icon="/icons/fintech/plug.svg"
              title="Payment Processor Integrations"
              description="Integrations with different payment processors ex: WorldPay, Payrix, ProPay"
              className="border border-[#EDEDED]"
            />
          </Section>
        </div>
      </main>
    </div>
  );
}
