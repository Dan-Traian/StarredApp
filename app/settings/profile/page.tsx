"use client";

import PageTemplate from "@/Components/PageTemplate/PageTemplate";
import { User } from "@phosphor-icons/react";

export default function ProfilePage() {
  return (
    <PageTemplate
      title="Profile Settings"
      icon={User}
      showDescription
      description="Manage your profile information and preferences."
      wipMode
    >
      {/* page content here */}
    </PageTemplate>
  );
}
