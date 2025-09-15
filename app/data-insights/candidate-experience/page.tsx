"use client";

import PageTemplate from "@/Components/PageTemplate/PageTemplate";
import { ChartBar } from "@phosphor-icons/react";

export default function Page() {
  return (
    <PageTemplate
      title="Candidate Experience"
      icon={ChartBar}
      showDescription
      description="Analyze candidate satisfaction and experience metrics throughout the hiring process."
      wipMode
    >
      {/* page content here */}
    </PageTemplate>
  );
}


