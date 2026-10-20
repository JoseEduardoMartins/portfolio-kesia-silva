import type { Swatch as SwatchModel } from "@/types";

const darkText = new Set(["#F4B740", "#0FB6A2"]);

const Swatch = ({ name, hex }: SwatchModel) => {
    const dark = darkText.has(hex);
    return (
        <span
            className={`flex flex-col gap-[0.15rem] justify-end aspect-[1.4] p-[0.6rem] rounded-[0.6rem] border border-line-dark ${dark ? "text-ink" : "text-paper"}`}
            style={{ background: hex }}
        >
            <b className="text-[0.82rem] font-semibold">{name}</b>
            <i
                className={`font-mono text-[0.62rem] not-italic ${dark ? "opacity-65" : "opacity-80"}`}
            >
                {hex}
            </i>
        </span>
    );
};

export default Swatch;
