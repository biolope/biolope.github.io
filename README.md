# BioLope pitch website

English-language, single-page pitch website for BioLope. The project is built with React and Vite and deploys as a static site to GitHub Pages.

## Local development

Requirements: Node.js 22+ and pnpm 10+.

```bash
pnpm install
pnpm run dev
```

Create a production build with `pnpm run build`. The output is written to `dist/`.

## Project map

```text
src/
├── components/             Shared UI, navigation, footer and scroll story
├── content/                All editable website copy and structured data
├── sections/               One folder per page section
└── styles/                 Global design tokens and baseline styles
public/
└── content/                Web-ready copies of every published visual
    └── asset-manifest.json Source, credit and transformation record
scripts/
└── prepare_assets.py       Reproducible asset extraction and optimization
docs/
├── ASSET_CREDITS.md        Human-readable image credits
├── CLAIMS_REGISTER.md      Evidence level and wording guardrails
├── CONTENT_GUIDE.md        Common content updates
└── PUBLICATION_CHECKLIST.md Items to resolve before public launch
```

The originals in `pitch_data/` are source material and are never referenced by the website. Run `pnpm run prepare:assets` only when source images have changed; the script regenerates the separate web copies and their manifest.

## Editing the page

- Copy, names, metrics and links live in `src/content/`.
- Layout and markup live in the matching `src/sections/<Section>/` folder.
- Global colors, spacing and type choices live in `src/styles/global.css`.
- Team portraits are deliberate placeholders in `src/sections/Team/Team.jsx` until approved photos are available.

See `docs/CONTENT_GUIDE.md` before changing claims or replacing visuals.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy-pages.yml`. In the GitHub repository settings, Pages must use **GitHub Actions** as its source.

The current root-relative asset paths are suitable for the `biolope.github.io` user site and for a later custom domain. Do not add a speculative `CNAME`; add it only after the final `.de` or `.com` domain has been selected and configured.
