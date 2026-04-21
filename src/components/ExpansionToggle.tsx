import { useEffect, useState } from 'react';
import { EXPANSIONS } from '~/expansions';
import type { Expansion } from '~/items';
import {
	container,
	expansionIcon,
	expansionIconDisabled,
	expansionIconEnabled,
} from './ExpansionToggle.css';

// Any non-base expansion string from Item.expansion gets a boolean toggle,
// plus a 'base' entry for the original game. Adding a new expansion to the
// Expansion union in items.ts automatically requires an entry here.
export type ExpansionState = { base: boolean } & Record<
	Exclude<Expansion, ''>,
	boolean
>;

interface ExpansionToggleProps {
	onExpansionChange: (state: ExpansionState) => void;
}

// Build the default "everything enabled" state from the expansions config.
// Inactive expansions still get a true default so they work once activated
// without a code change.
function initialExpansionState(): ExpansionState {
	const state = { base: true } as ExpansionState;
	for (const exp of EXPANSIONS) {
		if (exp.key !== '') {
			(state as Record<string, boolean>)[exp.key] = true;
		}
	}
	return state;
}

export function ExpansionToggle({ onExpansionChange }: ExpansionToggleProps) {
	const [enabledExpansions, setEnabledExpansions] = useState<ExpansionState>(
		initialExpansionState,
	);

	useEffect(() => {
		onExpansionChange(enabledExpansions);
	}, [enabledExpansions, onExpansionChange]);

	const toggleExpansion = (expansion: keyof ExpansionState) => {
		setEnabledExpansions(prev => ({
			...prev,
			[expansion]: !prev[expansion],
		}));
	};

	// Only render toggles for non-base, active expansions with an icon.
	const toggleable = EXPANSIONS.filter(
		exp => exp.active && exp.key !== '' && exp.icon,
	);

	return (
		<div className={container}>
			{toggleable.map(exp => {
				const key = exp.key as Exclude<Expansion, ''>;
				const isEnabled = enabledExpansions[key];
				const iconClassName = `${expansionIcon} ${isEnabled ? expansionIconEnabled : expansionIconDisabled}`;

				return (
					<div
						key={key}
						className={iconClassName}
						style={{ backgroundImage: `url(${exp.icon})` }}
						onClick={() => toggleExpansion(key)}
						title={`${exp.name} - Click to ${isEnabled ? 'disable' : 'enable'}`}
					/>
				);
			})}
		</div>
	);
}

export default ExpansionToggle;
