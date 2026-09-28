import css from "./index.css?raw";

test("define as CSS vars de cor do design", () => {
    expect(css).toContain("--coral: #FF4B3E");
    expect(css).toContain("--ink: #1B1220");
    expect(css).toContain("--paper: #FBF4F2");
});

test("define o highlight e a máscara do marquee", () => {
    expect(css).toMatch(/\.hl\b/);
    expect(css).toMatch(/mask-image/);
});

test("respeita prefers-reduced-motion", () => {
    expect(css).toContain("prefers-reduced-motion");
});
