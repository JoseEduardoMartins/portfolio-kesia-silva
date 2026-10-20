import { createElement, type ReactNode } from "react";
import useReveal from "@/hooks/useReveal";

interface RevealProps {
    as?: keyof JSX.IntrinsicElements;
    className?: string;
    delay?: number;
    children: ReactNode;
    [key: string]: unknown;
}

const Reveal = ({ as = "div", className, delay, children, ...rest }: RevealProps) => {
    const ref = useReveal();
    return createElement(
        as,
        {
            ref,
            "data-reveal": "",
            className,
            style: delay ? { transitionDelay: `${delay}ms` } : undefined,
            ...rest,
        },
        children
    );
};

export default Reveal;
