import { useTranslation } from "react-i18next";
import BrandMark from "@/components/atoms/BrandMark";

const Brand = () => {
    const { t } = useTranslation();
    return (
        <a
            className="flex items-center gap-[0.6rem]"
            href="#top"
            aria-label={`${t("hero.firstName")} ${t("hero.lastName")} — início`}
        >
            <BrandMark />
            <span className="font-display font-bold text-[1.05rem] tracking-[-0.02em]">
                {t("hero.firstName")} {t("hero.lastName")}
            </span>
        </a>
    );
};

export default Brand;
