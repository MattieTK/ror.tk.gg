import { useEffect, useState } from 'react';

// True only on coarse-pointer touch devices, where hover is replaced by
// tap-to-toggle. Resolved after mount: the server can't know the pointer type,
// so it starts false to match the server-rendered markup during hydration and
// flips on the client when appropriate.
export function useIsTouchDevice(): boolean {
	const [isTouch, setIsTouch] = useState(false);

	useEffect(() => {
		setIsTouch(
			'ontouchstart' in window &&
				window.matchMedia('(pointer: coarse)').matches,
		);
	}, []);

	return isTouch;
}

export default useIsTouchDevice;
