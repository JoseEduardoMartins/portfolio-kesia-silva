export type ButtonVariant = "solid" | "ghost" | "outline";
export type ButtonSize = "md" | "lg";

export interface NavItem {
    href: string;
    labelKey: string;
    cta?: boolean;
}

/** key → services.items.<key> in i18n */
export interface Service {
    idx: string;
    key: string;
}

/** key → timeline.experiences.<key> in i18n */
export interface ExperienceEntryData {
    key: string;
}

/** titleKey/dateKey carry literal text (proper nouns / fixed dates). */
export interface Certification {
    id: string;
    by: string;
    titleKey: string;
    dateKey: string;
}

/** Uma peça de um projeto: imagem (em /projetos/<slug>/) + alt + legenda curta. */
export interface ProjectImage {
    src: string;
    alt: string;
    caption?: string;
}

export type ProjectRowType = "full" | "pair" | "offset";

/**
 * Uma linha do showcase (ritmo assimétrico):
 * - full: uma peça em largura total
 * - pair: duas peças lado a lado
 * - offset: peça maior + frase (noteKey → i18n) + peça menor
 */
export interface ProjectRow {
    type: ProjectRowType;
    images: ProjectImage[];
    noteKey?: string;
}

/** Projeto de estudo. name/segment/deliverables são literais; ledeKey → i18n. */
export interface Project {
    slug: string;
    index: string;
    name: string;
    segment: string;
    deliverables: string;
    ledeKey: string;
    rows: ProjectRow[];
}

/** key → contact.facts.<key> in i18n */
export interface ContactFactData {
    key: string;
}
