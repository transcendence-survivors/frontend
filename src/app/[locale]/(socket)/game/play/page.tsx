import { GameRoot } from '@/features/game/components/GameRoot';

export default function Page() {
	return (
		<div className='w-dvw h-dvh overflow-hidden touch-none overscroll-none select-none'>
			<GameRoot />
		</div>
	);
}
