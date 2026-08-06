#!/usr/bin/env tsx
/**
 * Risk of Rain 2 wiki scraper.
 *
 *   tsx scripts/scrape-items.ts expansions
 *   tsx scripts/scrape-items.ts list <expansion> [--format json|names] [--out <path>]
 *   tsx scripts/scrape-items.ts scrape <expansion> [item-names...] \
 *       [--format json|ts] [--out <path>] [--download-images] [--dry-run]
 *
 * `list` and `scrape` print to stdout by default (dry-run semantics). Pass
 * `--out <path>` to write to disk. Image downloads go to public/images/ and
 * require `--download-images`; otherwise they're skipped.
 */

import { parseArgs } from 'node:util';
import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';

const WIKI_BASE = 'https://riskofrain2.wiki.gg';
const USER_AGENT =
  'ror.tk.gg-scraper/1.0 (+https://github.com/MattieTK/ror.tk.gg)';
const PROJECT_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const PUBLIC_IMAGES_DIR = path.join(PROJECT_ROOT, 'public', 'images');

interface ScrapedItem {
  name: string;
  expansion: string;
  rarity: string;
  rawRarity: string;
  category: string[];
  rawCategory: string;
  rawId: string;
  rawDescription: string;
  flavor: string;
  cooldown: string | null;
  type: string | null;
  image: string | null;
}

async function wikiApi<T>(params: Record<string, string>): Promise<T> {
  const url = new URL(`${WIKI_BASE}/api.php`);
  for (const [k, v] of Object.entries({
    ...params,
    format: 'json',
    formatversion: '2',
  })) {
    url.searchParams.set(k, v);
  }
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) {
    throw new Error(`Wiki API ${res.status} for ${url}`);
  }
  return (await res.json()) as T;
}

async function listExpansions(): Promise<string[]> {
  interface Resp {
    query: { categorymembers: Array<{ title: string }> };
  }
  const data = await wikiApi<Resp>({
    action: 'query',
    list: 'categorymembers',
    cmtitle: 'Category:Expansions',
    cmlimit: '50',
  });
  return data.query.categorymembers.map((m) => m.title).sort();
}

async function listExpansionPages(expansion: string): Promise<string[]> {
  interface Resp {
    query: { categorymembers: Array<{ title: string; ns: number }> };
    continue?: { cmcontinue: string };
  }
  const titles: string[] = [];
  let cont: string | undefined;
  do {
    const params: Record<string, string> = {
      action: 'query',
      list: 'categorymembers',
      cmtitle: `Category:${expansion}`,
      cmlimit: '500',
      cmnamespace: '0',
    };
    if (cont) params.cmcontinue = cont;
    const data = await wikiApi<Resp>(params);
    for (const m of data.query.categorymembers) {
      if (m.ns === 0) titles.push(m.title);
    }
    cont = data.continue?.cmcontinue;
  } while (cont);
  return titles;
}

// Filter expansion-category pages down to just item/equipment pages. The
// wiki tags pickup items with Category:Items and pickups that are equipment
// with Category:Equipment. Drones live in Category:Drones, survivors in
// Category:Survivors, etc., so this gives a clean narrow.
//
// Note: some equipment pages are ONLY in Category:Equipment and don't get
// re-tagged into their expansion's category (e.g. Deus Ex Machina → Alloyed
// Collective). For those, pass the item name explicitly to `scrape`.
async function filterItemPages(titles: string[]): Promise<string[]> {
  interface Resp {
    query: {
      pages: Array<{
        title: string;
        categories?: Array<{ title: string }>;
      }>;
    };
  }
  const kept: string[] = [];
  const chunkSize = 50;
  for (let i = 0; i < titles.length; i += chunkSize) {
    const chunk = titles.slice(i, i + chunkSize);
    const data = await wikiApi<Resp>({
      action: 'query',
      titles: chunk.join('|'),
      prop: 'categories',
      cllimit: 'max',
      clcategories: 'Category:Items|Category:Equipment',
    });
    for (const page of data.query.pages) {
      if (page.categories && page.categories.length > 0) {
        kept.push(page.title);
      }
    }
  }
  return kept.sort();
}

async function fetchPageHtml(pageTitle: string): Promise<string> {
  interface Resp {
    parse: { title: string; text: string };
  }
  const data = await wikiApi<Resp>({
    action: 'parse',
    page: pageTitle,
    prop: 'text',
  });
  return data.parse.text;
}

function extractInfoboxRow(
  $: cheerio.CheerioAPI,
  infobox: cheerio.Cheerio<any>,
  label: string,
): string {
  let value = '';
  infobox.find('tr').each((_, el) => {
    const tds = $(el).find('td');
    if (tds.length >= 2 && tds.first().text().trim() === label) {
      value = tds.last().text().trim();
      return false;
    }
  });
  return value;
}

// Category cells can contain multiple <a> links (e.g. Damage, AI Blacklist,
// Technology). Cheerio's .text() concatenates them into one stream of
// CamelCase mush, so we pull each anchor's text separately.
function extractCategoryRow(
  $: cheerio.CheerioAPI,
  infobox: cheerio.Cheerio<any>,
): { rawText: string; items: string[] } {
  let rawText = '';
  let items: string[] = [];
  infobox.find('tr').each((_, el) => {
    const tds = $(el).find('td');
    if (tds.length >= 2 && tds.first().text().trim() === 'Category') {
      const cell = tds.last();
      rawText = cell.text().trim();
      const anchors = cell.find('a');
      items =
        anchors.length > 0
          ? anchors.map((_, a) => $(a).text().trim()).get()
          : rawText
            ? [rawText]
            : [];
      return false;
    }
  });
  return { rawText, items };
}

// cheerio's .text() concatenates descendant text without inserting separators,
// so adjacent block/span elements collide (e.g. "killer.Reduces damage"). Round-
// trip through HTML with a space injected between every closing/opening tag
// pair to preserve natural word breaks, then collapse whitespace.
function textWithSpaces(
  $: cheerio.CheerioAPI,
  el: cheerio.Cheerio<any>,
): string {
  const html = el.html() ?? '';
  if (!html) return el.text().trim();
  const spaced = html.replace(/>\s*</g, '> <');
  return cheerio
    .load(`<root>${spaced}</root>`)('root')
    .text()
    .replace(/\s+/g, ' ')
    .trim();
}

// Collapse a wiki rarity label to one of the app's navigable rarity tabs. The
// original label is kept separately in rawRarity. Tabs are: Common, Uncommon,
// Legendary, Boss, Lunar, Equipment, Void, Meal.
//   - "Lunar Equipment"       -> Lunar
//   - "Elite Equipment"       -> Equipment   (matches existing aspect items)
//   - "Boss (Solus Wing)" etc -> Boss        (boss sub-types share one tab)
//   - "Meal"                  -> Meal         (its own tab)
function normaliseRarity(rarity: string): string {
  if (rarity === 'Lunar Equipment') return 'Lunar';
  if (rarity === 'Elite Equipment') return 'Equipment';
  if (rarity.startsWith('Boss')) return 'Boss';
  return rarity;
}

function parseItemPage(html: string, pageTitle: string): ScrapedItem | null {
  const $ = cheerio.load(html);
  const infobox = $('.portable-infobox').first();
  if (!infobox.length) return null;

  // .infoboxname contains rarity badge + DLC tooltip + the actual name. The
  // DLC banner's tooltip expands into a big block of text via .tooltip-block.
  // Strip all tooltip blocks before reading, then take the last div's text.
  const nameCell = infobox.find('.infoboxname').first().clone();
  nameCell.find('.tooltip-block').remove();
  const name =
    nameCell.find('div').last().text().trim() ||
    nameCell.text().trim() ||
    pageTitle;

  // Short flavor text (infoboxcaption) and full description (infoboxdesc)
  const flavor = textWithSpaces($, infobox.find('.infoboxcaption').first());
  const rawDescription = textWithSpaces(
    $,
    infobox.find('.infoboxdesc').first(),
  );

  // Infobox rows
  let rarity = extractInfoboxRow($, infobox, 'Rarity');
  const { rawText: rawCategory, items: categories } = extractCategoryRow(
    $,
    infobox,
  );
  const rawId = extractInfoboxRow($, infobox, 'ID');
  const cooldown = extractInfoboxRow($, infobox, 'Cooldown') || null;

  // Expansion: first DLC link in the infobox header (the small DLC icon)
  const expansionLink = infobox
    .find('.infoboxname a[href^="/wiki/"]')
    .filter((_, el) => {
      const href = $(el).attr('href') ?? '';
      return (
        !href.includes('Items#') && !href.includes(pageTitle.replace(/ /g, '_'))
      );
    })
    .first();
  const expansion = (expansionLink.attr('title') ?? '').trim();

  // Main image: the standard item sprite is 128×128 and rendered full-size
  // (not through /thumb/) in one of the infobox rows. The same image also
  // appears as a thumbnail in the header — filter that out.
  let imageFilename: string | null = null;
  infobox.find('img').each((_, el) => {
    const src = $(el).attr('src') ?? '';
    const dfw = parseInt($(el).attr('data-file-width') ?? '0', 10);
    const dfh = parseInt($(el).attr('data-file-height') ?? '0', 10);
    if (dfw === 128 && dfh === 128 && !src.includes('/thumb/')) {
      const raw = src.split('/').pop()?.split('?')[0];
      // Store the decoded name (e.g. Hiker's_Boots.png), not the wiki's
      // percent-encoded one, so static hosts that decode request paths can
      // serve it.
      imageFilename = raw ? decodeURIComponent(raw) : null;
      return false;
    }
  });

  // Preserve the source rarity label, then collapse it to one of the app's
  // navigable rarity tabs (see normaliseRarity).
  const rawRarity = rarity;
  rarity = normaliseRarity(rarity);

  // Classify as equipment via the Cooldown row or the rarity string itself.
  // Applies to both true Equipment and Lunar Equipment items.
  const type = cooldown !== null || rarity === 'Equipment' ? 'Equipment' : null;

  return {
    name,
    expansion,
    rarity,
    rawRarity,
    category: categories,
    rawCategory,
    rawId,
    rawDescription,
    flavor,
    cooldown,
    type,
    image: imageFilename,
  };
}

// Re-encode a decoded filename to the wiki's URL form for fetching (encodes the
// chars encodeURIComponent leaves, e.g. ' -> %27, ( -> %28).
function wikiEncode(name: string): string {
  return encodeURIComponent(name).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

async function downloadImage(
  filename: string,
): Promise<'downloaded' | 'exists'> {
  const outPath = path.join(PUBLIC_IMAGES_DIR, filename);
  if (existsSync(outPath)) return 'exists';
  const url = `${WIKI_BASE}/images/${wikiEncode(filename)}`;
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) {
    throw new Error(`Image fetch ${res.status} for ${url}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(PUBLIC_IMAGES_DIR, { recursive: true });
  await writeFile(outPath, buf);
  return 'downloaded';
}

function formatAsTs(items: ScrapedItem[]): string {
  const lines: string[] = [];
  lines.push(
    '// Generated by scripts/scrape-items.ts — review before merging.',
  );
  lines.push("import type { Item } from '../src/items';");
  lines.push('');
  lines.push('export const scrapedItems: Item[] = [');
  items.forEach((item, i) => {
    lines.push('\t{');
    lines.push(`\t\tname: ${JSON.stringify(item.name)},`);
    lines.push(`\t\trarity: ${JSON.stringify(item.rarity)},`);
    if (item.rawRarity !== item.rarity) {
      lines.push(`\t\trawRarity: ${JSON.stringify(item.rawRarity)},`);
    }
    lines.push(`\t\texpansion: ${JSON.stringify(item.expansion)},`);
    lines.push(`\t\tcategory: ${JSON.stringify(item.category)},`);
    lines.push(`\t\trawCategory: ${JSON.stringify(item.rawCategory)},`);
    lines.push(`\t\trawId: ${JSON.stringify(item.rawId)},`);
    lines.push(`\t\trawDescription: ${JSON.stringify(item.rawDescription)},`);
    if (item.type) {
      lines.push(`\t\ttype: ${JSON.stringify(item.type)},`);
    }
    if (item.image) {
      lines.push(`\t\timage: ${JSON.stringify(item.image)},`);
    }
    // Placeholder position — scraper can't know sort order within rarity tier
    lines.push(`\t\tposition: ${1000 + i * 10},`);
    lines.push('\t},');
  });
  lines.push('];');
  lines.push('');
  return lines.join('\n');
}

async function cmdExpansions(): Promise<void> {
  const expansions = await listExpansions();
  console.log(expansions.join('\n'));
}

async function cmdList(
  expansion: string,
  format: 'json' | 'names',
  outPath: string | undefined,
): Promise<void> {
  const allPages = await listExpansionPages(expansion);
  process.stderr.write(
    `Found ${allPages.length} pages in Category:${expansion}; filtering to items...\n`,
  );
  const items = await filterItemPages(allPages);

  let output: string;
  if (format === 'json') {
    output = JSON.stringify({ expansion, items }, null, 2);
  } else {
    output = items.join('\n');
  }

  if (outPath) {
    await writeFile(outPath, `${output}\n`);
    process.stderr.write(`Wrote ${items.length} names to ${outPath}\n`);
  } else {
    console.log(output);
  }
}

// Wiki pages that category discovery misses because they're filed only under
// Category:Equipment, not their expansion's category. Passing item names
// explicitly already works; this folds them into no-name discovery scrapes too,
// so a full re-scrape of the expansion stays complete.
const KNOWN_EXTRAS: Record<string, string[]> = {
  'Alloyed Collective': ['Deus Ex Machina'],
};

async function cmdScrape(
  expansion: string,
  itemNames: string[],
  opts: {
    format: 'json' | 'ts';
    outPath: string | undefined;
    downloadImages: boolean;
    dryRun: boolean;
  },
): Promise<void> {
  // Resolve item list: explicit names, or discover via category
  let names = itemNames;
  if (names.length === 0) {
    const allPages = await listExpansionPages(expansion);
    process.stderr.write(
      `No items specified; discovering from Category:${expansion}...\n`,
    );
    names = await filterItemPages(allPages);
    const extras = (KNOWN_EXTRAS[expansion] ?? []).filter(
      (e) => !names.includes(e),
    );
    if (extras.length > 0) {
      names.push(...extras);
      process.stderr.write(
        `Added ${extras.length} known extra(s): ${extras.join(', ')}\n`,
      );
    }
    process.stderr.write(`Found ${names.length} item pages.\n`);
  }

  const scraped: ScrapedItem[] = [];
  const imageReport: string[] = [];
  for (const title of names) {
    process.stderr.write(`Scraping ${title}... `);
    try {
      const html = await fetchPageHtml(title);
      const item = parseItemPage(html, title);
      if (!item) {
        process.stderr.write('no infobox, skipped\n');
        continue;
      }
      // Stamp the expansion from the CLI arg rather than trusting the page,
      // so the caller controls which DLC the items are attributed to.
      item.expansion = expansion;
      scraped.push(item);
      process.stderr.write(
        `${item.rarity}/${item.category || '?'}${item.image ? ` img=${item.image}` : ''}\n`,
      );

      if (item.image && opts.downloadImages && !opts.dryRun) {
        const status = await downloadImage(item.image);
        imageReport.push(`${status}: ${item.image}`);
      } else if (item.image && opts.downloadImages && opts.dryRun) {
        imageReport.push(`would-download: ${item.image}`);
      }
    } catch (err) {
      process.stderr.write(`ERROR: ${(err as Error).message}\n`);
    }
  }

  const output =
    opts.format === 'json'
      ? JSON.stringify(scraped, null, 2)
      : formatAsTs(scraped);

  if (opts.outPath && !opts.dryRun) {
    await writeFile(opts.outPath, output + '\n');
    process.stderr.write(`Wrote ${scraped.length} items to ${opts.outPath}\n`);
  } else {
    console.log(output);
  }

  if (imageReport.length) {
    process.stderr.write('\nImages:\n');
    imageReport.forEach((r) => process.stderr.write(`  ${r}\n`));
  }
}

function printHelpAndExit(): never {
  const help = `
Risk of Rain 2 wiki scraper.

Usage:
  tsx scripts/scrape-items.ts expansions
  tsx scripts/scrape-items.ts list <expansion> [--format json|names] [--out <path>]
  tsx scripts/scrape-items.ts scrape <expansion> [item-names...] [--format json|ts] [--out <path>] [--download-images] [--dry-run]

Commands:
  expansions                   List all DLCs in Category:Expansions on the wiki
  list <expansion>             List item page titles in Category:<expansion> (filtered)
  scrape <expansion> [items]   Scrape item data; discovers via category if no items given

Options:
  --format <fmt>               list: json|names (default names); scrape: json|ts (default ts)
  --out <path>                 Write output to file; omit to print to stdout
  --download-images            Fetch item images into public/images/
  --dry-run                    Don't write files or download images (stdout only)
`;
  process.stderr.write(help);
  process.exit(1);
}

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    strict: false,
    options: {
      format: { type: 'string' },
      out: { type: 'string' },
      'download-images': { type: 'boolean' },
      'dry-run': { type: 'boolean' },
      help: { type: 'boolean', short: 'h' },
    },
  });

  if (values.help || positionals.length === 0) printHelpAndExit();

  const [command, ...rest] = positionals;

  switch (command) {
    case 'expansions':
      await cmdExpansions();
      return;

    case 'list': {
      const [expansion] = rest;
      if (!expansion) {
        process.stderr.write('list requires an expansion name\n');
        process.exit(1);
      }
      const format = (values.format as string) === 'json' ? 'json' : 'names';
      await cmdList(expansion, format, values.out as string | undefined);
      return;
    }

    case 'scrape': {
      const [expansion, ...itemNames] = rest;
      if (!expansion) {
        process.stderr.write('scrape requires an expansion name\n');
        process.exit(1);
      }
      const format = (values.format as string) === 'json' ? 'json' : 'ts';
      await cmdScrape(expansion, itemNames, {
        format,
        outPath: values.out as string | undefined,
        downloadImages: Boolean(values['download-images']),
        dryRun: Boolean(values['dry-run']),
      });
      return;
    }

    default:
      printHelpAndExit();
  }
}

main().catch((err) => {
  process.stderr.write(`Fatal: ${(err as Error).stack || err}\n`);
  process.exit(1);
});
