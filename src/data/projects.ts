import type { Project } from "@/types";

const img = (slug: string, name: string, alt: string) => ({
    src: `/projetos/${slug}/${name}.webp`,
    alt,
});

/**
 * Projetos de estudo apresentados na seção #trabalho, em ritmo assimétrico.
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
                images: [img("savora", "faixada", "Sinalização de fachada do restaurante Savora, com o emblema da savana em dourado")],
            },
            {
                type: "pair",
                images: [
                    img("savora", "sacola", "Sacola de papel da Savora"),
                    img("savora", "embalagem", "Embalagem de delivery da Savora"),
                ],
            },
            {
                type: "offset",
                noteKey: "work.projects.savora.note",
                images: [
                    img("savora", "copo", "Copo personalizado da Savora"),
                    img("savora", "adesivo", "Adesivo de selagem da Savora"),
                ],
            },
            {
                type: "pair",
                images: [
                    img("savora", "cartao", "Cartão de visita da Savora"),
                    img("savora", "envelope", "Envelope de talher da Savora"),
                ],
            },
            {
                type: "full",
                images: [img("savora", "avental", "Avental com a marca Savora")],
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
                images: [img("infinider", "card-1", "Cartões de visita da Infinider sobre superfície escura")],
            },
            {
                type: "pair",
                images: [
                    img("infinider", "card-2", "Frente e verso do cartão Infinider"),
                    img("infinider", "card-3", "Detalhe do cartão Infinider"),
                ],
            },
            {
                type: "offset",
                noteKey: "work.projects.infinider.note",
                images: [
                    img("infinider", "logo", "Monograma IN da Infinider"),
                    img("infinider", "card-4", "Detalhe do verso do cartão Infinider"),
                ],
            },
            {
                type: "pair",
                images: [
                    img("infinider", "card-5", "Pilha de cartões Infinider"),
                    img("infinider", "cartao", "Composição do cartão de visita Infinider"),
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
                images: [img("mundo-pet-feliz", "lona", "Lona de fachada do Mundo Pet Feliz")],
            },
            {
                type: "pair",
                images: [
                    img("mundo-pet-feliz", "camiseta", "Camiseta de uniforme do Mundo Pet Feliz"),
                    img("mundo-pet-feliz", "sacola", "Sacola do Mundo Pet Feliz"),
                ],
            },
            {
                type: "offset",
                noteKey: "work.projects.mundoPetFeliz.note",
                images: [
                    img("mundo-pet-feliz", "cartao", "Cartão de visita do Mundo Pet Feliz"),
                ],
            },
        ],
    },
];

export default projects;
