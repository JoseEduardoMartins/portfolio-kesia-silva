import type { Config } from "tailwindcss";

export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                ink: { DEFAULT: "#1B1220", 80: "#2A1E30" },
                paper: "#FBF4F2",
                coral: "#FF4B3E",
                teal: "#0FB6A2",
                gold: "#F4B740",
                muted: "#8A7E86",
                line: { DEFAULT: "#E7DAD3", dark: "rgba(251,244,242,0.14)" },
            },
            fontFamily: {
                display: ['"Bricolage Grotesque"', '"Trebuchet MS"', "sans-serif"],
                body: ['"Inter"', "system-ui", "sans-serif"],
                mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
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
