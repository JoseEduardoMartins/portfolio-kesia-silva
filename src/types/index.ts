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

export interface Swatch {
    name: string;
    hex: string;
}

/** key → contact.facts.<key> in i18n */
export interface ContactFactData {
    key: string;
}
