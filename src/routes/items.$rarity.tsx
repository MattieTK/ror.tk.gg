import { useEffect, useState } from 'react';
import GitHubButton from 'react-github-btn';
import { createFileRoute, redirect } from '@tanstack/react-router';

import ExpansionToggle, {
	type ExpansionState,
} from '~/components/ExpansionToggle';
import type { HoveredItem } from '~/components/Item';
import ItemList from '~/components/ItemList';
import { type NavigableRarity, RarityBox } from '~/components/RarityBox';
import useMousePosition from '~/lib/useMousePosition';
import homeStyles from '~/styles/Home.module.css';
import {
	hoverBox,
	hoverBoxDescription,
	hoverBoxTitle,
} from '~/styles/HoverBox.css';
import {
	container,
	flex,
	flexColumn,
	flexSpaceAround,
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

	const tooltipStyle: React.CSSProperties = isMobile
		? {
				position: 'fixed',
				top: '10px',
				left: '50%',
				transform: 'translateX(-50%)',
				zIndex: 1000,
				maxWidth: '90vw',
			}
		: {
				top: y > window.innerHeight - 150 ? y - 120 : y + 5,
				left: x + 5,
			};

	return (
		<div
			className={hoverBox}
			style={tooltipStyle}
			onMouseEnter={e => e.preventDefault()}
			onMouseLeave={e => e.preventDefault()}
		>
			<div className={hoverBoxTitle}>{item.name}</div>
			<div className={hoverBoxDescription}>{item.description}</div>
		</div>
	);
}

function RarityPage() {
	const { rarity } = Route.useParams();
	const [hoveredItem, setHoveredItem] = useState<HoveredItem | null>(null);
	const [enabledExpansions, setEnabledExpansions] = useState<ExpansionState>({
		base: true,
		'Survivors of the Void': true,
		'Seekers of the Storm': true,
	});

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

	return (
		<div className={`${homeStyles.container} ${container}`}>
			<div
				className={flex}
				style={{
					justifyContent: 'space-between',
					alignItems: 'flex-start',
					width: '100%',
					marginBottom: '20px',
				}}
			>
				<div className={flex}>
					{VALID_RARITIES.map(r => (
						<RarityBox key={r} rarity={r} active={rarity} />
					))}
				</div>
				<div>
					<ExpansionToggle onExpansionChange={setEnabledExpansions} />
				</div>
			</div>
			<div className={flexSpaceAround}>
				<div
					className={flexColumn}
					style={{
						alignContent: 'center',
						width: 'min-content',
						justifyContent: 'space-around',
					}}
				>
					<h1 className={heading}>What is your Command?</h1>
					<HoverBox item={hoveredItem} />
					<div>
						<ItemList
							rarity={rarity as NavigableRarity}
							setHoveredItem={setHoveredItem}
							enabledExpansions={enabledExpansions}
						/>
					</div>
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
