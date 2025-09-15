"use client";

import PageTemplate from "@/Components/PageTemplate/PageTemplate";
import { SquaresFour } from "@phosphor-icons/react";

export default function Page() {
  return (
    <PageTemplate
      title="Overview"
      icon={SquaresFour}
      showDescription
      description="Get a comprehensive view of your recruitment data and insights."
      wipMode
    >
      {/* page content here */}
    </PageTemplate>
  );
}


