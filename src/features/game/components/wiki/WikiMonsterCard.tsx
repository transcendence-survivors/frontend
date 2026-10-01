import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Skull, Zap, Heart, Footprints, Coins } from 'lucide-react';
import { MAP_MONSTER_ID_TO_IMAGE, MonsterCardProps } from '../../types/wiki';
import { useTranslations } from 'next-intl';
import { cn } from '@/libs/utils';

export const WikiMonsterCard = (monster: MonsterCardProps) => {
	const t = useTranslations('wiki');
	const monsterKey = `bestiary.monsters.${monster.id}` as const;
	const isBoss = monster.rank === 'boss';
	const imageSrc =
		MAP_MONSTER_ID_TO_IMAGE[monster.id] ?? '/images/monsters/placeholder.png';

	const statsConfig = [
		{
			key: 'hp',
			icon: Heart,
			iconClass: 'text-destructive',
			value: monster.baseStats.maxLife.toLocaleString(),
			valueClass: 'text-foreground',
		},
		{
			key: 'damage',
			icon: Zap,
			iconClass: 'text-amber-500',
			value: monster.baseStats.damage,
			valueClass: 'text-foreground',
		},
		{
			key: 'speed',
			icon: Footprints,
			iconClass: 'text-primary',
			value: monster.baseStats.moveSpeed,
			valueClass: 'text-foreground',
		},
		{
			key: 'knockback',
			icon: Shield,
			iconClass: 'text-blue-500',
			value: `${Math.round(monster.baseStats.knockbackResistance * 100)}%`,
			valueClass: 'text-foreground',
		},
		{
			key: 'xp',
			icon: Coins,
			iconClass: 'text-emerald-500',
			value: `+${monster.baseStats.rewardXp}`,
			valueClass: 'text-primary',
		},
		{
			key: 'spawns',
			icon: Skull,
			iconClass: 'text-purple-500',
			value: t('bestiary.labels.secPlus', { seconds: monster.spawn.fromSecond }),
			valueClass: 'text-foreground',
		},
	] as const;

	return (
		<Card
			className={cn(
				'group/card h-full py-0 flex flex-col bg-card/60 hover:bg-muted border-border shadow-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-border/80',
				isBoss &&
					'border-destructive/30 bg-destructive/[0.02] hover:border-destructive/50',
			)}>
			<div className='relative w-full h-44 bg-gradient-to-b from-muted/60 via-muted/20 to-transparent flex items-center justify-center p-4 border-b border-border/50 overflow-hidden'>
				<div
					className={cn(
						'absolute inset-0 opacity-20 blur-2xl transition-opacity duration-300 group-hover/card:opacity-35',
						isBoss ? 'bg-destructive' : 'bg-primary',
					)}
				/>

				<div className='absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10'>
					<Badge
						variant={isBoss ? 'destructive' : 'outline'}
						className='uppercase text-[10px] font-semibold tracking-wider px-2.5 py-0.5 shadow-sm backdrop-blur-md'>
						{t(`${monsterKey}.role`)}
					</Badge>

					{monster.spawn.canBeElite && (
						<Badge
							variant='outline'
							className='text-[10px] font-semibold tracking-wider text-chart-1 bg-chart-1/10 border-chart-1/20 px-2.5 py-0.5 backdrop-blur-md'>
							{t('bestiary.labels.canBeElite')}
						</Badge>
					)}
				</div>

				<div className='relative size-32 z-0 flex items-center justify-center'>
					<Image
						src={imageSrc}
						alt={t(`${monsterKey}.name`)}
						fill
						sizes='128px'
						className='object-cover w-full h-full filter drop-shadow-lg transition-transform duration-300 ease-out group-hover/card:scale-110 group-hover/card:-translate-y-1'
					/>
				</div>
			</div>

			<CardContent className='p-4 space-y-4 flex-1 flex flex-col justify-between'>
				<div className='space-y-1'>
					<h3 className='text-xl font-bold text-foreground tracking-tight'>
						{t(`${monsterKey}.name`)}
					</h3>
					<p className='text-sm text-muted-foreground leading-relaxed line-clamp-2'>
						{t(`${monsterKey}.description`)}
					</p>
				</div>

				<div className='space-y-1 bg-muted/40 p-3 rounded-xl border border-border/80'>
					<span className='text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block'>
						{t('bestiary.labels.attackBehavior', { ai: monster.attack.ai })}
					</span>
					<p className='text-xs text-foreground/90 leading-normal'>
						{t(`${monsterKey}.behavior`)}
					</p>
				</div>

				<div className='grid grid-cols-3 gap-1.5 text-center text-xs'>
					{statsConfig.map(
						({ key, icon: Icon, iconClass, value, valueClass }) => (
							<div
								key={key}
								className='bg-muted/60 p-2 rounded-lg border border-border flex flex-col items-center justify-center'>
								<span className='text-[10px] font-medium text-muted-foreground flex items-center gap-1'>
									<Icon className={`size-3 ${iconClass}`} />
									{t(`bestiary.labels.stats.${key}`)}
								</span>
								<strong
									className={`font-mono font-bold text-xs mt-0.5 ${valueClass}`}>
									{value}
								</strong>
							</div>
						),
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default WikiMonsterCard;
