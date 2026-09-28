import { render } from "@testing-library/react";
import Reveal from "@/components/Reveal";

const originalIO = window.IntersectionObserver;
const originalMatchMedia = window.matchMedia;

afterEach(() => {
    window.IntersectionObserver = originalIO;
    window.matchMedia = originalMatchMedia;
});

test("sem IntersectionObserver, revela imediatamente", () => {
    // @ts-expect-error força ambiente sem IO
    delete window.IntersectionObserver;
    window.matchMedia = ((q: string) => ({
        matches: false,
        media: q,
        addEventListener() {},
        removeEventListener() {},
    })) as unknown as typeof window.matchMedia;

    const { container } = render(<Reveal>conteúdo</Reveal>);
    expect(container.firstChild).toHaveClass("is-visible");
});

test("com prefers-reduced-motion, revela imediatamente", () => {
    window.matchMedia = ((q: string) => ({
        matches: q.includes("reduce"),
        media: q,
        addEventListener() {},
        removeEventListener() {},
    })) as unknown as typeof window.matchMedia;

    const { container } = render(<Reveal>conteúdo</Reveal>);
    expect(container.firstChild).toHaveClass("is-visible");
});
