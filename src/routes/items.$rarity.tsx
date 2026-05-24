import { useEffect, useState } from 'react';
import GitHubButton from 'react-github-btn';
import {
	createFileRoute,
	redirect,
	useNavigate,
} from '@tanstack/react-router';

import ExpansionToggle, {
	defaultExpansionState,
	type ExpansionState,
} from '~/components/ExpansionToggle';
import { EXPANSIONS } from '~/expansions';
import BuildSidebar from '~/components/BuildSidebar';
import type { HoveredItem } from '~/components/Item';
import ItemList from '~/components/ItemList';
import { type NavigableRarity, RarityBox } from '~/components/RarityBox';
import * as layout from '~/styles/layout.css';
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
import {
	container,
	flex,
	flexColumn,
	flexSpaceAround,
	groupLabel,
	heading,
	link,
	paragraph,
} from '~/styles/theme.css';

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
		return {
			meta: [
				{ title },
				{ name: 'description', content: description },
				{ property: 'og:title', content: title },
				{ property: 'og:description', content: description },
				{ name: 'twitter:title', content: title },
				{ name: 'twitter:description', content: description },
			],
		};
	},
	component: RarityPage,
});

const FALLBACK_RARITY_COLOR = '#7e7f7f';

function rarityColor(rarity: string): string {
	return (rarityColors as Record<string, string>)[rarity] ?? FALLBACK_RARITY_COLOR;
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
	const { x, y } = useMousePosition();
	const [isClient, setIsClient] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		setIsClient(true);
		const isTouchDevice =
			'ontouchstart' in window &&
			window.matchMedia('(pointer: coarse)').matches;
		setIsMobile(isTouchDevice);
	}, []);

	if (!item || !isClient || x === null || y === null) {
		return null;
	}

	const color = rarityColor(item.rarity);
	const expansion = EXPANSIONS.find(e => e.key === item.expansion);

	// Estimated panel size; used to flip the tooltip away from the right/bottom
	// edges instead of letting it overflow, and to clamp it on-screen.
	const TOOLTIP_W = 340;
	const TOOLTIP_H = 180;
	const margin = 12;

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
					y + TOOLTIP_H + margin > window.innerHeight
						? Math.max(8, y - TOOLTIP_H - margin)
						: y + margin,
				left:
					x + TOOLTIP_W + margin > window.innerWidth
						? Math.max(8, x - TOOLTIP_W - margin)
						: x + margin,
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
	const navigate = useNavigate();
	const [hoveredItem, setHoveredItem] = useState<HoveredItem | null>(null);
	const [enabledExpansions, setEnabledExpansions] =
		useState<ExpansionState>(defaultExpansionState);
	const [mobileTab, setMobileTab] = useState<'items' | 'builds'>('items');
	const [drawerOpen, setDrawerOpen] = useState(false);

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
				if (next) navigate({ to: '/items/$rarity', params: { rarity: next } });
			} else if (e.key === 'ArrowLeft') {
				const prev = VALID_RARITIES[currentIndex - 1];
				if (prev) navigate({ to: '/items/$rarity', params: { rarity: prev } });
			}
		};

		window.addEventListener('keydown', keydownHandler);
		return () => window.removeEventListener('keydown', keydownHandler);
	}, [rarity, navigate]);

	return (
		<div className={`${homeStyles.container} ${container}`}>
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

			{/* Rarities + Expansions: inline header on desktop, off-canvas drawer on mobile */}
			<div
				className={`${layout.controlsBar} ${drawerOpen ? layout.controlsBarOpen : ''}`}
			>
				<button
					type="button"
					className={layout.drawerClose}
					aria-label="Close filters"
					onClick={() => setDrawerOpen(false)}
				>
					×
				</button>
				<div
					className={flexColumn}
					style={{ alignItems: 'flex-start', gap: '6px' }}
				>
					<span className={groupLabel}>Rarities</span>
					<div className={flex} style={{ flexWrap: 'wrap', gap: '6px' }}>
						{VALID_RARITIES.map(r => (
							<RarityBox key={r} rarity={r} active={rarity} />
						))}
					</div>
				</div>
				<div>
					<ExpansionToggle onExpansionChange={setEnabledExpansions} />
				</div>
			</div>

			{/* Rendered at the top level so it shows on either mobile tab — inside a
			    panel it would be hidden when that panel's tab is inactive. */}
			<HoverBox item={hoveredItem} />

			<div className={layout.mainArea}>
				<div className={layout.desktopSpacer} />
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
							/>
						</div>
					</div>
				</div>
				<div
					className={`${layout.buildCol} ${mobileTab !== 'builds' ? layout.mobileHidden : ''}`}
				>
					<BuildSidebar setHoveredItem={setHoveredItem} />
				</div>
			</div>
			<div className={flexSpaceAround}>
				<div style={{ padding: '4px', textAlign: 'center' }}>
					<p className={paragraph} style={{ marginBottom: '10px' }}>
						By{' '}
						<a href="https://bsky.app/profile/tk.gg" className={link}>
							@MattieTK
						</a>{' '}
						and{' '}
						<a href="https://bsky.app/profile/hutch.tf" className={link}>
							@chrishutchinson
						</a>
					</p>
					<GitHubButton
						href="https://github.com/MattieTK/ror.tk.gg"
						data-icon="octicon-star"
						aria-label="Star MattieTK/ror.tk.gg on GitHub"
					>
						Star
					</GitHubButton>
				</div>
			</div>
		</div>
	);
}
