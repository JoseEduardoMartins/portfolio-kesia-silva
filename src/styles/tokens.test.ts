import css from "./index.css?raw";

test("define as CSS vars de cor do design (lookbook escuro)", () => {
    expect(css).toContain("--coral: #C8A86A"); /* acento dourado */
    expect(css).toContain("--ink: #16110F"); /* fundo espresso */
    expect(css).toContain("--paper: #EFE7DA"); /* creme */
});

test("define o highlight e a textura de grão", () => {
    expect(css).toMatch(/\.hl\b/);
    expect(css).toMatch(/\.grain\b/);
});

test("respeita prefers-reduced-motion", () => {
    expect(css).toContain("prefers-reduced-motion");
});
