interface CertCardProps {
    by: string;
    titleKey: string;
    dateKey: string;
}

// titleKey/dateKey carry literal text (see data/certifications.ts).
const CertCard = ({ by, titleKey, dateKey }: CertCardProps) => (
    <li className="bg-ink text-paper px-[1.4rem] py-5 rounded-[0.9rem] flex flex-col gap-1">
        <span className="font-mono text-[0.72rem] text-gold tracking-[0.05em] uppercase">
            {by}
        </span>
        <h3 className="text-[1.1rem]">{titleKey}</h3>
        <span className="text-[0.8rem] text-paper/60">{dateKey}</span>
    </li>
);

export default CertCard;
