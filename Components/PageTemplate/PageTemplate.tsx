import { SelectionBackgroundIcon } from "@phosphor-icons/react";
import PageHeader from "./PageHeader";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../base/Button";
import SelectInput from "../base/SelectInput";

type PageTemplateProps = {
  title: string;
  icon?: React.ElementType;
  showDescription?: boolean;
  description?: string;
  wipMode?: boolean;
  children?: React.ReactNode;
};

function WipPlaceholder() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-10 rounded-xl bg-gray-100 p-4 ">
      <SelectionBackgroundIcon
        weight="duotone"
        size={120}
      ></SelectionBackgroundIcon>
      <span className="font-semibold text-gray-600">Work in progress</span>
      <p className="mt-1 text-sm text-gray-600">
        This section is under construction. Check back soon.
      </p>
    </div>
  );
}

export default function PageTemplate({
  title,
  icon,
  showDescription = false,
  description,
  wipMode = false,
  children,
}: PageTemplateProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  function handleToggleFilters() {
    setIsFiltersOpen((prev) => !prev);
  }

  return (
    <div className="page w-full h-full flex flex-col gap-3 overflow-hidden relative">
      <PageHeader
        icon={icon}
        title={title}
        showDescription={showDescription}
        description={description}
        onToggleFilters={handleToggleFilters}
        isFiltersOpen={isFiltersOpen}
      />
      <AnimatePresence initial={false}>
        {isFiltersOpen ? (
          <motion.section
            key="filters"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-full overflow-hidden rounded-md bg-gray-100 border border-gray-200"
            aria-label="Filters"
          >
            <div className="flex items-stretch gap-3 p-4">
              <SelectInput id="status" className="h-9 w-72" defaultValue="">
                <option value="" disabled>
                  Select status
                </option>
                <option>Open</option>
                <option>In progress</option>
                <option>Closed</option>
              </SelectInput>
              <Button type="button" className="w-full md:w-auto">
                Add filter
              </Button>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>
      <div className="content w-full flex-1 flex flex-col gap-2 overflow-auto">
        {wipMode ? <WipPlaceholder /> : children}
      </div>
    </div>
  );
}
