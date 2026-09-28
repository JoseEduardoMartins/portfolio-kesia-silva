import { Trans, useTranslation } from "react-i18next";
import SectionLabel from "@/components/molecules/SectionLabel";
import Highlight from "@/components/atoms/Highlight";
import Reveal from "@/components/Reveal";

const Paragraph = ({ k }: { k: string }) => (
    <p>
        <Trans i18nKey={k} components={{ s: <strong className="font-semibold" /> }} />
    </p>
);

const About = () => {
    const { t } = useTranslation();
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
                <Reveal
                    as="h2"
                    id="about-title"
                    className="text-[clamp(1.6rem,1.1rem+2.6vw,3.4rem)] font-medium leading-[1.14] tracking-[-0.025em] max-w-[20ch] mb-[clamp(2.5rem,6vw,4rem)]"
                >
                    <>
                        {t("about.leadPre")}
                        <Highlight>{t("about.leadHl")}</Highlight>
                        {t("about.leadPost")}
                    </>
                </Reveal>
                <Reveal className="grid grid-cols-3 gap-[clamp(1.5rem,4vw,3rem)] text-ink/80 border-t border-line pt-[clamp(1.5rem,4vw,2.5rem)] max-[820px]:grid-cols-1">
                    <Paragraph k="about.p1" />
                    <Paragraph k="about.p2" />
                    <Paragraph k="about.p3" />
                </Reveal>
            </div>
        </section>
    );
};

export default About;
