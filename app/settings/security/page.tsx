"use client";

import PageTemplate from "@/Components/PageTemplate/PageTemplate";
import { Shield } from "@phosphor-icons/react";

export default function SecurityPage() {
  return (
    <PageTemplate
      title="Security Settings"
      icon={Shield}
      showDescription
      description="Manage your account security and privacy settings."
      wipMode
    >
      {/* page content here */}
    </PageTemplate>
  );
}
