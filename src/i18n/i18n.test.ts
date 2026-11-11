import i18n from "./index";

test("i18n inicia em pt-BR e traduz chaves-chave", () => {
    expect(i18n.t("hero.lastName")).toBe("Silva");
    expect(i18n.t("services.items.s01.title")).toBe("Identidade & Branding");
    expect(i18n.t("footer.backToTop")).toBe("Voltar ao topo ↑");
});

test("skills é um array", () => {
    expect(Array.isArray(i18n.t("timeline.skills", { returnObjects: true }))).toBe(true);
});
