import { useEffect, useRef } from "react";

interface Options {
    threshold?: number;
    once?: boolean;
}

const prefersReducedMotion = (): boolean =>
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const useReveal = <T extends HTMLElement = HTMLDivElement>({
    threshold = 0.12,
    once = true,
}: Options = {}) => {
    const ref = useRef<T>(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
            node.classList.add("is-visible");
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    node.classList.add("is-visible");
                    if (once) observer.unobserve(node);
                } else if (!once) {
                    node.classList.remove("is-visible");
                }
            },
            { threshold, rootMargin: "0px 0px -10% 0px" }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold, once]);

    return ref;
};

export default useReveal;
