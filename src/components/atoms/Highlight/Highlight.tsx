import type { ReactNode } from "react";

const Highlight = ({
    coral = false,
    children,
}: {
    coral?: boolean;
    children: ReactNode;
}) => <span className={coral ? "hl-coral" : "hl"}>{children}</span>;

export default Highlight;
