import { useTranslations } from 'next-intl';
import GameIcon from './GameIcons';
import { GamePlayerTomeSummary } from '../types/game';
import { UserGameTomeSummary } from '../types/summary';
import { MAP_TOME_KIND_TO_ICON } from '../types/icons';

export type GameTomeItemProps =
	| { mode: 'single'; tome: GamePlayerTomeSummary; className?: string }
	| { mode: 'summary'; tome: UserGameTomeSummary; className?: string };

const GameTome = (props: GameTomeItemProps) => {
	const { tome, className = '' } = props;
	const tWiki = useTranslations('wiki');
	const t = useTranslations('game');
	const iconName = MAP_TOME_KIND_TO_ICON[tome.kind];

	return (
		<div
			className={`flex items-center justify-between bg-muted/30 border border-border px-4 py-3 rounded-xl hover:border-ring transition-colors ${className}`}>
			<div className='flex items-center gap-3 min-w-0'>
				<div className='p-2 bg-background rounded-lg border border-border shrink-0'>
					{iconName && (
						<GameIcon name={iconName} size={28} className='text-primary' />
					)}
				</div>
				<div className='min-w-0 truncate'>
					<h4 className='font-semibold text-card-foreground truncate'>
						{iconName ? tWiki(`tomes.${iconName}.name`) : tome.kind}
					</h4>
					<p className='text-xs text-muted-foreground truncate'>
						{iconName ? tWiki(`tomes.${iconName}.description`) : ''}
					</p>
				</div>
			</div>

			{props.mode === 'summary' ? (
				<div className='flex items-center gap-6 text-sm shrink-0'>
					<div className='text-right'>
						<span className='block text-xs text-muted-foreground'>
							{t('summary.labels.timesUsed')}
						</span>
						<strong className='font-medium text-card-foreground'>
							{props.tome.timesUsed}x
						</strong>
					</div>
					<div className='text-right'>
						<span className='block text-xs text-muted-foreground'>
							{t('summary.labels.highestLevel')}
						</span>
						<strong className='font-bold text-primary'>
							{t('summary.labels.levelFormat', {
								level: props.tome.highestLevel,
							})}
						</strong>
					</div>
				</div>
			) : (
				<div className='text-right shrink-0'>
					<strong className='font-bold text-primary text-sm'>
						{t('labels.level', { level: props.tome.level })}
					</strong>
				</div>
			)}
		</div>
	);
};

export default GameTome;
