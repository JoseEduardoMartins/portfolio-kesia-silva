import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const Marquee = () => {
    const { t } = useTranslation();
    const terms = t("hero.marquee", { returnObjects: true }) as string[];
    // Two copies so the -50% translate loops seamlessly.
    const loop = [...terms, ...terms];

    return (
        <div
            aria-hidden="true"
            className="relative border-t border-line-dark py-[1.1rem] -mx-[var(--gut)] overflow-hidden marquee-mask"
        >
            <div className="inline-flex items-center gap-8 whitespace-nowrap font-display font-semibold text-[clamp(1rem,2.2vw,1.6rem)] animate-marquee">
                {loop.map((term, i) => (
                    <Fragment key={i}>
                        <span>{term}</span>
                        <span className="text-coral">◦</span>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
