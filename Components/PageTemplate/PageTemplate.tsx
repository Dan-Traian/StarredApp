import PageHeader from "./PageHeader";

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
        <div className="w-full h-full flex flex-col items-center justify-center py-10rounded-sm border border-gray-200 bg-gray-50 p-4 text-gray-600">
            <div className="flex items-center gap-2">
                <span className="font-semibold">Work in progress</span>
            </div>
            <p className="mt-1 text-sm">This section is under construction. Check back soon.</p>
        </div>
    );
}

export default function PageTemplate({ title, icon, showDescription = false, description, wipMode = false, children }: PageTemplateProps) {
    return (
     <div className="page w-full h-full flex flex-col">
        <PageHeader icon={icon} title={title} showDescription={showDescription} description={description} />

        <div className="content w-full flex flex-col h-full overflow-scroll">
            {wipMode ? <WipPlaceholder /> : children}
        </div>
     </div>
    );
}
