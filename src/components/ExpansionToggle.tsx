import { useEffect, useState } from 'react';
import {
	container,
	expansionIcon,
	expansionIconDisabled,
	expansionIconEnabled,
} from './ExpansionToggle.css';

export type ExpansionState = {
	base: boolean;
	'Survivors of the Void': boolean;
	'Seekers of the Storm': boolean;
};

interface ExpansionToggleProps {
	onExpansionChange: (state: ExpansionState) => void;
}

const expansionData = [
	{
		key: 'Survivors of the Void' as const,
		name: 'Survivors of the Void',
		icon: '/images/SotV_Icon.png',
	},
	{
		key: 'Seekers of the Storm' as const,
		name: 'Seekers of the Storm',
		icon: '/images/SotS_Icon.png',
	},
];

export function ExpansionToggle({ onExpansionChange }: ExpansionToggleProps) {
	const [enabledExpansions, setEnabledExpansions] = useState<ExpansionState>({
		base: true,
		'Survivors of the Void': true,
		'Seekers of the Storm': true,
	});

	useEffect(() => {
		onExpansionChange(enabledExpansions);
	}, [enabledExpansions, onExpansionChange]);

	const toggleExpansion = (expansion: keyof ExpansionState) => {
		setEnabledExpansions(prev => ({
			...prev,
			[expansion]: !prev[expansion],
		}));
	};

	return (
		<div className={container}>
			{expansionData.map(expansion => {
				const isEnabled = enabledExpansions[expansion.key];
				const iconClassName = `${expansionIcon} ${isEnabled ? expansionIconEnabled : expansionIconDisabled}`;

				return (
					<div
						key={expansion.key}
						className={iconClassName}
						style={{ backgroundImage: `url(${expansion.icon})` }}
						onClick={() => toggleExpansion(expansion.key)}
						title={`${expansion.name} - Click to ${isEnabled ? 'disable' : 'enable'}`}
					/>
				);
			})}
		</div>
	);
}

export default ExpansionToggle;
