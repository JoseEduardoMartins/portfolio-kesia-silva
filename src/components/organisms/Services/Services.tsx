import { useTranslation } from "react-i18next";
import SectionLabel from "@/components/molecules/SectionLabel";
import ServiceCard from "@/components/molecules/ServiceCard";
import Reveal from "@/components/Reveal";
import services from "@/data/services";

const Services = () => {
    const { t } = useTranslation();
    return (
        <section
            id="servicos"
            aria-labelledby="services-title"
            className="bg-ink text-paper px-[var(--gut)] py-[var(--sec)] relative"
        >
            <Reveal>
                <SectionLabel index="02" light>
                    {t("services.label")}
                </SectionLabel>
            </Reveal>
            <h2
                id="services-title"
                className="text-[clamp(2.25rem,1.5rem+3.4vw,4.75rem)] tracking-[-0.03em] mb-[clamp(2rem,5vw,3.5rem)]"
            >
                {t("services.title")}
            </h2>
            <ul className="list-none m-0 p-0 grid grid-cols-4 border-t border-l border-line-dark max-[980px]:grid-cols-2 max-[520px]:grid-cols-1">
                {services.map((s) => (
                    <ServiceCard
                        key={s.key}
                        idx={s.idx}
                        titleKey={`services.items.${s.key}.title`}
                        descriptionKey={`services.items.${s.key}.description`}
                    />
                ))}
            </ul>
        </section>
    );
};

export default Services;
