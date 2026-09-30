import { cn } from '@/libs/utils';
import { Crown, Medal, Trophy } from 'lucide-react';

const rankBadges = {
	1: {
		icon: Crown,
		bgColor: 'bg-chart-1/10',
		textColor: 'text-chart-1',
		borderColor: 'border-chart-1/20',
	},
	2: {
		icon: Medal,
		bgColor: 'bg-chart-2/10',
		textColor: 'text-chart-2',
		borderColor: 'border-chart-2/20',
	},
	3: {
		icon: Trophy,
		bgColor: 'bg-chart-3/10',
		textColor: 'text-chart-3',
		borderColor: 'border-chart-3/20',
	},
} as const;

const GameRankBadge = ({ rank }: { rank: number }) => {
	const badge = rankBadges[rank as keyof typeof rankBadges];

	if (badge) {
		const { icon: Icon, bgColor, textColor, borderColor } = badge;
		return (
			<div
				className={cn(
					'size-9 rounded-xl flex items-center justify-center font-bold border shrink-0',
					bgColor,
					textColor,
					borderColor,
				)}>
				<Icon className='size-5' />
			</div>
		);
	}

	return (
		<div className='flex items-center justify-center size-9 rounded-xl bg-muted/50 text-muted-foreground text-xs font-bold border border-border/60 shrink-0'>
			#{rank}
		</div>
	);
};

export default GameRankBadge;
