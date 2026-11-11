import type { Config } from "tailwindcss";

export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                // Direção C — Lookbook escuro. Nomes mantidos; valores no esquema escuro.
                ink: { DEFAULT: "#16110F", 80: "#1E1815" }, // fundo / painel
                paper: "#EFE7DA", // creme (texto/claro)
                coral: "#C8A86A", // acento dourado (nome herdado)
                teal: "#A79A88", // neutro suave
                gold: "#C8A86A",
                muted: "#A79A88", // texto suave sobre escuro
                line: {
                    DEFAULT: "rgba(239,231,218,0.14)",
                    dark: "rgba(239,231,218,0.14)",
                },
            },
            fontFamily: {
                display: ['"Playfair Display"', "Georgia", "serif"],
                body: ['"Inter"', "system-ui", "sans-serif"],
                mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
                script: ['"Playfair Display"', "Georgia", "serif"],
            },
            transitionTimingFunction: {
                brand: "cubic-bezier(0.2, 0.7, 0.2, 1)",
            },
        },
    },
    plugins: [],
} satisfies Config;
