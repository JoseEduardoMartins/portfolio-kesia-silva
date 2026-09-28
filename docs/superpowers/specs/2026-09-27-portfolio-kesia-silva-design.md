# Portfólio Kesia Silva — Design Spec

**Data:** 2026-09-27
**Status:** Aprovado para implementação (aguardando revisão do spec)

## 1. Objetivo

Portar o portfólio estático da designer gráfica Kesia Silva — hoje um
`index.html` + `styles.css` + `main.js` na raiz do repositório — para uma
aplicação **Vite + React + TypeScript + Tailwind CSS**.

- **Fidelidade visual e de conteúdo:** o resultado deve reproduzir o
  `index.html` atual pixel-a-pixel e palavra-a-palavra (mesmos textos, ordem
  das seções e o placeholder "espaço reservado para portfólio de peças reais").
- **Organização:** seguir o padrão de pastas do projeto de referência
  `../portfolio` (barrels `index.ts`, `pages/Home` compondo seções, `hooks/`,
  `data/` com chaves de i18n, `config/` via env, `i18n/locales`), organizando
  a pasta `components/` segundo **Atomic Design** (atoms → molecules →
  organisms → templates), como pedido.

Sucesso = app roda com `npm run dev`, é visualmente indistinguível do
`index.html`, passa nos testes e no build de produção.

## 2. Escopo

**Dentro do escopo:**
- Scaffold Vite (`react-ts`), Tailwind, react-i18next, Vitest + Testing Library.
- Reescrita de todas as seções do `index.html` como componentes React.
- Tokens de design no `tailwind.config.ts` + camada CSS para efeitos complexos.
- Estrutura i18n com locale `pt-BR` (pronta para novos idiomas).
- Preservar comportamento do `main.js`: ano dinâmico no footer + reveal on
  scroll com respeito a `prefers-reduced-motion`.
- Acessibilidade preservada: skip-link, `aria-*`, `:focus-visible`.

**Fora do escopo (YAGNI):**
- Traduções além de `pt-BR` (só a estrutura fica pronta).
- Destaque de link ativo no header (`useActiveSection`) — o original não tem.
- Seção de repositórios / integração GitHub (o `../portfolio` tem; a Kesia não).
- CMS, backend, formulário de contato funcional (o contato é `mailto:` + link).

## 3. Stack & Tooling

| Item | Escolha | Observação |
|------|---------|------------|
| Bundler | Vite (template `react-ts`) | substitui CRA/`react-scripts` do `../portfolio` |
| UI | React 18 + TypeScript | |
| Estilo | Tailwind CSS + PostCSS + Autoprefixer | tokens no theme |
| i18n | react-i18next + i18next-browser-languagedetector | `fallbackLng: "pt-BR"` |
| Testes | Vitest + @testing-library/react + jsdom | equivalente Vite ao setup do `../portfolio` |
| Fontes | Google Fonts via `<link>` no `index.html` | Bricolage Grotesque, Inter, IBM Plex Mono |
| Node | 22.x (ambiente atual) | `../portfolio` fixa 16 no `.nvmrc`; usaremos a versão atual do ambiente |

**Env vars:** `import.meta.env.VITE_*` (o CRA usava `process.env.REACT_APP_*`).
Fornecer `.env.example` com `VITE_EMAIL` e `VITE_URL_LINKEDIN` / `VITE_NAME_LINKEDIN`.

## 4. Estratégia Tailwind ↔ CSS do design

O `styles.css` atual usa recursos sem utilitário Tailwind limpo (máscaras
radiais, `mask-image`, `color-mix`, keyframes de marquee, composição
absoluta). Abordagem escolhida (aprovada): **Tailwind + tokens no theme +
camada CSS para efeitos complexos**.

1. **`tailwind.config.ts`** estende o theme:
   - `colors`: `ink` (#1B1220), `ink-80` (#2A1E30), `paper` (#FBF4F2),
     `coral` (#FF4B3E), `teal` (#0FB6A2), `gold` (#F4B740), `muted` (#8A7E86),
     `line` (#E7DAD3).
   - `fontFamily`: `display` (Bricolage Grotesque), `body` (Inter),
     `mono` (IBM Plex Mono).
   - `keyframes.scroll-x` + `animation.marquee` (`scroll-x 34s linear infinite`).
   - `transitionTimingFunction.ease` = `cubic-bezier(0.2,0.7,0.2,1)`.
2. **`src/styles/index.css`**:
   - `@tailwind base; @tailwind components; @tailwind utilities;`
   - `:root` expõe os mesmos tokens como CSS custom properties (necessários
     para `color-mix` e para reuso dentro de `@layer`).
   - `@layer utilities` / `@layer components` para: máscara do `hero__grid`,
     `mask-image` do marquee, `.hl` (gradiente de highlight), estilos que
     dependem de `color-mix`, e a composição absoluta do tile de grid.
   - `[data-reveal]` / `.is-visible` (transição de reveal) e
     `@media (prefers-reduced-motion: reduce)`.
   - `html { scroll-behavior: smooth }`, `:focus-visible`, `.skip-link`.

Preferência: utilitários no JSX para layout/tipografia/cores/espaçamento; a
camada CSS cobre só o que o utilitário não expressa bem.

## 5. Estrutura de pastas

```
portfolio-kesia-silva/
  index.html                     # entry Vite (fontes + favicon SVG + #root)
  vite.config.ts
  tailwind.config.ts
  postcss.config.js
  tsconfig.json  tsconfig.node.json
  .env.example
  package.json
  src/
    main.tsx                     # cria root, importa ./i18n e ./styles/index.css
    App.tsx                      # <Layout><Home/></Layout>
    vite-env.d.ts
    styles/
      index.css
    config/
      config.ts                  # email, linkedin (VITE_*)
      index.ts                   # barrel
    i18n/
      index.ts
      locales/
        index.ts
        pt-br.ts
    hooks/
      useReveal.ts               # IntersectionObserver → adiciona .is-visible
      useCurrentYear.ts
    data/
      nav.ts
      services.ts
      experiences.ts
      certifications.ts
      skills.ts
      palette.ts
      contactFacts.ts
    types/
      index.ts
    components/
      atoms/
        Button/        {Button.tsx, index.ts}
        Tag/           {Tag.tsx, index.ts}
        Chip/          {Chip.tsx, index.ts}
        Swatch/        {Swatch.tsx, index.ts}
        BrandMark/     {BrandMark.tsx, index.ts}
        SkipLink/      {SkipLink.tsx, index.ts}
        Highlight/     {Highlight.tsx, index.ts}
      molecules/
        Brand/         {Brand.tsx, index.ts}
        SectionLabel/  {SectionLabel.tsx, index.ts}
        NavLinks/      {NavLinks.tsx, index.ts}
        HeroSpec/      {HeroSpec.tsx, index.ts}
        Marquee/       {Marquee.tsx, index.ts}
        ServiceCard/   {ServiceCard.tsx, index.ts}
        ExperienceEntry/ {ExperienceEntry.tsx, index.ts}
        CertCard/      {CertCard.tsx, index.ts}
        ContactFact/   {ContactFact.tsx, index.ts}
        Swatches/      {Swatches.tsx, index.ts}
        Specimen/      {Specimen.tsx, index.ts}
        Composition/   {Composition.tsx, index.ts}
      organisms/
        Header/        {Header.tsx, index.ts}
        Hero/          {Hero.tsx, index.ts}
        About/         {About.tsx, index.ts}
        Services/      {Services.tsx, index.ts}
        VisualSystem/  {VisualSystem.tsx, index.ts}
        Timeline/      {Timeline.tsx, index.ts}
        Contact/       {Contact.tsx, index.ts}
        Footer/        {Footer.tsx, index.ts}
      templates/
        Layout/        {Layout.tsx, index.ts}
      Reveal/          {Reveal.tsx, index.ts}
    pages/
      Home/            {Home.tsx, index.ts}
```

Convenção de barrels idêntica ao `../portfolio`:
`index.ts` → `export { default } from "./X";`.

## 6. Camadas do Atomic Design

- **Atoms** — UI básica, sem lógica de negócio nem dados:
  - `Button` — variantes `solid | ghost | outline`, tamanhos `md | lg`
    (mapeia `.btn`, `.btn--solid/ghost/outline`, `.btn--lg`). Renderiza `<a>`.
  - `Tag` — pílula mono (`.tag`).
  - `Chip` — chip de skill (`.chip`).
  - `Swatch` — amostra de cor (`.swatch`, recebe cor + nome + hex).
  - `BrandMark` — quadrado "KS" coral (`.brand__mark` / `.site-footer__mark`).
  - `SkipLink` — link "Pular para o conteúdo".
  - `Highlight` — `<span>` para `.hl` e `.hl-coral`.
- **Molecules** — composição de atoms + um pouco de estrutura:
  - `Brand` (mark + nome), `SectionLabel` (nº + rótulo mono, variante light),
    `NavLinks`, `HeroSpec` (`<dl>`), `Marquee`, `ServiceCard`,
    `ExperienceEntry`, `CertCard`, `ContactFact`, `Swatches` (usa `Swatch`),
    `Specimen`, `Composition`.
- **Organisms** — seções completas da página:
  - `Header`, `Hero`, `About`, `Services`, `VisualSystem`, `Timeline`,
    `Contact`, `Footer`.
- **Templates** — `Layout`: `SkipLink` + `Header` + `<main>` (children) +
  `Footer`.
- **Reveal** — wrapper que aplica `useReveal` a um elemento (espelha o
  componente `Reveal` do `../portfolio`); usado dentro dos organisms.

## 7. Mapa seção → organism (ordem preservada)

| `index.html` | Organism | Conteúdo |
|--------------|----------|----------|
| `.site-header` | `Header` | `Brand` + `NavLinks` (Sobre, Serviços, Linguagem, Trajetória, CTA Contato) |
| `.hero` | `Hero` | grid decorativo, `Tag`×3, nome "Kesia Silva", statement, `HeroSpec`, `Button`×2, `Marquee` |
| `#sobre` | `About` | `SectionLabel 01`, lead com `Highlight`, 3 colunas de parágrafos |
| `#servicos` | `Services` | `SectionLabel 02`, título, grid de 8 `ServiceCard` |
| `#trabalho` | `VisualSystem` | `SectionLabel 03`, head + note (placeholder), 4 tiles (Monograma, `Swatches`, `Specimen`, `Composition`) |
| `#trajetoria` | `Timeline` | `SectionLabel 04`, `ExperienceEntry`×2, `CertCard`×3, `Chip`×7 |
| `#contato` | `Contact` | `SectionLabel 05` (light), título com `Highlight`, lead, `Button`×2, `ContactFact`×3 |
| `.site-footer` | `Footer` | `BrandMark`, copyright com ano dinâmico, link "Voltar ao topo" |

## 8. i18n

- `i18n/index.ts`: inicializa react-i18next, `resources` = locales,
  `fallbackLng: "pt-BR"`, `defaultNS: "translations"`.
- `locales/pt-br.ts`: um objeto `{ translations: { header, hero, about,
  services, visualSystem, timeline, contact, footer } }` com **todos** os
  textos visíveis do `index.html`.
- `locales/index.ts`: `{ "pt-BR": ptBr }` (estrutura pronta para novos idiomas).
- Componentes consomem texto via `useTranslation()` / `t("...")`.

## 9. Dados (data/) e tipos (types/)

Listas estruturadas ficam em `data/`, com strings traduzíveis referenciadas
por chave de i18n (`titleKey` / `descriptionKey` / `labelKey`), seguindo o
padrão do `../portfolio`:

- `nav.ts` — itens de navegação (`href`, `labelKey`, `cta?`).
- `services.ts` — 8 serviços (`idx: "S/01"…`, `titleKey`, `descriptionKey`).
- `experiences.ts` — 2 experiências (`when`, `titleKey`, `orgKey`, `descKey`).
- `certifications.ts` — 3 certs (`by`, `titleKey`, `dateKey`).
- `skills.ts` — 7 chips (`labelKey`).
- `palette.ts` — 4 swatches (`name`, `hex`).
- `contactFacts.ts` — 3 fatos (`labelKey`, `valueKey`).

`types/index.ts` define `NavItem`, `Service`, `Experience`, `Certification`,
`Swatch`, `ContactFact`, e os tipos de props compartilhadas (`ButtonVariant`,
`ButtonSize`).

## 10. Comportamento (porta do main.js)

- **`useReveal`**: `IntersectionObserver` adiciona `.is-visible` na primeira
  entrada em viewport (`threshold ~0.12`, `rootMargin: "0px 0px -10% 0px"`,
  `once`); se `prefers-reduced-motion` ou sem `IntersectionObserver`, revela
  tudo imediatamente. Exposto via componente `Reveal`.
- **`useCurrentYear`**: retorna `new Date().getFullYear()` para o footer.
- Delay escalonado do reveal (o `main.js` aplica `transitionDelay` por índice)
  é reproduzido opcionalmente via prop `delay` no `Reveal`.

## 11. Acessibilidade

Preservar do original: `lang="pt-BR"`, skip-link para `#sobre`,
`aria-labelledby`/`aria-label` nas seções e nav, `aria-hidden` em elementos
decorativos (grid, marquee, composição), estados `:focus-visible` (outline
coral). Meta tags (description, Open Graph) migram para o `index.html` do Vite.

## 12. Testes (Vitest + RTL)

- `App` monta sem erro e renderiza o nome "Kesia Silva".
- `Button`: aplica classes conforme `variant`/`size` e renderiza `href`.
- `Marquee`: renderiza os termos e é `aria-hidden`.
- Um smoke test por organism verificando um texto-chave (via i18n `pt-BR`).
- `useCurrentYear` retorna o ano corrente.
- Setup em `src/setupTests.ts` com `@testing-library/jest-dom` e
  `i18n` inicializado para os testes.

## 13. Riscos / decisões

- **Fidelidade dos efeitos**: marquee, máscaras e `color-mix` dependem da
  camada CSS; validar visualmente contra o `index.html` original ao final.
- **Arquivos legados**: `index.html`, `styles.css`, `main.js` na raiz serão
  substituídos pela app Vite. `styles.css`/`main.js` servem de referência
  durante a migração e são removidos ao final; o novo `index.html` é o entry
  do Vite. (README será atualizado.)
- **Node/nvm**: `../portfolio` fixa Node 16; aqui usamos a versão do ambiente
  (22.x) compatível com Vite 5+.
```
