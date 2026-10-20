import type { Config } from "tailwindcss";

export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                ink: { DEFAULT: "#26191B", 80: "#352528" },
                paper: "#F1E8D9",
                coral: "#6A2230",
                teal: "#9C8A79",
                gold: "#C6B396",
                muted: "#8A7B6F",
                line: { DEFAULT: "#DED2BE", dark: "rgba(241,232,217,0.14)" },
            },
            fontFamily: {
                display: ['"Bricolage Grotesque"', '"Trebuchet MS"', "sans-serif"],
                body: ['"Inter"', "system-ui", "sans-serif"],
                mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
                script: ['"Caveat"', '"Segoe Script"', "cursive"],
            },
            transitionTimingFunction: {
                brand: "cubic-bezier(0.2, 0.7, 0.2, 1)",
            },
            keyframes: {
                "scroll-x": { to: { transform: "translateX(-50%)" } },
            },
            animation: {
                marquee: "scroll-x 34s linear infinite",
            },
        },
    },
    plugins: [],
} satisfies Config;
