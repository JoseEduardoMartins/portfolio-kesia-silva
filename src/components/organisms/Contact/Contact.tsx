import { useTranslation } from "react-i18next";
import SectionLabel from "@/components/molecules/SectionLabel";
import Highlight from "@/components/atoms/Highlight";
import Button from "@/components/atoms/Button";
import ScriptLabel from "@/components/atoms/ScriptLabel";
import Grain from "@/components/atoms/Grain";
import ContactFact from "@/components/molecules/ContactFact";
import Reveal from "@/components/Reveal";
import config from "@/config";
import contactFacts from "@/data/contactFacts";

const Contact = () => {
    const { t } = useTranslation();
    return (
        <section
            id="contato"
            aria-labelledby="contact-title"
            className="bg-ink text-paper text-center px-[var(--gut)] py-[var(--sec)] relative overflow-hidden"
        >
            <Grain />
            <Reveal>
                <SectionLabel index="05" light>
                    {t("contact.label")}
                </SectionLabel>
            </Reveal>
            <Reveal>
                <ScriptLabel className="inline-block mb-[-0.15em]">
                    {t("contact.script")}
                </ScriptLabel>
            </Reveal>
            <h2
                id="contact-title"
                className="text-[clamp(2.5rem,1.5rem+5vw,6.5rem)] tracking-[-0.03em] mx-auto mb-[clamp(1.25rem,3vw,2rem)] max-w-[16ch]"
            >
                {t("contact.titlePre")}
                <Highlight coral>{t("contact.titleHl")}</Highlight>
            </h2>
            <p className="max-w-[42ch] mx-auto mb-[clamp(2rem,5vw,3rem)] text-paper/80 text-[1.1rem]">
                {t("contact.lead")}
            </p>
            <div className="flex flex-wrap gap-[0.9rem] justify-center">
                <Button
                    href={`mailto:${config.email.address}`}
                    variant="solid"
                    size="lg"
                >
                    {t("contact.ctaEmail")}
                </Button>
                <Button
                    href={config.linkedin.url}
                    variant="outline"
                    size="lg"
                    target="_blank"
                    rel="noopener"
                >
                    {t("contact.ctaLinkedin")}
                </Button>
            </div>
            <ul className="list-none mx-auto mt-[clamp(3rem,7vw,5rem)] p-0 flex flex-wrap gap-x-12 gap-y-6 justify-center border-t border-line-dark pt-[clamp(2rem,5vw,3rem)] max-w-[60rem]">
                {contactFacts.map((f) => (
                    <ContactFact key={f.key} factKey={f.key} />
                ))}
            </ul>
        </section>
    );
};

export default Contact;
