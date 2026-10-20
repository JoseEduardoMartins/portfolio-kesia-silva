interface BrandMarkProps {
    text?: string;
    /** "badge" = coral square (header); "plain" = coral text only (footer). */
    variant?: "badge" | "plain";
    className?: string;
}

const variants = {
    badge: "grid place-items-center w-[2.1rem] h-[2.1rem] bg-coral text-paper text-[0.9rem] rounded-[0.55rem]",
    plain: "text-coral text-[1.4rem] tracking-[-0.04em]",
};

const BrandMark = ({ text = "KS", variant = "badge", className = "" }: BrandMarkProps) => (
    <span
        aria-hidden="true"
        className={`font-display font-extrabold tracking-[-0.03em] ${variants[variant]} ${className}`}
    >
        {text}
    </span>
);

export default BrandMark;
