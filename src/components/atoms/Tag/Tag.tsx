import type { ReactNode } from "react";

interface TagProps {
    children: ReactNode;
    className?: string;
}

const Tag = ({ children, className = "" }: TagProps) => (
    <span
        className={
            "font-mono text-[0.72rem] tracking-[0.04em] uppercase px-[0.7rem] py-[0.35rem] " +
            "border border-current rounded-full opacity-85 " +
            className
        }
    >
        {children}
    </span>
);

export default Tag;
