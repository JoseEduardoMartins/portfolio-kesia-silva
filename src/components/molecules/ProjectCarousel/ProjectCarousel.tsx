import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/types";

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Carrossel deslizante (scroll-snap) para projetos do tipo carrossel de redes.
 * Um slide por vez, com setas, marcadores e navegação por teclado.
 */
const ProjectCarousel = ({
    images,
    label,
}: {
    images: ProjectImage[];
    label: string;
}) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);
    const count = images.length;

    const scrollToIndex = useCallback(
        (i: number) => {
            const el = trackRef.current;
            if (!el) return;
            const clamped = Math.max(0, Math.min(i, count - 1));
            el.scrollTo({
                left: clamped * el.clientWidth,
                behavior: prefersReducedMotion() ? "auto" : "smooth",
            });
        },
        [count]
    );

    const onScroll = useCallback(() => {
        const el = trackRef.current;
        if (!el || el.clientWidth === 0) return;
        setIndex(Math.round(el.scrollLeft / el.clientWidth));
    }, []);

    // Mantém o slide ativo ao redimensionar a janela.
    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        const onResize = () => {
            el.scrollTo({ left: index * el.clientWidth, behavior: "auto" });
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [index]);

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollToIndex(index + 1);
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollToIndex(index - 1);
        }
    };

    const active = images[index];

    return (
        <section
            aria-roledescription="carrossel"
            aria-label={label}
            className="relative"
        >
            <div
                ref={trackRef}
                onScroll={onScroll}
                onKeyDown={onKeyDown}
                tabIndex={0}
                className="flex overflow-x-auto snap-x snap-mandatory rounded-[3px] bg-ink-80 outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:ring-2 focus-visible:ring-coral"
            >
                {images.map((image, i) => (
                    <div
                        key={image.src}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${i + 1} de ${count}`}
                        aria-hidden={i !== index}
                        className="shrink-0 w-full snap-center"
                    >
                        <div className="aspect-[4/5] flex items-center justify-center">
                            <img
                                src={image.src}
                                alt={image.alt}
                                loading={i === 0 ? "eager" : "lazy"}
                                decoding="async"
                                draggable={false}
                                className="max-w-full max-h-full w-auto h-auto object-contain"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Controles */}
            <div className="mt-[1.1rem] flex items-center justify-between gap-4">
                <p
                    aria-live="polite"
                    className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted min-h-[1.2em]"
                >
                    {active?.caption}
                </p>

                <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-[0.4rem]" role="tablist" aria-label="Ir para o slide">
                        {images.map((image, i) => (
                            <button
                                key={image.src}
                                type="button"
                                role="tab"
                                aria-selected={i === index}
                                aria-label={`Slide ${i + 1} de ${count}`}
                                onClick={() => scrollToIndex(i)}
                                className={`h-[7px] rounded-full transition-all duration-300 ease-brand ${
                                    i === index
                                        ? "w-[22px] bg-coral"
                                        : "w-[7px] bg-paper/25 hover:bg-paper/50"
                                }`}
                            />
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => scrollToIndex(index - 1)}
                            disabled={index === 0}
                            aria-label="Slide anterior"
                            className="grid place-items-center h-10 w-10 rounded-full border border-line text-paper transition-colors duration-300 ease-brand hover:border-coral hover:text-coral disabled:opacity-30 disabled:pointer-events-none"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollToIndex(index + 1)}
                            disabled={index === count - 1}
                            aria-label="Próximo slide"
                            className="grid place-items-center h-10 w-10 rounded-full border border-line text-paper transition-colors duration-300 ease-brand hover:border-coral hover:text-coral disabled:opacity-30 disabled:pointer-events-none"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectCarousel;
