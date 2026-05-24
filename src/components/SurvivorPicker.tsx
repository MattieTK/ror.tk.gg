import { useEffect, useRef, useState } from 'react';
import * as css from './SurvivorPicker.css';

// Survivor icons live in public/images/survivors/, named after the survivor
// with spaces as underscores (e.g. Void Fiend -> Void_Fiend.png).
function iconSrc(survivor: string): string {
	return `/images/survivors/${survivor.replace(/ /g, '_')}.png`;
}

interface SurvivorGroup {
	label: string;
	survivors: string[];
}

interface SurvivorPickerProps {
	survivor: string | null;
	groups: SurvivorGroup[];
	onSelect: (survivor: string) => void;
}

export function SurvivorPicker({
	survivor,
	groups,
	onSelect,
}: SurvivorPickerProps) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		const onPointer = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(false);
		};
		document.addEventListener('mousedown', onPointer);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('mousedown', onPointer);
			document.removeEventListener('keydown', onKey);
		};
	}, [open]);

	return (
		<div className={css.wrap} ref={ref}>
			<button
				type="button"
				className={css.trigger}
				onClick={() => setOpen(o => !o)}
				aria-haspopup="listbox"
				aria-expanded={open}
			>
				{survivor ? (
					<span
						className={css.icon}
						style={{ backgroundImage: `url(${iconSrc(survivor)})` }}
					/>
				) : null}
				<span className={css.name}>{survivor ?? 'Select a Survivor'}</span>
				<span className={css.caret} aria-hidden="true">
					▾
				</span>
			</button>
			{open && (
				<div className={css.menu} role="listbox">
					{groups.map(g => (
						<div key={g.label}>
							<div className={css.groupHeader}>{g.label}</div>
							{g.survivors.map(s => (
								<button
									key={s}
									type="button"
									role="option"
									aria-selected={s === survivor}
									className={`${css.option} ${s === survivor ? css.optionActive : ''}`}
									onClick={() => {
										onSelect(s);
										setOpen(false);
									}}
								>
									<span
										className={css.icon}
										style={{ backgroundImage: `url(${iconSrc(s)})` }}
									/>
									<span className={css.name}>{s}</span>
								</button>
							))}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default SurvivorPicker;
