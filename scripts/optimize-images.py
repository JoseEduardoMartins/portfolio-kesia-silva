#!/usr/bin/env python3
"""Converte os mockups PNG dos projetos para WebP otimizado em public/projetos/.

Uso:
    python3 -I scripts/optimize-images.py [PASTA_ORIGEM ...] [--force]

PASTAS_ORIGEM padrão: ~/Downloads/PORTIFOLIO e ~/Downloads/PORTIFOLIO 2 (os PNGs de
origem não são versionados; apenas os WebP gerados em public/projetos/ entram no
repositório). Cada arquivo é procurado em todas as pastas, na ordem.

Por padrão, pula os WebP que já existem (gera só os que faltam). Use --force para
regerar tudo quando uma peça de origem mudar.

Requer Pillow (PIL).
"""
import sys
from pathlib import Path

from PIL import Image

QUALITY = 82
MAX_WIDTH = 1600

DEFAULT_SRC_DIRS = [
    Path.home() / "Downloads" / "PORTIFOLIO",
    Path.home() / "Downloads" / "PORTIFOLIO 2",
]

# destino (slug) -> { arquivo WebP de saída: nome do PNG de origem }
MAPPING = {
    "savora": {
        "faixada": "FAIXADA-SAVORA.png",
        "embalagem": "EMBALAGEM-SAVORA.png",
        "sacola": "SACOLA-SAVORA.png",
        "copo": "COPO-SAVORA.png",
        "cartao": "CARTÃO-VISITA-SAVORA-IMAGEM.png",
        "adesivo": "ADESIVO-SAVORA.png",
        "envelope": "ENVELOPE-TALHER.png",
        "avental": "AVENTAL-SAVORA.png",
    },
    "infinider": {
        "logo": "Documento-logo.png",
        "cartao": "CARTÃO-VISITA-PORTIFOLIO.png",
        "card-1": "infinider_portfolio_1.png",
        "card-2": "infinider_portfolio_2.png",
        "card-3": "infinider_portfolio_3.png",
        "card-4": "infinider_portfolio_4.png",
        "card-5": "infinider_portfolio_5.png",
    },
    "mundo-pet-feliz": {
        "lona": "LONA-PET-SHOP.png",
        "camiseta": "CAMISETA-PET-SHOP.png",
        "sacola": "SACOLA-PET-SHOP.png",
        "cartao": "CARTÃO-VISITA.png",
    },
    "nutricao": {
        "capa": "SLIDE 1 ESTUDO.png",
        "extremos": "SLIDE 2 ESTUDO.png",
        "dietas": "SLIDE 3 ESTUDO.png",
        "disciplina": "SLIDE 4 ESTUDO.png",
        "equilibrio": "SLIDE 5 ESTUDO.png",
        "terrorismo": "SLIDE 6 ESTUDO.png",
    },
    "pearl": {
        "dor": "DESNTISTA 2.png",
        "cuidado": "DENTISTA 3.png",
        "sorriso": "DESNTISTA 1.png",
    },
    "millymel": {
        "cartao": "CARTÃO-MARY-PORTIFOLIO.png",
        "perfil": "DEMONSTRAÇÃO-LOGO-MARY.png",
    },
}

# peças novas adicionadas aos projetos já existentes
MAPPING["savora"].update({
    "logo": "LOGO-SAVORA.png",
    "emblema": "LOGO-SAVORA-2.png",
    "post": "POST-SAVORA.png",
})
MAPPING["infinider"].update({
    "app": "DEMOSTRAÇÃO-INFINIDER-LOGO.png",
})


def main() -> int:
    args = sys.argv[1:]
    force = "--force" in args
    dir_args = [a for a in args if a != "--force"]
    src_dirs = [Path(a) for a in dir_args] if dir_args else DEFAULT_SRC_DIRS
    src_dirs = [d for d in src_dirs if d.is_dir()]
    repo_root = Path(__file__).resolve().parent.parent
    out_root = repo_root / "public" / "projetos"

    if not src_dirs:
        print("ERRO: nenhuma pasta de origem encontrada", file=sys.stderr)
        return 1

    def find_src(name: str) -> Path | None:
        for d in src_dirs:
            p = d / name
            if p.is_file():
                return p
        return None

    gerados = 0
    pulados = 0
    for slug, files in MAPPING.items():
        out_dir = out_root / slug
        out_dir.mkdir(parents=True, exist_ok=True)
        for name, src_name in files.items():
            dst = out_dir / f"{name}.webp"
            if dst.exists() and not force:
                pulados += 1
                continue
            src = find_src(src_name)
            if src is None:
                print(f"  ! faltando: {src_name}", file=sys.stderr)
                continue
            with Image.open(src) as im:
                im = im.convert("RGB")
                if im.width > MAX_WIDTH:
                    h = round(im.height * MAX_WIDTH / im.width)
                    im = im.resize((MAX_WIDTH, h), Image.LANCZOS)
                im.save(dst, "WEBP", quality=QUALITY, method=6)
            kb = dst.stat().st_size / 1024
            print(f"  {slug}/{name}.webp  {kb:6.0f} KB")
            gerados += 1

    print(f"OK — {gerados} geradas, {pulados} mantidas em {out_root}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
