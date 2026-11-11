import { useTranslation } from "react-i18next";
import Button from "@/components/atoms/Button";
import Grain from "@/components/atoms/Grain";
import Reveal from "@/components/Reveal";

// Entrada encadeada: o Hero está acima da dobra, então o observer dispara
// na montagem e os delays criam a cascata no carregamento.
const STEP = 90;

const Hero = () => {
    const { t } = useTranslation();
    return (
        <section
            aria-labelledby="hero-name"
            className="relative px-[var(--gut)] pt-[clamp(7rem,14vw,11rem)] pb-[clamp(4rem,9vw,7rem)] text-center overflow-hidden"
        >
            <Grain />
            <div className="relative mx-auto max-w-[62rem]">
                <Reveal
                    as="p"
                    delay={0}
                    className="font-mono text-[0.72rem] uppercase tracking-[0.35em] text-coral"
                >
                    {t("hero.kicker")}
                </Reveal>
                <Reveal
                    as="h1"
                    id="hero-name"
                    delay={STEP}
                    className="font-display mt-[clamp(1.2rem,3vw,2rem)] text-[clamp(3.4rem,10vw,8.5rem)] leading-[0.98]"
                >
                    {t("hero.firstName")}{" "}
                    <em className="italic text-coral">{t("hero.lastName")}</em>
                </Reveal>
                <Reveal
                    as="p"
                    delay={STEP * 2}
                    className="mt-[clamp(1rem,2vw,1.4rem)] text-muted text-[1.02rem] tracking-[0.01em]"
                >
                    {t("hero.subtitle")}
                </Reveal>
                <Reveal
                    as="p"
                    delay={STEP * 3}
                    className="mx-auto mt-[clamp(2rem,5vw,3rem)] max-w-[36ch] font-display italic text-[clamp(1.3rem,1rem+1.6vw,2rem)] leading-[1.45]"
                >
                    {t("hero.statementPre")}
                    <span className="text-coral">{t("hero.statementEm")}</span>
                    {t("hero.statementPost")}
                </Reveal>
                <Reveal
                    delay={STEP * 4}
                    className="mt-[clamp(2.2rem,5vw,3rem)] flex flex-wrap gap-[0.8rem] justify-center"
                >
                    <Button href="#contato" variant="solid">
                        {t("hero.ctaPrimary")}
                    </Button>
                    <Button href="#trabalho" variant="outline">
                        {t("hero.ctaSecondary")}
                    </Button>
                </Reveal>
            </div>
            <span
                aria-hidden="true"
                className="block mx-auto mt-[clamp(3rem,7vw,5rem)] w-px h-[3rem] bg-gradient-to-b from-coral to-transparent"
            />
        </section>
    );
};

export default Hero;
