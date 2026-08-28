# -*- coding: utf-8 -*-
"""
Created on Fri Aug 28 11:59:11 2026

@author: alexa
"""

# -*- coding: utf-8 -*-

"""
Einfacher Favicon-Generator
===========================

Erstellt eine .ico-Datei mit:
- frei wählbarer Hintergrundfarbe
- zwei bzw. beliebig vielen Buchstaben
- frei wählbarer Schriftart
- frei wählbarer Schriftgröße
- frei wählbarer Schriftfarbe
- einstellbarem Eckenradius
- mehreren Favicon-Auflösungen innerhalb einer ICO-Datei

Benötigt:
    pip install pillow
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


# ============================================================
# EINSTELLUNGEN
# ============================================================

# Text
TEXT = "BL"

# Farben
BACKGROUND_COLOR = "#1E1E1E"
TEXT_COLOR = "#FFFFFF"

# Schriftart
# Hier den vollständigen Pfad zu einer .ttf- oder .otf-Datei angeben.
#
# Windows-Beispiel:
# FONT_PATH = r"C:\Windows\Fonts\arialbd.ttf"
#
# macOS-Beispiel:
# FONT_PATH = "/System/Library/Fonts/Helvetica.ttc"
#
FONT_PATH = r"C:\Pfad\zu\IvyPrestoDisplay-Regular.ttf"

# Schriftgröße bezogen auf MASTER_SIZE
FONT_SIZE = 150

# Größe des Ausgangsbildes.
# 256 px ist für Favicons sinnvoll.
MASTER_SIZE = 256

# Eckenradius in Pixeln, bezogen auf MASTER_SIZE.
#
# 0   = komplett eckig
# 20  = leicht gerundet
# 40  = deutlich gerundet
# 64  = stark gerundet
# 128 = maximal gerundet
#
CORNER_RADIUS = 50

# Größen, die innerhalb der ICO-Datei gespeichert werden
ICO_SIZES = [
    (16, 16),
    (32, 32),
    (48, 48),
    (64, 64),
    (128, 128),
    (256, 256),
]

# Exportordner
EXPORT_DIR = r""

# Dateiname
FILE_NAME = "favicon.ico"


# ============================================================
# FAVICON ERSTELLEN
# ============================================================

def create_favicon():
    """Erstellt das Favicon und speichert es als ICO-Datei."""

    # --------------------------------------------------------
    # Parameter prüfen
    # --------------------------------------------------------

    if MASTER_SIZE <= 0:
        raise ValueError("MASTER_SIZE muss größer als 0 sein.")

    if FONT_SIZE <= 0:
        raise ValueError("FONT_SIZE muss größer als 0 sein.")

    # Radius begrenzen
    # Der maximal sinnvolle Radius ist die Hälfte der Bildgröße.
    max_radius = MASTER_SIZE // 2
    radius = max(0, min(CORNER_RADIUS, max_radius))

    # --------------------------------------------------------
    # Transparentes Ausgangsbild
    # --------------------------------------------------------

    image = Image.new(
        "RGBA",
        (MASTER_SIZE, MASTER_SIZE),
        (0, 0, 0, 0)
    )

    draw = ImageDraw.Draw(image)

    # --------------------------------------------------------
    # Hintergrund zeichnen
    # --------------------------------------------------------

    draw.rounded_rectangle(
        xy=(0, 0, MASTER_SIZE - 1, MASTER_SIZE - 1),
        radius=radius,
        fill=BACKGROUND_COLOR
    )

    # --------------------------------------------------------
    # Schrift laden
    # --------------------------------------------------------

    try:
        font = ImageFont.truetype(
            FONT_PATH,
            FONT_SIZE
        )
    except OSError as exc:
        raise FileNotFoundError(
            f"Die Schriftart konnte nicht geladen werden:\n{FONT_PATH}"
        ) from exc

    # --------------------------------------------------------
    # Textgröße bestimmen
    # --------------------------------------------------------
    #
    # textbbox() berücksichtigt die tatsächlichen Grenzen
    # der Schriftzeichen. Dadurch lässt sich der komplette
    # Textblock exakt zentrieren.

    bbox = draw.textbbox(
        (0, 0),
        TEXT,
        font=font
    )

    left, top, right, bottom = bbox

    text_width = right - left
    text_height = bottom - top

    # --------------------------------------------------------
    # Exakt horizontal und vertikal zentrieren
    # --------------------------------------------------------

    x = (MASTER_SIZE - text_width) / 2 - left
    y = (MASTER_SIZE - text_height) / 2 - top

    # --------------------------------------------------------
    # Text zeichnen
    # --------------------------------------------------------

    draw.text(
        (x, y),
        TEXT,
        font=font,
        fill=TEXT_COLOR
    )

    # --------------------------------------------------------
    # Exportpfad vorbereiten
    # --------------------------------------------------------

    export_dir = Path(EXPORT_DIR)
    export_dir.mkdir(parents=True, exist_ok=True)

    output_file = export_dir / FILE_NAME

    # --------------------------------------------------------
    # ICO-Datei speichern
    # --------------------------------------------------------

    image.save(
        output_file,
        format="ICO",
        sizes=ICO_SIZES
    )

    print("Favicon erfolgreich erstellt.")
    print(f"Datei: {output_file}")
    print(f"Eckenradius: {radius} px")
    print(f"Enthaltene Größen: {ICO_SIZES}")


# ============================================================
# PROGRAMMSTART
# ============================================================

if __name__ == "__main__":
    create_favicon()