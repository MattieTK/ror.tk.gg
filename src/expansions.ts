import type { Expansion } from './items';

export interface ExpansionConfig {
	key: Expansion;
	name: string;
	shortName: string;
	icon: string | null;
	/**
	 * When false, the expansion's items are hidden from the UI entirely and
	 * no toggle icon is rendered. Use this to stage an expansion's data in
	 * `items.ts` ahead of its public launch.
	 */
	active: boolean;
}

export const EXPANSIONS: ExpansionConfig[] = [
	{
		key: '',
		name: 'Base Game',
		shortName: 'Base',
		icon: null,
		active: true,
	},
	{
		key: 'Survivors of the Void',
		name: 'Survivors of the Void',
		shortName: 'SotV',
		icon: '/images/SotV_Icon.png',
		active: true,
	},
	{
		key: 'Seekers of the Storm',
		name: 'Seekers of the Storm',
		shortName: 'SotS',
		icon: '/images/SotS_Icon.png',
		active: true,
	},
	{
		key: 'Alloyed Collective',
		name: 'Alloyed Collective',
		shortName: 'AC',
		icon: '/images/AC_Icon.png',
		active: false,
	},
];

export const ACTIVE_EXPANSIONS = EXPANSIONS.filter(e => e.active);

export function isExpansionActive(key: Expansion): boolean {
	return EXPANSIONS.find(e => e.key === key)?.active ?? false;
}
