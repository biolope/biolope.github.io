from __future__ import annotations

import json
import shutil
import zipfile
from pathlib import Path

from PIL import Image
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "pitch_data"
OUTPUT = ROOT / "public" / "content"


def save_webp(source: Path, destination: Path, max_width: int, quality: int = 86) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        image = image.convert("RGB")
        if image.width > max_width:
            height = round(image.height * max_width / image.width)
            image = image.resize((max_width, height), Image.Resampling.LANCZOS)
        image.save(destination, "WEBP", quality=quality, method=6)


def save_og_image(source: Path, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        image = image.convert("RGB")
        target_ratio = 1200 / 630
        source_ratio = image.width / image.height
        if source_ratio > target_ratio:
            crop_width = round(image.height * target_ratio)
            left = round((image.width - crop_width) * 0.58)
            image = image.crop((left, 0, left + crop_width, image.height))
        else:
            crop_height = round(image.width / target_ratio)
            top = round((image.height - crop_height) * 0.36)
            image = image.crop((0, top, image.width, top + crop_height))
        image = image.resize((1200, 630), Image.Resampling.LANCZOS)
        image.save(destination, "JPEG", quality=88, optimize=True, progressive=True)


def extract_bat_prototype() -> Path:
    deck = SOURCE / "March_MIT" / "Multispezies Fassaden_10min.pptx"
    extracted = ROOT / "tmp" / "asset-preparation" / "bat-facade-source.jpg"
    extracted.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(deck) as archive:
        with archive.open("ppt/media/image17.jpg") as source, extracted.open("wb") as target:
            shutil.copyfileobj(source, target)
    return extracted


def extract_thermal_image() -> Path:
    paper = SOURCE / "AM_Facades_with_clay_Iteration2.pdf"
    extracted = ROOT / "tmp" / "asset-preparation" / "thermal-reference.jpg"
    extracted.parent.mkdir(parents=True, exist_ok=True)
    page = PdfReader(str(paper)).pages[24]
    image = next(item for item in page.images if item.name == "Image182.jpg")
    extracted.write_bytes(image.data)
    return extracted


def main() -> None:
    photos = SOURCE / "press-package" / "Fotos"
    photo_assets = [
        ("hero/demonstrator-hero.webp", "DSC_9596 Kopie 2.jpg", 2400),
        ("product/demonstrator-summer.webp", "DSC_7535 Kopie.jpg", 2000),
        ("product/facade-depth-detail.webp", "DSC_7608 Kopie 2.jpg", 1400),
        ("impact/habitat/facade-habitat-detail.webp", "DSC_9613 Kopie.jpg", 1800),
        ("validation/full-scale-demonstrator.webp", "DSC_9600 Kopie.jpg", 2200),
        ("technology/manufacturing/robotic-printing.webp", "DSC_8311.jpg", 1800),
        ("contact/demonstrator-street-view.webp", "DSC_9975 Kopie.jpg", 2000),
    ]

    manifest = []
    for public_path, source_name, max_width in photo_assets:
        source_path = photos / source_name
        destination = OUTPUT / public_path
        save_webp(source_path, destination, max_width)
        manifest.append(
            {
                "id": Path(public_path).stem,
                "publicFile": f"/content/{public_path}",
                "source": str(source_path.relative_to(ROOT)).replace("\\", "/"),
                "credit": "Julia Larikova",
                "kind": "photograph",
                "status": "real",
            }
        )

    bat_source = extract_bat_prototype()
    bat_destination = OUTPUT / "impact" / "habitat" / "bat-shelter-prototype.webp"
    with Image.open(bat_source) as image:
        image = image.convert("RGB")
        image = image.crop((image.width // 2, 0, image.width, image.height))
        if image.width > 1600:
            height = round(image.height * 1600 / image.width)
            image = image.resize((1600, height), Image.Resampling.LANCZOS)
        image.save(bat_destination, "WEBP", quality=88, method=6)
    manifest.append(
        {
            "id": "bat-shelter-prototype",
            "publicFile": "/content/impact/habitat/bat-shelter-prototype.webp",
            "source": "pitch_data/March_MIT/Multispezies Fassaden_10min.pptx",
            "sourceLocation": "slide 13, image17.jpg, right-hand photograph",
            "credit": "Lisa Clausen-Schaumann, Marie Valerie Krudl, Cederik Mulkers",
            "kind": "photograph",
            "status": "functional prototype",
        }
    )

    thermal_source = extract_thermal_image()
    thermal_destination = OUTPUT / "impact" / "thermal" / "measured-facade-reference.webp"
    save_webp(thermal_source, thermal_destination, 1600, 90)
    manifest.append(
        {
            "id": "measured-facade-reference",
            "publicFile": "/content/impact/thermal/measured-facade-reference.webp",
            "source": "pitch_data/AM_Facades_with_clay_Iteration2.pdf",
            "sourceLocation": "Figure 30",
            "credit": "Larikova et al., preprint under review",
            "kind": "thermal measurement",
            "status": "measured",
        }
    )

    save_og_image(photos / "DSC_9596 Kopie 2.jpg", ROOT / "public" / "og-preview.jpg")

    OUTPUT.mkdir(parents=True, exist_ok=True)
    (OUTPUT / "asset-manifest.json").write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )


if __name__ == "__main__":
    main()
