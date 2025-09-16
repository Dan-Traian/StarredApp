"use client";

import CompanyContextPicker from "./CompanyContextPicker";
import SidebarItem from "./SidebarItem";
import { House, GearIcon, SparkleIcon, AlignTopIcon, ChartLineIcon, UserCircleCheckIcon, QuestionIcon } from "@phosphor-icons/react";
import UserContextPicker from "./UserContextPicker";


export default function PageSidebar() {
  return (
    <aside id="sidebar" className="w-[300px] h-full flex flex-col gap-2 py-1">

      <CompanyContextPicker/>

      <div className="mt-4"></div>

      <SidebarItem href="/general/overview" label="Overview" icon={House} />
      <SidebarItem href="/general/starred-ai" label="Starred AI" icon={SparkleIcon} />

      <div className="sidebar-group flex flex-col gap-2 mt-4">
        <p className="w-full ml-10 text-md text-gray-400 font-light">Collect feedback</p>
        <SidebarItem href="/data-collection/candidate-journey" label="Candidate Journey" icon={AlignTopIcon} />
        <SidebarItem href="/data-collection/recruiter-journey" label="Recruiter Journey" icon={AlignTopIcon} />
      </div >

      <div className="sidebar-group flex flex-col gap-2 mt-4">
        <p className="w-full ml-10 text-md text-gray-400 font-light">Collect feedback</p>
        <SidebarItem href="/data-insights/candidate-experience" label="Candidate Experience" icon={ChartLineIcon} />
      <SidebarItem href="/data-insights/quality-of-hire" label="Quality Of Hire" icon={UserCircleCheckIcon} />
      </div >
     
      <div className="my-auto"></div>

      <SidebarItem href="/help-center" label="Help center" icon={QuestionIcon} />
      <SidebarItem href="/settings" label="Settings" icon={GearIcon} />

      <UserContextPicker></UserContextPicker>
    </aside>
  );
}
