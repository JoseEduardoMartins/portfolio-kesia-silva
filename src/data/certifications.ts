import type { Certification } from "@/types";

// titleKey/dateKey carry the literal text — course and issuer names are fixed
// across languages (see index.html #trajetoria certs).
const certifications: Certification[] = [
    {
        id: "pucrs",
        by: "PUC-RS",
        titleKey: "História do Design",
        dateKey: "Curso de extensão · 2026",
    },
    {
        id: "bradesco",
        by: "Bradesco",
        titleKey: "Fundamentos do Design Gráfico",
        dateKey: "Certificação · 2026",
    },
    {
        id: "santander",
        by: "Santander",
        titleKey: "Storytelling para Marketing Digital",
        dateKey: "Certificação",
    },
];

export default certifications;
