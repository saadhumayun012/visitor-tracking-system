interface SectionProps {
    title: string;
    children: React.ReactNode;
}

export const Section = ({ title, children }: SectionProps) => {
    return (
        <section className="flex flex-col gap-2 border-b pb-4">
            <h2 className="text-sm font-semibold text-back uppercase">
                {title}
            </h2>
            <div className="flex gap-4">
                {children}
            </div>
        </section>
    );
};