import { Trans, useTranslation } from "react-i18next";
import SectionLabel from "@/components/molecules/SectionLabel";
import Highlight from "@/components/atoms/Highlight";
import ScriptLabel from "@/components/atoms/ScriptLabel";
import Reveal from "@/components/Reveal";
import useReveal from "@/hooks/useReveal";

const Paragraph = ({ k }: { k: string }) => (
    <p>
        <Trans i18nKey={k} components={{ s: <strong className="font-semibold" /> }} />
    </p>
);

const About = () => {
    const { t } = useTranslation();
    const paragraphsRef = useReveal<HTMLDivElement>();
    return (
        <section
            id="sobre"
            aria-labelledby="about-title"
            className="px-[var(--gut)] py-[var(--sec)] relative"
        >
            <Reveal>
                <SectionLabel index="01">{t("about.label")}</SectionLabel>
            </Reveal>
            <div>
                <div className="grid grid-cols-[1.5fr_1fr] gap-[clamp(1.5rem,5vw,4rem)] items-end mb-[clamp(2.5rem,6vw,4rem)] max-[820px]:grid-cols-1 max-[820px]:items-start">
                    <div>
                        <Reveal>
                            <ScriptLabel className="block ml-1 mb-[-0.1em]">
                                {t("about.script")}
                            </ScriptLabel>
                        </Reveal>
                        <Reveal
                            as="h2"
                            id="about-title"
                            delay={90}
                            className="text-[clamp(1.6rem,1.1rem+2.6vw,3.4rem)] font-medium leading-[1.14] tracking-[-0.025em] max-w-[20ch]"
                        >
                            <>
                                {t("about.leadPre")}
                                <Highlight>{t("about.leadHl")}</Highlight>
                                {t("about.leadPost")}
                            </>
                        </Reveal>
                    </div>
                    <Reveal
                        delay={150}
                        className="relative aspect-[4/5] min-h-[14rem] rounded-[1rem] border border-line bg-ink-80 flex items-end p-5 max-[820px]:max-w-[22rem]"
                    >
                        <span className="relative font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted">
                            {t("about.portraitReserved")}
                        </span>
                    </Reveal>
                </div>
                <div
                    ref={paragraphsRef}
                    data-stagger
                    className="grid grid-cols-3 gap-[clamp(1.5rem,4vw,3rem)] text-paper/80 border-t border-line pt-[clamp(1.5rem,4vw,2.5rem)] max-[820px]:grid-cols-1"
                >
                    <Paragraph k="about.p1" />
                    <Paragraph k="about.p2" />
                    <Paragraph k="about.p3" />
                </div>
            </div>
        </section>
    );
};

export default About;
