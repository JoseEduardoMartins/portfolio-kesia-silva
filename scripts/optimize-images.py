#!/usr/bin/env python3
"""Converte os mockups PNG dos projetos para WebP otimizado em public/projetos/.

Uso:
    python3 -I scripts/optimize-images.py [PASTA_ORIGEM]

PASTA_ORIGEM padrão: ~/Downloads/PORTIFOLIO (os PNGs de origem não são versionados;
apenas os WebP gerados em public/projetos/ entram no repositório).

Requer Pillow (PIL). Execute uma vez quando as peças de origem mudarem.
"""
import sys
from pathlib import Path

from PIL import Image

QUALITY = 82
MAX_WIDTH = 1600

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
}


def main() -> int:
    src_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.home() / "Downloads" / "PORTIFOLIO"
    repo_root = Path(__file__).resolve().parent.parent
    out_root = repo_root / "public" / "projetos"

    if not src_dir.is_dir():
        print(f"ERRO: pasta de origem não encontrada: {src_dir}", file=sys.stderr)
        return 1

    total = 0
    for slug, files in MAPPING.items():
        out_dir = out_root / slug
        out_dir.mkdir(parents=True, exist_ok=True)
        for name, src_name in files.items():
            src = src_dir / src_name
            if not src.is_file():
                print(f"  ! faltando: {src}", file=sys.stderr)
                continue
            with Image.open(src) as im:
                im = im.convert("RGB")
                if im.width > MAX_WIDTH:
                    h = round(im.height * MAX_WIDTH / im.width)
                    im = im.resize((MAX_WIDTH, h), Image.LANCZOS)
                dst = out_dir / f"{name}.webp"
                im.save(dst, "WEBP", quality=QUALITY, method=6)
            kb = dst.stat().st_size / 1024
            print(f"  {slug}/{name}.webp  {kb:6.0f} KB")
            total += 1

    print(f"OK — {total} imagens geradas em {out_root}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
