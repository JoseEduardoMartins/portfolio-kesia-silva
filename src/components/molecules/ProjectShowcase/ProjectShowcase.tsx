import { useTranslation } from "react-i18next";
import Reveal from "@/components/Reveal";
import type { Project, ProjectImage, ProjectRow } from "@/types";

const Figure = ({ image }: { image: ProjectImage }) => (
    <figure className="m-0">
        <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            className="block w-full h-auto rounded-[4px]"
        />
    </figure>
);

const Row = ({ row, note }: { row: ProjectRow; note?: string }) => {
    if (row.type === "full") {
        return (
            <Reveal className="mb-[clamp(1.6rem,4vw,2.75rem)]">
                <Figure image={row.images[0]} />
            </Reveal>
        );
    }

    if (row.type === "pair") {
        return (
            <Reveal className="mb-[clamp(1.6rem,4vw,2.75rem)] grid grid-cols-2 gap-[clamp(0.8rem,2vw,1.4rem)] max-[720px]:grid-cols-1">
                {row.images.map((image) => (
                    <Figure key={image.src} image={image} />
                ))}
            </Reveal>
        );
    }

    // offset: imagem maior + frase + (opcional) imagem menor
    const [lead, secondary] = row.images;
    return (
        <Reveal className="mb-[clamp(1.6rem,4vw,2.75rem)] grid grid-cols-[1.4fr_1fr] gap-[clamp(0.8rem,2vw,1.4rem)] items-center max-[720px]:grid-cols-1">
            <Figure image={lead} />
            <div>
                {note && (
                    <p className="max-w-[28ch] text-ink text-[1.02rem] leading-relaxed mb-[clamp(0.8rem,2vw,1.4rem)]">
                        {note}
                    </p>
                )}
                {secondary && <Figure image={secondary} />}
            </div>
        </Reveal>
    );
};

const ProjectShowcase = ({ project }: { project: Project }) => {
    const { t } = useTranslation();
    return (
        <article className="pt-[clamp(3rem,7vw,6rem)]">
            <Reveal className="flex flex-wrap justify-between items-end gap-x-8 gap-y-3 pb-[clamp(1.25rem,3vw,2rem)]">
                <div>
                    <div className="font-mono text-coral text-[0.8rem] tracking-[0.2em]">
                        {project.index} — Identidade visual
                    </div>
                    <h3 className="font-display font-extrabold text-[clamp(2.4rem,1.5rem+5vw,4.5rem)] tracking-[-0.03em] leading-[0.95]">
                        {project.name}
                    </h3>
                </div>
                <div className="font-mono text-[0.78rem] text-muted leading-[1.9] text-right max-[720px]:text-left">
                    <div className="text-ink font-medium">{project.segment}</div>
                    <div>{project.deliverables}</div>
                </div>
            </Reveal>

            <Reveal
                as="p"
                className="max-w-[34rem] text-ink text-[1.08rem] leading-relaxed pb-[clamp(1.5rem,4vw,2.5rem)]"
            >
                {t(project.ledeKey)}
            </Reveal>

            {project.rows.map((row, i) => (
                <Row
                    key={`${project.slug}-${i}`}
                    row={row}
                    note={row.noteKey ? t(row.noteKey) : undefined}
                />
            ))}
        </article>
    );
};

export default ProjectShowcase;
