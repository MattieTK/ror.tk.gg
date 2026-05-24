# ror.tk.gg

A reference for the _Artifact of Command_ item picker in _Risk of Rain 2_. Browse every item by rarity, filter by expansion, and look up per-survivor build recommendations.

![image](https://user-images.githubusercontent.com/125273/195466306-c8726952-b4e5-4824-b2fc-d5716ddf94c4.png)

## Stack

- [TanStack Start](https://tanstack.com/start) (React 19) on [Vite](https://vitejs.dev)
- [vanilla-extract](https://vanilla-extract.style) for styling
- Deployed to [Cloudflare Workers](https://workers.cloudflare.com) via [Wrangler](https://developers.cloudflare.com/workers/wrangler/)

## Running locally

Requires [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev
```

Other scripts:

```bash
pnpm build       # production build
pnpm preview     # preview the build locally
pnpm typecheck   # tsc --noEmit
pnpm deploy      # build and deploy to Cloudflare
```

## Data

- **Items** live in `src/items.ts`. Each item has a name, rarity, expansion, category, and source fields. The `isCommandable` helper there filters out items the Artifact of Command can't offer (Meals, objective/world-unique items, elite-equipment aspects).
- **Expansions** are configured in `src/expansions.ts`. Set an entry's `active` flag to stage a new expansion's data ahead of launch; flip it to `true` to show it.
- **Builds** (per-survivor item recommendations) live in `src/builds.ts`.

### Scraping items

Item data and images come from the [Risk of Rain 2 wiki](https://riskofrain2.wiki.gg) via a scraper:

```bash
pnpm scrape expansions                          # list DLCs
pnpm scrape scrape "<expansion>" --download-images   # scrape an expansion's items
```

See `scripts/scrape-items.ts` for the full options. Generated output is reviewed before being merged into `src/items.ts`.

## Images

Item and survivor images are stored in `public/images/` (survivor portraits under `public/images/survivors/`), under their decoded names (e.g. `Hiker's_Boots.png`) so static hosts that decode request paths serve them correctly.
