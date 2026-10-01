import { useTranslations } from 'next-intl';
import { GameIcon } from '../GameIcons';
import { STAT_ATTRIBUTES } from '../../data/stats';
import { GamePlayerStatsDetails } from '../../types/game';

interface Props {
	playerStats: GamePlayerStatsDetails;
}

const GamePlayerAttributes = ({ playerStats }: Props) => {
	const t = useTranslations('game.labels');

	return (
		<ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5'>
			{STAT_ATTRIBUTES.map((attr) => {
				const rawVal = playerStats[attr.key];
				if (typeof rawVal !== 'number') return null;

				return (
					<li
						key={attr.key}
						className='flex items-center gap-2.5 bg-muted/30 border border-border px-3 py-2 rounded-lg'>
						<div className='p-1.5 bg-background rounded-md border border-border shrink-0'>
							<GameIcon
								name={attr.icon}
								size={20}
								className='text-primary'
							/>
						</div>
						<div className='min-w-0'>
							<h4 className='text-[11px] font-medium text-muted-foreground truncate'>
								{t(attr.labelKey)}
							</h4>
							<strong className='text-sm font-bold text-card-foreground'>
								{attr.format(rawVal)}
							</strong>
						</div>
					</li>
				);
			})}
		</ul>
	);
};

export default GamePlayerAttributes;
