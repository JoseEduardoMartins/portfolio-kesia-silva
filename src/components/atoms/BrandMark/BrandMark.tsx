interface BrandMarkProps {
    text?: string;
    /** "badge" = coral square (header); "plain" = coral text only (footer). */
    variant?: "badge" | "plain";
    className?: string;
}

const variants = {
    badge: "grid place-items-center w-[2rem] h-[2rem] border border-coral text-coral text-[0.85rem] rounded-[0.4rem]",
    plain: "text-coral text-[1.4rem]",
};

const BrandMark = ({ text = "KS", variant = "badge", className = "" }: BrandMarkProps) => (
    <span
        aria-hidden="true"
        className={`font-display ${variants[variant]} ${className}`}
    >
        {text}
    </span>
);

export default BrandMark;
