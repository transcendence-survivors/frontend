'use client';
import { useEffect, useRef } from 'react';
import { initGame, destroyGame } from '@transcendence/game-ui';
import { useUser } from '@/features/auth/stores/session';
import useLocaleParams from '@/modules/i18n/hooks/useLocale';

export function GameRoot() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const startedRef = useRef(false);

	const user = useUser();
	const locale = useLocaleParams();
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas || startedRef.current || !user) return;
		
		let cancelled = false;
		
		if (startedRef.current === false) {
			startedRef.current = true;
			initGame(canvas, user.displayName, user.id, locale.currentLocale, user.avatarUrl).then(() => {
				if (cancelled) {
					destroyGame();
					startedRef.current = false;
				}
			});
		}
			return () => {
				cancelled = true;
				destroyGame();
				startedRef.current = false;
			};
	}, [user, locale]);

	return <canvas ref={canvasRef} className='w-full h-full' />;
}
