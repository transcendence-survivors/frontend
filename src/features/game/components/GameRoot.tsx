'use client';
import { useEffect, useRef } from 'react';
import { initGame, destroyGame } from '@transcendence/game-ui';

export function GameRoot() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const startedRef = useRef(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas || startedRef.current) return;

		startedRef.current = true;
		let cancelled = false;

		console.log(canvas);
		initGame(canvas).then(() => {
			if (cancelled) {
				destroyGame();
				startedRef.current = false;
			}
		});
		return () => {
			cancelled = true;
			destroyGame();
			startedRef.current = false;
		};
	}, []);

	return <canvas ref={canvasRef} className='w-full h-full' />;
}
