"use client";

import CompanyContextPicker from "./CompanyContextPicker";
import SidebarItem from "./SidebarItem";
import { House, User, Users, ChartBar, CaretDownIcon, GearIcon, QuestionMarkIcon, SparkleIcon } from "@phosphor-icons/react";


export default function PageSidebar() {
  return (
    <aside id="sidebar" className="w-[300px] h-full flex flex-col gap-2 py-1">

      <CompanyContextPicker/>

      <div className="mt-4"></div>

      <SidebarItem href="/general/overview" label="Overview" icon={House} />
      <SidebarItem href="/general/starred-ai" label="Starred AI" icon={SparkleIcon} />

      <div className="sidebar-group flex flex-col gap-2 mt-4">
        <p className="w-full ml-10 text-md text-gray-400 font-light">Collect feedback</p>
        <SidebarItem href="/data-collection/candidate-journey" label="Candidate Journey" icon={Users} />
        <SidebarItem href="/data-collection/recruiter-journey" label="Recruiter Journey" icon={User} />
      </div >


      <div className="sidebar-group flex flex-col gap-2 mt-4">
        <p className="w-full ml-10 text-md text-gray-400 font-light">Collect feedback</p>
        <SidebarItem href="/data-insights/candidate-experience" label="Candidate Experience" icon={ChartBar} />
      <SidebarItem href="/data-insights/quality-of-hire" label="Quality Of Hire" icon={ChartBar} />
      </div >
     
      -

      
      <div className="my-auto"></div>

      <SidebarItem href="/data-insights/quality-of-hire" label="Help center" icon={QuestionMarkIcon} />
      <SidebarItem href="/data-insights/quality-of-hire" label="Settings" icon={GearIcon} />

      <div className="user-context-picker flex items center gap-1 p-2 bg-white rounded-md">
        <img src="" alt="" />
        <p className="w-full text-ellipsis">TrustPilot</p>
        <CaretDownIcon size={18}></CaretDownIcon>
      </div>
    </aside>
  );
}
