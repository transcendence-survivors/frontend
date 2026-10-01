'use client';

import { useEffect, useRef } from 'react';
import { initGame, destroyGame } from '@transcendence/game-ui';
import { useUser } from '@/features/auth/stores/session';
import useLocaleParams from '@/modules/i18n/hooks/useLocale';
import { env } from '@/libs/env';

export function GameRoot() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const user = useUser();
	const locale = useLocaleParams();

	const username = user?.username;
	const userId = user?.id;
	const displayName = user?.displayName;
	const avatarUrl = user?.avatarUrl;
	const currentLocale = locale.currentLocale;

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas || !username || !userId || !displayName) return;

		initGame(
			canvas,
			username,
			userId,
			currentLocale,
			displayName,
			env.NEXT_PUBLIC_GAME_SOCKET_URL,
			avatarUrl,
		);

		return () => {
			destroyGame();
		};
	}, [username, userId, displayName, avatarUrl, currentLocale]);

	return <canvas ref={canvasRef} className='w-full h-full' />;
}
