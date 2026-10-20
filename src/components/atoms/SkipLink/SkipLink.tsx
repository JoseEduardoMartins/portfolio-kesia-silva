import type { ReactNode } from "react";

const SkipLink = ({
    href = "#sobre",
    children,
}: {
    href?: string;
    children: ReactNode;
}) => (
    <a className="skip-link" href={href}>
        {children}
    </a>
);

export default SkipLink;
