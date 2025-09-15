type PageHeaderProps = {
  icon?: React.ElementType;
  title: string;
  showDescription?: boolean;
  description?: string;
};

export default function PageHeader({
  icon: Icon,
  title,
  showDescription = false,
  description,
}: PageHeaderProps) {
  return (
    <div className="header-content w-full flex gap-2 p-3">
      <div className="icon-holder pt-2">{Icon ? <Icon size={28} /> : null}</div>
      <div className="meta">
        <h1 className="header-1">{title}</h1>
        {showDescription && description ? (
          <p className="page-description">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
