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
            className="block w-full h-auto rounded-[3px] shadow-[0_30px_70px_-40px_rgba(0,0,0,0.85)]"
        />
        {image.caption && (
            <figcaption className="mt-[0.9rem] font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                {image.caption}
            </figcaption>
        )}
    </figure>
);

const Row = ({ row, note }: { row: ProjectRow; note?: string }) => {
    if (row.type === "full") {
        return (
            <Reveal className="mb-[clamp(2rem,5vw,3.5rem)]">
                <Figure image={row.images[0]} />
            </Reveal>
        );
    }

    if (row.type === "pair") {
        return (
            <Reveal className="mb-[clamp(2rem,5vw,3.5rem)] grid grid-cols-2 gap-[clamp(1.2rem,3vw,2.2rem)] max-[720px]:grid-cols-1">
                {row.images.map((image) => (
                    <Figure key={image.src} image={image} />
                ))}
            </Reveal>
        );
    }

    // offset: imagem maior + frase em destaque dourado + (opcional) imagem menor
    const [lead, secondary] = row.images;
    return (
        <Reveal className="mb-[clamp(2rem,5vw,3.5rem)] grid grid-cols-[1.35fr_1fr] gap-[clamp(1.2rem,3vw,2.2rem)] items-center max-[720px]:grid-cols-1">
            <Figure image={lead} />
            <div>
                {note && (
                    <p className="font-display italic text-coral text-[clamp(1.3rem,2vw,1.6rem)] leading-[1.5] mb-[clamp(1rem,2.5vw,1.6rem)]">
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
        <article className="pt-[clamp(3rem,7vw,5rem)]">
            <Reveal className="flex flex-wrap justify-between items-end gap-x-8 gap-y-3 pb-[clamp(1rem,2.5vw,1.5rem)]">
                <div>
                    <div className="font-mono text-coral text-[0.8rem] tracking-[0.25em] uppercase">
                        {project.index} — Identidade visual
                    </div>
                    <h3 className="font-display text-[clamp(2.8rem,1.5rem+5vw,5.5rem)] leading-[0.95] mt-[0.4rem]">
                        {project.name}
                    </h3>
                </div>
                <div className="font-mono text-[0.74rem] uppercase tracking-[0.1em] text-muted leading-[1.9] text-right max-[720px]:text-left">
                    <div className="text-paper">{project.segment}</div>
                    <div>{project.deliverables}</div>
                </div>
            </Reveal>

            <Reveal
                as="p"
                className="max-w-[40rem] font-display italic text-[clamp(1.3rem,1rem+1vw,1.8rem)] leading-[1.5] pb-[clamp(2rem,5vw,3rem)]"
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
