import { useTranslation } from "react-i18next";
import Tag from "@/components/atoms/Tag";
import HeroSpec from "@/components/molecules/HeroSpec";
import Button from "@/components/atoms/Button";
import Marquee from "@/components/molecules/Marquee";

const Hero = () => {
    const { t } = useTranslation();
    return (
        <section
            aria-labelledby="hero-name"
            className="relative bg-ink text-paper px-[var(--gut)] pt-[clamp(3rem,8vw,6rem)] min-h-[92vh] flex flex-col justify-between overflow-hidden"
        >
            <div className="hero-grid" aria-hidden="true" />

            <div className="relative flex flex-wrap gap-[0.6rem] text-paper [&>*]:opacity-75">
                <Tag>{t("hero.tagRole")}</Tag>
                <Tag>{t("hero.tagLocation")}</Tag>
                <Tag>{t("hero.tagAvailable")}</Tag>
            </div>

            <h1
                id="hero-name"
                className="relative font-extrabold tracking-[-0.045em] my-[clamp(1.5rem,4vw,3rem)] flex flex-col text-[clamp(4.5rem,21vw,20rem)]"
            >
                <span className="block leading-[0.86]">{t("hero.firstName")}</span>
                <span className="block leading-[0.86] text-coral after:content-['◦'] after:text-teal after:text-[0.35em] after:align-super after:ml-[0.15em]">
                    {t("hero.lastName")}
                </span>
            </h1>

            <div className="relative grid grid-cols-[1.3fr_1fr] gap-[clamp(1.5rem,4vw,3rem)] items-end pb-[clamp(2rem,5vw,3.5rem)] max-[760px]:grid-cols-1 max-[760px]:items-start">
                <p className="text-[clamp(1.15rem,1rem+0.9vw,1.6rem)] leading-[1.4] max-w-[30ch]">
                    {t("hero.statementPre")}
                    <em className="text-gold italic">{t("hero.statementEm")}</em>
                    {t("hero.statementPost")}
                </p>
                <HeroSpec />
                <div className="col-span-full flex flex-wrap gap-[0.8rem] mt-2">
                    <Button href="#contato" variant="solid">
                        {t("hero.ctaPrimary")}
                    </Button>
                    <Button href="#trabalho" variant="ghost">
                        {t("hero.ctaSecondary")}
                    </Button>
                </div>
            </div>

            <Marquee />
        </section>
    );
};

export default Hero;
