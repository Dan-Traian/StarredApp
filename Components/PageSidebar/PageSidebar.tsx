"use client";

import SidebarItem from "./SidebarItem";
import { House, Star, SquaresFour, User, Users, ChartBar } from "@phosphor-icons/react";


export default function PageSidebar() {
  return (
    <aside id="sidebar" className="w-[300px] h-full flex flex-col gap-2 p-2">
      <h1>Sidebar</h1>
      <SidebarItem href="/" label="Homepage" icon={House} />

      <SidebarItem href="/general/overview" label="Overview" icon={SquaresFour} />
      <SidebarItem href="/general/starred-ai" label="Starred AI" icon={Star} />

      -
      <SidebarItem href="/data-collection/candidate-journey" label="Candidate Journey" icon={Users} />
      <SidebarItem href="/data-collection/recruiter-journey" label="Recruiter Journey" icon={User} />

      -
      <SidebarItem href="/data-insights/candidate-experience" label="Candidate Experience" icon={ChartBar} />
      <SidebarItem href="/data-insights/quality-of-hire" label="Quality Of Hire" icon={ChartBar} />
      
    </aside>
  );
}
