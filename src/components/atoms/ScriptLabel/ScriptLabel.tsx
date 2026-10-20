import type { ReactNode } from "react";

interface ScriptLabelProps {
    children: ReactNode;
    className?: string;
}

/** Eyebrow manuscrito decorativo (font-script). Oculto para leitores de tela. */
const ScriptLabel = ({ children, className = "" }: ScriptLabelProps) => (
    <span
        aria-hidden="true"
        className={
            "font-script text-coral leading-none text-[clamp(1.75rem,1.2rem+2vw,3rem)] " +
            className
        }
    >
        {children}
    </span>
);

export default ScriptLabel;
