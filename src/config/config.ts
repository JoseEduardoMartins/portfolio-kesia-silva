export const email = {
    address: import.meta.env.VITE_EMAIL ?? "contato@kesiasilva.design",
};

export const linkedin = {
    url: import.meta.env.VITE_URL_LINKEDIN ?? "https://www.linkedin.com/",
};

const config = { email, linkedin };

export default config;
