# Portfólio Kesia Silva — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Portar o portfólio estático da Kesia Silva (`index.html` + `styles.css` + `main.js`) para uma app Vite + React + TypeScript + Tailwind, visualmente e textualmente idêntica, organizada com Atomic Design.

**Architecture:** App Vite `react-ts`. Tokens de design no `tailwind.config.ts` + camada CSS (`src/styles/index.css`) para efeitos que Tailwind não expressa bem. Textos em `react-i18next` (`pt-BR`), listas estruturadas em `src/data/` com chaves de i18n. `components/` em camadas Atomic Design (atoms → molecules → organisms → templates); `pages/Home` compõe os organisms na ordem do `index.html`. Barrels `index.ts` por pasta, espelhando o projeto `../portfolio`.

**Tech Stack:** Vite 5, React 18, TypeScript, Tailwind CSS 3, react-i18next, Vitest + @testing-library/react + jsdom.

**Spec:** `docs/superpowers/specs/2026-09-27-portfolio-kesia-silva-design.md`

## Global Constraints

- **Fonte da verdade do markup/estilo:** `index.html` e `styles.css` na raiz do repo. Textos, ordem das seções e o placeholder "espaço reservado para portfólio de peças reais" devem ser reproduzidos verbatim.
- **Idioma:** `lang="pt-BR"`; `fallbackLng: "pt-BR"`; `defaultNS: "translations"`.
- **Env vars:** sempre `import.meta.env.VITE_*` (nunca `process.env.REACT_APP_*`).
- **Barrels:** toda pasta de componente/módulo tem `index.ts` com `export { default } from "./X";` (named exports quando não houver default).
- **Tokens de cor (hex exatos):** ink `#1B1220`, ink-80 `#2A1E30`, paper `#FBF4F2`, coral `#FF4B3E`, teal `#0FB6A2`, gold `#F4B740`, muted `#8A7E86`, line `#E7DAD3`, line-dark `rgba(251,244,242,0.14)`.
- **Fontes:** display = "Bricolage Grotesque", body = "Inter", mono = "IBM Plex Mono".
- **Acessibilidade:** preservar skip-link, `aria-labelledby`/`aria-label`, `aria-hidden` nos decorativos, e `:focus-visible` (outline coral).
- **Motion:** todo movimento (marquee, reveal, scroll-smooth) respeita `prefers-reduced-motion: reduce`.
- **Indentação:** 4 espaços, LF (segue `.editorconfig` do `../portfolio`).

## Review Focus

Comportamentos implícitos na spec que nenhum teste de tarefa exercita naturalmente e que mais provavelmente afetariam um usuário real — cada linha tem seu teste fixado na tarefa dona:

- **`prefers-reduced-motion` desliga animações:** com a preferência ativa, `useReveal` deve revelar tudo imediatamente (sem depender de scroll). Teste em **Task 6**.
- **`IntersectionObserver` ausente:** ambiente sem a API (ou SSR/teste) não pode esconder o conteúdo permanentemente — deve revelar tudo. Teste em **Task 6**.
- **`Button` variantes/tamanhos:** classes corretas por `variant`/`size` e `href` presente e navegável. Teste em **Task 7**.
- **Marquee é decorativo:** `aria-hidden="true"` para não poluir leitores de tela, mas com os termos renderizados no DOM. Teste em **Task 8**.
- **Ano do footer é dinâmico:** `useCurrentYear` retorna o ano corrente do sistema (não "2026" hardcoded). Teste em **Task 6**.

---

## File Structure

Criados nesta ordem lógica (fundação → conteúdo → primitivas → composição):

- **Tooling:** `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `tailwind.config.ts`, `postcss.config.js`, `index.html`, `.env.example`, `.gitignore` (atualizar).
- **Entry:** `src/main.tsx`, `src/App.tsx`, `src/vite-env.d.ts`, `src/setupTests.ts`.
- **Estilo:** `src/styles/index.css`.
- **i18n:** `src/i18n/index.ts`, `src/i18n/locales/index.ts`, `src/i18n/locales/pt-br.ts`.
- **Domínio:** `src/types/index.ts`, `src/config/config.ts` (+barrel), `src/data/*.ts`.
- **Comportamento:** `src/hooks/useReveal.ts`, `src/hooks/useCurrentYear.ts`, `src/components/Reveal/*`.
- **Atoms:** `src/components/atoms/{Button,Tag,Chip,Swatch,BrandMark,SkipLink,Highlight}/*`.
- **Molecules:** `src/components/molecules/{Brand,SectionLabel,NavLinks,HeroSpec,Marquee,ServiceCard,ExperienceEntry,CertCard,ContactFact,Swatches,Specimen,Composition}/*`.
- **Organisms:** `src/components/organisms/{Header,Hero,About,Services,VisualSystem,Timeline,Contact,Footer}/*`.
- **Template/Page:** `src/components/templates/Layout/*`, `src/pages/Home/*`.
- **Cleanup:** remover `styles.css`, `main.js` (raiz) ao final; atualizar `README.md`.

---

### Task 1: Scaffold do projeto Vite + tooling

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `postcss.config.js`, `tailwind.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/vite-env.d.ts`, `src/setupTests.ts`, `src/styles/index.css`, `.env.example`
- Modify: `.gitignore`
- Test: `src/App.test.tsx`

**Interfaces:**
- Produces: `App` (default export de `src/App.tsx`); alias de import `@/` → `src/`.

- [ ] **Step 1: Criar `package.json`**

```json
{
  "name": "portfolio-kesia-silva",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "i18next": "^23.11.5",
    "i18next-browser-languagedetector": "^8.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-i18next": "^14.1.2"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.6",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "jsdom": "^24.1.0",
    "postcss": "^8.4.39",
    "tailwindcss": "^3.4.4",
    "typescript": "^5.5.3",
    "vite": "^5.3.3",
    "vitest": "^2.0.2"
  }
}
```

- [ ] **Step 2: Criar `vite.config.ts`** (com alias `@` e config de teste)

```ts
/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/setupTests.ts",
        css: true,
    },
});
```

- [ ] **Step 3: Criar `tsconfig.json` e `tsconfig.node.json`**

`tsconfig.json`:
```json
{
    "compilerOptions": {
        "target": "ES2020",
        "useDefineForClassFields": true,
        "lib": ["ES2020", "DOM", "DOM.Iterable"],
        "module": "ESNext",
        "skipLibCheck": true,
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx",
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true,
        "types": ["vitest/globals", "@testing-library/jest-dom"],
        "baseUrl": ".",
        "paths": { "@/*": ["./src/*"] }
    },
    "include": ["src"],
    "references": [{ "path": "./tsconfig.node.json" }]
}
```

`tsconfig.node.json`:
```json
{
    "compilerOptions": {
        "composite": true,
        "skipLibCheck": true,
        "module": "ESNext",
        "moduleResolution": "bundler",
        "allowSyntheticDefaultImports": true,
        "strict": true,
        "noEmit": true
    },
    "include": ["vite.config.ts"]
}
```

- [ ] **Step 4: Criar `postcss.config.js` e `tailwind.config.ts`**

`postcss.config.js`:
```js
export default {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
};
```

`tailwind.config.ts`:
```ts
import type { Config } from "tailwindcss";

export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                ink: { DEFAULT: "#1B1220", 80: "#2A1E30" },
                paper: "#FBF4F2",
                coral: "#FF4B3E",
                teal: "#0FB6A2",
                gold: "#F4B740",
                muted: "#8A7E86",
                line: { DEFAULT: "#E7DAD3", dark: "rgba(251,244,242,0.14)" },
            },
            fontFamily: {
                display: ['"Bricolage Grotesque"', '"Trebuchet MS"', "sans-serif"],
                body: ['"Inter"', "system-ui", "sans-serif"],
                mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
            },
            transitionTimingFunction: {
                brand: "cubic-bezier(0.2, 0.7, 0.2, 1)",
            },
            keyframes: {
                "scroll-x": { to: { transform: "translateX(-50%)" } },
            },
            animation: {
                marquee: "scroll-x 34s linear infinite",
            },
        },
    },
    plugins: [],
} satisfies Config;
```

- [ ] **Step 5: Criar `index.html`** (entry Vite — meta tags, OG, fontes e favicon do `index.html` original das linhas 3-21; `#root` + script `main.tsx`)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kesia Silva — Designer Gráfica</title>
    <meta name="description" content="Kesia Silva é designer gráfica em Florianópolis. Cria identidades visuais estratégicas, conteúdo para redes sociais e apresentações de alto impacto." />
    <meta name="author" content="Kesia Silva" />
    <meta property="og:title" content="Kesia Silva — Designer Gráfica" />
    <meta property="og:description" content="Identidades visuais estratégicas que conectam marcas ao seu público." />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pt_BR" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%23FF4B3E'/><text x='50' y='68' font-size='58' font-family='Georgia,serif' font-weight='bold' text-anchor='middle' fill='%23FBF4F2'>K</text></svg>" />
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

- [ ] **Step 6: Criar `src/styles/index.css`** (mínimo por ora — só as diretivas; tokens/efeitos vêm na Task 2)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 7: Criar `src/vite-env.d.ts`, `src/main.tsx`, `src/App.tsx`**

`src/vite-env.d.ts`:
```ts
/// <reference types="vite/client" />
```

`src/main.tsx`:
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
```

`src/App.tsx` (placeholder — será substituído na Task 19):
```tsx
const App = () => <h1>Kesia Silva</h1>;

export default App;
```

- [ ] **Step 8: Criar `src/setupTests.ts` e `.env.example`; atualizar `.gitignore`**

`src/setupTests.ts`:
```ts
import "@testing-library/jest-dom";
```

`.env.example`:
```
VITE_EMAIL=contato@kesiasilva.design
VITE_URL_LINKEDIN=https://www.linkedin.com/
```

Adicionar ao `.gitignore` (se ainda não houver): `node_modules`, `dist`, `.env`, `*.local`.

- [ ] **Step 9: Escrever o teste falho `src/App.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renderiza o nome Kesia Silva", () => {
    render(<App />);
    expect(screen.getByText(/Kesia Silva/i)).toBeInTheDocument();
});
```

- [ ] **Step 10: Instalar deps e rodar o teste**

Run: `npm install && npm test`
Expected: 1 teste PASS. (Se `npm install` alterar versões, tudo bem — o lockfile é novo.)

- [ ] **Step 11: Verificar dev server e build**

Run: `npm run build`
Expected: build conclui sem erros de tipo.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite + React + TS + Tailwind + Vitest"
```

---

### Task 2: Tokens de design e camada de estilos global

**Files:**
- Modify: `src/styles/index.css`
- Test: `src/styles/tokens.test.ts`

**Interfaces:**
- Produces: classes utilitárias/componentes globais consumidas pelos organisms — `.hero-grid`, `.marquee-mask`, `.hl`, `.hl-coral`, `.skip-link`, `[data-reveal]`/`.is-visible`, `.focus-ring` (via `:focus-visible` global), e as CSS vars em `:root`.

- [ ] **Step 1: Escrever `src/styles/tokens.test.ts`** (garante que os tokens/efeitos essenciais existem no CSS)

```ts
import { readFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";

const css = readFileSync(
    fileURLToPath(new URL("./index.css", import.meta.url)),
    "utf-8"
);

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
```

- [ ] **Step 2: Rodar o teste (deve falhar)**

Run: `npm test -- tokens`
Expected: FAIL (strings ausentes).

- [ ] **Step 3: Escrever `src/styles/index.css` completo**

Portar os efeitos do `styles.css` original que não têm utilitário Tailwind limpo. Base:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
    --ink: #1B1220;
    --ink-80: #2A1E30;
    --paper: #FBF4F2;
    --coral: #FF4B3E;
    --teal: #0FB6A2;
    --gold: #F4B740;
    --muted: #8A7E86;
    --line: #E7DAD3;
    --line-dark: rgba(251, 244, 242, 0.14);
    --ease: cubic-bezier(0.2, 0.7, 0.2, 1);
    --gut: clamp(1.25rem, 5vw, 6rem);
    --sec: clamp(4.5rem, 11vw, 10rem);
}

@layer base {
    html { scroll-behavior: smooth; }
    body {
        background: var(--paper);
        color: var(--ink);
        font-family: "Inter", system-ui, sans-serif;
        font-size: clamp(1rem, 0.95rem + 0.3vw, 1.125rem);
        line-height: 1.65;
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
    }
    h1, h2, h3 {
        font-family: "Bricolage Grotesque", "Trebuchet MS", sans-serif;
        font-weight: 700; line-height: 1.02; letter-spacing: -0.02em;
    }
    :focus-visible {
        outline: 2.5px solid var(--coral);
        outline-offset: 3px;
        border-radius: 2px;
    }
}

@layer components {
    /* Skip link */
    .skip-link {
        position: absolute; left: 1rem; top: -3rem;
        background: var(--ink); color: var(--paper);
        padding: 0.6rem 1rem; border-radius: 0 0 0.5rem 0.5rem;
        z-index: 100; transition: top 0.2s var(--ease);
    }
    .skip-link:focus { top: 0; }

    /* Highlight (do styles.css .hl / .hl-coral) */
    .hl {
        background: linear-gradient(transparent 60%,
            color-mix(in srgb, var(--gold) 55%, transparent) 60%);
        padding: 0 0.1em;
    }
    .hl-coral { color: var(--coral); font-style: italic; }

    /* Grid decorativo do hero (styles.css .hero__grid) */
    .hero-grid {
        position: absolute; inset: 0; pointer-events: none;
        background-image:
            linear-gradient(var(--line-dark) 1px, transparent 1px),
            linear-gradient(90deg, var(--line-dark) 1px, transparent 1px);
        background-size: clamp(48px, 8vw, 88px) clamp(48px, 8vw, 88px);
        -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 30%, #000 40%, transparent 100%);
                mask-image: radial-gradient(ellipse 90% 70% at 50% 30%, #000 40%, transparent 100%);
    }

    /* Máscara lateral do marquee (styles.css .marquee) */
    .marquee-mask {
        -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
                mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
    }
}

@layer utilities {
    /* Reveal on scroll (do main.js + styles.css [data-reveal]) */
    [data-reveal] {
        opacity: 0; transform: translateY(24px);
        transition: opacity 0.7s var(--ease), transform 0.7s var(--ease);
    }
    [data-reveal].is-visible { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    [data-reveal] { opacity: 1; transform: none; transition: none; }
    .animate-marquee { animation: none !important; }
}
```

> Nota: cores/fontes/espaçamentos de layout usam utilitários Tailwind (tokens da Task 1) diretamente no JSX. Esta camada cobre só o que Tailwind não expressa bem.

- [ ] **Step 4: Rodar o teste (deve passar)**

Run: `npm test -- tokens`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/styles/index.css src/styles/tokens.test.ts
git commit -m "feat: tokens de design e camada CSS de efeitos"
```

---

### Task 3: i18n + locale pt-BR

**Files:**
- Create: `src/i18n/index.ts`, `src/i18n/locales/index.ts`, `src/i18n/locales/pt-br.ts`
- Test: `src/i18n/i18n.test.ts`

**Interfaces:**
- Produces: `i18n` (default de `src/i18n/index.ts`, já `.init()`-ado); estrutura de chaves consumida por todos os componentes via `useTranslation()`.
- Chaves de texto (namespace `translations`, usadas ao longo do plano):
  - `header.{about,services,language,journey,contact}`
  - `hero.{tagRole,tagLocation,tagAvailable,firstName,lastName,statement,statementEm,specFocusLabel,specFocusValue,specFormatsLabel,specFormatsValue,specProcessLabel,specProcessValue,ctaPrimary,ctaSecondary,marquee}` (`marquee` = array)
  - `about.{label,leadPre,leadHl,leadPost,p1,p2,p3}` (com marcações fortes embutidas via `<Trans>` — ver Task 12)
  - `services.{label,title,items.{s01..s08}.{title,description}}`
  - `visualSystem.{label,title,note,noteSwap,markTag,markCaption,paletteTag,paletteCaption,typeTag,typeCaption,compTag,compCaption,specimenTitle,specimenSubtitle,specimenBody}`
  - `timeline.{label,title,present,experiences.{e1,e2}.{when,role,org,description},skills}` (`skills` = array)
  - `contact.{label,titlePre,titleHl,lead,ctaEmail,ctaLinkedin,facts.{where,model,languages}.{label,value}}`
  - `footer.{copyright,backToTop}`

- [ ] **Step 1: Escrever `src/i18n/i18n.test.ts`**

```ts
import i18n from "./index";

test("i18n inicia em pt-BR e traduz chaves-chave", () => {
    expect(i18n.t("hero.lastName")).toBe("Silva");
    expect(i18n.t("services.items.s01.title")).toBe("Identidade & Branding");
    expect(i18n.t("footer.backToTop")).toBe("Voltar ao topo ↑");
});

test("marquee e skills são arrays", () => {
    expect(Array.isArray(i18n.t("hero.marquee", { returnObjects: true }))).toBe(true);
    expect(Array.isArray(i18n.t("timeline.skills", { returnObjects: true }))).toBe(true);
});
```

- [ ] **Step 2: Rodar (deve falhar)** — `npm test -- i18n` → FAIL.

- [ ] **Step 3: Criar `src/i18n/index.ts`**

```ts
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translations from "./locales";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: translations,
        fallbackLng: "pt-BR",
        defaultNS: "translations",
        interpolation: { escapeValue: false },
    });

export default i18n;
```

- [ ] **Step 4: Criar `src/i18n/locales/index.ts`**

```ts
import ptBr from "./pt-br";

const translations = {
    "pt-BR": ptBr,
};

export default translations;
```

- [ ] **Step 5: Criar `src/i18n/locales/pt-br.ts`** com TODOS os textos do `index.html` (verbatim). Estrutura completa:

```ts
const ptBr = {
    translations: {
        header: {
            about: "Sobre",
            services: "Serviços",
            language: "Linguagem",
            journey: "Trajetória",
            contact: "Contato",
        },
        hero: {
            tagRole: "◦ Designer Gráfica",
            tagLocation: "Florianópolis · SC · Brasil",
            tagAvailable: "Disponível para projetos",
            firstName: "Kesia",
            lastName: "Silva",
            statementPre: "Crio ",
            statementEm: "identidades visuais estratégicas",
            statementPost:
                " que conectam marcas ao seu público — do primeiro conceito à peça final.",
            specFocusLabel: "Foco",
            specFocusValue: "Branding & Identidade",
            specFormatsLabel: "Formatos",
            specFormatsValue: "Redes · Slides · Logotipo",
            specProcessLabel: "Processo",
            specProcessValue: "Craft clássico × IA generativa",
            ctaPrimary: "Vamos criar juntos",
            ctaSecondary: "Ver linguagem visual",
            marquee: [
                "Design Gráfico", "Identidade Visual",
                "Marketing de Mídias Sociais", "Logotipos",
                "Storytelling", "Apresentações",
            ],
        },
        about: {
            label: "Sobre",
            leadPre:
                "Uno a sensibilidade estética do design clássico à inovação tecnológica — para transformar ideias em ",
            leadHl: "design de alto impacto",
            leadPost: ".",
            p1: "Sou designer gráfica e atuo no desenvolvimento de soluções visuais estratégicas na <s>Feel Tech RH</s> e na <s>Feel Academy</s>, criando identidades para redes sociais, apresentações corporativas de alto impacto e materiais digitais que conectam marcas ao seu público-alvo.",
            p2: "Meu processo une o cuidado do design gráfico clássico ao uso estratégico de inteligências artificiais generativas. Trabalho com <s>Canva</s> em sinergia com <s>ChatGPT</s> e <s>Gemini</s> para acelerar o brainstorming de layouts, refinar conceitos e entregar com agilidade e precisão.",
            p3: "Com formação em Fundamentos do Design Gráfico e Storytelling para Marketing Digital, meu foco vai além da estética: crio narrativas visuais funcionais que geram engajamento, clareza e resultado.",
        },
        services: {
            label: "Serviços",
            title: "O que eu faço",
            items: {
                s01: { title: "Identidade & Branding", description: "Construção de sistemas visuais coerentes, do conceito às regras de aplicação da marca." },
                s02: { title: "Design de Logotipos", description: "Marcas e monogramas com personalidade, versáteis para o digital e o impresso." },
                s03: { title: "Conteúdo para Redes", description: "Publicações e campanhas padronizadas, com estética consistente e tom de voz alinhado." },
                s04: { title: "Apresentações & Slides", description: "Layouts executivos e educacionais que aliam storytelling à clareza da informação." },
                s05: { title: "Design Visual & Digital", description: "Peças digitais de alto impacto para engajamento, marketing e educação corporativa." },
                s06: { title: "Packaging", description: "Soluções de embalagem que traduzem o valor do produto na primeira impressão." },
                s07: { title: "Web Design", description: "Interfaces e páginas com hierarquia visual clara e experiência bem cuidada." },
                s08: { title: "Animação", description: "Movimento pontual que dá vida às peças e reforça a mensagem da marca." },
            },
        },
        visualSystem: {
            label: "Linguagem",
            title: "Sistema visual",
            note: "Um recorte do vocabulário estético que aplico nos projetos — cor, tipo e composição. ",
            noteSwap: "↳ espaço reservado para portfólio de peças reais",
            markTag: "MONOGRAMA",
            markCaption: "Marca pessoal · construção geométrica",
            paletteTag: "PALETA",
            paletteCaption: "Sistema cromático · contraste & energia",
            typeTag: "TIPOGRAFIA",
            typeCaption: "Escala tipográfica · hierarquia clara",
            specimenTitle: "Título",
            specimenSubtitle: "Subtítulo",
            specimenBody: "corpo de texto · 01",
            compTag: "COMPOSIÇÃO",
            compCaption: "Grid & ritmo · post para redes",
        },
        timeline: {
            label: "Trajetória",
            title: "Experiência & formação",
            experiences: {
                e1: {
                    when: "Jan 2026 — Atual",
                    role: "Designer Gráfica",
                    org: "Feel Tech RH & Feel Academy · Freelance · Remoto",
                    description: "Responsável pelo ecossistema visual das marcas: design para redes, apresentações corporativas e integração pioneira de IA generativa ao fluxo criativo.",
                },
                e2: {
                    when: "Ago 2023 — Atual",
                    role: "Organização de Eventos",
                    org: "Garapuvu Café & Bistrô · Contrato · Florianópolis",
                    description: "Preparação e execução de coffee breaks em ambiente hoteleiro, atendimento ao público e gestão de pedidos.",
                },
            },
            skills: [
                "Design gráfico", "Identidade visual", "Design de logotipos",
                "Marketing de mídias sociais", "Storytelling", "Canva", "IA generativa",
            ],
        },
        contact: {
            label: "Contato",
            titlePre: "Tem uma marca para ",
            titleHl: "dar vida?",
            lead: "Vamos transformar suas ideias em design de alto impacto. Me chame para conversar sobre o seu projeto.",
            ctaEmail: "Enviar e-mail",
            ctaLinkedin: "LinkedIn ↗",
            facts: {
                where: { label: "Onde", value: "Florianópolis, Santa Catarina — Brasil" },
                model: { label: "Modelo", value: "Remoto & presencial" },
                languages: { label: "Idiomas", value: "Português" },
            },
        },
        footer: {
            copyright: "Kesia Silva · Designer Gráfica · Florianópolis, Brasil",
            backToTop: "Voltar ao topo ↑",
        },
    },
};

export default ptBr;
```

> `<s>...</s>` marca trechos que no original são `<strong>`; renderizados via `<Trans>` nas Tasks 12 (About). As certificações (issuer/título/data) ficam em `data/certifications.ts` (Task 4) pois misturam nomes próprios e datas.

- [ ] **Step 6: Rodar (deve passar)** — `npm test -- i18n` → PASS.

- [ ] **Step 7: Commit**

```bash
git add src/i18n
git commit -m "feat: i18n react-i18next + locale pt-BR completo"
```

---

### Task 4: Tipos e dados estruturados

**Files:**
- Create: `src/types/index.ts`, `src/data/{nav,services,experiences,certifications,skills,palette,contactFacts}.ts`
- Test: `src/data/data.test.ts`

**Interfaces:**
- Produces (tipos):
```ts
export type ButtonVariant = "solid" | "ghost" | "outline";
export type ButtonSize = "md" | "lg";
export interface NavItem { href: string; labelKey: string; cta?: boolean; }
export interface Service { idx: string; key: string; }        // key → services.items.<key>
export interface ExperienceEntryData { key: string; }         // key → timeline.experiences.<key>
export interface Certification { id: string; by: string; titleKey: string; dateKey: string; }
export interface Swatch { name: string; hex: string; }
export interface ContactFactData { key: string; }             // key → contact.facts.<key>
```
- Produces (dados): `nav`, `services`, `experiences`, `certifications`, `palette`, `contactFacts` (default exports). `skills`/`marquee` vêm do i18n (arrays), não de `data/`.

- [ ] **Step 1: Escrever `src/data/data.test.ts`**

```ts
import services from "./services";
import palette from "./palette";
import certifications from "./certifications";
import nav from "./nav";

test("há 8 serviços com idx S/0x", () => {
    expect(services).toHaveLength(8);
    expect(services[0].idx).toBe("S/01");
});

test("paleta tem as 4 cores do design", () => {
    expect(palette.map((c) => c.hex)).toEqual(
        ["#1B1220", "#FF4B3E", "#0FB6A2", "#F4B740"]
    );
});

test("3 certificações e nav com CTA de contato", () => {
    expect(certifications).toHaveLength(3);
    expect(nav.find((n) => n.cta)?.href).toBe("#contato");
});
```

- [ ] **Step 2: Rodar (deve falhar)** — `npm test -- data` → FAIL.

- [ ] **Step 3: Criar `src/types/index.ts`** (conteúdo do bloco Interfaces acima).

- [ ] **Step 4: Criar os arquivos de dados**

`src/data/nav.ts`:
```ts
import type { NavItem } from "@/types";

const nav: NavItem[] = [
    { href: "#sobre", labelKey: "header.about" },
    { href: "#servicos", labelKey: "header.services" },
    { href: "#trabalho", labelKey: "header.language" },
    { href: "#trajetoria", labelKey: "header.journey" },
    { href: "#contato", labelKey: "header.contact", cta: true },
];

export default nav;
```

`src/data/services.ts`:
```ts
import type { Service } from "@/types";

const services: Service[] = [
    { idx: "S/01", key: "s01" },
    { idx: "S/02", key: "s02" },
    { idx: "S/03", key: "s03" },
    { idx: "S/04", key: "s04" },
    { idx: "S/05", key: "s05" },
    { idx: "S/06", key: "s06" },
    { idx: "S/07", key: "s07" },
    { idx: "S/08", key: "s08" },
];

export default services;
```

`src/data/experiences.ts`:
```ts
import type { ExperienceEntryData } from "@/types";

const experiences: ExperienceEntryData[] = [{ key: "e1" }, { key: "e2" }];

export default experiences;
```

`src/data/certifications.ts`:
```ts
import type { Certification } from "@/types";

const certifications: Certification[] = [
    { id: "pucrs", by: "PUC-RS", titleKey: "History of Design", dateKey: "Curso de extensão · 2026" },
    { id: "bradesco", by: "Bradesco", titleKey: "Fundamentos do Design Gráfico", dateKey: "Certificação · 2026" },
    { id: "santander", by: "Santander", titleKey: "Storytelling para Marketing Digital", dateKey: "Certificação" },
];

export default certifications;
```
> `titleKey`/`dateKey` aqui carregam o texto literal (nomes de cursos/instituições são fixos em qualquer idioma). Ajustar o primeiro título para "História do Design" (o original usa PT).

`src/data/palette.ts`:
```ts
import type { Swatch } from "@/types";

const palette: Swatch[] = [
    { name: "Ameixa", hex: "#1B1220" },
    { name: "Coral", hex: "#FF4B3E" },
    { name: "Água", hex: "#0FB6A2" },
    { name: "Ouro", hex: "#F4B740" },
];

export default palette;
```

`src/data/contactFacts.ts`:
```ts
import type { ContactFactData } from "@/types";

const contactFacts: ContactFactData[] = [
    { key: "where" }, { key: "model" }, { key: "languages" },
];

export default contactFacts;
```

> Corrigir `certifications.ts`: primeiro item `titleKey: "História do Design"`.

- [ ] **Step 5: Rodar (deve passar)** — `npm test -- data` → PASS.

- [ ] **Step 6: Commit**

```bash
git add src/types src/data
git commit -m "feat: tipos e dados estruturados (nav, serviços, paleta, etc.)"
```

---

### Task 5: Config via env

**Files:**
- Create: `src/config/config.ts`, `src/config/index.ts`
- Test: `src/config/config.test.ts`

**Interfaces:**
- Produces: `config` (default) e named `{ email, linkedin }`.
```ts
config.email.address: string
config.linkedin.url: string
```

- [ ] **Step 1: Escrever `src/config/config.test.ts`**

```ts
import config from "./index";

test("fornece email e linkedin com defaults", () => {
    expect(config.email.address).toContain("@");
    expect(config.linkedin.url).toMatch(/^https?:\/\//);
});
```

- [ ] **Step 2: Rodar (deve falhar)** — `npm test -- config` → FAIL.

- [ ] **Step 3: Criar `src/config/config.ts`**

```ts
export const email = {
    address: import.meta.env.VITE_EMAIL ?? "contato@kesiasilva.design",
};

export const linkedin = {
    url: import.meta.env.VITE_URL_LINKEDIN ?? "https://www.linkedin.com/",
};

const config = { email, linkedin };

export default config;
```

- [ ] **Step 4: Criar `src/config/index.ts`**

```ts
export { default } from "./config";
export * from "./config";
```

- [ ] **Step 5: Rodar (deve passar)** — `npm test -- config` → PASS.

- [ ] **Step 6: Commit**

```bash
git add src/config
git commit -m "feat: config de contato via env (VITE_*)"
```

---

### Task 6: Hooks e componente Reveal

**Files:**
- Create: `src/hooks/useReveal.ts`, `src/hooks/useCurrentYear.ts`, `src/components/Reveal/Reveal.tsx`, `src/components/Reveal/index.ts`
- Test: `src/hooks/useReveal.test.tsx`, `src/hooks/useCurrentYear.test.ts`

**Interfaces:**
- Produces:
```ts
// useReveal({ threshold?, once? }) => React.RefObject<HTMLElement>
// useCurrentYear() => number
// <Reveal as? tag, className?, delay?, ...>{children}</Reveal> — envolve num elemento com data-reveal + ref de useReveal
```
- `Reveal` props: `as?: keyof JSX.IntrinsicElements` (default `"div"`), `className?`, `delay?: number` (ms), demais props repassadas ao elemento.

- [ ] **Step 1: Escrever `src/hooks/useCurrentYear.test.ts`**

```ts
import { renderHook } from "@testing-library/react";
import useCurrentYear from "./useCurrentYear";

test("retorna o ano corrente", () => {
    const { result } = renderHook(() => useCurrentYear());
    expect(result.current).toBe(new Date().getFullYear());
});
```

- [ ] **Step 2: Escrever `src/hooks/useReveal.test.tsx`** (cobre Review Focus: reduced-motion e ausência de IntersectionObserver)

```tsx
import { render } from "@testing-library/react";
import Reveal from "@/components/Reveal";

const originalIO = window.IntersectionObserver;

afterEach(() => {
    window.IntersectionObserver = originalIO;
    window.matchMedia = undefined as unknown as typeof window.matchMedia;
});

test("sem IntersectionObserver, revela imediatamente", () => {
    // @ts-expect-error força ambiente sem IO
    delete window.IntersectionObserver;
    window.matchMedia = ((q: string) => ({
        matches: false, media: q, addEventListener() {}, removeEventListener() {},
    })) as unknown as typeof window.matchMedia;

    const { container } = render(<Reveal>conteúdo</Reveal>);
    expect(container.firstChild).toHaveClass("is-visible");
});

test("com prefers-reduced-motion, revela imediatamente", () => {
    window.matchMedia = ((q: string) => ({
        matches: q.includes("reduce"), media: q,
        addEventListener() {}, removeEventListener() {},
    })) as unknown as typeof window.matchMedia;

    const { container } = render(<Reveal>conteúdo</Reveal>);
    expect(container.firstChild).toHaveClass("is-visible");
});
```

- [ ] **Step 3: Rodar (deve falhar)** — `npm test -- useReveal useCurrentYear` → FAIL.

- [ ] **Step 4: Criar `src/hooks/useCurrentYear.ts`**

```ts
const useCurrentYear = (): number => new Date().getFullYear();

export default useCurrentYear;
```

- [ ] **Step 5: Criar `src/hooks/useReveal.ts`**

```ts
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
```

- [ ] **Step 6: Criar `src/components/Reveal/Reveal.tsx`**

```tsx
import { createElement, type ReactNode } from "react";
import useReveal from "@/hooks/useReveal";

interface RevealProps {
    as?: keyof JSX.IntrinsicElements;
    className?: string;
    delay?: number;
    children: ReactNode;
    [key: string]: unknown;
}

const Reveal = ({ as = "div", className, delay, children, ...rest }: RevealProps) => {
    const ref = useReveal();
    return createElement(
        as,
        {
            ref,
            "data-reveal": "",
            className,
            style: delay ? { transitionDelay: `${delay}ms` } : undefined,
            ...rest,
        },
        children
    );
};

export default Reveal;
```

`src/components/Reveal/index.ts`:
```ts
export { default } from "./Reveal";
```

- [ ] **Step 7: Rodar (deve passar)** — `npm test -- useReveal useCurrentYear` → PASS.

- [ ] **Step 8: Commit**

```bash
git add src/hooks src/components/Reveal
git commit -m "feat: hooks useReveal/useCurrentYear + componente Reveal"
```

---

### Task 7: Atoms

**Files:**
- Create (cada um com `X.tsx` + `index.ts`): `src/components/atoms/{Button,Tag,Chip,Swatch,BrandMark,SkipLink,Highlight}/`
- Test: `src/components/atoms/atoms.test.tsx`

**Interfaces:**
- Produces:
```tsx
<Button href variant="solid|ghost|outline" size="md|lg" target? rel? >label</Button>
<Tag className?>children</Tag>              // pílula mono .tag
<Chip>children</Chip>                        // chip de skill
<Swatch color hex name />                    // amostra de cor
<BrandMark className? >text?="KS"</BrandMark>
<SkipLink href="#sobre">children</SkipLink>
<Highlight coral?>children</Highlight>       // .hl (default) ou .hl-coral
```

- [ ] **Step 1: Escrever `src/components/atoms/atoms.test.tsx`** (cobre Review Focus do Button)

```tsx
import { render, screen } from "@testing-library/react";
import Button from "./Button";
import Highlight from "./Highlight";

test("Button aplica variante e tamanho e é um link", () => {
    render(<Button href="#contato" variant="solid" size="lg">Ir</Button>);
    const link = screen.getByRole("link", { name: "Ir" });
    expect(link).toHaveAttribute("href", "#contato");
    expect(link.className).toMatch(/bg-coral/);
});

test("Button ghost/outline têm classes distintas de solid", () => {
    const { rerender } = render(<Button href="#a" variant="ghost">g</Button>);
    const ghost = screen.getByRole("link").className;
    rerender(<Button href="#a" variant="outline">o</Button>);
    const outline = screen.getByRole("link").className;
    expect(ghost).not.toBe(outline);
});

test("Highlight coral usa a classe hl-coral", () => {
    const { container } = render(<Highlight coral>x</Highlight>);
    expect(container.firstChild).toHaveClass("hl-coral");
});
```

- [ ] **Step 2: Rodar (deve falhar)** — `npm test -- atoms` → FAIL.

- [ ] **Step 3: Implementar `Button`** (`src/components/atoms/Button/Button.tsx`)

Mapeia `.btn`, `.btn--solid/ghost/outline`, `.btn--lg` (styles.css 109-123) para Tailwind + transição `ease-brand`:

```tsx
import type { ReactNode } from "react";
import type { ButtonVariant, ButtonSize } from "@/types";

interface ButtonProps {
    href: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    target?: string;
    rel?: string;
    children: ReactNode;
}

const base =
    "inline-flex items-center gap-2 font-body font-medium rounded-full border border-transparent " +
    "cursor-pointer transition-[transform,background-color,color,border-color] duration-200 ease-brand " +
    "hover:-translate-y-0.5";

const sizes: Record<ButtonSize, string> = {
    md: "px-6 py-[0.85rem] text-[0.98rem]",
    lg: "px-[1.9rem] py-4 text-[1.05rem]",
};

const variants: Record<ButtonVariant, string> = {
    solid: "bg-coral text-paper hover:bg-[#ff3524]",
    ghost: "border-current text-current hover:bg-ink hover:text-paper hover:border-ink",
    outline: "border-paper text-paper hover:bg-paper hover:text-ink",
};

const Button = ({ href, variant = "solid", size = "md", target, rel, children }: ButtonProps) => (
    <a href={href} target={target} rel={rel} className={`${base} ${sizes[size]} ${variants[variant]}`}>
        {children}
    </a>
);

export default Button;
```
`index.ts`: `export { default } from "./Button";`

- [ ] **Step 4: Implementar `Tag`** (styles.css 126-131)

```tsx
import type { ReactNode } from "react";

interface TagProps { children: ReactNode; className?: string; }

const Tag = ({ children, className = "" }: TagProps) => (
    <span
        className={
            "font-mono text-[0.72rem] tracking-[0.04em] uppercase px-[0.7rem] py-[0.35rem] " +
            "border border-current rounded-full opacity-85 " + className
        }
    >
        {children}
    </span>
);

export default Tag;
```
`index.ts`: `export { default } from "./Tag";`

- [ ] **Step 5: Implementar `Chip`** (styles.css 384-389)

```tsx
import type { ReactNode } from "react";

const Chip = ({ children }: { children: ReactNode }) => (
    <span className="text-[0.88rem] px-[1.05rem] py-2 border border-line rounded-full transition-[background-color,color,border-color] duration-200 ease-brand hover:bg-teal hover:border-teal hover:text-paper">
        {children}
    </span>
);

export default Chip;
```
`index.ts`: `export { default } from "./Chip";`

- [ ] **Step 6: Implementar `Swatch`** (styles.css 320-329) — fundo dinâmico via `style`; texto escuro quando ouro/água

```tsx
import type { Swatch as SwatchModel } from "@/types";

const darkText = new Set(["#F4B740", "#0FB6A2"]);

const Swatch = ({ name, hex }: SwatchModel) => {
    const dark = darkText.has(hex);
    return (
        <span
            className={`flex flex-col gap-[0.15rem] justify-end aspect-[1.4] p-[0.6rem] rounded-[0.6rem] border border-line-dark ${dark ? "text-ink" : "text-paper"}`}
            style={{ background: hex }}
        >
            <b className="text-[0.82rem] font-semibold">{name}</b>
            <i className={`font-mono text-[0.62rem] not-italic ${dark ? "opacity-65" : "opacity-80"}`}>{hex}</i>
        </span>
    );
};

export default Swatch;
```
`index.ts`: `export { default } from "./Swatch";`

- [ ] **Step 7: Implementar `BrandMark`** (styles.css 82-89) e `SkipLink` e `Highlight`

`BrandMark/BrandMark.tsx`:
```tsx
interface BrandMarkProps { text?: string; className?: string; }

const BrandMark = ({ text = "KS", className = "" }: BrandMarkProps) => (
    <span
        aria-hidden="true"
        className={`grid place-items-center w-[2.1rem] h-[2.1rem] bg-coral text-paper font-display font-extrabold text-[0.9rem] rounded-[0.55rem] tracking-[-0.03em] ${className}`}
    >
        {text}
    </span>
);

export default BrandMark;
```

`SkipLink/SkipLink.tsx`:
```tsx
import type { ReactNode } from "react";

const SkipLink = ({ href = "#sobre", children }: { href?: string; children: ReactNode }) => (
    <a className="skip-link" href={href}>{children}</a>
);

export default SkipLink;
```

`Highlight/Highlight.tsx`:
```tsx
import type { ReactNode } from "react";

const Highlight = ({ coral = false, children }: { coral?: boolean; children: ReactNode }) => (
    <span className={coral ? "hl-coral" : "hl"}>{children}</span>
);

export default Highlight;
```
Cada pasta com seu `index.ts` de barrel.

- [ ] **Step 8: Rodar (deve passar)** — `npm test -- atoms` → PASS.

- [ ] **Step 9: Commit**

```bash
git add src/components/atoms
git commit -m "feat: atoms (Button, Tag, Chip, Swatch, BrandMark, SkipLink, Highlight)"
```

---

### Task 8: Molecules — parte 1 (Brand, SectionLabel, NavLinks, HeroSpec, Marquee)

**Files:**
- Create: `src/components/molecules/{Brand,SectionLabel,NavLinks,HeroSpec,Marquee}/`
- Test: `src/components/molecules/molecules1.test.tsx`

**Interfaces:**
- Produces:
```tsx
<Brand />                                     // <a href="#top"> BrandMark + nome
<SectionLabel index="01" light? >texto</SectionLabel>
<NavLinks />                                  // usa data/nav + i18n; CTA estilizado
<HeroSpec />                                  // <dl> com 3 specs do i18n
<Marquee />                                   // faixa animada aria-hidden (i18n hero.marquee)
```

- [ ] **Step 1: Escrever `src/components/molecules/molecules1.test.tsx`** (cobre Review Focus do Marquee)

```tsx
import { render, screen } from "@testing-library/react";
import "@/i18n";
import Marquee from "./Marquee";
import NavLinks from "./NavLinks";

test("Marquee é decorativo mas contém os termos", () => {
    const { container } = render(<Marquee />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
    expect(container.textContent).toContain("Identidade Visual");
});

test("NavLinks renderiza o CTA de contato", () => {
    render(<NavLinks />);
    expect(screen.getByRole("link", { name: "Contato" })).toHaveAttribute("href", "#contato");
});
```

- [ ] **Step 2: Rodar (deve falhar)** — `npm test -- molecules1` → FAIL.

- [ ] **Step 3: Implementar `Brand`** (styles.css 81-90; markup index.html 28-31)

```tsx
import { useTranslation } from "react-i18next";
import BrandMark from "@/components/atoms/BrandMark";

const Brand = () => {
    const { t } = useTranslation();
    return (
        <a className="flex items-center gap-[0.6rem]" href="#top" aria-label={`${t("hero.firstName")} ${t("hero.lastName")} — início`}>
            <BrandMark />
            <span className="font-display font-bold text-[1.05rem] tracking-[-0.02em]">
                {t("hero.firstName")} {t("hero.lastName")}
            </span>
        </a>
    );
};

export default Brand;
```

- [ ] **Step 4: Implementar `SectionLabel`** (styles.css 219-230; markup ex. index.html 87)

```tsx
import type { ReactNode } from "react";

interface SectionLabelProps { index: string; light?: boolean; children: ReactNode; }

const SectionLabel = ({ index, light = false, children }: SectionLabelProps) => (
    <div className={`font-mono text-[0.78rem] uppercase tracking-[0.1em] flex items-center gap-[0.7rem] mb-[clamp(1.5rem,4vw,2.75rem)] ${light ? "text-paper/65" : "text-muted"}`}>
        <span className={`text-coral font-medium border rounded-full px-[0.6rem] py-[0.15rem] ${light ? "border-line-dark" : "border-line"}`}>{index}</span>
        {children}
    </div>
);

export default SectionLabel;
```

- [ ] **Step 5: Implementar `NavLinks`** (styles.css 92-104; markup index.html 32-38) — usa `data/nav` + i18n; CTA com estilo pill

```tsx
import { useTranslation } from "react-i18next";
import nav from "@/data/nav";

const NavLinks = () => {
    const { t } = useTranslation();
    return (
        <nav className="flex items-center gap-[clamp(0.9rem,2vw,1.75rem)]" aria-label="Navegação principal">
            {nav.map((item) =>
                item.cta ? (
                    <a key={item.href} href={item.href} className="text-ink font-medium border border-ink rounded-full px-4 py-[0.4rem] transition-[background-color,color] duration-200 ease-brand hover:bg-ink hover:text-paper">
                        {t(item.labelKey)}
                    </a>
                ) : (
                    <a key={item.href} href={item.href} className="text-[0.9rem] text-muted transition-colors duration-200 ease-brand hover:text-ink max-[720px]:hidden">
                        {t(item.labelKey)}
                    </a>
                )
            )}
        </nav>
    );
};

export default NavLinks;
```

- [ ] **Step 6: Implementar `HeroSpec`** (styles.css 183-186; markup index.html 62-66)

```tsx
import { useTranslation } from "react-i18next";

const rows = [
    ["hero.specFocusLabel", "hero.specFocusValue"],
    ["hero.specFormatsLabel", "hero.specFormatsValue"],
    ["hero.specProcessLabel", "hero.specProcessValue"],
] as const;

const HeroSpec = () => {
    const { t } = useTranslation();
    return (
        <dl className="flex flex-col gap-[0.9rem] m-0" aria-label="Especialidades">
            {rows.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 border-t border-line-dark pt-[0.55rem]">
                    <dt className="font-mono text-[0.72rem] uppercase tracking-[0.05em] text-muted">{t(label)}</dt>
                    <dd className="m-0 text-[0.9rem] text-right">{t(value)}</dd>
                </div>
            ))}
        </dl>
    );
};

export default HeroSpec;
```

- [ ] **Step 7: Implementar `Marquee`** (styles.css 194-213; markup index.html 73-82) — duplica os termos para loop contínuo; separador `◦`

```tsx
import { useTranslation } from "react-i18next";

const Marquee = () => {
    const { t } = useTranslation();
    const terms = t("hero.marquee", { returnObjects: true }) as string[];
    const loop = [...terms, ...terms]; // duas cópias → translateX(-50%) contínuo

    return (
        <div aria-hidden="true" className="relative border-t border-line-dark py-[1.1rem] -mx-[var(--gut)] overflow-hidden marquee-mask">
            <div className="inline-flex items-center gap-8 whitespace-nowrap font-display font-semibold text-[clamp(1rem,2.2vw,1.6rem)] animate-marquee">
                {loop.map((term, i) => (
                    <span key={i} className="flex items-center gap-8">
                        <span className={i % 2 === 1 ? "text-coral" : undefined}>{term}</span>
                        <span aria-hidden="true">◦</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
```
> A alternância coral (styles.css 211 usa `:nth-child(even)`); aqui aproxima com `i % 2`. Validar visualmente na Task 20.

Cada pasta com barrel `index.ts`.

- [ ] **Step 8: Rodar (deve passar)** — `npm test -- molecules1` → PASS.

- [ ] **Step 9: Commit**

```bash
git add src/components/molecules
git commit -m "feat: molecules parte 1 (Brand, SectionLabel, NavLinks, HeroSpec, Marquee)"
```

---

### Task 9: Molecules — parte 2 (ServiceCard, ExperienceEntry, CertCard, ContactFact, Swatches, Specimen, Composition)

**Files:**
- Create: `src/components/molecules/{ServiceCard,ExperienceEntry,CertCard,ContactFact,Swatches,Specimen,Composition}/`
- Test: `src/components/molecules/molecules2.test.tsx`

**Interfaces:**
- Produces:
```tsx
<ServiceCard idx="S/01" titleKey descriptionKey />   // <li>
<ExperienceEntry entryKey="e1" />                     // <li> quando/role/org/desc
<CertCard by titleKey dateKey />                       // <li>
<ContactFact factKey="where" />                        // <li>
<Swatches />                                           // grid 2x2 de Swatch (data/palette)
<Specimen />                                            // Aa + escala tipográfica
<Composition />                                         // formas absolutas decorativas
```

- [ ] **Step 1: Escrever `src/components/molecules/molecules2.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import "@/i18n";
import ServiceCard from "./ServiceCard";
import Swatches from "./Swatches";

test("ServiceCard mostra idx, título e descrição", () => {
    render(<ServiceCard idx="S/01" titleKey="services.items.s01.title" descriptionKey="services.items.s01.description" />);
    expect(screen.getByText("S/01")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Identidade & Branding" })).toBeInTheDocument();
});

test("Swatches renderiza as 4 cores da paleta", () => {
    render(<Swatches />);
    expect(screen.getByText("Ameixa")).toBeInTheDocument();
    expect(screen.getByText("Ouro")).toBeInTheDocument();
});
```

- [ ] **Step 2: Rodar (deve falhar)** — `npm test -- molecules2` → FAIL.

- [ ] **Step 3: Implementar `ServiceCard`** (styles.css 265-275; markup index.html 120)

```tsx
import { useTranslation } from "react-i18next";

interface ServiceCardProps { idx: string; titleKey: string; descriptionKey: string; }

const ServiceCard = ({ idx, titleKey, descriptionKey }: ServiceCardProps) => {
    const { t } = useTranslation();
    return (
        <li className="p-[clamp(1.5rem,3vw,2.25rem)] border-r border-b border-line-dark flex flex-col gap-[0.6rem] transition-colors duration-300 ease-brand hover:bg-ink-80 min-h-[13rem] max-[520px]:min-h-0">
            <span className="font-mono text-[0.72rem] text-teal tracking-[0.05em]">{idx}</span>
            <h3 className="text-[1.25rem] mt-auto">{t(titleKey)}</h3>
            <p className="text-[0.92rem] text-paper/70 leading-[1.5]">{t(descriptionKey)}</p>
        </li>
    );
};

export default ServiceCard;
```

- [ ] **Step 4: Implementar `ExperienceEntry`** (styles.css 362-371; markup index.html 197-204)

```tsx
import { useTranslation } from "react-i18next";

const ExperienceEntry = ({ entryKey }: { entryKey: string }) => {
    const { t } = useTranslation();
    const base = `timeline.experiences.${entryKey}`;
    return (
        <li className="grid grid-cols-[minmax(9rem,auto)_1fr] gap-6 py-7 border-t border-line last:border-b max-[520px]:grid-cols-1 max-[520px]:gap-2">
            <div className="font-mono text-[0.8rem] text-coral pt-[0.35rem]">{t(`${base}.when`)}</div>
            <div>
                <h3 className="text-[1.5rem] mb-[0.3rem]">{t(`${base}.role`)}</h3>
                <p className="text-[0.9rem] text-muted mb-[0.7rem]">{t(`${base}.org`)}</p>
                <p className="text-[0.95rem] text-ink/80">{t(`${base}.description`)}</p>
            </div>
        </li>
    );
};

export default ExperienceEntry;
```

- [ ] **Step 5: Implementar `CertCard`** (styles.css 373-381; markup index.html 216-218)

```tsx
interface CertCardProps { by: string; titleKey: string; dateKey: string; }

const CertCard = ({ by, titleKey, dateKey }: CertCardProps) => (
    <li className="bg-ink text-paper px-[1.4rem] py-5 rounded-[0.9rem] flex flex-col gap-1">
        <span className="font-mono text-[0.72rem] text-gold tracking-[0.05em] uppercase">{by}</span>
        <h3 className="text-[1.1rem]">{titleKey}</h3>
        <span className="text-[0.8rem] text-paper/60">{dateKey}</span>
    </li>
);

export default CertCard;
```
> `titleKey`/`dateKey` já vêm com o texto literal de `data/certifications.ts`.

- [ ] **Step 6: Implementar `ContactFact`** (styles.css 407-408; markup index.html 248-250)

```tsx
import { useTranslation } from "react-i18next";

const ContactFact = ({ factKey }: { factKey: string }) => {
    const { t } = useTranslation();
    const base = `contact.facts.${factKey}`;
    return (
        <li className="flex flex-col gap-1 text-[0.95rem] text-left">
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.06em] text-teal">{t(`${base}.label`)}</span>
            {t(`${base}.value`)}
        </li>
    );
};

export default ContactFact;
```

- [ ] **Step 7: Implementar `Swatches`, `Specimen`, `Composition`**

`Swatches` (styles.css 319-329; markup index.html 153-158):
```tsx
import Swatch from "@/components/atoms/Swatch";
import palette from "@/data/palette";

const Swatches = () => (
    <div className="grid grid-cols-2 gap-[0.6rem] my-auto">
        {palette.map((c) => <Swatch key={c.hex} {...c} />)}
    </div>
);

export default Swatches;
```

`Specimen` (styles.css 332-337; markup index.html 165-172):
```tsx
import { useTranslation } from "react-i18next";

const Specimen = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col gap-4 my-auto">
            <span className="font-display font-extrabold text-[clamp(4.5rem,11vw,7rem)] leading-[0.85] text-ink">Aa</span>
            <div className="flex flex-col gap-[0.2rem]">
                <span className="font-display font-bold text-[1.4rem]">{t("visualSystem.specimenTitle")}</span>
                <span className="font-display font-medium text-[1.05rem] text-coral">{t("visualSystem.specimenSubtitle")}</span>
                <span className="font-mono text-[0.78rem] text-muted">{t("visualSystem.specimenBody")}</span>
            </div>
        </div>
    );
};

export default Specimen;
```

`Composition` (styles.css 342-347; markup index.html 179-184) — decorativo:
```tsx
const Composition = () => (
    <div className="relative my-auto h-40" aria-hidden="true">
        <span className="absolute w-[5.5rem] h-[5.5rem] rounded-full bg-gold top-4 left-4" />
        <span className="absolute w-12 h-32 bg-ink right-6 top-2 rounded-[1.5rem]" />
        <span className="absolute w-8 h-8 rounded-full bg-coral bottom-2 left-14" />
        <span className="absolute w-16 h-16 rounded-full border-[6px] border-paper bottom-0 right-2" />
    </div>
);

export default Composition;
```
Cada pasta com barrel `index.ts`.

- [ ] **Step 8: Rodar (deve passar)** — `npm test -- molecules2` → PASS.

- [ ] **Step 9: Commit**

```bash
git add src/components/molecules
git commit -m "feat: molecules parte 2 (cards, swatches, specimen, composition)"
```

---

### Task 10: Organism Header

**Files:**
- Create: `src/components/organisms/Header/Header.tsx`, `index.ts`
- Test: `src/components/organisms/Header/Header.test.tsx`

**Interfaces:**
- Consumes: `Brand`, `NavLinks`.
- Produces: `<Header />` — `<header>` sticky com id `top`.

Markup de referência: `index.html` 27-39. Estilo: `styles.css` 72-80 (sticky, blur, borda, `padding: 1rem var(--gut)`).

- [ ] **Step 1: Escrever `Header.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import "@/i18n";
import Header from "./Header";

test("Header tem id top e a marca", () => {
    const { container } = render(<Header />);
    expect(container.querySelector("header#top")).toBeInTheDocument();
    expect(screen.getByText(/Kesia/)).toBeInTheDocument();
});
```

- [ ] **Step 2: Rodar (deve falhar)** — FAIL.

- [ ] **Step 3: Implementar `Header.tsx`**

```tsx
import Brand from "@/components/molecules/Brand";
import NavLinks from "@/components/molecules/NavLinks";

const Header = () => (
    <header
        id="top"
        className="sticky top-0 z-50 flex items-center justify-between gap-4 px-[var(--gut)] py-4 backdrop-blur-md border-b border-line"
        style={{ background: "color-mix(in srgb, var(--paper) 82%, transparent)" }}
    >
        <Brand />
        <NavLinks />
    </header>
);

export default Header;
```
`index.ts`: `export { default } from "./Header";`

- [ ] **Step 4: Rodar (deve passar)** — PASS.

- [ ] **Step 5: Commit** — `git commit -m "feat: organism Header"`

---

### Task 11: Organism Hero

**Files:**
- Create: `src/components/organisms/Hero/Hero.tsx`, `index.ts`
- Test: `src/components/organisms/Hero/Hero.test.tsx`

**Interfaces:**
- Consumes: `Tag`, `HeroSpec`, `Button`, `Marquee`.
- Produces: `<Hero />` — `<section class hero>` (fundo ink, min-h ~92vh).

Markup: `index.html` 43-83. Estilo: `styles.css` 139-192 (hero, grid decorativo `.hero-grid`, nome com clamp gigante, foot em grid 1.3fr/1fr, accent coral com `◦` teal).

- [ ] **Step 1: Escrever `Hero.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import "@/i18n";
import Hero from "./Hero";

test("Hero mostra nome e CTAs", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Kesia");
    expect(screen.getByRole("link", { name: "Vamos criar juntos" })).toHaveAttribute("href", "#contato");
    expect(screen.getByRole("link", { name: "Ver linguagem visual" })).toHaveAttribute("href", "#trabalho");
});
```

- [ ] **Step 2: Rodar (deve falhar)** — FAIL.

- [ ] **Step 3: Implementar `Hero.tsx`**

Estrutura (traduzir markup index.html 43-83 para Tailwind + tokens; usar `Tag`, `HeroSpec`, `Button`, `Marquee`):

```tsx
import { useTranslation } from "react-i18next";
import Tag from "@/components/atoms/Tag";
import HeroSpec from "@/components/molecules/HeroSpec";
import Button from "@/components/atoms/Button";
import Marquee from "@/components/molecules/Marquee";

const Hero = () => {
    const { t } = useTranslation();
    return (
        <section aria-labelledby="hero-name" className="relative bg-ink text-paper px-[var(--gut)] pt-[clamp(3rem,8vw,6rem)] min-h-[92vh] flex flex-col justify-between overflow-hidden">
            <div className="hero-grid" aria-hidden="true" />

            <div className="relative flex flex-wrap gap-[0.6rem] text-paper [&_.opacity-85]:opacity-75">
                <Tag>{t("hero.tagRole")}</Tag>
                <Tag>{t("hero.tagLocation")}</Tag>
                <Tag>{t("hero.tagAvailable")}</Tag>
            </div>

            <h1 id="hero-name" className="relative font-extrabold tracking-[-0.045em] my-[clamp(1.5rem,4vw,3rem)] flex flex-col text-[clamp(4.5rem,21vw,20rem)]">
                <span className="block leading-[0.86]">{t("hero.firstName")}</span>
                <span className="block leading-[0.86] text-coral after:content-['◦'] after:text-teal after:text-[0.35em] after:align-super after:ml-[0.15em]">
                    {t("hero.lastName")}
                </span>
            </h1>

            <div className="relative grid grid-cols-[1.3fr_1fr] gap-[clamp(1.5rem,4vw,3rem)] items-end pb-[clamp(2rem,5vw,3.5rem)] max-[760px]:grid-cols-1 max-[760px]:items-start">
                <p className="text-[clamp(1.15rem,1rem+0.9vw,1.6rem)] leading-[1.4] max-w-[30ch]">
                    {t("hero.statementPre")}<em className="text-gold italic">{t("hero.statementEm")}</em>{t("hero.statementPost")}
                </p>
                <HeroSpec />
                <div className="col-span-full flex flex-wrap gap-[0.8rem] mt-2">
                    <Button href="#contato" variant="solid">{t("hero.ctaPrimary")}</Button>
                    <Button href="#trabalho" variant="ghost">{t("hero.ctaSecondary")}</Button>
                </div>
            </div>

            <Marquee />
        </section>
    );
};

export default Hero;
```
> A opacidade das tags no hero (styles.css 157) é 0.75; se o seletor acima não pegar, aplicar `className="opacity-75"` via prop do `Tag`. Validar na Task 20.

`index.ts`: barrel.

- [ ] **Step 4: Rodar (deve passar)** — PASS.

- [ ] **Step 5: Commit** — `git commit -m "feat: organism Hero"`

---

### Task 12: Organism About

**Files:**
- Create: `src/components/organisms/About/About.tsx`, `index.ts`
- Test: `src/components/organisms/About/About.test.tsx`

**Interfaces:**
- Consumes: `SectionLabel`, `Highlight`, `Reveal`, `<Trans>` (react-i18next).
- Produces: `<About />` — `<section id="sobre">`.

Markup: `index.html` 86-113. Estilo: `styles.css` 218-251 (`.section`, `.about__lead`, `.about__cols` grid 3col). Os `<strong>` nos parágrafos (`<s>...</s>` no i18n) vêm via `<Trans>` com componente `s` → `<strong>`.

- [ ] **Step 1: Escrever `About.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import "@/i18n";
import About from "./About";

test("About tem id sobre, lead com highlight e nomes em negrito", () => {
    const { container } = render(<About />);
    expect(container.querySelector("section#sobre")).toBeInTheDocument();
    expect(screen.getByText("design de alto impacto")).toBeInTheDocument();
    expect(screen.getByText("Feel Tech RH").tagName).toBe("STRONG");
});
```

- [ ] **Step 2: Rodar (deve falhar)** — FAIL.

- [ ] **Step 3: Implementar `About.tsx`**

```tsx
import { Trans, useTranslation } from "react-i18next";
import SectionLabel from "@/components/molecules/SectionLabel";
import Highlight from "@/components/atoms/Highlight";
import Reveal from "@/components/Reveal";

const Paragraph = ({ k }: { k: string }) => (
    <p><Trans i18nKey={k} components={{ s: <strong className="font-semibold" /> }} /></p>
);

const About = () => {
    const { t } = useTranslation();
    return (
        <section id="sobre" aria-labelledby="about-title" className="px-[var(--gut)] py-[var(--sec)] relative">
            <Reveal><SectionLabel index="01">{t("about.label")}</SectionLabel></Reveal>
            <div>
                <Reveal as="h2" className="text-[clamp(1.6rem,1.1rem+2.6vw,3.4rem)] font-medium leading-[1.14] tracking-[-0.025em] max-w-[20ch] mb-[clamp(2.5rem,6vw,4rem)]">
                    <>{t("about.leadPre")}<Highlight>{t("about.leadHl")}</Highlight>{t("about.leadPost")}</>
                </Reveal>
                <Reveal className="grid grid-cols-3 gap-[clamp(1.5rem,4vw,3rem)] text-ink/80 border-t border-line pt-[clamp(1.5rem,4vw,2.5rem)] max-[820px]:grid-cols-1">
                    <Paragraph k="about.p1" />
                    <Paragraph k="about.p2" />
                    <Paragraph k="about.p3" />
                </Reveal>
            </div>
        </section>
    );
};

export default About;
```
> `Reveal as="h2"` precisa que `id="about-title"` exista para `aria-labelledby`. Passar `id="about-title"` como prop extra ao `Reveal` (repassada via `...rest`).

- [ ] **Step 4: Ajustar `Reveal` do h2 para incluir `id="about-title"`** e rodar o teste.

Run: `npm test -- About` → PASS.

- [ ] **Step 5: Commit** — `git commit -m "feat: organism About"`

---

### Task 13: Organism Services

**Files:**
- Create: `src/components/organisms/Services/Services.tsx`, `index.ts`
- Test: `src/components/organisms/Services/Services.test.tsx`

**Interfaces:**
- Consumes: `SectionLabel`, `ServiceCard`, `Reveal`, `data/services`.
- Produces: `<Services />` — `<section id="servicos">` fundo ink.

Markup: `index.html` 116-129. Estilo: `styles.css` 256-277 (fundo ink, grid 4col com bordas `line-dark`, label light).

- [ ] **Step 1: Escrever `Services.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import "@/i18n";
import Services from "./Services";

test("Services lista os 8 serviços", () => {
    const { container } = render(<Services />);
    expect(container.querySelector("section#servicos")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(8);
    expect(screen.getByRole("heading", { name: "Animação" })).toBeInTheDocument();
});
```

- [ ] **Step 2: Rodar (deve falhar)** — FAIL.

- [ ] **Step 3: Implementar `Services.tsx`**

```tsx
import { useTranslation } from "react-i18next";
import SectionLabel from "@/components/molecules/SectionLabel";
import ServiceCard from "@/components/molecules/ServiceCard";
import Reveal from "@/components/Reveal";
import services from "@/data/services";

const Services = () => {
    const { t } = useTranslation();
    return (
        <section id="servicos" aria-labelledby="services-title" className="bg-ink text-paper px-[var(--gut)] py-[var(--sec)] relative">
            <Reveal><SectionLabel index="02" light>{t("services.label")}</SectionLabel></Reveal>
            <h2 id="services-title" className="text-[clamp(2.25rem,1.5rem+3.4vw,4.75rem)] tracking-[-0.03em] mb-[clamp(2rem,5vw,3.5rem)]">{t("services.title")}</h2>
            <ul className="list-none m-0 p-0 grid grid-cols-4 border-t border-l border-line-dark max-[980px]:grid-cols-2 max-[520px]:grid-cols-1">
                {services.map((s) => (
                    <ServiceCard key={s.key} idx={s.idx} titleKey={`services.items.${s.key}.title`} descriptionKey={`services.items.${s.key}.description`} />
                ))}
            </ul>
        </section>
    );
};

export default Services;
```

- [ ] **Step 4: Rodar (deve passar)** — PASS.

- [ ] **Step 5: Commit** — `git commit -m "feat: organism Services"`

---

### Task 14: Organism VisualSystem

**Files:**
- Create: `src/components/organisms/VisualSystem/VisualSystem.tsx`, `index.ts`
- Test: `src/components/organisms/VisualSystem/VisualSystem.test.tsx`

**Interfaces:**
- Consumes: `SectionLabel`, `Swatches`, `Specimen`, `Composition`, `Reveal`.
- Produces: `<VisualSystem />` — `<section id="trabalho">` com 4 tiles.

Markup: `index.html` 132-188. Estilo: `styles.css` 282-350 (`.language__head`, `.language__deck` grid 4col, `.tile` variantes: `--mark` coral, `--color` ink, `--type` paper, `--grid` teal gradient).

- [ ] **Step 1: Escrever `VisualSystem.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import "@/i18n";
import VisualSystem from "./VisualSystem";

test("VisualSystem tem id trabalho, monograma e placeholder", () => {
    const { container } = render(<VisualSystem />);
    expect(container.querySelector("section#trabalho")).toBeInTheDocument();
    expect(screen.getByText("KS")).toBeInTheDocument();
    expect(screen.getByText(/espaço reservado para portfólio/)).toBeInTheDocument();
});
```

- [ ] **Step 2: Rodar (deve falhar)** — FAIL.

- [ ] **Step 3: Implementar `VisualSystem.tsx`**

4 `<figure class="tile ...">` conforme markup index.html 143-186. Base do tile: `relative m-0 p-6 border border-line rounded-[1.1rem] min-h-[20rem] flex flex-col justify-between overflow-hidden transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-1`. Tag: `font-mono text-[0.7rem] tracking-[0.08em] text-muted`. Caption: `text-[0.85rem] font-medium`. Variantes:
- Mark: `bg-coral text-paper border-coral`; monograma `KS` central `font-display font-extrabold text-[clamp(5rem,12vw,8rem)]`.
- Color: `bg-ink border-ink` + `<Swatches />`.
- Type: `bg-paper` + `<Specimen />`.
- Grid: `bg-[linear-gradient(135deg,#0FB6A2,#0a8f80)] border-teal text-white` + `<Composition />`.

```tsx
import { useTranslation } from "react-i18next";
import SectionLabel from "@/components/molecules/SectionLabel";
import Swatches from "@/components/molecules/Swatches";
import Specimen from "@/components/molecules/Specimen";
import Composition from "@/components/molecules/Composition";
import Reveal from "@/components/Reveal";

const tile = "relative m-0 p-6 border rounded-[1.1rem] min-h-[20rem] flex flex-col justify-between overflow-hidden transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-1";
const tag = "font-mono text-[0.7rem] tracking-[0.08em]";

const VisualSystem = () => {
    const { t } = useTranslation();
    return (
        <section id="trabalho" aria-labelledby="language-title" className="px-[var(--gut)] py-[var(--sec)] relative">
            <Reveal className="flex flex-wrap gap-x-8 gap-y-4 items-end justify-between mb-[clamp(2rem,5vw,3.5rem)]">
                <SectionLabel index="03">{t("visualSystem.label")}</SectionLabel>
                <h2 id="language-title" className="text-[clamp(2.25rem,1.5rem+3.4vw,4.75rem)] tracking-[-0.03em]">{t("visualSystem.title")}</h2>
                <p className="max-w-[34ch] text-muted text-[0.95rem]">
                    {t("visualSystem.note")}
                    <span className="block mt-[0.4rem] font-mono text-[0.75rem] text-teal">{t("visualSystem.noteSwap")}</span>
                </p>
            </Reveal>

            <div className="grid gap-[clamp(1rem,2vw,1.5rem)] grid-cols-4 max-[980px]:grid-cols-2 max-[520px]:grid-cols-1">
                <Reveal as="figure" className={`${tile} bg-coral text-paper border-coral`}>
                    <span className={`${tag} text-paper/75`}>{t("visualSystem.markTag")}</span>
                    <div className="font-display font-extrabold text-[clamp(5rem,12vw,8rem)] tracking-[-0.05em] leading-none self-center my-auto">KS</div>
                    <figcaption className="text-[0.85rem] font-medium text-paper/90">{t("visualSystem.markCaption")}</figcaption>
                </Reveal>

                <Reveal as="figure" className={`${tile} bg-ink border-ink`}>
                    <span className={`${tag} text-paper/60`}>{t("visualSystem.paletteTag")}</span>
                    <Swatches />
                    <figcaption className="text-[0.85rem] font-medium text-paper/85">{t("visualSystem.paletteCaption")}</figcaption>
                </Reveal>

                <Reveal as="figure" className={`${tile} bg-paper`}>
                    <span className={`${tag} text-muted`}>{t("visualSystem.typeTag")}</span>
                    <Specimen />
                    <figcaption className="text-[0.85rem] font-medium text-ink">{t("visualSystem.typeCaption")}</figcaption>
                </Reveal>

                <Reveal as="figure" className={`${tile} bg-[linear-gradient(135deg,#0FB6A2,#0a8f80)] border-teal text-white`}>
                    <span className={`${tag} text-white/80`}>{t("visualSystem.compTag")}</span>
                    <Composition />
                    <figcaption className="text-[0.85rem] font-medium text-white">{t("visualSystem.compCaption")}</figcaption>
                </Reveal>
            </div>
        </section>
    );
};

export default VisualSystem;
```

- [ ] **Step 4: Rodar (deve passar)** — PASS.

- [ ] **Step 5: Commit** — `git commit -m "feat: organism VisualSystem"`

---

### Task 15: Organism Timeline

**Files:**
- Create: `src/components/organisms/Timeline/Timeline.tsx`, `index.ts`
- Test: `src/components/organisms/Timeline/Timeline.test.tsx`

**Interfaces:**
- Consumes: `SectionLabel`, `ExperienceEntry`, `CertCard`, `Chip`, `Reveal`, `data/{experiences,certifications}`, i18n `timeline.skills`.
- Produces: `<Timeline />` — `<section id="trajetoria">`.

Markup: `index.html` 191-231. Estilo: `styles.css` 355-389 (`.timeline__wrap` grid 1.4fr/1fr, `.track`, `.certs`, `.skills`/`.chip`).

- [ ] **Step 1: Escrever `Timeline.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import "@/i18n";
import Timeline from "./Timeline";

test("Timeline mostra experiências, certs e skills", () => {
    const { container } = render(<Timeline />);
    expect(container.querySelector("section#trajetoria")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Designer Gráfica" })).toBeInTheDocument();
    expect(screen.getByText("PUC-RS")).toBeInTheDocument();
    expect(screen.getByText("IA generativa")).toBeInTheDocument();
});
```

- [ ] **Step 2: Rodar (deve falhar)** — FAIL.

- [ ] **Step 3: Implementar `Timeline.tsx`**

```tsx
import { useTranslation } from "react-i18next";
import SectionLabel from "@/components/molecules/SectionLabel";
import ExperienceEntry from "@/components/molecules/ExperienceEntry";
import CertCard from "@/components/molecules/CertCard";
import Chip from "@/components/atoms/Chip";
import Reveal from "@/components/Reveal";
import experiences from "@/data/experiences";
import certifications from "@/data/certifications";

const Timeline = () => {
    const { t } = useTranslation();
    const skills = t("timeline.skills", { returnObjects: true }) as string[];
    return (
        <section id="trajetoria" aria-labelledby="timeline-title" className="px-[var(--gut)] py-[var(--sec)] relative">
            <Reveal><SectionLabel index="04">{t("timeline.label")}</SectionLabel></Reveal>
            <h2 id="timeline-title" className="text-[clamp(2.25rem,1.5rem+3.4vw,4.75rem)] tracking-[-0.03em] mb-[clamp(2rem,5vw,3.5rem)]">{t("timeline.title")}</h2>

            <div className="grid grid-cols-[1.4fr_1fr] gap-[clamp(2rem,6vw,5rem)] items-start max-[900px]:grid-cols-1">
                <ol className="list-none m-0 p-0" aria-label="Experiência profissional">
                    {experiences.map((e) => <ExperienceEntry key={e.key} entryKey={e.key} />)}
                </ol>
                <ul className="list-none m-0 p-0 flex flex-col gap-[0.8rem]" aria-label="Cursos e certificações">
                    {certifications.map((c) => <CertCard key={c.id} by={c.by} titleKey={c.titleKey} dateKey={c.dateKey} />)}
                </ul>
            </div>

            <Reveal className="flex flex-wrap gap-[0.6rem] mt-[clamp(2.5rem,6vw,4rem)]" aria-label="Principais habilidades">
                {skills.map((s) => <Chip key={s}>{s}</Chip>)}
            </Reveal>
        </section>
    );
};

export default Timeline;
```

- [ ] **Step 4: Rodar (deve passar)** — PASS.

- [ ] **Step 5: Commit** — `git commit -m "feat: organism Timeline"`

---

### Task 16: Organism Contact

**Files:**
- Create: `src/components/organisms/Contact/Contact.tsx`, `index.ts`
- Test: `src/components/organisms/Contact/Contact.test.tsx`

**Interfaces:**
- Consumes: `SectionLabel`, `Highlight`, `Button`, `ContactFact`, `Reveal`, `config`, `data/contactFacts`.
- Produces: `<Contact />` — `<section id="contato">` fundo ink, centralizado.

Markup: `index.html` 234-252. Estilo: `styles.css` 394-408. Email usa `config.email.address` (`mailto:`); LinkedIn usa `config.linkedin.url` (target `_blank`, `rel="noopener"`).

- [ ] **Step 1: Escrever `Contact.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import "@/i18n";
import Contact from "./Contact";

test("Contact tem mailto e LinkedIn externo", () => {
    const { container } = render(<Contact />);
    expect(container.querySelector("section#contato")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Enviar e-mail" }).getAttribute("href")).toMatch(/^mailto:/);
    const li = screen.getByRole("link", { name: "LinkedIn ↗" });
    expect(li).toHaveAttribute("target", "_blank");
    expect(li).toHaveAttribute("rel", expect.stringContaining("noopener"));
});
```

- [ ] **Step 2: Rodar (deve falhar)** — FAIL.

- [ ] **Step 3: Implementar `Contact.tsx`**

```tsx
import { useTranslation } from "react-i18next";
import SectionLabel from "@/components/molecules/SectionLabel";
import Highlight from "@/components/atoms/Highlight";
import Button from "@/components/atoms/Button";
import ContactFact from "@/components/molecules/ContactFact";
import Reveal from "@/components/Reveal";
import config from "@/config";
import contactFacts from "@/data/contactFacts";

const Contact = () => {
    const { t } = useTranslation();
    return (
        <section id="contato" aria-labelledby="contact-title" className="bg-ink text-paper text-center px-[var(--gut)] py-[var(--sec)] relative">
            <Reveal><SectionLabel index="05" light>{t("contact.label")}</SectionLabel></Reveal>
            <h2 id="contact-title" className="text-[clamp(2.5rem,1.5rem+5vw,6.5rem)] tracking-[-0.03em] mx-auto mb-[clamp(1.25rem,3vw,2rem)] max-w-[16ch]">
                {t("contact.titlePre")}<Highlight coral>{t("contact.titleHl")}</Highlight>
            </h2>
            <p className="max-w-[42ch] mx-auto mb-[clamp(2rem,5vw,3rem)] text-paper/80 text-[1.1rem]">{t("contact.lead")}</p>
            <div className="flex flex-wrap gap-[0.9rem] justify-center">
                <Button href={`mailto:${config.email.address}`} variant="solid" size="lg">{t("contact.ctaEmail")}</Button>
                <Button href={config.linkedin.url} variant="outline" size="lg" target="_blank" rel="noopener">{t("contact.ctaLinkedin")}</Button>
            </div>
            <ul className="list-none mx-auto mt-[clamp(3rem,7vw,5rem)] p-0 flex flex-wrap gap-x-12 gap-y-6 justify-center border-t border-line-dark pt-[clamp(2rem,5vw,3rem)] max-w-[60rem]">
                {contactFacts.map((f) => <ContactFact key={f.key} factKey={f.key} />)}
            </ul>
        </section>
    );
};

export default Contact;
```

- [ ] **Step 4: Rodar (deve passar)** — PASS.

- [ ] **Step 5: Commit** — `git commit -m "feat: organism Contact"`

---

### Task 17: Organism Footer

**Files:**
- Create: `src/components/organisms/Footer/Footer.tsx`, `index.ts`
- Test: `src/components/organisms/Footer/Footer.test.tsx`

**Interfaces:**
- Consumes: `BrandMark`, `useCurrentYear`, i18n `footer.*`.
- Produces: `<Footer />` — `<footer>` fundo ink.

Markup: `index.html` 255-259. Estilo: `styles.css` 413-425. O `©` + ano dinâmico + copyright; link "Voltar ao topo".

- [ ] **Step 1: Escrever `Footer.test.tsx`** (cobre Review Focus: ano dinâmico)

```tsx
import { render, screen } from "@testing-library/react";
import "@/i18n";
import Footer from "./Footer";

test("Footer mostra o ano corrente e link ao topo", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText((c) => c.includes(year))).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Voltar ao topo/ })).toHaveAttribute("href", "#top");
});
```

- [ ] **Step 2: Rodar (deve falhar)** — FAIL.

- [ ] **Step 3: Implementar `Footer.tsx`**

```tsx
import { useTranslation } from "react-i18next";
import BrandMark from "@/components/atoms/BrandMark";
import useCurrentYear from "@/hooks/useCurrentYear";

const Footer = () => {
    const { t } = useTranslation();
    const year = useCurrentYear();
    return (
        <footer className="bg-ink text-paper/65 px-[var(--gut)] pt-8 pb-12 flex flex-wrap items-center gap-4 justify-between border-t border-line-dark text-[0.85rem]">
            <BrandMark className="!w-auto !h-auto !bg-transparent !text-coral !text-[1.4rem] !rounded-none tracking-[-0.04em]" />
            <p>© {year} {t("footer.copyright")}</p>
            <a href="#top" className="hover:text-paper">{t("footer.backToTop")}</a>
        </footer>
    );
};

export default Footer;
```
> O mark do footer (styles.css 421-424) é só o texto coral "KS", sem caixa. Se os `!` overrides ficarem confusos, criar variante `footer` no `BrandMark` em vez de overrides. Decidir na implementação; teste não depende disso.

- [ ] **Step 4: Rodar (deve passar)** — PASS.

- [ ] **Step 5: Commit** — `git commit -m "feat: organism Footer"`

---

### Task 18: Template Layout

**Files:**
- Create: `src/components/templates/Layout/Layout.tsx`, `index.ts`
- Test: `src/components/templates/Layout/Layout.test.tsx`

**Interfaces:**
- Consumes: `SkipLink`, `Header`, `Footer`.
- Produces: `<Layout>{children}</Layout>` — `SkipLink` + `Header` + `<main>{children}</main>` + `Footer`.

Markup: `index.html` 24 (skip-link) + 27 (header) + 41 (main) + 255 (footer).

- [ ] **Step 1: Escrever `Layout.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import "@/i18n";
import Layout from "./Layout";

test("Layout tem skip-link, header, main e footer", () => {
    const { container } = render(<Layout><p>conteúdo</p></Layout>);
    expect(screen.getByText("Pular para o conteúdo")).toBeInTheDocument();
    expect(container.querySelector("header#top")).toBeInTheDocument();
    expect(container.querySelector("main")).toHaveTextContent("conteúdo");
    expect(container.querySelector("footer")).toBeInTheDocument();
});
```

- [ ] **Step 2: Rodar (deve falhar)** — FAIL.

- [ ] **Step 3: Implementar `Layout.tsx`**

```tsx
import type { ReactNode } from "react";
import SkipLink from "@/components/atoms/SkipLink";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";

const Layout = ({ children }: { children: ReactNode }) => (
    <>
        <SkipLink href="#sobre">Pular para o conteúdo</SkipLink>
        <Header />
        <main>{children}</main>
        <Footer />
    </>
);

export default Layout;
```

- [ ] **Step 4: Rodar (deve passar)** — PASS.

- [ ] **Step 5: Commit** — `git commit -m "feat: template Layout"`

---

### Task 19: Página Home + wiring do App

**Files:**
- Create: `src/pages/Home/Home.tsx`, `src/pages/Home/index.ts`
- Modify: `src/App.tsx`, `src/main.tsx`
- Test: `src/pages/Home/Home.test.tsx`, atualizar `src/App.test.tsx`

**Interfaces:**
- Consumes: todos os organisms, `Layout`.
- Produces: `Home` (default), `App` que renderiza `<Layout><Home/></Layout>`; `main.tsx` importa `./i18n`.

- [ ] **Step 1: Escrever `src/pages/Home/Home.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import "@/i18n";
import Home from "./Home";

test("Home compõe as seções na ordem do index.html", () => {
    const { container } = render(<Home />);
    const ids = Array.from(container.querySelectorAll("section")).map((s) => s.id);
    expect(ids).toEqual(["sobre", "servicos", "trabalho", "trajetoria", "contato"]);
});

test("Home inclui o hero com o nome", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Silva");
});
```

- [ ] **Step 2: Atualizar `src/App.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import "@/i18n";
import App from "./App";

test("App renderiza layout completo com nome Kesia Silva", () => {
    render(<App />);
    expect(screen.getAllByText(/Kesia|Silva/).length).toBeGreaterThan(0);
    expect(document.querySelector("footer")).toBeInTheDocument();
});
```

- [ ] **Step 3: Rodar (deve falhar)** — `npm test -- Home App` → FAIL.

- [ ] **Step 4: Implementar `src/pages/Home/Home.tsx`**

```tsx
import Hero from "@/components/organisms/Hero";
import About from "@/components/organisms/About";
import Services from "@/components/organisms/Services";
import VisualSystem from "@/components/organisms/VisualSystem";
import Timeline from "@/components/organisms/Timeline";
import Contact from "@/components/organisms/Contact";

const Home = () => (
    <>
        <Hero />
        <About />
        <Services />
        <VisualSystem />
        <Timeline />
        <Contact />
    </>
);

export default Home;
```
`src/pages/Home/index.ts`: `export { default } from "./Home";`

- [ ] **Step 5: Reescrever `src/App.tsx`**

```tsx
import Layout from "@/components/templates/Layout";
import Home from "@/pages/Home";

const App = () => (
    <Layout>
        <Home />
    </Layout>
);

export default App;
```

- [ ] **Step 6: Atualizar `src/main.tsx`** para importar i18n

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
```

- [ ] **Step 7: Rodar toda a suíte** — `npm test` → todos PASS.

- [ ] **Step 8: Build** — `npm run build` → sem erros.

- [ ] **Step 9: Commit** — `git commit -m "feat: página Home e wiring do App (i18n + Layout)"`

---

### Task 20: Cleanup, README e verificação visual

**Files:**
- Delete: `styles.css`, `main.js` (raiz) — o `index.html` da raiz foi substituído pelo entry Vite na Task 1
- Modify: `README.md`
- Test: build + inspeção visual manual

- [ ] **Step 1: Remover arquivos legados**

```bash
git rm styles.css main.js
```
> Se restar algum `index.html` legado versionado com o markup antigo (o novo entry Vite tem o mesmo caminho — confirmar que o conteúdo é o da Task 1, não o original de 264 linhas).

- [ ] **Step 2: Atualizar `README.md`** com instruções da app Vite

Incluir: descrição, stack, `npm install`, `npm run dev`, `npm run build`, `npm test`, variáveis `.env` (`VITE_EMAIL`, `VITE_URL_LINKEDIN`), e a estrutura de pastas (Atomic Design).

- [ ] **Step 3: Rodar a suíte completa e o build**

Run: `npm test && npm run build`
Expected: todos os testes PASS, build OK.

- [ ] **Step 4: Verificação visual (manual, com o app rodando)**

Run: `npm run dev`
Comparar contra o design original (guardar uma cópia do `index.html`/`styles.css` originais em outro branch/stash antes de remover, para diff visual). Conferir:
- Hero: nome gigante, accent coral + `◦` teal, grid decorativo com máscara, marquee rolando (e parado com reduced-motion), tags com opacidade correta.
- Services: grid 4→2→1 col, bordas hairline, hover ink-80.
- VisualSystem: 4 tiles com cores/variantes certas, placeholder presente.
- Timeline: grid 1.4/1fr, chips com hover teal.
- Contact: fundo ink centralizado, mailto e LinkedIn.
- Footer: mark coral, ano dinâmico.
- Reveal on scroll funciona; skip-link aparece no foco; `:focus-visible` coral.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove arquivos legados e atualiza README"
```

---

## Self-Review

**1. Spec coverage** (cada seção da spec → tarefa):
- §3 Stack/tooling → Task 1. §4 Estratégia Tailwind → Tasks 1 (config) + 2 (CSS). §5 Estrutura de pastas → distribuída (barrels em cada task). §6 Camadas atomic → Tasks 7-9 (atoms/molecules), 10-17 (organisms), 18 (template), 19 (page). §7 Mapa seção→organism → Tasks 10-17 + 19 (ordem verificada no teste de Home). §8 i18n → Task 3. §9 Data/types → Tasks 4-5. §10 Comportamento (reveal/ano) → Task 6. §11 Acessibilidade → distribuída (skip-link Task 18, aria nos organisms, focus-visible Task 2). §12 Testes → cada task tem testes; smoke por organism. §13 Riscos (cleanup) → Task 20. ✅ Sem lacunas.

**2. Placeholder scan:** Nenhum "TBD/TODO". Código real em todos os steps. Organisms referenciam linhas exatas do `index.html`/`styles.css` (artefatos versionados) + dão a estrutura de classes e o código do componente. ✅

**3. Type consistency:** `ButtonVariant`/`ButtonSize` (Task 4) usados igual no Button (Task 7) e nos organisms. `Service.key`, `ExperienceEntryData.key`, `ContactFactData.key` consistentes entre data (Task 4) e consumo (Tasks 9, 13, 16). `useReveal` retorna ref; `Reveal` usa `as`/`delay` consistente entre Task 6 e uso nos organisms. Chaves i18n definidas na Task 3 batem com os `t("...")` das tasks seguintes. ✅

**4. Review Focus:** reduced-motion + sem IntersectionObserver (Task 6), Button variantes/href (Task 7), Marquee aria-hidden (Task 8), ano dinâmico (Tasks 6 e 17). Todos têm teste na task dona. ✅
