"use client";

import PageTemplate from "@/Components/PageTemplate/PageTemplate";
import { UsersFourIcon } from "@phosphor-icons/react";

export default function TeamPage() {
  return (
    <PageTemplate
      title="Team Management"
      icon={UsersFourIcon}
      showDescription
      description="Manage your team members and their permissions."
      wipMode
    >
      {/* page content here */}
    </PageTemplate>
  );
}
