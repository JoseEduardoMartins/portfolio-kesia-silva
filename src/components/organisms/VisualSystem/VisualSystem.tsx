import { useTranslation } from "react-i18next";
import SectionLabel from "@/components/molecules/SectionLabel";
import Swatches from "@/components/molecules/Swatches";
import Specimen from "@/components/molecules/Specimen";
import Composition from "@/components/molecules/Composition";
import SelectionFrame from "@/components/atoms/SelectionFrame";
import Reveal from "@/components/Reveal";

const tile =
    "relative m-0 p-6 border rounded-[1.1rem] min-h-[20rem] flex flex-col justify-between overflow-hidden transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-1";
const tag = "font-mono text-[0.7rem] tracking-[0.08em]";

const VisualSystem = () => {
    const { t } = useTranslation();
    return (
        <section
            id="trabalho"
            aria-labelledby="language-title"
            className="px-[var(--gut)] py-[var(--sec)] relative"
        >
            <Reveal>
                <SectionLabel index="03">{t("visualSystem.label")}</SectionLabel>
            </Reveal>
            <Reveal className="flex flex-wrap gap-x-8 gap-y-4 items-end justify-between mb-[clamp(2rem,5vw,3.5rem)]">
                <h2
                    id="language-title"
                    className="text-[clamp(2.25rem,1.5rem+3.4vw,4.75rem)] tracking-[-0.03em]"
                >
                    {t("visualSystem.title")}
                </h2>
                <p className="max-w-[34ch] text-muted text-[0.95rem]">
                    {t("visualSystem.note")}
                    <span className="block mt-[0.4rem] font-mono text-[0.75rem] text-teal">
                        {t("visualSystem.noteSwap")}
                    </span>
                </p>
            </Reveal>

            <div className="grid gap-[clamp(1rem,2vw,1.5rem)] grid-cols-4 max-[980px]:grid-cols-2 max-[520px]:grid-cols-1">
                <Reveal as="figure" className={`${tile} bg-coral text-paper border-coral`}>
                    <span className={`${tag} text-paper/75`}>
                        {t("visualSystem.markTag")}
                    </span>
                    <div className="font-display font-extrabold text-[clamp(5rem,12vw,8rem)] tracking-[-0.05em] leading-none self-center my-auto">
                        KS
                    </div>
                    <figcaption className="text-[0.85rem] font-medium text-paper/90">
                        {t("visualSystem.markCaption")}
                    </figcaption>
                </Reveal>

                <Reveal as="figure" className={`${tile} bg-ink border-ink`}>
                    <SelectionFrame light className="!inset-[0.6rem]" />
                    <span className={`${tag} text-paper/60`}>
                        {t("visualSystem.paletteTag")}
                    </span>
                    <Swatches />
                    <figcaption className="text-[0.85rem] font-medium text-paper/85">
                        {t("visualSystem.paletteCaption")}
                    </figcaption>
                </Reveal>

                <Reveal as="figure" className={`${tile} bg-paper`}>
                    <SelectionFrame className="!inset-[0.6rem]" />
                    <span className={`${tag} text-muted`}>
                        {t("visualSystem.typeTag")}
                    </span>
                    <Specimen />
                    <figcaption className="text-[0.85rem] font-medium text-ink">
                        {t("visualSystem.typeCaption")}
                    </figcaption>
                </Reveal>

                <Reveal
                    as="figure"
                    className={`${tile} bg-[linear-gradient(135deg,#9C8A79,#6F6052)] border-teal text-white`}
                >
                    <SelectionFrame light className="!inset-[0.6rem]" />
                    <span className={`${tag} text-white/80`}>
                        {t("visualSystem.compTag")}
                    </span>
                    <Composition />
                    <figcaption className="text-[0.85rem] font-medium text-white">
                        {t("visualSystem.compCaption")}
                    </figcaption>
                </Reveal>
            </div>
        </section>
    );
};

export default VisualSystem;
