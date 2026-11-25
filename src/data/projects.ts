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
        deliverables: "Marca · Embalagens · Sinalização · Social",
        ledeKey: "work.projects.savora.lede",
        rows: [
            {
                type: "pair",
                images: [
                    img("savora", "logo", "Logo principal da Savora: emblema da savana com árvore e zebra em dourado sobre verde, com o nome Savora Restaurante", "Logo principal"),
                    img("savora", "emblema", "Emblema da Savora com a árvore da savana e a zebra em dourado sobre fundo verde", "Emblema"),
                ],
            },
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
                type: "pair",
                images: [
                    img("savora", "avental", "Avental com a marca Savora", "Avental"),
                    img("savora", "post", "Post de Instagram da Savora com prato de carne grelhada no feed @savora.gastronomia", "Post de Instagram"),
                ],
            },
        ],
    },
    {
        slug: "infinider",
        index: "02",
        name: "Infinider",
        segment: "Gestão de restaurantes",
        deliverables: "Marca · Papelaria · App",
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
            {
                type: "offset",
                noteKey: "work.projects.infinider.app",
                images: [
                    img("infinider", "app", "Ícone do app Infinider na tela inicial de um iPhone, com o monograma IN", "Ícone do app"),
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
    {
        slug: "nutricao",
        index: "04",
        name: "Conteúdo · Nutrição",
        segment: "Nutricionista",
        deliverables: "Conteúdo para redes · Carrossel",
        kind: "Conteúdo para redes",
        ledeKey: "work.projects.nutricao.lede",
        rows: [
            {
                type: "full",
                images: [img("nutricao", "capa", "Carrossel de nutrição, capa: “Equilíbrio é o prato principal”, com cloche servido por mãos escultóricas", "1 · Equilíbrio é o prato principal")],
            },
            {
                type: "pair",
                images: [
                    img("nutricao", "extremos", "Carrossel de nutrição, 2: “Menos extremos” — boas escolhas também cabem na vida real, com pães e massas em bandejas", "2 · Menos extremos"),
                    img("nutricao", "dietas", "Carrossel de nutrição, 3: “Dietas restritivas” — aprender a comer melhor, não menos, com rosto feito de folhas e brócolis", "3 · Dietas restritivas"),
                ],
            },
            {
                type: "offset",
                noteKey: "work.projects.nutricao.note",
                images: [
                    img("nutricao", "disciplina", "Carrossel de nutrição, 4: “Isso não é saúde, é punição disfarçada de disciplina”, com pão doce em espiral", "4 · Punição x disciplina"),
                    img("nutricao", "equilibrio", "Carrossel de nutrição, 5: “Equilíbrio” — comer sem culpa, comida é energia, prazer e afeto, com pizza", "5 · Equilíbrio"),
                ],
            },
            {
                type: "full",
                images: [img("nutricao", "terrorismo", "Carrossel de nutrição, 6: “Na minha nutrição, não tem terrorismo alimentar. Tem ciência, tem liberdade e tem vida de verdade.”", "6 · Sem terrorismo alimentar")],
            },
        ],
    },
    {
        slug: "pearl",
        index: "05",
        name: "Pearl Dental Care",
        segment: "Odontologia",
        deliverables: "Conteúdo para redes · Campanha",
        kind: "Conteúdo para redes",
        ledeKey: "work.projects.pearl.lede",
        rows: [
            {
                type: "full",
                images: [img("pearl", "cuidado", "Carrossel da Pearl Dental Care, capa: “Seu sorriso merece cuidado”, com mulher sorrindo", "1 · Seu sorriso merece cuidado")],
            },
            {
                type: "offset",
                noteKey: "work.projects.pearl.note",
                images: [
                    img("pearl", "dor", "Carrossel da Pearl Dental Care, 2: “Dor de dente não é normal”, com dente 3D sobre fundo azul", "2 · Dor de dente não é normal"),
                    img("pearl", "sorriso", "Carrossel da Pearl Dental Care, 3: “Pare de adiar seu sorriso — agende sua avaliação”, com close de sorriso em consulta", "3 · Pare de adiar seu sorriso"),
                ],
            },
        ],
    },
    {
        slug: "millymel",
        index: "06",
        name: "MillyMel",
        segment: "Rosas eternas",
        deliverables: "Marca · Papelaria · Social",
        ledeKey: "work.projects.millymel.lede",
        rows: [
            {
                type: "full",
                images: [img("millymel", "cartao", "Cartões de visita da MillyMel Rosas Eternas, em marsala e champagne, com o símbolo da rosa", "Cartões de visita")],
            },
            {
                type: "offset",
                noteKey: "work.projects.millymel.note",
                images: [
                    img("millymel", "perfil", "Perfil de Instagram da MillyMel Rosas Eternas, com destaques de rosas, buquês e cestas", "Perfil de Instagram"),
                ],
            },
        ],
    },
];

export default projects;
