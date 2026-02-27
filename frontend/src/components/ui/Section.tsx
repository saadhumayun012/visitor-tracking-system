interface SectionProps {
    title: string;
    children: React.ReactNode;
}

export const Section = ({ title, children }: SectionProps) => {
    return (
        <section className="section-card">
            <h2 className="section-card-header">
                {title}
            </h2>
            <div className="section-card-body">
                {children}
            </div>
        </section>
    );
};