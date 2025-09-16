"use client";

import PageTemplate from "@/Components/PageTemplate/PageTemplate";
import { GridFourIcon } from "@phosphor-icons/react";

export default function PackagesPage() {
  return (
    <PageTemplate
      title="Packages"
      icon={GridFourIcon}
      showDescription
      description="View and manage your subscription packages."
      wipMode
    >
      {/* page content here */}
    </PageTemplate>
  );
}
