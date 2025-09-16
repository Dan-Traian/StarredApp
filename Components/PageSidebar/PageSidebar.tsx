"use client";

import CompanyContextPicker from "./CompanyContextPicker";
import SidebarItem from "./SidebarItem";
import {
  House,
  GearIcon,
  SparkleIcon,
  AlignTopIcon,
  ChartLineIcon,
  UserCircleCheckIcon,
  QuestionIcon,
  ArrowLeft,
  User,
  Shield,
  Bell,
  Key,
  GridFourIcon,
  UsersFourIcon,
} from "@phosphor-icons/react";
import UserContextPicker from "./UserContextPicker";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/Components/base/Button";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

type SidebarRoute = {
  href: string;
  label: string;
  icon: PhosphorIcon;
  onClick?: () => void;
};

type SidebarGroup = {
  title: string;
  routes: SidebarRoute[];
};

type SidebarSection = {
  groups: SidebarGroup[];
  bottomRoutes?: SidebarRoute[];
};

const sidebarSections: Record<string, SidebarSection> = {
  dashboard: {
    groups: [
      {
        title: "",
        routes: [
          { href: "/general/overview", label: "Overview", icon: House },
          { href: "/general/starred-ai", label: "Starred AI", icon: SparkleIcon },
        ],
      },
      {
        title: "Collect feedback",
        routes: [
          { href: "/data-collection/candidate-journey", label: "Candidate Journey", icon: AlignTopIcon },
          { href: "/data-collection/recruiter-journey", label: "Recruiter Journey", icon: AlignTopIcon },
        ],
      },
      {
        title: "Data insights",
        routes: [
          { href: "/data-insights/candidate-experience", label: "Candidate Experience", icon: ChartLineIcon },
          { href: "/data-insights/quality-of-hire", label: "Quality Of Hire", icon: UserCircleCheckIcon },
        ],
      },
    ],
    bottomRoutes: [
      { href: "/help-center", label: "Help center", icon: QuestionIcon },
    ],
  },
  settings: {
    groups: [
      {
        title: "Account",
        routes: [
          { href: "/settings/profile", label: "Profile", icon: User },
          { href: "/settings/notifications", label: "Notifications", icon: Bell },
          { href: "/settings/security", label: "Security", icon: Shield },
        ],
      },
      {
        title: "Organization",
        routes: [
          { href: "/settings/team", label: "Team Management", icon: UsersFourIcon },
          { href: "/settings/packages", label: "Packages", icon: GridFourIcon },
          { href: "/settings/questions", label: "Questions", icon: QuestionIcon },
          { href: "/settings/api", label: "API Keys", icon: Key },
        ],
      },
    ],
    bottomRoutes: [
    ],
  },
};

function SidebarContent({ section, onBack }: { section: SidebarSection; onBack?: () => void }) {
  return (
    <>
      {onBack && (
        <div className="mt-4">
          <Button
            variant="ghost"
            size="sm"
            iconLeft={<ArrowLeft size={16} />}
            onClick={onBack}
            className="w-full justify-start"
          >
            Back
          </Button>
        </div>
      )}

      {section.groups.map((group, groupIndex) => (
        <div key={groupIndex} className="sidebar-group flex flex-col gap-2 mt-4">
          {group.title && (
            <p className="w-full ml-10 text-md text-gray-400 font-light">
              {group.title}
            </p>
          )}
          {group.routes.map((route, routeIndex) => (
            <SidebarItem
              key={routeIndex}
              href={route.href}
              label={route.label}
              icon={route.icon}
              onClick={route.onClick}
            />
          ))}
        </div>
      ))}

      {section.bottomRoutes && (
        <>
          <div className="my-auto"></div>
          {section.bottomRoutes.map((route, index) => (
            <SidebarItem
              key={index}
              href={route.href}
              label={route.label}
              icon={route.icon}
              onClick={route.onClick}
            />
          ))}
        </>
      )}
    </>
  );
}

export default function PageSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  
  // Determine current section based on route
  const getCurrentSection = (): 'dashboard' | 'settings' => {
    if (pathname.startsWith('/settings')) {
      return 'settings';
    }
    return 'dashboard';
  };

  const currentSection = getCurrentSection();

  // Add settings route to dashboard section
  const dashboardSection = {
    ...sidebarSections.dashboard,
    bottomRoutes: [
      ...(sidebarSections.dashboard.bottomRoutes || []),
      { href: "/settings/profile", label: "Settings", icon: GearIcon },
    ],
  };

  return (
    <aside id="sidebar" className="w-[300px] h-full flex flex-col gap-2 py-1">
      <CompanyContextPicker />

      <div className="sidebar-content w-full h-full relative overflow-hidden">
        <AnimatePresence mode="wait">
          {currentSection === 'dashboard' ? (
            <motion.section
              key="dashboard"
              initial={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="dashboard-content w-full h-full flex flex-col gap-2 absolute inset-0"
            >
              <SidebarContent section={dashboardSection} />
            </motion.section>
          ) : (
            <motion.section
              key="settings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="admin-settings w-full h-full flex flex-col gap-2 absolute inset-0"
            >
              <SidebarContent section={sidebarSections.settings} onBack={() => router.push('/general/overview')} />
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      <UserContextPicker></UserContextPicker>
    </aside>
  );
}
