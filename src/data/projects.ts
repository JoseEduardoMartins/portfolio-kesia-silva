import type { Project } from "@/types";

const img = (slug: string, name: string, alt: string, caption: string) => ({
    src: `/projetos/${slug}/${name}.webp`,
    alt,
    caption,
});

/**
 * Projetos de estudo apresentados na seção #trabalho, em ritmo lookbook.
 * Ordem: do mais rico ao mais enxuto. Cópia (ledes/notas) vive no i18n.
 */
const projects: Project[] = [
    {
        slug: "savora",
        index: "01",
        name: "Savora",
        segment: "Restaurante",
        deliverables: "Marca · Embalagens · Sinalização",
        ledeKey: "work.projects.savora.lede",
        rows: [
            {
                type: "full",
                images: [img("savora", "faixada", "Sinalização de fachada do restaurante Savora, com o emblema da savana em dourado", "Sinalização de fachada")],
            },
            {
                type: "pair",
                images: [
                    img("savora", "embalagem", "Embalagem de delivery da Savora", "Embalagem"),
                    img("savora", "sacola", "Sacola de papel da Savora", "Sacola"),
                ],
            },
            {
                type: "offset",
                noteKey: "work.projects.savora.note",
                images: [
                    img("savora", "copo", "Copo personalizado da Savora", "Copo"),
                    img("savora", "adesivo", "Adesivo de selagem da Savora", "Adesivo"),
                ],
            },
            {
                type: "pair",
                images: [
                    img("savora", "cartao", "Cartão de visita da Savora", "Cartão de visita"),
                    img("savora", "envelope", "Envelope de talher da Savora", "Envelope de talher"),
                ],
            },
            {
                type: "full",
                images: [img("savora", "avental", "Avental com a marca Savora", "Avental")],
            },
        ],
    },
    {
        slug: "infinider",
        index: "02",
        name: "Infinider",
        segment: "Gestão de restaurantes",
        deliverables: "Marca · Papelaria",
        ledeKey: "work.projects.infinider.lede",
        rows: [
            {
                type: "full",
                images: [img("infinider", "card-1", "Cartões de visita da Infinider sobre superfície escura", "Cartões de visita")],
            },
            {
                type: "pair",
                images: [
                    img("infinider", "card-2", "Frente e verso do cartão Infinider", "Frente & verso"),
                    img("infinider", "card-3", "Detalhe do cartão Infinider", "Detalhe"),
                ],
            },
            {
                type: "offset",
                noteKey: "work.projects.infinider.note",
                images: [
                    img("infinider", "logo", "Monograma IN da Infinider", "Monograma"),
                    img("infinider", "card-4", "Detalhe do verso do cartão Infinider", "Verso"),
                ],
            },
            {
                type: "pair",
                images: [
                    img("infinider", "card-5", "Pilha de cartões Infinider", "Pilha de cartões"),
                    img("infinider", "cartao", "Composição do cartão de visita Infinider", "Composição"),
                ],
            },
        ],
    },
    {
        slug: "mundo-pet-feliz",
        index: "03",
        name: "Mundo Pet Feliz",
        segment: "Pet shop",
        deliverables: "Marca · Uniforme · Sinalização",
        ledeKey: "work.projects.mundoPetFeliz.lede",
        rows: [
            {
                type: "full",
                images: [img("mundo-pet-feliz", "lona", "Lona de fachada do Mundo Pet Feliz", "Lona de fachada")],
            },
            {
                type: "pair",
                images: [
                    img("mundo-pet-feliz", "camiseta", "Camiseta de uniforme do Mundo Pet Feliz", "Uniforme"),
                    img("mundo-pet-feliz", "sacola", "Sacola do Mundo Pet Feliz", "Sacola"),
                ],
            },
            {
                type: "offset",
                noteKey: "work.projects.mundoPetFeliz.note",
                images: [
                    img("mundo-pet-feliz", "cartao", "Cartão de visita do Mundo Pet Feliz", "Cartão de visita"),
                ],
            },
        ],
    },
];

export default projects;
