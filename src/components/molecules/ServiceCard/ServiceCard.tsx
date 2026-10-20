import { useTranslation } from "react-i18next";

interface ServiceCardProps {
    idx: string;
    titleKey: string;
    descriptionKey: string;
}

const ServiceCard = ({ idx, titleKey, descriptionKey }: ServiceCardProps) => {
    const { t } = useTranslation();
    return (
        <li className="p-[clamp(1.5rem,3vw,2.25rem)] border-r border-b border-line-dark flex flex-col gap-[0.6rem] transition-colors duration-300 ease-brand hover:bg-ink-80 min-h-[13rem] max-[520px]:min-h-0">
            <span className="font-mono text-[0.72rem] text-teal tracking-[0.05em]">
                {idx}
            </span>
            <h3 className="text-[1.25rem] mt-auto">{t(titleKey)}</h3>
            <p className="text-[0.92rem] text-paper/70 leading-[1.5]">
                {t(descriptionKey)}
            </p>
        </li>
    );
};

export default ServiceCard;
