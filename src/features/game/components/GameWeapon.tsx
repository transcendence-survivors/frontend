import { useTranslations } from 'next-intl';
import GameIcon from './GameIcons';
import { GamePlayerWeaponStats } from '../types/game';
import { UserGameWeaponSummary } from '../types/summary';
import { MAP_WEAPON_KIND_TO_ICON } from '../types/icons';

export type GameWeaponItemProps =
	| { mode: 'single'; weapon: GamePlayerWeaponStats; className?: string }
	| { mode: 'summary'; weapon: UserGameWeaponSummary; className?: string };

const GameWeapon = (props: GameWeaponItemProps) => {
	const { weapon, className = '' } = props;
	const tWiki = useTranslations('wiki');
	const t = useTranslations('game');
	const iconName = MAP_WEAPON_KIND_TO_ICON[weapon.kind];

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
						{iconName ? tWiki(`weapons.${iconName}.name`) : weapon.kind}
					</h4>
					<h5 className='text-xs text-muted-foreground truncate'>
						{iconName ? tWiki(`weapons.${iconName}.type`) : ''}
					</h5>
				</div>
			</div>

			{props.mode === 'summary' ? (
				<div className='flex items-center gap-6 text-sm shrink-0'>
					<div className='text-right'>
						<span className='block text-xs text-muted-foreground'>
							{t('summary.labels.timesUsed')}
						</span>
						<strong className='font-medium text-card-foreground'>
							{props.weapon.timesUsed}x
						</strong>
					</div>
					<div className='text-right'>
						<span className='block text-xs text-muted-foreground'>
							{t('summary.labels.highestLevel')}
						</span>
						<strong className='font-bold text-primary'>
							{t('summary.labels.levelFormat', {
								level: props.weapon.highestLevel,
							})}
						</strong>
					</div>
				</div>
			) : (
				<div className='text-right shrink-0'>
					<strong className='font-bold text-primary text-sm'>
						{t('labels.level', { level: props.weapon.level })}
					</strong>
				</div>
			)}
		</div>
	);
};

export default GameWeapon;
