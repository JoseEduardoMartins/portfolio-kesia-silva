import { useTranslation } from "react-i18next";

const Specimen = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col gap-4 my-auto">
            <span className="font-display font-extrabold text-[clamp(4.5rem,11vw,7rem)] leading-[0.85] text-ink">
                Aa
            </span>
            <div className="flex flex-col gap-[0.2rem]">
                <span className="font-display font-bold text-[1.4rem]">
                    {t("visualSystem.specimenTitle")}
                </span>
                <span className="font-display font-medium text-[1.05rem] text-coral">
                    {t("visualSystem.specimenSubtitle")}
                </span>
                <span className="font-mono text-[0.78rem] text-muted">
                    {t("visualSystem.specimenBody")}
                </span>
            </div>
        </div>
    );
};

export default Specimen;
