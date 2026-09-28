import { useTranslation } from "react-i18next";
import nav from "@/data/nav";

const NavLinks = () => {
    const { t } = useTranslation();
    return (
        <nav
            className="flex items-center gap-[clamp(0.9rem,2vw,1.75rem)]"
            aria-label="Navegação principal"
        >
            {nav.map((item) =>
                item.cta ? (
                    <a
                        key={item.href}
                        href={item.href}
                        className="text-ink font-medium border border-ink rounded-full px-4 py-[0.4rem] transition-[background-color,color] duration-200 ease-brand hover:bg-ink hover:text-paper"
                    >
                        {t(item.labelKey)}
                    </a>
                ) : (
                    <a
                        key={item.href}
                        href={item.href}
                        className="text-[0.9rem] text-muted transition-colors duration-200 ease-brand hover:text-ink max-[720px]:hidden"
                    >
                        {t(item.labelKey)}
                    </a>
                )
            )}
        </nav>
    );
};

export default NavLinks;
