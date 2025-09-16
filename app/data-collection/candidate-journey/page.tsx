"use client";

import PageTemplate from "@/Components/PageTemplate/PageTemplate";
import { AlignTopIcon } from "@phosphor-icons/react";

export default function Page() {
  return (
    <PageTemplate
      title="Candidate Journey"
      icon={AlignTopIcon}
      showDescription
      description="Track and analyze the complete candidate experience from application to hire."
      wipMode
    >
      {/* page content here */}
    </PageTemplate>
  );
}


