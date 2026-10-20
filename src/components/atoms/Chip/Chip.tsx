import type { ReactNode } from "react";

const Chip = ({ children }: { children: ReactNode }) => (
    <span className="text-[0.88rem] px-[1.05rem] py-2 border border-line rounded-full transition-[background-color,color,border-color] duration-200 ease-brand hover:bg-teal hover:border-teal hover:text-paper">
        {children}
    </span>
);

export default Chip;
