"use client";

import PageTemplate from "@/Components/PageTemplate/PageTemplate";
import { ChartBar } from "@phosphor-icons/react";

export default function Page() {
  return (
    <PageTemplate
      title="Quality of Hire"
      icon={ChartBar}
      showDescription
      description="Measure and analyze the quality and success of your hiring decisions."
      wipMode
    >
      {/* page content here */}
    </PageTemplate>
  );
}


