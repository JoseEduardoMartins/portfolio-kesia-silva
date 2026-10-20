import type { NavItem } from "@/types";

const nav: NavItem[] = [
    { href: "#sobre", labelKey: "header.about" },
    { href: "#servicos", labelKey: "header.services" },
    { href: "#trabalho", labelKey: "header.language" },
    { href: "#trajetoria", labelKey: "header.journey" },
    { href: "#contato", labelKey: "header.contact", cta: true },
];

export default nav;
