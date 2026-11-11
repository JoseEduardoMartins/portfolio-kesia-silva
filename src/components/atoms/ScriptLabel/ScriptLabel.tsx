import type { ReactNode } from "react";

interface ScriptLabelProps {
    children: ReactNode;
    className?: string;
}

/** Eyebrow decorativo em serifada itálica dourada. Oculto para leitores de tela. */
const ScriptLabel = ({ children, className = "" }: ScriptLabelProps) => (
    <span
        aria-hidden="true"
        className={
            "font-script italic text-coral leading-none text-[clamp(1.4rem,1rem+1.6vw,2.4rem)] " +
            className
        }
    >
        {children}
    </span>
);

export default ScriptLabel;
