import { useTranslation } from "react-i18next";
import SectionLabel from "@/components/molecules/SectionLabel";
import ScriptLabel from "@/components/atoms/ScriptLabel";
import SelectionFrame from "@/components/atoms/SelectionFrame";
import Grain from "@/components/atoms/Grain";
import Reveal from "@/components/Reveal";

const items = [
    { n: "01", href: "#sobre", k: "contents.items.sobre" },
    { n: "02", href: "#servicos", k: "contents.items.servicos" },
    { n: "03", href: "#trabalho", k: "contents.items.trabalho" },
    { n: "04", href: "#trajetoria", k: "contents.items.trajetoria" },
    { n: "05", href: "#contato", k: "contents.items.contato" },
];

const Contents = () => {
    const { t } = useTranslation();
    return (
        <section
            id="indice"
            aria-labelledby="contents-title"
            className="relative bg-ink text-paper px-[var(--gut)] py-[var(--sec)] overflow-hidden"
        >
            <Grain />
            <Reveal>
                <SectionLabel index="00" light>
                    {t("contents.label")}
                </SectionLabel>
            </Reveal>
            <Reveal className="relative inline-block mb-[clamp(2rem,5vw,3.5rem)]">
                <ScriptLabel className="block ml-1 mb-[-0.2em]">
                    {t("contents.script")}
                </ScriptLabel>
                <h2
                    id="contents-title"
                    className="text-[clamp(2.5rem,1.5rem+5vw,6rem)] tracking-[-0.03em]"
                >
                    {t("contents.title")}
                </h2>
                <SelectionFrame light />
            </Reveal>

            <ul className="relative list-none m-0 p-0 border-t border-line-dark">
                {items.map(({ n, href, k }) => (
                    <li key={href}>
                        <a
                            href={href}
                            className="group grid grid-cols-[auto_1fr_auto] items-center gap-[clamp(1rem,4vw,3rem)] border-b border-line-dark py-[clamp(1rem,2.5vw,1.75rem)] transition-colors duration-300 ease-brand hover:text-coral"
                        >
                            <span className="font-mono text-[0.9rem] text-paper/55 group-hover:text-coral">
                                {n}
                            </span>
                            <span className="font-display font-extrabold tracking-[-0.03em] leading-[1.02] text-[clamp(2rem,1rem+5vw,5rem)]">
                                {t(k)}
                            </span>
                            <span
                                aria-hidden="true"
                                className="text-paper/40 text-[clamp(1.5rem,3vw,2.5rem)] transition-transform duration-300 ease-brand group-hover:text-coral group-hover:translate-x-1"
                            >
                                ↗
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Contents;
