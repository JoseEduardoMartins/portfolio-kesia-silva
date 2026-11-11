import type { ReactNode } from "react";
import type { ButtonVariant, ButtonSize } from "@/types";

interface ButtonProps {
    href: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    target?: string;
    rel?: string;
    children: ReactNode;
}

const base =
    "inline-flex items-center gap-2 font-body font-medium rounded-full border border-transparent " +
    "cursor-pointer transition-[transform,background-color,color,border-color] duration-200 ease-brand " +
    "hover:-translate-y-0.5";

const sizes: Record<ButtonSize, string> = {
    md: "px-6 py-[0.85rem] text-[0.98rem]",
    lg: "px-[1.9rem] py-4 text-[1.05rem]",
};

const variants: Record<ButtonVariant, string> = {
    solid: "bg-coral text-ink hover:bg-[#D9BD84]",
    ghost: "border-coral text-coral hover:bg-coral hover:text-ink",
    outline: "border-line text-paper hover:border-coral hover:text-coral",
};

const Button = ({
    href,
    variant = "solid",
    size = "md",
    target,
    rel,
    children,
}: ButtonProps) => (
    <a
        href={href}
        target={target}
        rel={rel}
        className={`${base} ${sizes[size]} ${variants[variant]}`}
    >
        {children}
    </a>
);

export default Button;
