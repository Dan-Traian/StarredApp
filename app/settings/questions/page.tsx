"use client";

import PageTemplate from "@/Components/PageTemplate/PageTemplate";
import { QuestionIcon } from "@phosphor-icons/react";

export default function QuestionsPage() {
  return (
    <PageTemplate
      title="Questions"
      icon={QuestionIcon}
      showDescription
      description="Manage your custom questions and templates."
      wipMode
    >
      {/* page content here */}
    </PageTemplate>
  );
}
