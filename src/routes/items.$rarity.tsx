import { useEffect, useMemo, useRef, useState } from 'react';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';

import ExpansionToggle, {
  defaultExpansionState,
  type ExpansionState,
} from '~/components/ExpansionToggle';
import { EXPANSIONS } from '~/expansions';
import items, { isDisplayable } from '~/items';
import BuildSidebar from '~/components/BuildSidebar';
import type { HoveredItem } from '~/components/Item';
import ItemList, { matchesSearch } from '~/components/ItemList';
import { type NavigableRarity, RarityBox } from '~/components/RarityBox';
import * as layout from '~/styles/layout.css';
import useIsTouchDevice from '~/lib/useIsTouchDevice';
import useMousePosition from '~/lib/useMousePosition';
import homeStyles from '~/styles/Home.module.css';
import { rarityColors } from '~/components/RarityBox.css';
import {
  hoverBox,
  hoverBoxDescription,
  hoverBoxExpansion,
  hoverBoxExpansionIcon,
  hoverBoxReason,
  hoverBoxTitle,
  hoverBoxValue,
} from '~/styles/HoverBox.css';
import { container, groupLabel, heading } from '~/styles/theme.css';

const VALID_RARITIES: NavigableRarity[] = [
  'Common',
  'Uncommon',
  'Legendary',
  'Boss',
  'Lunar',
  'Equipment',
  'Void',
];

function isNavigableRarity(value: string): value is NavigableRarity {
  return (VALID_RARITIES as string[]).includes(value);
}

export const Route = createFileRoute('/items/$rarity')({
  // `?q=` holds the active search so it survives a refresh and can be shared.
  validateSearch: (search: Record<string, unknown>): { q?: string } => {
    const q = typeof search.q === 'string' ? search.q : undefined;
    return q ? { q } : {};
  },
  beforeLoad: ({ params }) => {
    if (!isNavigableRarity(params.rarity)) {
      throw redirect({
        to: '/items/$rarity',
        params: { rarity: 'Common' },
      });
    }
  },
  head: ({ params }) => {
    const rarity = params.rarity;
    const title = `${rarity} Items - Risk of Rain 2 | ror.tk.gg`;
    const description = `A complete list of all ${rarity} items in Risk of Rain 2. Find all ${rarity} items and view their stats and effects.`;
    const url = `https://ror.tk.gg/items/${rarity}`;
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: url },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
      ],
      // Per-rarity canonical so each tab is its own indexable page rather than
      // collapsing onto the site root.
      links: [{ rel: 'canonical', href: url }],
    };
  },
  component: RarityPage,
});

const FALLBACK_RARITY_COLOR = '#7e7f7f';

function rarityColor(rarity: string): string {
  return (
    (rarityColors as Record<string, string>)[rarity] ?? FALLBACK_RARITY_COLOR
  );
}

// Light up the numbers (and percentages) in a description the way the game
// colours stat text. split() keeps the captured tokens, so we just wrap the
// numeric ones.
function renderDescription(text: string): React.ReactNode {
  return text.split(/([+-]?\d+(?:\.\d+)?%?)/g).map((part, i) =>
    /^[+-]?\d/.test(part) ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: stable split order
      <span key={i} className={hoverBoxValue}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

function HoverBox({ item }: { item: HoveredItem | null }) {
  const isMobile = useIsTouchDevice();
  const [isClient, setIsClient] = useState(false);
  // Track the cursor only for a mouse-driven desktop tooltip — not when it's
  // pinned to a keyboard-focused tile (anchor) or on mobile — so idle mouse
  // movement over the grid doesn't re-render on every frame.
  const followsCursor = !!item && !isMobile && !item.anchor;
  const { x, y } = useMousePosition(followsCursor);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!item || !isClient) {
    return null;
  }
  // A cursor-following desktop panel needs coordinates; the mobile and
  // anchored panels are pinned and render without them.
  if (followsCursor && (x === null || y === null)) {
    return null;
  }

  const color = rarityColor(item.rarity);
  const expansion = EXPANSIONS.find((e) => e.key === item.expansion);

  // Estimated panel size; used to flip the tooltip away from the right/bottom
  // edges instead of letting it overflow, and to clamp it on-screen.
  const TOOLTIP_W = 340;
  const TOOLTIP_H = 180;
  const margin = 12;

  // Pin to the focused tile when keyboard-anchored, otherwise follow the
  // cursor (guaranteed non-null on that path by the guard above).
  const anchorX = item.anchor ? item.anchor.x : (x ?? 0);
  const anchorY = item.anchor ? item.anchor.y : (y ?? 0);

  const tooltipStyle: React.CSSProperties = isMobile
    ? {
        position: 'fixed',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        maxWidth: '90vw',
        borderLeftColor: color,
      }
    : {
        top:
          anchorY + TOOLTIP_H + margin > window.innerHeight
            ? Math.max(8, anchorY - TOOLTIP_H - margin)
            : anchorY + margin,
        left:
          anchorX + TOOLTIP_W + margin > window.innerWidth
            ? Math.max(8, anchorX - TOOLTIP_W - margin)
            : anchorX + margin,
        borderLeftColor: color,
      };

  return (
    <div className={hoverBox} style={tooltipStyle}>
      {expansion && expansion.key !== '' && (
        <div className={hoverBoxExpansion} title={expansion.name}>
          {expansion.icon ? (
            <span
              className={hoverBoxExpansionIcon}
              style={{ backgroundImage: `url(${expansion.icon})` }}
            />
          ) : (
            expansion.shortName
          )}
        </div>
      )}
      <div className={hoverBoxTitle}>{item.name}</div>
      <div className={hoverBoxDescription}>
        {renderDescription(item.description)}
      </div>
      {item.reason && <div className={hoverBoxReason}>{item.reason}</div>}
    </div>
  );
}

function RarityPage() {
  const { rarity } = Route.useParams();
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<HoveredItem | null>(null);
  const [enabledExpansions, setEnabledExpansions] = useState<ExpansionState>(
    defaultExpansionState,
  );
  const [mobileTab, setMobileTab] = useState<'items' | 'builds'>('items');
  const [drawerOpen, setDrawerOpen] = useState(false);
  // The URL's `q` is the source of truth; this local mirror keeps typing snappy
  // without waiting on each navigation to commit.
  const [searchTerm, setSearchTerm] = useState(q ?? '');

  // Re-sync when `q` changes from outside typing — a shared link, a refresh, or
  // the browser back/forward buttons.
  useEffect(() => {
    setSearchTerm(q ?? '');
  }, [q]);

  const updateSearch = (value: string) => {
    setSearchTerm(value);
    navigate({
      to: '/items/$rarity',
      params: { rarity },
      search: value ? { q: value } : {},
      replace: true,
    });
  };

  // Jumping to a build pick: clear any search, switch to its rarity (and the
  // items tab on mobile), then pulse the tile. The flash auto-clears so the
  // same pick can be triggered again later.
  const [flashItem, setFlashItem] = useState<string | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (flashTimer.current) clearTimeout(flashTimer.current);
    },
    [],
  );

  const goToBuildItem = (name: string, itemRarity: string) => {
    setSearchTerm('');
    setMobileTab('items');
    navigate({
      to: '/items/$rarity',
      params: { rarity: itemRarity },
      search: {},
    });
    setFlashItem(name);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlashItem(null), 1800);
  };

  // Per-rarity match counts shown on the pills while a search is active. null
  // when there's no search, so the count slots stay collapsed.
  const searchCounts = useMemo(() => {
    const term = searchTerm.trim();
    if (term === '') return null;
    const counts = {} as Record<NavigableRarity, number>;
    for (const r of VALID_RARITIES) {
      counts[r] = items.filter(
        (it) => it.rarity === r && isDisplayable(it) && matchesSearch(it, term),
      ).length;
    }
    return counts;
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (e: TouchEvent) => {
      const target = e.target as Element | null;
      if (hoveredItem && target && !target.closest('[data-item-container]')) {
        setHoveredItem(null);
      }
    };

    if ('ontouchstart' in window) {
      document.addEventListener('touchstart', handleClickOutside);
      return () =>
        document.removeEventListener('touchstart', handleClickOutside);
    }
  }, [hoveredItem]);

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      const currentIndex = VALID_RARITIES.indexOf(rarity as NavigableRarity);
      if (currentIndex === -1) return;

      if (e.key === 'ArrowRight') {
        const next = VALID_RARITIES[currentIndex + 1];
        if (next)
          navigate({
            to: '/items/$rarity',
            params: { rarity: next },
            search: (prev) => prev,
          });
      } else if (e.key === 'ArrowLeft') {
        const prev = VALID_RARITIES[currentIndex - 1];
        if (prev)
          navigate({
            to: '/items/$rarity',
            params: { rarity: prev },
            search: (prevSearch) => prevSearch,
          });
      }
    };

    window.addEventListener('keydown', keydownHandler);
    return () => window.removeEventListener('keydown', keydownHandler);
  }, [rarity, navigate]);

  return (
    <div
      className={`${homeStyles.container} ${container}`}
      style={{ paddingTop: 'clamp(20px, 4vh, 48px)' }}
    >
      {/* Mobile-only tab + filters bar */}
      <div className={layout.mobileBar}>
        <div className={layout.tabSwitch}>
          <button
            type="button"
            className={`${layout.tabButton} ${mobileTab === 'items' ? layout.tabButtonActive : ''}`}
            aria-pressed={mobileTab === 'items'}
            onClick={() => {
              setMobileTab('items');
              setDrawerOpen(false);
            }}
          >
            Items
          </button>
          <button
            type="button"
            className={`${layout.tabButton} ${mobileTab === 'builds' ? layout.tabButtonActive : ''}`}
            aria-pressed={mobileTab === 'builds'}
            onClick={() => {
              setMobileTab('builds');
              setDrawerOpen(false);
            }}
          >
            Builds
          </button>
        </div>
        {mobileTab === 'items' && (
          <button
            type="button"
            className={layout.filtersButton}
            onClick={() => setDrawerOpen(true)}
          >
            Filters
          </button>
        )}
      </div>

      {drawerOpen && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: backdrop dismiss
        <div
          className={layout.drawerBackdrop}
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Rendered at the top level so it shows on either mobile tab — inside a
			    panel it would be hidden when that panel's tab is inactive. */}
      <HoverBox item={hoveredItem} />

      <div className={layout.layoutGrid}>
        {/* Rarities + Expansions: split into the left/right grid cells on
				    desktop (filters is display:contents), grouped into the off-canvas
				    drawer on mobile. */}
        <div
          className={`${layout.filters} ${drawerOpen ? layout.filtersOpen : ''}`}
        >
          <button
            type="button"
            className={layout.drawerClose}
            aria-label="Close filters"
            onClick={() => setDrawerOpen(false)}
          >
            ×
          </button>
          <div className={layout.raritiesCol}>
            <span className={groupLabel}>Rarities</span>
            <div className={layout.raritiesStack}>
              {VALID_RARITIES.map((r) => (
                <RarityBox
                  key={r}
                  rarity={r}
                  active={rarity}
                  count={searchCounts ? searchCounts[r] : undefined}
                />
              ))}
            </div>
          </div>
          <div className={layout.expansionsCol}>
            <ExpansionToggle onExpansionChange={setEnabledExpansions} />
          </div>
        </div>

        <div
          className={`${layout.gridPanel} ${mobileTab !== 'items' ? layout.mobileHidden : ''}`}
        >
          <div className={layout.commandFrame}>
            <div className={layout.commandInner}>
              <h1 className={`${heading} ${layout.commandTitle}`}>
                What is your Command?
              </h1>
              <ItemList
                rarity={rarity as NavigableRarity}
                setHoveredItem={setHoveredItem}
                enabledExpansions={enabledExpansions}
                searchTerm={searchTerm}
                onSearchChange={updateSearch}
                flashItem={flashItem}
              />
            </div>
          </div>
        </div>

        <div
          className={`${layout.buildCol} ${mobileTab !== 'builds' ? layout.mobileHidden : ''}`}
        >
          <BuildSidebar
            setHoveredItem={setHoveredItem}
            onSelectItem={goToBuildItem}
            enabledExpansions={enabledExpansions}
          />
        </div>
      </div>
      <footer className={layout.footer}>
        <p className={layout.credit}>
          By{' '}
          <a
            href="https://bsky.app/profile/tk.gg"
            className={layout.creditLink}
          >
            @MattieTK
          </a>{' '}
          and{' '}
          <a
            href="https://bsky.app/profile/hutch.tf"
            className={layout.creditLink}
          >
            @chrishutchinson
          </a>
        </p>
        <a
          className={layout.starButton}
          href="https://github.com/MattieTK/ror.tk.gg"
          target="_blank"
          rel="noreferrer"
          aria-label="Star MattieTK/ror.tk.gg on GitHub"
        >
          <span className={layout.starButtonInner}>
            <span className={layout.star} aria-hidden="true">
              ★
            </span>
            Star on GitHub
          </span>
        </a>
      </footer>
    </div>
  );
}
