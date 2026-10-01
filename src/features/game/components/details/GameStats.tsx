import { useTranslations } from 'next-intl';
import GamePlayerCard from './GamePlayerCard';
import { GameStatsDetails } from '../../types/game';
import { formatDuration } from '../../utils/duration';
import Kicker from '@/components/ui/kicker';
import StatMetric from '../StatMetric';

interface GameCardProps {
	game: GameStatsDetails;
}

const GameStats = ({ game }: GameCardProps) => {
	const t = useTranslations('game');

	return (
		<>
			<header className='grid grid-cols-2 md:flex md:items-center md:divide-x divide-border rounded-xl border border-border bg-muted/20 py-4 gap-y-4 md:gap-y-0 shadow-sm'>
				<StatMetric
					label={t('labels.survivalTime')}
					value={formatDuration(game.survivalTime)}
					variant='primary'
				/>
				<StatMetric
					label={t('labels.matchKills')}
					value={game.totalKills.toLocaleString()}
					variant='destructive'
				/>
			</header>

			<div className='space-y-4'>
				<Kicker>
					<h2 className='text-base'>{t('playerStatsTitle')}</h2>
				</Kicker>

				<div className='space-y-4'>
					{game.players.map((player) => (
						<GamePlayerCard key={player.id} player={player} />
					))}
				</div>
			</div>
		</>
	);
};

export default GameStats;
