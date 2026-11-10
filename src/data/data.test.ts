import services from "./services";
import certifications from "./certifications";
import nav from "./nav";

test("há 8 serviços com idx S/0x", () => {
    expect(services).toHaveLength(8);
    expect(services[0].idx).toBe("S/01");
});

test("3 certificações e nav com CTA de contato", () => {
    expect(certifications).toHaveLength(3);
    expect(nav.find((n) => n.cta)?.href).toBe("#contato");
});
