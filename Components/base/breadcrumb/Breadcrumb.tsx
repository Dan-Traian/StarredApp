"use client";

import * as React from "react";

type BreadcrumbContextValue = {
  separator: React.ReactNode;
  homeHref?: string;
};

const BreadcrumbContext = React.createContext<BreadcrumbContextValue | null>(null);

export interface BreadcrumbProps {
  children: React.ReactNode;
  separator?: React.ReactNode;
  homeHref?: string;
  className?: string;
}

export function Breadcrumb({
  children,
  separator = "/",
  homeHref,
  className,
}: BreadcrumbProps) {
  return (
    <BreadcrumbContext.Provider value={{ separator, homeHref }}>
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex items-center gap-2">
          {children}
        </ol>
      </nav>
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumbContext() {
  const ctx = React.useContext(BreadcrumbContext);
  if (!ctx) return { separator: "/" } as BreadcrumbContextValue;
  return ctx;
}

export default Breadcrumb;


