import { useTranslation } from "react-i18next";

const ExperienceEntry = ({ entryKey }: { entryKey: string }) => {
    const { t } = useTranslation();
    const base = `timeline.experiences.${entryKey}`;
    return (
        <li className="grid grid-cols-[minmax(9rem,auto)_1fr] gap-6 py-7 border-t border-line last:border-b max-[520px]:grid-cols-1 max-[520px]:gap-2">
            <div className="font-mono text-[0.8rem] text-coral pt-[0.35rem]">
                {t(`${base}.when`)}
            </div>
            <div>
                <h3 className="text-[1.5rem] mb-[0.3rem]">{t(`${base}.role`)}</h3>
                <p className="text-[0.9rem] text-muted mb-[0.7rem]">
                    {t(`${base}.org`)}
                </p>
                <p className="text-[0.95rem] text-ink/80">{t(`${base}.description`)}</p>
            </div>
        </li>
    );
};

export default ExperienceEntry;
