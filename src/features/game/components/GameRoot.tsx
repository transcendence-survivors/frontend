'use client';
import { useEffect, useRef } from 'react';
import { initGame, destroyGame } from '@transcendence/game-ui';
import { useUser } from '@/features/auth/stores/session';

export function GameRoot() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const startedRef = useRef(false);

	const user = useUser();
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas || startedRef.current || !user) return;

		startedRef.current = true;
		let cancelled = false;

		initGame(canvas, user.displayName, user.id, user.avatarUrl).then(() => {
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
	}, [user]);

	return <canvas ref={canvasRef} className='w-full h-full' />;
}
