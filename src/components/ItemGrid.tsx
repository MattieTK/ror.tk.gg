import type { ReactNode } from 'react';
import { container, grid } from './ItemGrid.css';

interface ItemGridProps {
	children: ReactNode;
}

export function ItemGrid({ children }: ItemGridProps) {
	return (
		<div className={container}>
			<div className={grid}>{children}</div>
		</div>
	);
}

export default ItemGrid;
