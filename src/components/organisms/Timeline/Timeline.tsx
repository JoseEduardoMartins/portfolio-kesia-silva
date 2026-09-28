import { useTranslation } from "react-i18next";
import SectionLabel from "@/components/molecules/SectionLabel";
import ExperienceEntry from "@/components/molecules/ExperienceEntry";
import CertCard from "@/components/molecules/CertCard";
import Chip from "@/components/atoms/Chip";
import Reveal from "@/components/Reveal";
import experiences from "@/data/experiences";
import certifications from "@/data/certifications";

const Timeline = () => {
    const { t } = useTranslation();
    const skills = t("timeline.skills", { returnObjects: true }) as string[];
    return (
        <section
            id="trajetoria"
            aria-labelledby="timeline-title"
            className="px-[var(--gut)] py-[var(--sec)] relative"
        >
            <Reveal>
                <SectionLabel index="04">{t("timeline.label")}</SectionLabel>
            </Reveal>
            <h2
                id="timeline-title"
                className="text-[clamp(2.25rem,1.5rem+3.4vw,4.75rem)] tracking-[-0.03em] mb-[clamp(2rem,5vw,3.5rem)]"
            >
                {t("timeline.title")}
            </h2>

            <div className="grid grid-cols-[1.4fr_1fr] gap-[clamp(2rem,6vw,5rem)] items-start max-[900px]:grid-cols-1">
                <ol
                    className="list-none m-0 p-0"
                    aria-label="Experiência profissional"
                >
                    {experiences.map((e) => (
                        <ExperienceEntry key={e.key} entryKey={e.key} />
                    ))}
                </ol>
                <ul
                    className="list-none m-0 p-0 flex flex-col gap-[0.8rem]"
                    aria-label="Cursos e certificações"
                >
                    {certifications.map((c) => (
                        <CertCard
                            key={c.id}
                            by={c.by}
                            titleKey={c.titleKey}
                            dateKey={c.dateKey}
                        />
                    ))}
                </ul>
            </div>

            <Reveal
                className="flex flex-wrap gap-[0.6rem] mt-[clamp(2.5rem,6vw,4rem)]"
                aria-label="Principais habilidades"
            >
                {skills.map((s) => (
                    <Chip key={s}>{s}</Chip>
                ))}
            </Reveal>
        </section>
    );
};

export default Timeline;
