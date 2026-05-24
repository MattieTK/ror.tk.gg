import { useEffect, useState } from 'react';

interface MousePosition {
	x: number | null;
	y: number | null;
}

export function useMousePosition(): MousePosition {
	const [mousePosition, setMousePosition] = useState<MousePosition>({
		x: null,
		y: null,
	});

	useEffect(() => {
		const updateMousePosition = (ev: MouseEvent) => {
			setMousePosition({ x: ev.clientX, y: ev.clientY });
		};

		window.addEventListener('mousemove', updateMousePosition);
		return () => window.removeEventListener('mousemove', updateMousePosition);
	}, []);

	return mousePosition;
}

export default useMousePosition;
