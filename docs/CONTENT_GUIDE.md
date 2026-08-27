# Content guide

## Where to make common changes

| Change | File |
| --- | --- |
| Hero headline and top metrics | `src/content/hero.js` |
| Product description | `src/content/product.js` |
| Workflow steps and maturity labels | `src/content/technology.js` |
| Thermal, habitat and material claims | `src/content/impact.js` |
| Demonstrator, testing and preprint | `src/content/validation.js` |
| LoIs, interviews and pilot roadmap | `src/content/traction.js` |
| Founder names, roles and bios | `src/content/team.js` |
| Contact person, email and ecosystem names | `src/content/contact.js` |
| Top navigation | `src/content/navigation.js` |

## Replacing team portraits

1. Create web-ready portrait copies in `public/content/team/founders/`.
2. Add an `image` and `imageAlt` value to the matching founder in `src/content/team.js`.
3. Replace the placeholder block in `src/sections/Team/Team.jsx` with the shared `Figure` component.
4. Add source and credit information to `public/content/asset-manifest.json` and `docs/ASSET_CREDITS.md`.

Use a consistent crop, ideally portrait orientation at 1200–1600 px on the long edge. Do not publish a portrait without team approval.

## Changing scientific claims

Check `docs/CLAIMS_REGISTER.md` first. Every numerical claim needs a traceable source, its measurement context and cautious public wording. Keep measured results, ongoing development and roadmap objectives visually and linguistically distinct.

## Adding a new visual

Never link directly into `pitch_data/`. Create an optimized copy inside the thematic folder under `public/content/`, preserve the original, and record:

- public path;
- original source file;
- creator/credit;
- crop, resize or extraction performed;
- whether the image is scientific evidence or illustrative.
