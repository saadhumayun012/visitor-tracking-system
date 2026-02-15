interface SectionProps {
    title: string;
    children: React.ReactNode;
}

export const Section = ({ title, children }: SectionProps) => {
    return (
        <section className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-gray-600 uppercase">
                {title}
            </h2>
            <div className="flex gap-4">
                {children}
            </div>
        </section>
    );
};