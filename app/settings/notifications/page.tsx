"use client";

import PageTemplate from "@/Components/PageTemplate/PageTemplate";
import { Bell } from "@phosphor-icons/react";

export default function NotificationsPage() {
  return (
    <PageTemplate
      title="Notification Settings"
      icon={Bell}
      showDescription
      description="Configure your notification preferences."
      wipMode
    >
      {/* page content here */}
    </PageTemplate>
  );
}
