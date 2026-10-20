import css from "./index.css?raw";

test("define as CSS vars de cor do design", () => {
    expect(css).toContain("--coral: #6A2230");
    expect(css).toContain("--ink: #26191B");
    expect(css).toContain("--paper: #F1E8D9");
});

test("define o highlight e a máscara do marquee", () => {
    expect(css).toMatch(/\.hl\b/);
    expect(css).toMatch(/mask-image/);
});

test("respeita prefers-reduced-motion", () => {
    expect(css).toContain("prefers-reduced-motion");
});
