import Button from "../base/Button";
import { FunnelSimple as FunnelIcon } from "@phosphor-icons/react";

type PageHeaderProps = {
  icon?: React.ElementType;
  title: string;
  showDescription?: boolean;
  description?: string;
  showFilters?: boolean;
  onToggleFilters?: () => void;
  isFiltersOpen?: boolean;
};

export default function PageHeader({
  icon: Icon,
  title,
  showDescription = false,
  description,
  showFilters = false,
  onToggleFilters,
  isFiltersOpen = false,
}: PageHeaderProps) {
  return (
    <div className="header-content w-full flex items-start gap-4 p-3 sticky">
      {Icon && (
        <div className="icon-holder pt-2">
          <Icon size={32} />
        </div>
      )}

      <div className="meta flex-1">
        <h1 className="text-h1 text-gray-600 font-medium">{title}</h1>
        {showDescription && description ? (
          <p className="page-description text-md font-normal text-gray-600">{description}</p>
        ) : null}
      </div>

      {showFilters && (
        <Button
          type="button"
          onClick={onToggleFilters}
          aria-expanded={isFiltersOpen}
          iconRight={<FunnelIcon size={16} />}
        >
          Show filters
        </Button>
      )}
    </div>
  );
}