"use client";

import PageTemplate from "@/Components/PageTemplate/PageTemplate";
import { Star } from "@phosphor-icons/react";

export default function Page() {
  return (
    <PageTemplate
      title="Starred AI"
      icon={Star}
      showDescription
      description="Your starred items and insights."
      wipMode
    >
      {/* page content here */}
    </PageTemplate>
  );
}


