"use client";

import KPICard from "@/Components/Cards/KPI-card";
import PageTemplate from "@/Components/PageTemplate/PageTemplate";
import {
  ChartBar,
  HardDrivesIcon,
  MapTrifoldIcon,
} from "@phosphor-icons/react";

export default function Page() {
  return (
    <PageTemplate
      title="Candidate Experience"
      icon={ChartBar}
      showDescription
      description="Analyze candidate satisfaction and experience metrics throughout the hiring process."
    >
      <div className="section flex gap-2 w-full">
        <KPICard
          title="Starred index"
          showAIContext
          icon={HardDrivesIcon}
        ></KPICard>
        <KPICard
          title="cNPS (Candidate NPS)"
          icon={HardDrivesIcon}
          showAIContext
        ></KPICard>
      </div>
      <KPICard
        title="Drivers & Subdrivers metrics"
        showAIContext
        icon={HardDrivesIcon}
      ></KPICard>
      <KPICard
        title="Priority matrix"
        description="Subdriver Importance vs. Current Performance"
        showAIContext
        icon={MapTrifoldIcon}
      ></KPICard>
      <KPICard
        title="Priority matrix"
        description="Individual recruiter performance across cNPS and candidate experience drivers. Sorted by cNPS performance (highest first)."
        showAIContext
        icon={MapTrifoldIcon}
      ></KPICard>
    </PageTemplate>
  );
}
