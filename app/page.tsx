"use client";

import PageTemplate from "@/Components/PageTemplate/PageTemplate";
import { House } from "@phosphor-icons/react";

export default function Home() {
  return (
    <PageTemplate
      title="Home"
      icon={House}
      showDescription
      description="Welcome to the homepage. This content is wrapped by the global layout."
    >
      {/* page content here */}
    </PageTemplate>
  );
}
