from __future__ import annotations

import json
from pathlib import Path

from PIL import Image
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "pitch_data"
OUTPUT = ROOT / "public" / "content"


def save_webp(source: Path, destination: Path, max_width: int, quality: int = 86) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        save_pil_webp(image, destination, max_width, quality)


def save_pil_webp(
    image: Image.Image, destination: Path, max_width: int, quality: int = 86
) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
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


def save_paper_figure(
    reader: PdfReader,
    page_index: int,
    image_name: str,
    destination: Path,
    max_width: int,
    quality: int = 88,
) -> None:
    image = next(item for item in reader.pages[page_index].images if item.name == image_name)
    save_pil_webp(image.image, destination, max_width, quality)


def main() -> None:
    photos = SOURCE / "press-package" / "Fotos"
    paper = SOURCE / "AM_Facades_with_clay_Iteration2.pdf"
    paper_reader = PdfReader(str(paper))
    photo_assets = [
        ("hero/demonstrator-hero.webp", "DSC_9596 Kopie 2.jpg", 2400),
        ("product/demonstrator-summer.webp", "DSC_7535 Kopie.jpg", 2000),
        ("product/facade-depth-detail.webp", "DSC_7608 Kopie 2.jpg", 1400),
        (
            "impact/habitat/facade-habitat-detail-cropped.webp",
            "DSC_9613 Kopie.jpg",
            1800,
        ),
        ("validation/full-scale-demonstrator.webp", "DSC_9600 Kopie.jpg", 2200),
        (
            "technology/manufacturing/robotic-printing-no-person.webp",
            "DSC_8311.jpg",
            1800,
        ),
        ("contact/demonstrator-street-view.webp", "DSC_9975 Kopie.jpg", 2000),
    ]
    curated_photo_kinds = {
        "impact/habitat/facade-habitat-detail-cropped.webp": (
            "photograph · left crop excludes most street and parked cars"
        ),
        "technology/manufacturing/robotic-printing-no-person.webp": (
            "photograph · right crop excludes person"
        ),
    }
    curated_photo_ids = {
        "impact/habitat/facade-habitat-detail-cropped.webp": "facade-habitat-detail",
        "technology/manufacturing/robotic-printing-no-person.webp": "robotic-printing",
    }

    manifest = []
    for public_path, source_name, max_width in photo_assets:
        source_path = photos / source_name
        destination = OUTPUT / public_path
        if public_path in curated_photo_kinds:
            if not destination.exists():
                raise FileNotFoundError(f"Missing approved cropped asset: {destination}")
        else:
            save_webp(source_path, destination, max_width)
        manifest.append(
            {
                "id": curated_photo_ids.get(public_path, Path(public_path).stem),
                "publicFile": f"/content/{public_path}",
                "source": str(source_path.relative_to(ROOT)).replace("\\", "/"),
                "credit": "Julia Larikova",
                "kind": curated_photo_kinds.get(public_path, "photograph"),
                "status": "real",
            }
        )

    team_assets = [
        ("team/julia.webp", "Julia.JPG", "Julia Larikova"),
        ("team/niklas.webp", "Niklas.JPG", "Niklas Ebert"),
        ("team/martin.webp", "Martin.JPG", "Martin Slepicka"),
        ("team/alex.webp", "Alex.JPG", "Alexander Haynack"),
    ]
    for public_path, source_name, person in team_assets:
        source_path = SOURCE / "Bilder_Team" / source_name
        destination = OUTPUT / public_path
        save_webp(source_path, destination, 900, 90)
        manifest.append(
            {
                "id": f"{Path(public_path).stem}-portrait",
                "publicFile": f"/content/{public_path}",
                "source": str(source_path.relative_to(ROOT)).replace("\\", "/"),
                "credit": "Team-supplied portrait",
                "kind": f"team portrait of {person}",
                "status": "current",
            }
        )

    habitat_source = SOURCE / "press-package" / "excluded(conference)" / "ECOLOPES_axonometry.png"
    habitat_destination = OUTPUT / "impact" / "habitat" / "bird-habitat-axonometry.webp"
    with Image.open(habitat_source) as image:
        image = image.convert("RGB")
        # Remove the broad white page margin while preserving the full axonometry.
        image = image.crop((480, 250, 2900, 2550))
        if image.width > 1600:
            height = round(image.height * 1600 / image.width)
            image = image.resize((1600, height), Image.Resampling.LANCZOS)
        image.save(habitat_destination, "WEBP", quality=90, method=6)
    manifest.append(
        {
            "id": "bird-habitat-axonometry",
            "publicFile": "/content/impact/habitat/bird-habitat-axonometry.webp",
            "source": "pitch_data/press-package/excluded(conference)/ECOLOPES_axonometry.png",
            "credit": "ECOLOPES project",
            "kind": "concept axonometry",
            "status": "illustrative; publication permission to confirm",
        }
    )

    thermal_destination = OUTPUT / "impact" / "thermal" / "measured-facade-reference.webp"
    save_paper_figure(paper_reader, 24, "Image182.jpg", thermal_destination, 1600, 90)
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

    simulate_destination = (
        OUTPUT / "technology" / "simulate" / "measured-facade-reference.webp"
    )
    save_paper_figure(paper_reader, 24, "Image182.jpg", simulate_destination, 1600, 90)
    manifest.append(
        {
            "id": "simulate-measured-facade-reference",
            "publicFile": "/content/technology/simulate/measured-facade-reference.webp",
            "source": "pitch_data/AM_Facades_with_clay_Iteration2.pdf",
            "sourceLocation": "Figure 30",
            "credit": "Larikova et al., preprint under review",
            "kind": "thermal measurement used as simulation reference input",
            "status": "measured",
        }
    )

    technology_figures = [
        (
            "technology/design/parametric-control-points.webp",
            4,
            "Image49.jpg",
            "Figure 4",
            "parametric element-design illustration",
        ),
        (
            "technology/validation/printed-scan-comparison.webp",
            16,
            "Image140.jpg",
            "Figure 20",
            "printed specimen and 3D scan comparison",
        ),
    ]
    for public_path, page_index, image_name, figure, kind in technology_figures:
        destination = OUTPUT / public_path
        save_paper_figure(paper_reader, page_index, image_name, destination, 1800, 90)
        manifest.append(
            {
                "id": Path(public_path).stem,
                "publicFile": f"/content/{public_path}",
                "source": "pitch_data/AM_Facades_with_clay_Iteration2.pdf",
                "sourceLocation": figure,
                "credit": "Larikova et al., preprint under review",
                "kind": kind,
                "status": "real project evidence",
            }
        )

    fem_source = SOURCE / "facade_fem_3d.png"
    fem_destination = OUTPUT / "technology" / "engineering" / "facade-fem-3d.webp"
    save_webp(fem_source, fem_destination, 1800, 90)
    manifest.append(
        {
            "id": "facade-fem-3d",
            "publicFile": "/content/technology/engineering/facade-fem-3d.webp",
            "source": "pitch_data/facade_fem_3d.png",
            "credit": "BioLope project material",
            "kind": "FEM visualization",
            "status": "illustrative example",
        }
    )

    save_og_image(photos / "DSC_9596 Kopie 2.jpg", ROOT / "public" / "og-preview.jpg")

    OUTPUT.mkdir(parents=True, exist_ok=True)
    (OUTPUT / "asset-manifest.json").write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )


if __name__ == "__main__":
    main()
