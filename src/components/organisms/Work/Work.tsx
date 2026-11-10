import { useTranslation } from "react-i18next";
import SectionLabel from "@/components/molecules/SectionLabel";
import ProjectShowcase from "@/components/molecules/ProjectShowcase";
import ScriptLabel from "@/components/atoms/ScriptLabel";
import Reveal from "@/components/Reveal";
import projects from "@/data/projects";

const Work = () => {
    const { t } = useTranslation();
    return (
        <section
            id="trabalho"
            aria-labelledby="work-title"
            className="bg-paper px-[var(--gut)] py-[var(--sec)]"
        >
            <Reveal>
                <SectionLabel index="03">{t("work.label")}</SectionLabel>
            </Reveal>
            <Reveal className="relative inline-block mb-[clamp(1rem,3vw,2rem)]">
                <ScriptLabel className="block ml-1 mb-[-0.2em]">
                    {t("work.script")}
                </ScriptLabel>
                <h2
                    id="work-title"
                    className="text-[clamp(2.5rem,1.5rem+5vw,6rem)] tracking-[-0.03em]"
                >
                    {t("work.title")}
                </h2>
            </Reveal>
            <Reveal as="p" className="max-w-[40ch] text-muted text-[0.95rem] mb-[clamp(1rem,3vw,2rem)]">
                {t("work.note")}
            </Reveal>

            <div className="divide-y divide-line">
                {projects.map((project) => (
                    <ProjectShowcase key={project.slug} project={project} />
                ))}
            </div>
        </section>
    );
};

export default Work;
