import services from "./services";
import palette from "./palette";
import certifications from "./certifications";
import nav from "./nav";

test("há 8 serviços com idx S/0x", () => {
    expect(services).toHaveLength(8);
    expect(services[0].idx).toBe("S/01");
});

test("paleta tem as 4 cores do design", () => {
    expect(palette.map((c) => c.hex)).toEqual([
        "#6A2230",
        "#F1E8D9",
        "#26191B",
        "#9C8A79",
    ]);
});

test("3 certificações e nav com CTA de contato", () => {
    expect(certifications).toHaveLength(3);
    expect(nav.find((n) => n.cta)?.href).toBe("#contato");
});
