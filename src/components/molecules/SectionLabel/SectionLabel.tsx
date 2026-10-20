import type { ReactNode } from "react";

interface SectionLabelProps {
    index: string;
    light?: boolean;
    children: ReactNode;
}

const SectionLabel = ({ index, light = false, children }: SectionLabelProps) => (
    <div
        className={`font-mono text-[0.78rem] uppercase tracking-[0.1em] flex items-center gap-[0.7rem] mb-[clamp(1.5rem,4vw,2.75rem)] ${light ? "text-paper/65" : "text-muted"}`}
    >
        <span
            className={`text-coral font-medium border rounded-full px-[0.6rem] py-[0.15rem] ${light ? "border-line-dark" : "border-line"}`}
        >
            {index}
        </span>
        {children}
    </div>
);

export default SectionLabel;
