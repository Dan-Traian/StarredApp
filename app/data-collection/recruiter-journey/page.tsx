"use client";

import PageTemplate from "@/Components/PageTemplate/PageTemplate";
import { AlignTopIcon } from "@phosphor-icons/react";

export default function Page() {
  return (
    <PageTemplate
      title="Recruiter Journey"
      icon={AlignTopIcon}
      showDescription
      description="Monitor and optimize the recruiter workflow and performance metrics."
      wipMode
    >
      {/* page content here */}
    </PageTemplate>
  );
}


