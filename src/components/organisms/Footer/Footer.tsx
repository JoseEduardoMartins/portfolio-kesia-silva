import { useTranslation } from "react-i18next";
import BrandMark from "@/components/atoms/BrandMark";
import useCurrentYear from "@/hooks/useCurrentYear";

const Footer = () => {
    const { t } = useTranslation();
    const year = useCurrentYear();
    return (
        <footer className="bg-ink text-paper/65 px-[var(--gut)] pt-8 pb-12 flex flex-wrap items-center gap-4 justify-between border-t border-line-dark text-[0.85rem]">
            <BrandMark variant="plain" />
            <p>
                © {year} {t("footer.copyright")}
            </p>
            <a href="#top" className="hover:text-paper">
                {t("footer.backToTop")}
            </a>
        </footer>
    );
};

export default Footer;
