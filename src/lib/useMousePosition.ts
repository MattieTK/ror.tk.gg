import { useEffect, useState } from 'react';

interface MousePosition {
	x: number | null;
	y: number | null;
}

// Tracks the cursor for the hover tooltip. `enabled` gates the global listener
// so the page isn't re-rendering on every idle mouse move — the caller turns it
// on only while a tooltip is actually showing. The last position is retained
// when disabled, so re-enabling doesn't briefly read null.
export function useMousePosition(enabled = true): MousePosition {
	const [mousePosition, setMousePosition] = useState<MousePosition>({
		x: null,
		y: null,
	});

	useEffect(() => {
		if (!enabled) return;
		const updateMousePosition = (ev: MouseEvent) => {
			setMousePosition({ x: ev.clientX, y: ev.clientY });
		};

		window.addEventListener('mousemove', updateMousePosition);
		return () => window.removeEventListener('mousemove', updateMousePosition);
	}, [enabled]);

	return mousePosition;
}

export default useMousePosition;
