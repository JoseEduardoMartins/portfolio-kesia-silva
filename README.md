# Kesia Silva — Portfólio

Site de portfólio da designer gráfica **Kesia Silva** (Florianópolis, SC).

Aplicação single-page em **Vite + React + TypeScript + Tailwind CSS**, com
textos em **react-i18next** (pt-BR) e componentes organizados em **Atomic
Design**.

## Stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) — tokens de design no `tailwind.config.ts`
- [react-i18next](https://react.i18next.com/) — internacionalização (pt-BR)
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) — testes

## Rodar localmente

```bash
npm install
npm run dev      # servidor de desenvolvimento (http://localhost:5173)
```

## Scripts

```bash
npm run build    # type-check (tsc --noEmit) + build de produção em dist/
npm run preview  # serve o build de produção localmente
npm test         # roda a suíte de testes uma vez
npm run test:watch
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e ajuste conforme necessário:

- `VITE_EMAIL` — e-mail exibido no CTA de contato (default `contato@kesiasilva.design`)
- `VITE_URL_LINKEDIN` — URL do perfil no LinkedIn

## Estrutura

```
src/
  main.tsx                 # entry (importa ./i18n e ./styles)
  App.tsx                  # <Layout><Home/></Layout>
  styles/index.css         # @tailwind + tokens (CSS vars) + efeitos (marquee, máscaras, reveal)
  config/                  # e-mail / linkedin via VITE_*
  i18n/                    # react-i18next + locales/pt-br.ts (todos os textos)
  hooks/                   # useReveal (scroll reveal), useCurrentYear
  data/                    # listas estruturadas (nav, serviços, paleta, certs...)
  types/                   # tipos compartilhados
  components/
    atoms/                 # Button, Tag, Chip, Swatch, BrandMark, SkipLink, Highlight
    molecules/             # Brand, SectionLabel, NavLinks, HeroSpec, Marquee, cards, Swatches, Specimen, Composition
    organisms/             # Header, Hero, About, Services, VisualSystem, Timeline, Contact, Footer
    templates/Layout/      # SkipLink + Header + <main> + Footer
    Reveal/                # wrapper de scroll reveal
  pages/Home/              # compõe os organisms na ordem da página
```

## Personalizar

- **Portfólio real:** a seção *Linguagem* (`#trabalho`, `VisualSystem`) usa peças
  abstratas como placeholder. Troque os tiles por imagens reais dos projetos.
- **Textos:** edite `src/i18n/locales/pt-br.ts`. Para adicionar idiomas, crie novos
  locales e registre-os em `src/i18n/locales/index.ts`.
- **Contato:** ajuste `VITE_EMAIL` e `VITE_URL_LINKEDIN` no `.env`.
