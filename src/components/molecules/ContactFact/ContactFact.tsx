import { useTranslation } from "react-i18next";

const ContactFact = ({ factKey }: { factKey: string }) => {
    const { t } = useTranslation();
    const base = `contact.facts.${factKey}`;
    return (
        <li className="flex flex-col gap-1 text-[0.95rem] text-left">
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.06em] text-teal">
                {t(`${base}.label`)}
            </span>
            {t(`${base}.value`)}
        </li>
    );
};

export default ContactFact;
