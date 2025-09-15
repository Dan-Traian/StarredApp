"use client";

import PageTemplate from "@/Components/PageTemplate/PageTemplate";
import { Users } from "@phosphor-icons/react";

export default function Page() {
  return (
    <PageTemplate
      title="Candidate Journey"
      icon={Users}
      showDescription
      description="Track and analyze the complete candidate experience from application to hire."
      wipMode
    >
      {/* page content here */}
    </PageTemplate>
  );
}


