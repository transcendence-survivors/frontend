import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import DisplayDate from '@/components/ui/date';
import { formatDuration } from '../../utils/duration';
import StatMetric from '../StatMetric';
import Kicker from '@/components/ui/kicker';
import PlayButton from '../PlayButton';
import { UserGameSummary } from '../../types/summary';
import GameWeapon from '../GameWeapon';
import GameTome from '../GameTome';

interface Props {
	summary: UserGameSummary;
}

const GameUserSummary = ({ summary }: Props) => {
	const t = useTranslations('game.summary');

	return (
		<>
			<header className='px-10 py-8 border-b border-border'>
				<section className='flex items-center justify-between mx-auto'>
					<div className='space-y-2'>
						<h1 className='text-3xl font-bold tracking-tight text-foreground'>
							{t('title')}
						</h1>
						<div className='flex items-center gap-4'>
							<Kicker className='text-xs'>
								<span>{t('lastPlayed')} :</span>
								<DisplayDate
									date={summary.lastPlayedAt}
									formatOptions={{
										month: 'short',
										day: 'numeric',
										hour: '2-digit',
										minute: '2-digit',
										year: 'numeric',
									}}
								/>
							</Kicker>
							<Badge
								variant='outline'
								className='text-xs border-border text-foreground font-semibold'>
								{summary.totalGamesPlayed} {t('gamesPlayed')}
							</Badge>
						</div>
					</div>
					<div className='flex gap-2'>
						<PlayButton />
					</div>
				</section>
			</header>

			<section className='space-y-6 px-10 py-6'>
				<div className='grid grid-cols-2 divide-border rounded-xl border border-border bg-muted/20 py-4 gap-y-4 shadow-sm lg:flex lg:grid-cols-4 lg:divide-x '>
					<StatMetric
						label={t('totalKills')}
						value={summary.totalKills.toLocaleString()}
						variant='destructive'
					/>
					<StatMetric
						label={t('totalSurvivalTime')}
						value={formatDuration(summary.totalSurvivalTime)}
						variant='primary'
					/>
					<StatMetric
						label={t('highestSurvivalTime')}
						value={formatDuration(summary.highestSurvivalTime)}
						variant='chart-2'
					/>
					<StatMetric
						label={t('highestKills')}
						value={summary.highestKills.toLocaleString()}
						variant='chart-3'
					/>
				</div>

				<div className='space-y-3'>
					<Kicker>
						<h3 className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>
							{t('weaponsUsed')}
						</h3>
					</Kicker>

					{summary.weaponSummaries.length === 0 ? (
						<p className='text-sm text-muted-foreground italic'>
							{t('noWeapons')}
						</p>
					) : (
						<ul className='space-y-2'>
							{summary.weaponSummaries.map((weapon) => (
								<li key={weapon.kind}>
									<GameWeapon mode='summary' weapon={weapon} />
								</li>
							))}
						</ul>
					)}
				</div>

				<div className='space-y-3'>
					<Kicker>
						<h3 className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>
							{t('tomesUsed')}
						</h3>
					</Kicker>

					{summary.tomeSummaries.length === 0 ? (
						<p className='text-sm text-muted-foreground italic'>
							{t('noTomes')}
						</p>
					) : (
						<ul className='space-y-2'>
							{summary.tomeSummaries.map((tome) => (
								<li key={tome.kind}>
									<GameTome mode='summary' tome={tome} />
								</li>
							))}
						</ul>
					)}
				</div>
			</section>
		</>
	);
};

export default GameUserSummary;
