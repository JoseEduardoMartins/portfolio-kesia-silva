import { useTranslation } from "react-i18next";

const rows = [
    ["hero.specFocusLabel", "hero.specFocusValue"],
    ["hero.specFormatsLabel", "hero.specFormatsValue"],
    ["hero.specProcessLabel", "hero.specProcessValue"],
] as const;

const HeroSpec = () => {
    const { t } = useTranslation();
    return (
        <dl className="flex flex-col gap-[0.9rem] m-0" aria-label="Especialidades">
            {rows.map(([label, value]) => (
                <div
                    key={label}
                    className="flex justify-between gap-4 border-t border-line-dark pt-[0.55rem]"
                >
                    <dt className="font-mono text-[0.72rem] uppercase tracking-[0.05em] text-muted">
                        {t(label)}
                    </dt>
                    <dd className="m-0 text-[0.9rem] text-right">{t(value)}</dd>
                </div>
            ))}
        </dl>
    );
};

export default HeroSpec;
