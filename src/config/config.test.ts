import config from "./index";

test("fornece email e linkedin com defaults", () => {
    expect(config.email.address).toContain("@");
    expect(config.linkedin.url).toMatch(/^https?:\/\//);
});
