"use client";

import PageTemplate from "@/Components/PageTemplate/PageTemplate";
import { Key } from "@phosphor-icons/react";

export default function ApiPage() {
  return (
    <PageTemplate
      title="API Keys"
      icon={Key}
      showDescription
      description="Manage your API keys and integrations."
      wipMode
    >
      {/* page content here */}
    </PageTemplate>
  );
}
